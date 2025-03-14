<template>
  <div class="pc_report" id="pdfContent" ref="pdfContent">
    <div class="pc_report_header">
      <div class="pc_report_header_left">
        <img src="../assets/img/mobile/logo.png" alt="" />
        <div>{{ $t(`${namespace}.reportSympifyAi`) }}</div>
      </div>
      <div class="pc_report_header_center">
        <div>{{ $t(`${namespace}.reportMedicalReport`) }}</div>
      </div>
      <div class="pc_report_header_right" @click="downloadPDF">
        {{ $t(`${namespace}.reportDownload`) }}
      </div>
    </div>
    <div class="pc_report_content">
      <div class="pers_info" :class="{ mobile: isMobile }">
        <div>{{ $t(`${namespace}.reportReported`) }} {{ userId }}</div>
        <div>{{ $t(`${namespace}.reportTime`) }} {{ formattedTime }}</div>
      </div>
      <div class="symptoms_do_occur" :class="{ mobile: isMobile }">
        <div class="do_occur_title">{{ $t(`${namespace}.reportSymptomsDoOccur`) }}</div>
        <div class="do_occur_diseases">
          <div class="symptom" v-for="item in occurSymptoms" :key="item">
            {{ translateSymptom(item) }}
          </div>
          <div v-if="!occurSymptoms.length" class="no-data">
            {{ $t(`${namespace}.noDataAvailable`) }}
          </div>
        </div>
      </div>
      <div class="symptoms_unsure_occur" :class="{ mobile: isMobile }">
        <div class="unsure_occur_title">
          {{ $t(`${namespace}.reportSymptomsUnsureOccur`) }}
        </div>
        <div class="unsure_occur_diseases">
          <div class="unsure_symptom" v-for="item in unsureSymptoms" :key="item">
            {{ translateSymptom(item) }}
          </div>
          <div v-if="!unsureSymptoms.length" class="no-data">
            {{ $t(`${namespace}.noDataAvailable`) }}
          </div>
        </div>
      </div>
      <div class="dash_line"></div>
      <div class="predicted">{{ $t(`${namespace}.reportPredictedDiseases`) }}</div>
      <div
        class="disease_matches"
        v-for="(group, index) in Object.keys(groupedDiseases)"
        :key="index"
        :class="{ mobile: isMobile }"
      >
        <div class="disease_matches_title">
          {{ $t(`${namespace}.reportDiseaseMatches${formatGroupKey(group)}`) }}
        </div>
        <div class="disease_matches_content">
          <div
            class="predicted_symptom"
            v-for="item in groupedDiseases[group]"
            :key="item"
          >
            {{ translateDisease(item) }}
          </div>
          <div v-if="!groupedDiseases[group].length" class="no-data">
            {{ $t(`${namespace}.noDataAvailable`) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  data() {
    return {
      allSymptomSelections: [],
      predictedDiseases: [],
      occurSymptoms: [],
      unsureSymptoms: [],
      groupedDiseases: {},
      currentTime: null,
      userId: "",
      diseases: null,
      diseaseNames: [],
      namespace: "mobile", // 默认命名空间
    };
  },
  computed: {
    isMobile() {
      return /Mobile|Android|iPhone/.test(navigator.userAgent);
    },
    formattedTime() {
      if (this.currentTime) {
        const hours = this.currentTime.getHours().toString().padStart(2, "0");
        const minutes = this.currentTime.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      }
      return "";
    },
  },
  methods: {
    // 新增方法：格式化 group 值以匹配语言文件中的键名
    formatGroupKey(group) {
      if (group === "Below 40%") {
        return "Below40";
      }
      return group.replace(/-/g, 'to').replace('%', '');
    },
    async loadDiseaseData() {
      try {
        const dataFile =
          this.$i18n.locale === "cn"
            ? await import("@/assets/data/diseases_chinese.json")
            : await import("@/assets/data/diseases.json");
        this.diseases = dataFile.default;
        this.diseaseNames = Object.keys(this.diseases);
      } catch (error) {
        console.error("Failed to load disease data:", error);
      }
    },
    translateSymptom(symptomName) {
      if (!this.diseases || !symptomName) return symptomName;
      for (const disease of Object.values(this.diseases)) {
        const symptom = disease.Symptoms.find(s => s.SymptomName === symptomName);
        if (symptom) return symptom.SymptomName;
      }
      return symptomName;
    },
    translateDisease(diseaseName) {
      if (!this.diseases || !diseaseName) return diseaseName;
      return this.diseaseNames.includes(diseaseName) ? diseaseName : diseaseName;
    },
    downloadPDF() {
      const content = this.$refs.pdfContent;

      html2canvas(content, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = 210;
        const pageHeight = 297;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgHeight = (pageWidth / canvasWidth) * canvasHeight;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("medical_report.pdf");
      });
    },
    updateTime() {
      this.currentTime = new Date();
    },
    renderSymptomProfile() {
      const occurSymptoms = new Set();
      const unsureSymptoms = new Set();

      this.allSymptomSelections.forEach((symptom) => {
        if (symptom.UserChoice === "yes") {
          occurSymptoms.add(symptom.SymptomName);
        } else if (symptom.UserChoice === "maybe") {
          unsureSymptoms.add(symptom.SymptomName);
        }
      });
      this.occurSymptoms = Array.from(occurSymptoms);
      this.unsureSymptoms = Array.from(unsureSymptoms);
    },
    groupDiseasesByScore() {
      const groupedDiseases = {
        "85-100%": [],
        "70-85%": [],
        "55-70%": [],
        "40-55%": [],
        "Below 40%": [],
      };

      const uniqueDiseases = new Map();

      this.predictedDiseases.forEach((disease) => {
        if (
          !uniqueDiseases.has(disease.diseaseName) ||
          uniqueDiseases.get(disease.diseaseName) < disease.score
        ) {
          uniqueDiseases.set(disease.diseaseName, disease.score);
        }
      });

      uniqueDiseases.forEach((score, diseaseName) => {
        const percentage = score * 100;

        if (percentage >= 85) {
          groupedDiseases["85-100%"].push(diseaseName);
        } else if (percentage >= 70) {
          groupedDiseases["70-85%"].push(diseaseName);
        } else if (percentage >= 55) {
          groupedDiseases["55-70%"].push(diseaseName);
        } else if (percentage >= 40) {
          groupedDiseases["40-55%"].push(diseaseName);
        } else {
          groupedDiseases["Below 40%"].push(diseaseName);
        }
      });

      this.groupedDiseases = groupedDiseases;
    },
  },
  async created() {
    // 动态确定命名空间
    const path = this.$route.path;
    this.namespace = path.includes("/mobile") ? "mobile" : "pc";

    // 强制同步语言设置
    const lang = this.$route.params.lang || "en";
    if (this.$i18n.locale !== lang) {
      this.$i18n.locale = lang;
    }

    console.log("Current locale in Report:", this.$i18n.locale);
    console.log("Route lang param:", this.$route.params.lang);
    console.log("Namespace:", this.namespace);
    console.log("User ID:", this.$route.query.userId);

    // 加载疾病数据以支持症状和疾病名称翻译
    await this.loadDiseaseData();

    // 加载症状和预测疾病数据
    this.predictedDiseases = JSON.parse(localStorage.getItem("predictedDiseases")) || [];
    this.allSymptomSelections = JSON.parse(localStorage.getItem("allSymptomSelections")) || [];

    // 渲染症状和疾病分组
    this.renderSymptomProfile();
    this.groupDiseasesByScore();

    // 设置用户ID和当前时间
    this.userId = this.$route.query.userId || "Unknown";
    this.updateTime();
  },
};
</script>

