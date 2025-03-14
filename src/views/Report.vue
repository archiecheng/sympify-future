<template>
  <div class="pc_report" id="pdfContent" ref="pdfContent">
    <div class="pc_report_header">
      <div class="pc_report_header_left">
        <img src="../assets/img/mobile/logo.png" alt="" />
        <div>{{ $t("reportSympifyAi") }}</div>
      </div>
      <div class="pc_report_header_center">
        <div>{{ $t("reportMedicalReport") }}</div>
      </div>
      <div class="pc_report_header_right" @click="downloadPDF">
        {{ $t("reportDownload") }}
      </div>
    </div>
    <div class="pc_report_content">
      <div class="pers_info">
        <div>{{ $t("reportReported") }} {{ userId }}</div>
        <div>{{ $t("reportTime") }} {{ formattedTime }}</div>
      </div>
      <div class="symptoms_do_occur">
        <div class="do_occur_title">{{ $t("reportSymptomsDoOccur") }}</div>
        <div class="do_occur_diseases">
          <div class="symptom" v-for="item in occurSymptoms" :key="item">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="symptoms_unsure_occur">
        <div class="unsure_occur_title">
          {{ $t("reportSymptomsUnsureOccur") }}
        </div>
        <div class="unsure_occur_diseases">
          <div
            class="unsure_symptom"
            v-for="item in unsureSymptoms"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="dash_line"></div>
      <div class="predicted">{{ $t("reportPredictedDiseases") }}</div>
      <div class="disease_matches">
        <div class="disease_matches_title">
          {{ $t("reportDiseaseMatches85to100") }}
        </div>
        <div class="disease_matches_content">
          <div
            class="predicted_symptom"
            v-for="item in groupedDiseases['85-100%']"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="disease_matches">
        <div class="disease_matches_title">
          {{ $t("reportDiseaseMatches70to85") }}
        </div>
        <div class="disease_matches_content">
          <div
            class="predicted_symptom"
            v-for="item in groupedDiseases['70-85%']"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="disease_matches">
        <div class="disease_matches_title">
          {{ $t("reportDiseaseMatches55to70") }}
        </div>
        <div class="disease_matches_content">
          <div
            class="predicted_symptom"
            v-for="item in groupedDiseases['55-70%']"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="disease_matches">
        <div class="disease_matches_title">
          {{ $t("reportDiseaseMatches40to55") }}
        </div>
        <div class="disease_matches_content">
          <div
            class="predicted_symptom"
            v-for="item in groupedDiseases['40-55%']"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="disease_matches">
        <div class="disease_matches_title">
          {{ $t("reportDiseaseMatchesBelow40") }}
        </div>
        <div class="disease_matches_content">
          <div
            class="predicted_symptom"
            v-for="item in groupedDiseases['Below 40%']"
            :key="item"
          >
            {{ item }}
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
      occurSymptoms: "",
      unsureSymptoms: "",
      groupedDiseases: "",
      currentTime: null, // 用于存储当前时间
      userId: "",
    };
  },
  computed: {
    // 计算属性来获取当前时间并格式化
    formattedTime() {
      if (this.currentTime) {
        const hours = this.currentTime.getHours().toString().padStart(2, "0");
        const minutes = this.currentTime
          .getMinutes()
          .toString()
          .padStart(2, "0");
        return `${hours}:${minutes}`;
      }
      return "";
    },
  },
  methods: {
    downloadPDF() {
      const content = this.$refs.pdfContent; // 获取 PDF 内容区域

      // 使用 html2canvas 将 DOM 元素转换为图片
      html2canvas(content, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        // A4 页面宽高
        const pageWidth = 210; // A4 尺寸宽度，单位 mm
        const pageHeight = 297; // A4 尺寸高度，单位 mm

        // 将 canvas 宽高按比例缩放到 A4 页面宽度
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgHeight = (pageWidth / canvasWidth) * canvasHeight;

        // 如果内容超过 A4 的页面高度，需要分页显示
        let heightLeft = imgHeight;
        let position = 0;

        // 添加图片到 PDF
        pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // 保存生成的 PDF
        pdf.save("download.pdf");
      });
    },
    // 更新当前时间
    updateTime() {
      this.currentTime = new Date();
    },
    renderSymptomProfile() {
      const occurSymptoms = new Set(); // 确认发生的症状
      const unsureSymptoms = new Set(); // 不确定的症状

      this.allSymptomSelections.forEach((symptom) => {
        if (symptom.UserChoice === "yes") {
          occurSymptoms.add(symptom.SymptomName); // "是" 的症状
        } else if (symptom.UserChoice === "maybe") {
          unsureSymptoms.add(symptom.SymptomName); // "可能" 的症状
        }
      });
      this.occurSymptoms = occurSymptoms;
      this.unsureSymptoms = unsureSymptoms;
    },
    groupDiseasesByScore() {
      const groupedDiseases = {
        "85-100%": [],
        "70-85%": [],
        "55-70%": [],
        "40-55%": [],
        "Below 40%": [],
      };

      // 使用 Map 去重，以疾病名称为键
      const uniqueDiseases = new Map();

      this.predictedDiseases.forEach((disease) => {
        // 如果 Map 中不存在该疾病，或者存在但分数更高，则添加/更新
        if (
          !uniqueDiseases.has(disease.diseaseName) ||
          uniqueDiseases.get(disease.diseaseName) < disease.score
        ) {
          uniqueDiseases.set(disease.diseaseName, disease.score);
        }
      });

      // 遍历去重后的疾病，按分数范围分组
      uniqueDiseases.forEach((score, diseaseName) => {
        const percentage = score * 100; // 使用分数计算百分比

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

      this.groupedDiseases = groupedDiseases; // 将分组结果存储到 Vue 的数据中
    },
  },
  created() {
    console.log("Current locale in Report:", this.$i18n.locale);
    console.log("Route lang param:", this.$route.params.lang);
    console.log("User ID:", this.$route.query.userId);
    this.predictedDiseases = JSON.parse(
      localStorage.getItem("predictedDiseases")
    );

    this.allSymptomSelections = JSON.parse(
      localStorage.getItem("allSymptomSelections")
    );
    this.renderSymptomProfile();
    this.groupDiseasesByScore();
    this.userId = this.$route.query.userId;
    // 初始化当前时间
    this.updateTime();
  },
};
</script>

