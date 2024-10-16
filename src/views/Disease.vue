<template>
  <div class="disease_page">
    <div class="disease_page_header">
      <div class="disease_page_header_left" @click="goBack()">
        <img src="../assets/img/mobile/logo.png" alt="" />
        <div>Sympify.ai</div>
      </div>
      <div class="disease_page_header_right" @click="show = true">
        <img src="../assets/img/mobile/more.png" alt="" />
      </div>
    </div>
    <div class="disease_page_content">
      <div
        class="disease_card"
        :class="{
          'slide-in': cardState === 'enter',
          'slide-out': cardState === 'leave',
          show: cardState === 'show',
        }"
      >
        <div class="disease_summary">
          <div class="disease_name">
            <div class="disease_name_left">
              <van-icon name="arrow-left" size="25" />
              <span>{{ currentDiseaseName }}</span>
            </div>
            <div class="disease_name_right" @click="showDiseaseDetail = true">
              <img src="../assets/img/mobile/disease_info.png" alt="" />
            </div>
          </div>
          <div class="disease_pic">
            <img src="../assets/img/mobile/disease.png" alt="" />
          </div>
          <div class="disease_desc">
            For the following symptoms, please select Yes, No & Maybe according
            to your personal wellbeing
          </div>
          <van-divider />
        </div>
        <div class="disease_symptoms" ref="symptomList">
          <div
            class="disease_symptom_item"
            v-for="symptom in diseaseDetails.Symptoms"
            :key="symptom.SymptomName"
          >
            <div class="disease_symptom_name">{{ symptom.SymptomName }}</div>
            <div class="disease_symptom_selections">
              <div class="radio_container">
                <input
                  type="radio"
                  :id="symptom.SymptomName + '_yes'"
                  :name="symptom.SymptomName"
                  value="yes"
                  v-model="selectedSymptoms[symptom.SymptomName]"
                />
                <label :for="symptom.SymptomName + '_yes'">Yes</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  :id="symptom.SymptomName + '_no'"
                  :name="symptom.SymptomName"
                  value="no"
                  v-model="selectedSymptoms[symptom.SymptomName]"
                />
                <label :for="symptom.SymptomName + '_no'">No</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  :id="symptom.SymptomName + '_maybe'"
                  :name="symptom.SymptomName"
                  value="maybe"
                  v-model="selectedSymptoms[symptom.SymptomName]"
                />
                <label :for="symptom.SymptomName + '_maybe'">Maybe</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="disease_bottom">
      <div class="disease_bottom_button" @click="showSymptomProfile = true">
        View Summary
      </div>
      <div class="disease_bottom_button" @click="processDiseaseScoring()">
        Scroll Down
      </div>
    </div>
    <van-popup
      v-model="showSymptomProfile"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <div class="symptom_profile">
        <div class="symptom_profile_header">
          <div class="symptom_profile_left" @click="showSymptomProfile = false">
            <van-icon name="arrow-left" />
            <div>Symptom Profile</div>
          </div>
          <div class="symptom_profile_right" @click="show = true">
            <img src="../assets/img/mobile/more.png" alt="" />
          </div>
        </div>
        <div class="symptom_profile_content">
          <div
            class="symptom_profile_item"
            v-for="symptom in allSymptomSelections"
            :key="symptom.SymptomName"
          >
            <div class="symptom_profile_item_left">
              <div
                class="dot"
                :class="{
                  yes: symptom.UserChoice === 'yes',
                  no: symptom.UserChoice === 'no',
                  maybe: symptom.UserChoice === 'maybe',
                }"
              ></div>
              {{ symptom.SymptomName }}
            </div>
            <div
              class="symptom_profile_item_right"
              @click="removeSymptom(symptom.SymptomName)"
            >
              <van-icon name="cross" />
            </div>
          </div>
        </div>
        <div class="symptom_profile_bottom">
          <div class="generate_buttop" @click="generateReport()">
            Generate Report
          </div>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="showDiseaseDetail"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <div class="disease_detail">
        <div class="disease_detail_header">
          <div>{{ currentDiseaseName }}</div>
          <div @click="showDiseaseDetail = false">
            <van-icon name="cross" />
          </div>
        </div>
        <div class="disease_detail_content">
          <van-collapse v-model="activeNames" accordion>
            <van-collapse-item title="Causes" name="1">
              {{ diseaseDetails.Causes }}
            </van-collapse-item>
            <van-collapse-item title="Symptoms" name="2">
              <div
                v-for="item in diseaseDetails.Symptoms"
                :key="item.SymptomName"
              >
                {{ item.SymptomName }}
              </div>
            </van-collapse-item>
            <van-collapse-item
              title="Departments that treat this condition"
              name="3"
            >
              {{ diseaseDetails.departmentsThatTreatThisCondition }}
            </van-collapse-item>
            <van-collapse-item title="Risk Factors" name="4">
              {{ diseaseDetails.riskFactors }}
            </van-collapse-item>
            <van-collapse-item title="Prevention" name="5">
              {{ diseaseDetails.Prevention }}
            </van-collapse-item>
            <van-collapse-item title="Diagnosis" name="6">
              {{ diseaseDetails.Diagnosis }}
            </van-collapse-item>
            <van-collapse-item title="Treatments" name="7">
              {{ diseaseDetails.Treatments }}
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import diseasesData from "@/assets/data/diseases.json";
import { db } from "@/utils/firebase"; // 确保路径正确
import { collection, addDoc } from "firebase/firestore"; // 导入必要的 Firestore 方法
import { Toast } from "vant";
export default {
  data() {
    return {
      showSymptomProfile: false,
      showDiseaseDetail: false,
      activeNames: ["1"],

      diseases: "",
      diseaseNames: "",
      currentDiseaseName: "",
      selectedSymptoms: {}, // 用户选择的选项（yes、no、maybe）
      userSelections: [],
      diseaseDetails: "",
      allSymptomSelections: "",
      predictionCount: 0, // 计数器，跟踪预测次数
      maxPredictions: 5, // 最大允许预测次数
      cardState: "show", // 控制卡片的进入与离开动画状态
      predictedDiseases: [], // 初始化为一个空数组
    };
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
    generateReport() {
      console.log(this.selectedSymptoms);
      localStorage.setItem(
        "predictedDiseases",
        JSON.stringify(this.predictedDiseases)
      );
      localStorage.setItem(
        "allSymptomSelections",
        JSON.stringify(this.allSymptomSelections)
      );
      this.$router.push({ name: "Report" });
    },
    getSelectedSymptomsWithProbability() {
      // 遍历当前疾病的所有症状
      for (let symptom of this.diseaseDetails.Symptoms) {
        const userChoice = this.selectedSymptoms[symptom.SymptomName]; // 获取用户选择的选项

        // 只有当用户选择了症状时，才处理
        if (userChoice !== undefined) {
          // 检查当前症状是否已经存在于 userSelections 中
          const existingSymptom = this.userSelections.find(
            (selection) => selection.SymptomName === symptom.SymptomName
          );

          // 如果没有找到，就添加到 userSelections 中
          if (!existingSymptom) {
            this.userSelections.push({
              SymptomName: symptom.SymptomName,
              Possibility: symptom.Possibility,
              UserChoice: userChoice,
            });
          } else {
            // 如果找到了，更新其选择
            existingSymptom.UserChoice = userChoice;
          }
        }
      }
      // 将 userSelections 中的内容合并到 allSymptomSelections 中
      this.allSymptomSelections = [
        ...this.allSymptomSelections,
        ...this.userSelections,
      ];

      // 去重：根据 SymptomName 去重
      this.allSymptomSelections = this.allSymptomSelections.reduce(
        (acc, current) => {
          const duplicate = acc.find(
            (item) => item.SymptomName === current.SymptomName
          );
          if (!duplicate) {
            acc.push(current);
          } else {
            // 如果已经存在，更新 UserChoice
            duplicate.UserChoice = current.UserChoice;
          }
          return acc;
        },
        []
      );
    },

    removeSymptom(symptomName) {
      this.allSymptomSelections = this.allSymptomSelections.filter(
        (selection) => selection.SymptomName !== symptomName
      );
    },

    // 计算疾病匹配分数的函数
    calculateDiseaseScores() {
      // 存储每个疾病的匹配分数
      const diseaseScores = {};
      var userSelection;
      // 遍历所有疾病
      for (const [diseaseName, diseaseInfo] of Object.entries(this.diseases)) {
        // 初始化当前疾病的匹配分数
        let score = 0;
        let totalWeight = 0; // 计算总权重以确保加权平均
        // 遍历当前疾病的所有症状
        diseaseInfo.Symptoms.forEach((symptomInfo) => {
          const symptomName = symptomInfo.SymptomName;
          // 将百分比格式的字符串转换为数字 (例如 "7%" -> 0.07)
          const symptomPossibility = parseFloat(symptomInfo.Possibility) / 100;

          // 在 userSelections 中查找与 symptomName 匹配的症状
          userSelection = this.userSelections.find(
            (selection) => selection.SymptomName === symptomName
          );
          // 如果找到了用户对该症状的选择
          if (userSelection) {
            const userChoice = userSelection.UserChoice;
            // 增加对“yes”选择的权重
            const weight = symptomPossibility * (userChoice === "yes" ? 2 : 1); // "yes" 权重为 2，其他为 1
            // 根据用户选择来计算匹配分数
            if (userChoice === "yes") {
              score += symptomPossibility; // "yes" 完全符合
            } else if (userChoice === "maybe") {
              score += symptomPossibility * 0.5; // "maybe" 部分符合，权重为 0.5
            }
            // "no" 不加分，因此这里不需要明确处理
            totalWeight += weight; // 累加权重
          }
        });
        // 将当前疾病的匹配分数存储到 diseaseScores 对象中
        // diseaseScores[diseaseName] = score;
        // 计算加权平均得分
        diseaseScores[diseaseName] = totalWeight > 0 ? score / totalWeight : 0;
      }
      // 返回每个疾病的匹配分数
      return diseaseScores;
    },

    processDiseaseScoring() {
      // 校验是否所有症状都已选择
      const allSelected = this.diseaseDetails.Symptoms.every(
        (symptom) => this.selectedSymptoms[symptom.SymptomName] !== undefined
      );

      if (!allSelected) {
        // 如果有未选择的症状，提示用户并终止
        Toast("Please select an option for all symptoms.");
        return;
      }

      // 如果已达到最大预测次数，停止预测并提示
      if (this.predictionCount >= this.maxPredictions) {
        Toast("You have reached the maximum number of predictions.");
        this.showSymptomProfile = true;
        return;
      }

      // 获取当前卡片元素
      this.cardState = "leave"; // 设置卡片为离开状态

      setTimeout(() => {
        // 获取用户选择的症状及其概率
        this.getSelectedSymptomsWithProbability();

        // 计算疾病匹配分数
        const diseaseScores = this.calculateDiseaseScores();

        // 将对象转换为数组并按得分降序排列
        const sortedDiseaseScores = Object.entries(diseaseScores)
          .sort(([, a], [, b]) => b - a)
          .map(([diseaseName, score]) => ({ diseaseName, score }));

        // 移除当前疾病，避免重复
        const newSortedDiseaseScores = sortedDiseaseScores.filter(
          (element) => element.diseaseName !== this.currentDiseaseName
        );

        // 取得分最高的疾病并显示
        const mostLikelyDisease = newSortedDiseaseScores[0];

        if (mostLikelyDisease) {
          this.predictedDiseases.push({
            diseaseName: mostLikelyDisease.diseaseName,
            score: mostLikelyDisease.score,
          });
          // 切换到新的疾病卡片
          this.exploreSymptomsByDisease(mostLikelyDisease.diseaseName);

          // 强制将症状表格滚动到顶部
          this.$nextTick(() => {
            const symptomTableBody = this.$refs.symptomList; // 获取症状表格的 DOM 元素
            if (symptomTableBody) {
              symptomTableBody.scrollTop = 0; // 将表格滚动到顶部
            }
          });

          // 更新 cardState 为显示新卡片
          this.cardState = "enter"; // 新卡片进入状态

          // 移除动画类以恢复正常显示
          setTimeout(() => {
            this.cardState = "show";
          }, 500); // 动画时长500ms
          // 增加预测次数
          this.predictionCount++;
        } else {
          Toast("No more diseases to predict.");
        }
      }, 500); // 动画时长500ms
    },

    exploreSymptomsByDisease(diseaseName) {
      const nameToSearch = diseaseName || this.$route.query.diseaseName; // 优先使用传入的参数，如果没有就用 textarea
      if (this.diseases != null) {
        for (let i = 0; i < this.diseaseNames.length; i++) {
          if (nameToSearch == this.diseaseNames[i]) {
            this.diseaseDetails = this.diseases[nameToSearch];
            this.currentDiseaseName = nameToSearch;
            this.selectedSymptoms = {}; // 重置已选症状
            this.userSelections = []; // 清空之前的选择
            break;
          }
        }
      }
    },
  },
  created() {
    this.diseases = diseasesData; // 将 JSON 数据赋值给组件的 data
    this.diseaseNames = Object.keys(this.diseases); // 获取所有疾病名称
    this.exploreSymptomsByDisease();
  },
};
</script>