<style scoped>
.pc_report {
  width: 100vw;
  height: auto;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}

.pc_report_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1018280d;
  padding: 10px;
}

.pc_report_header_left {
  display: flex;
  align-items: center;
}

.pc_report_header_left img {
  margin-right: 5px;
}

.pc_report_header_left div {
  font-weight: 600;
  font-size: 14px;
  color: #353535;
}

.pc_report_header_center div {
  font-size: 18px;
  font-weight: 600;
  color: #101828;
}

.pc_report_header_right {
  font-size: 16px;
  font-weight: 600;
  color: #101828;
  border: 1px solid #eaecf0;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}

.pc_report_content {
  padding: 20px 0;
}

.pers_info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eaecf0;
  font-size: 14px;
  color: #667085;
}

.pers_info.mobile {
  flex-direction: column;
  align-items: flex-start;
}

.pers_info.mobile div {
  margin: 5px 0;
}

.symptoms_do_occur,
.symptoms_unsure_occur {
  padding: 10px 0;
}

.do_occur_title,
.unsure_occur_title {
  font-weight: 600;
  font-size: 16px;
  color: #101828;
  margin-bottom: 10px;
}

.do_occur_diseases,
.unsure_occur_diseases {
  display: flex;
  flex-wrap: wrap;
}

.symptom,
.unsure_symptom,
.no-data {
  background: #ecfdf3;
  color: #067647;
  border: 1px solid #abefc6;
  font-size: 14px;
  font-weight: 500;
  padding: 8px;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
}

.unsure_symptom {
  background: #fef6ee;
  color: #b93815;
  border: 1px solid #f9dbaf;
}

.no-data {
  background: #f8f9fc;
  color: #363f72;
  border: 1px solid #d5d9eb;
  cursor: default;
}

.dash_line {
  border: 1px dashed #eaecf0;
  margin: 10px 0;
}

.predicted {
  font-weight: 600;
  font-size: 16px;
  color: #667085;
  padding: 10px 0;
}

.disease_matches {
  padding: 10px 0;
}

.disease_matches_title {
  font-weight: 600;
  font-size: 16px;
  color: #101828;
  padding: 10px 0;
}

.disease_matches_content {
  border: 1px solid #eaecf0;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}

.predicted_symptom {
  background: #f8f9fc;
  border: 1px solid #d5d9eb;
  color: #363f72;
  padding: 8px;
  border-radius: 10px;
  margin: 5px;
}
</style>