<style scoped>
.pc_report {
  width: 100vw;
}
.pc_report_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1018280d;
  box-sizing: border-box;
  padding: 10px;
}

.pc_report_header_left {
  display: flex;
  justify-content: space-between;
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: #101828;
  border: 1px solid #eaecf0;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10cqh;
  cursor: pointer;
}

.pc_report_content {
  box-sizing: border-box;
}

.pers_info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
  border-bottom: 1px solid #eaecf0;
}

.pers_info div {
  font-weight: 500;
  font-size: 12px;
  color: #667085;
}

.pers_info div:nth-child(1) {
  margin-right: 20px;
}

.symptoms_do_occur,
.symptoms_unsure_occur {
  box-sizing: border-box;
  padding: 0 20px;
  margin-bottom: 20px;
}

.do_occur_diseases {
  display: flex;
  flex-wrap: wrap; /* 让子元素换行 */
}

.symptom {
  background: #ecfdf3;
  color: #067647;
  border: 1px solid #abefc6;
  font-size: 14px;
  font-weight: 500;
  width: auto;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
}

.do_occur_title,
.unsure_occur_title {
  font-weight: 600;
  font-size: 16px;
  color: #101828;
  margin-bottom: 10px;
}

.unsure_occur_diseases {
  display: flex;
  flex-wrap: wrap; /* 让子元素换行 */
}

.unsure_symptom {
  background: #fef6ee;
  color: #b93815;
  border: 1px solid #f9dbaf;
  font-size: 14px;
  font-weight: 500;
  width: auto;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
}

.dash_line {
  border: 1px dashed #eaecf0;
  box-sizing: border-box;
  padding: 0 10px;
  margin-bottom: 10px;
}

.predicted {
  font-weight: 600;
  font-size: 16px;
  color: #667085;
  box-sizing: border-box;
  padding: 0 20px;
}

.disease_matches {
  /* box-sizing: border-box;
    padding: 10px; */
}

.disease_matches .disease_matches_title {
  font-weight: 600;
  font-size: 16px;
  color: #101828;
  box-sizing: border-box;
  padding: 20px;
}

.disease_matches_content {
  border: 1px solid #eaecf0;
  display: flex;
  box-sizing: border-box;
  padding: 20px;
}

.predicted_symptom {
  background: #f8f9fc;
  border: 1px solid #d5d9eb;
  color: #363f72;
  width: auto;
  border-radius: 10px;
  margin-right: 10px;
  box-sizing: border-box;
  padding: 10px;
}

#pdfContent {
  width: 100%;
  height: auto;
  /* padding: 20px; */
  background-color: #f5f5f5;
}
</style>