<style scoped>
.disease_page_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1018280d;
  box-sizing: border-box;
  padding: 10px;
}

.disease_page_header_left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.disease_page_header_left img {
  margin-right: 5px;
}

.disease_page_header_left div {
  font-weight: 600;
  font-size: 14px;
  color: #353535;
}

.disease_page_header_right img {
  width: 18px;
  height: 12px;
}

.disease_page_content {
  height: calc(100vh - 113px);
}

.disease_card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.disease_name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
}

.disease_name .disease_name_left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.disease_name .disease_name_left span {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 20px;
  color: #353535;
  margin-left: 10px;
}

.disease_pic {
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.disease_pic img {
  width: 100%;
  border-radius: 10px;
}

.disease_desc {
  box-sizing: border-box;
  padding: 0 10px;
  font-size: 14px;
  font-weight: 500;
  color: #475467;
}

.disease_symptoms {
  box-sizing: border-box;
  padding: 0 10px;
  flex: 1;
  overflow-y: auto;
}

.disease_symptom_item {
  border-bottom: 1px solid #eaecf0;
  box-sizing: border-box;
  padding: 10px 0;
}

.disease_symptom_name {
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #101828;
}

.disease_symptom_selections {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 样式定义 */
.radio_container {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  margin-right: 10px;
}

/* 隐藏默认的 radio 样式 */
.radio_container input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  margin-right: 8px;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 50%; /* 圆形按钮 */
  position: relative;
  cursor: pointer;
}

/* 自定义选中的样式 */
.radio_container input[type="radio"]:checked::before {
  content: "\2713"; /* 对勾箭头 */
  display: block;
  width: 20px;
  height: 20px;
  font-size: 16px;
  color: white;
  text-align: center;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 确保对勾箭头居中 */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 根据 name 属性选中不同颜色 */
/* Yes - 选中时变绿色 */
input[type="radio"][value="yes"]:checked::before {
  background-color: green;
}

/* No - 选中时变红色 */
input[type="radio"][value="no"]:checked::before {
  background-color: red;
}

/* Maybe - 选中时变橙色 */
input[type="radio"][value="maybe"]:checked::before {
  background-color: rgb(244, 147, 9);
  color: white;
}

/* Label 的样式 */
.radio_container label {
  font-size: 14px;
  font-weight: 500;
  color: #101828;
  position: relative;
}

/* 鼠标悬停时的效果 */
.radio_container:hover {
  background-color: #f7f7f7;
  border-color: #007bff;
}

.disease_bottom {
  position: sticky;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #d0d5dd;
  background: white;
  box-sizing: border-box;
  padding: 10px;
}

.disease_bottom_button {
  width: 168px;
  height: 37px;
  color: #101828;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #d0d5dd;
  font-weight: 600;
}

.symptom_profile_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1018280d;
  box-sizing: border-box;
  padding: 10px;
}

.symptom_profile_left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.symptom_profile_left img {
  margin-right: 5px;
}

.symptom_profile_left div {
  font-weight: 600;
  font-size: 14px;
  color: #353535;
}

.symptom_profile_right img {
  width: 18px;
  height: 12px;
}

.symptom_profile_content {
  box-sizing: border-box;
  padding: 0 10px;
}

.symptom_profile_item {
  padding: 20px 0;
  border-bottom: 1px solid #eaecf0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.symptom_profile_item_left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #101828;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: green;
  margin-right: 10px;
}

.symptom_profile_bottom {
  position: sticky;
  bottom: 0;
  height: 64px;
  width: 100%;
  background: white;
  border-top: 1px solid #eaecf0;
}

.symptom_profile {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.symptom_profile_content {
  height: calc(100vh - 102px);
  overflow-y: auto;
}

.symptom_profile_bottom {
  box-sizing: border-box;
  padding: 10px;
}

.generate_buttop {
  border: 1px solid #eaecf0;
  font-size: 16px;
  font-weight: 500;
  color: #101828;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
}

.disease_detail {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.disease_detail_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
}

.disease_detail_header div:nth-child(1) {
  font-size: 16px;
  font-weight: 600;
  color: #353535;
}

.disease_detail_header div:nth-child(2) {
  width: 36px;
  height: 36px;
  background-color: #f2f4f7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.disease_detail_content {
  height: calc(100vh - 56px);
  overflow-y: auto;
}

.disease_detail_content ::v-deep(.van-cell__title) {
  font-weight: 600;
  font-size: 18px;
  color: #101828;
}

.disease_card.slide-in {
  transform: translateY(100%); /* 卡片从下方滑入 */
  opacity: 0; /* 透明度动画 */
}

.disease_card.slide-out {
  transform: translateY(-100%); /* 卡片向上滑出 */
  opacity: 0; /* 透明度动画 */
}

.disease_card.show {
  transform: translateY(0); /* 卡片进入视图 */
  opacity: 1; /* 确保卡片完全显示 */
}

.yes {
  background: green;
}

.maybe {
  background: orange;
}

.no {
  background: red;
}
</style>
