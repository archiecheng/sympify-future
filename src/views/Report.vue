<template>
  <div class="pc_report">
    <div class="pc_report_header">
      <div class="pc_report_header_left">
        <img src="../assets/img/mobile/logo.png" alt="" />
        <div>Sympify.ai</div>
      </div>
      <div class="pc_report_header_center">
        <div>Medical Report</div>
      </div>
      <div class="pc_report_header_right">Download</div>
    </div>
    <div class="pc_report_content">
      <div class="pers_info">
        <div>Reported: 123456</div>
        <div>Time: {{ formattedTime }}</div>
      </div>
      <div class="symptoms_do_occur">
        <div class="do_occur_title">These symptoms do occur</div>
        <div class="do_occur_diseases">
          <div class="symptom" v-for="item in occurSymptoms" :key="item">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="symptoms_unsure_occur">
        <div class="unsure_occur_title">Unsure if these symptoms occur</div>
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
      <div class="predicted">Predicted diseases</div>
      <div class="disease_matches">
        <div class="disease_matches_title">Disease Matches (85%-100%)</div>
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
        <div class="disease_matches_title">Disease Matches (70%-85%)</div>
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
        <div class="disease_matches_title">Disease Matches (55%-70%)</div>
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
        <div class="disease_matches_title">Disease Matches (40%-55%)</div>
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
        <div class="disease_matches_title">Disease Matches (Below 40%)</div>
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
export default {
  data() {
    return {
      allSymptomSelections: [],
      predictedDiseases: [],
      occurSymptoms: "",
      unsureSymptoms: "",
      groupedDiseases: "",
      currentTime: null, // 用于存储当前时间
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
    this.predictedDiseases = JSON.parse(
      localStorage.getItem("predictedDiseases")
    );

    this.allSymptomSelections = JSON.parse(
      localStorage.getItem("allSymptomSelections")
    );
    this.renderSymptomProfile();
    this.groupDiseasesByScore();
    // 初始化当前时间
    this.updateTime();
  },
};
</script>

<style scoped>
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
</style>
