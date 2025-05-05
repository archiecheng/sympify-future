<template>
  <div class="disease_page">
    <div class="disease_page_header">
      <div class="disease_page_header_left">
        <img src="../assets/img/mobile/logo.png" alt="" />
        <div>{{ $t("mobile.sympifyAi") }}</div>
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
              <van-icon name="arrow-left" size="25" @click="goBack()" />
              <span>{{
                currentDiseaseName || $t("mobile.noDiseaseAdded")
              }}</span>
            </div>
            <div
              class="disease_name_right"
              @click="showDiseaseDetail = true"
              v-if="currentDiseaseName"
            >
              <img src="../assets/img/mobile/disease_info.png" alt="" />
            </div>
          </div>
          <div class="disease_pic" v-if="currentDiseaseName">
            <img :src="imageUrl" alt="Image" v-if="imageUrl" />
            <img src="../assets/img/mobile/disease.png" alt="" v-else />
          </div>
          <div class="disease_desc" v-if="currentDiseaseName">
            {{ $t("mobile.symptomSelectionTip") }}
          </div>
          <van-divider v-if="currentDiseaseName" />
        </div>
        <div
          class="disease_symptoms"
          ref="symptomList"
          v-if="currentDiseaseName && diseaseDetails.Symptoms?.length"
        >
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
                <label :for="symptom.SymptomName + '_yes'">{{
                  $t("mobile.yes")
                }}</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  :id="symptom.SymptomName + '_no'"
                  :name="symptom.SymptomName"
                  value="no"
                  v-model="selectedSymptoms[symptom.SymptomName]"
                />
                <label :for="symptom.SymptomName + '_no'">{{
                  $t("mobile.no")
                }}</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  :id="symptom.SymptomName + '_maybe'"
                  :name="symptom.SymptomName"
                  value="maybe"
                  v-model="selectedSymptoms[symptom.SymptomName]"
                />
                <label :for="symptom.SymptomName + '_maybe'">{{
                  $t("mobile.maybe")
                }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="no-disease-message" v-else-if="!currentDiseaseName">
          <p>{{ $t("mobile.pleaseSelectDisease") }}</p>
          <div class="go-back-button" @click="goBack()">
            {{ $t("mobile.goBackToSelect") }}
          </div>
        </div>
      </div>
    </div>
    <div class="disease_bottom" v-if="currentDiseaseName">
      <div class="disease_bottom_button" @click="showSymptomProfile = true">
        {{ $t("mobile.viewSummary") }}
      </div>
      <div class="disease_bottom_button" @click="processDiseaseScoring()">
        {{ $t("mobile.scrollDown") }}
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
            <div>{{ $t("mobile.symptomProfile") }}</div>
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
          <div v-if="!allSymptomSelections.length" class="no-symptoms">
            {{ $t("mobile.noSymptomsAdded") }}
          </div>
        </div>
        <div class="symptom_profile_bottom">
          <div class="generate_buttop" @click="showDialog()">
            {{ $t("mobile.generateReport") }}
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
          <div>{{ currentDiseaseName || $t("mobile.noDiseaseAdded") }}</div>
          <div @click="showDiseaseDetail = false">
            <van-icon name="cross" />
          </div>
        </div>
        <div class="disease_detail_content">
          <van-collapse v-model="activeNames" accordion>
            <van-collapse-item :title="$t('mobile.overview')" name="1">
              {{ diseaseDetails.Overview || $t("mobile.noDataAvailable") }}
            </van-collapse-item>
            <van-collapse-item :title="$t('mobile.causes')" name="2">
              {{ diseaseDetails.Causes || $t("mobile.noDataAvailable") }}
            </van-collapse-item>
            <van-collapse-item :title="$t('mobile.symptoms')" name="3">
              <div
                v-for="item in diseaseDetails.Symptoms"
                :key="item.SymptomName"
              >
                {{ item.SymptomName }}
              </div>
              <div v-if="!diseaseDetails.Symptoms?.length">
                {{ $t("mobile.noDataAvailable") }}
              </div>
            </van-collapse-item>
            <van-collapse-item
              :title="$t('mobile.departmentsThatTreat')"
              name="4"
            >
              {{
                diseaseDetails.departmentsThatTreatThisCondition ||
                $t("mobile.noDataAvailable")
              }}
            </van-collapse-item>
            <van-collapse-item :title="$t('mobile.riskFactors')" name="5">
              {{ diseaseDetails.riskFactors || $t("mobile.noDataAvailable") }}
            </van-collapse-item>
            <van-collapse-item :title="$t('mobile.prevention')" name="6">
              {{ diseaseDetails.Prevention || $t("mobile.noDataAvailable") }}
            </van-collapse-item>
            <van-collapse-item :title="$t('mobile.diagnosis')" name="7">
              {{ diseaseDetails.Diagnosis || $t("mobile.noDataAvailable") }}
            </van-collapse-item>
            <van-collapse-item :title="$t('mobile.treatments')" name="8">
              {{ diseaseDetails.Treatments || $t("mobile.noDataAvailable") }}
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
    </van-popup>
    <van-dialog v-model="showDialogInfo" :show-confirm-button="false">
      <div class="dialog_info">
        <div class="dialog_info_title">{{ $t("mobile.memberId") }}</div>
        <div class="dialog_info_desc">
          {{ $t("mobile.memberIdDescription") }}
        </div>
        <input type="text" v-model="userId" />
        <div class="button_done">
          <div class="button_inner" @click="generateReport()">
            {{ $t("mobile.done") }}
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { db } from "@/utils/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { Toast, Dialog, Notify } from "vant";

export default {
  data() {
    return {
      show: false, // 控制更多菜单的显示（之前遗漏）
      showSymptomProfile: false,
      showDiseaseDetail: false,
      activeNames: ["1"],
      diseases: null,
      diseaseNames: [],
      currentDiseaseName: "",
      selectedSymptoms: {},
      userSelections: [],
      diseaseDetails: { Symptoms: [] },
      allSymptomSelections: [],
      predictionCount: 0,
      maxPredictions: 30,
      cardState: "show",
      predictedDiseases: [],
      showDialogInfo: false,
      userId: "",
      queryDiseaseName: "",
    };
  },
  computed: {
    imageUrl() {
      const link = this.diseaseDetails.imageLink;
      if (link) {
        const fileId = link.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (fileId && fileId[1]) {
          return `https://drive.google.com/thumbnail?id=${fileId[1]}&export=view&authuser=0`;
        }
      }
      return "";
    },
  },
  watch: {
    "$i18n.locale"(newLocale) {
      this.loadDiseaseData();
    },
    "$route.query"(newQuery) {
      const newDiseaseName = newQuery.diseaseName;
      if (newDiseaseName && this.currentDiseaseName !== newDiseaseName) {
        this.currentDiseaseName = newDiseaseName;
        this.exploreSymptomsByDisease(newDiseaseName);
      } else if (!newDiseaseName && this.currentDiseaseName) {
        this.currentDiseaseName = "";
        this.diseaseDetails = { Symptoms: [] };
        this.selectedSymptoms = {};
        this.userSelections = [];
        this.allSymptomSelections = [];
        this.predictedDiseases = [];
        this.predictionCount = 0;
      }
    },
  },
  methods: {
    goBack() {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        const lang = this.$i18n.locale;
        this.$router.push(`/mobile/${lang}`);
        // 重置状态
        this.predictedDiseases = [];
        this.predictionCount = 0;
        this.allSymptomSelections = [];
        this.userSelections = [];
        this.selectedSymptoms = {};
      }
    },
    showDialog() {
      if (!this.allSymptomSelections.length) {
        Toast(this.$t("mobile.noSymptomsAdded"));
        return;
      }
      this.showDialogInfo = true;
    },
    async generateReport() {
      localStorage.setItem(
        "predictedDiseases",
        JSON.stringify(this.predictedDiseases)
      );
      localStorage.setItem(
        "allSymptomSelections",
        JSON.stringify(this.allSymptomSelections)
      );
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "diseaseInfo"), where("id", "==", this.userId))
        );

        if (!querySnapshot.empty) {
          Notify({
            type: "warning",
            message: this.$t("mobile.idExistsWarning"),
          });
          this.userId = "";
          return;
        }
        await addDoc(collection(db, "diseaseInfo"), {
          userId: this.userId,
          doctorDiagnosedDisease: localStorage.getItem(
            "doctorDiagnosedDisease"
          ),
          predictedDiseases: this.predictedDiseases,
          allSymptomSelections: this.allSymptomSelections,
        });
        Notify({ type: "success", message: this.$t("mobile.storeSuccess") });
        this.showDialogInfo = false;
        this.$router.push({
          name: "Report",
          params: { lang: this.$i18n.locale },
          query: { userId: this.userId },
        });
      } catch (error) {
        console.error("Error storing results: ", error);
      }
    },
    getSelectedSymptomsWithProbability() {
      for (let symptom of this.diseaseDetails.Symptoms) {
        const userChoice = this.selectedSymptoms[symptom.SymptomName];
        if (userChoice !== undefined) {
          const existingSymptom = this.userSelections.find(
            (selection) => selection.SymptomName === symptom.SymptomName
          );
          if (!existingSymptom) {
            this.userSelections.push({
              SymptomName: symptom.SymptomName,
              Possibility: symptom.Possibility,
              UserChoice: userChoice,
            });
          } else {
            existingSymptom.UserChoice = userChoice;
          }
        }
      }
      this.allSymptomSelections = [
        ...this.allSymptomSelections,
        ...this.userSelections,
      ];
      this.allSymptomSelections = this.allSymptomSelections.reduce(
        (acc, current) => {
          const duplicate = acc.find(
            (item) => item.SymptomName === current.SymptomName
          );
          if (!duplicate) {
            acc.push(current);
          } else {
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
    calculateDiseaseScores() {
      const diseaseScores = {};
      for (const [diseaseName, diseaseInfo] of Object.entries(
        this.diseases || {}
      )) {
        let score = 0;
        let totalWeight = 0;
        diseaseInfo.Symptoms.forEach((symptomInfo) => {
          const symptomName = symptomInfo.SymptomName;
          const symptomPossibility = parseFloat(symptomInfo.Possibility) / 100;
          const userSelection = this.userSelections.find(
            (selection) => selection.SymptomName === symptomName
          );
          if (userSelection) {
            const userChoice = userSelection.UserChoice;
            const weight = symptomPossibility * (userChoice === "yes" ? 2 : 1);
            if (userChoice === "yes") {
              score += symptomPossibility;
            } else if (userChoice === "maybe") {
              score += symptomPossibility * 0.5;
            }
            totalWeight += weight;
          }
        });
        diseaseScores[diseaseName] = totalWeight > 0 ? score / totalWeight : 0;
      }
      return diseaseScores;
    },
    processDiseaseScoring() {
      if (!this.currentDiseaseName) {
        Toast(this.$t("mobile.pleaseSelectDisease"));
        return;
      }
      const allSelected = this.diseaseDetails.Symptoms.every(
        (symptom) => this.selectedSymptoms[symptom.SymptomName] !== undefined
      );
      if (!allSelected) {
        Toast(this.$t("mobile.selectAllSymptomsWarning"));
        return;
      }
      if (this.predictionCount >= this.maxPredictions) {
        Toast(this.$t("mobile.maxPredictionsReached"));
        this.showSymptomProfile = true;
        return;
      }
      this.cardState = "leave";
      setTimeout(() => {
        this.getSelectedSymptomsWithProbability();
        const diseaseScores = this.calculateDiseaseScores();
        const sortedDiseaseScores = Object.entries(diseaseScores)
          .sort(([, a], [, b]) => b - a)
          .map(([diseaseName, score]) => ({ diseaseName, score }));

        // 修改过滤逻辑：排除 predictedDiseases 中的所有疾病
        const newSortedDiseaseScores = sortedDiseaseScores.filter(
          (element) =>
            element.diseaseName !== this.currentDiseaseName &&
            !this.predictedDiseases.some(
              (predicted) => predicted.diseaseName === element.diseaseName
            )
        );

        const mostLikelyDisease = newSortedDiseaseScores[0];
        if (mostLikelyDisease) {
          this.predictedDiseases.push({
            diseaseName: mostLikelyDisease.diseaseName,
            score: mostLikelyDisease.score,
          });
          this.exploreSymptomsByDisease(mostLikelyDisease.diseaseName);
          this.$nextTick(() => {
            const symptomTableBody = this.$refs.symptomList;
            if (symptomTableBody) {
              symptomTableBody.scrollTop = 0;
            }
          });
          this.cardState = "enter";
          setTimeout(() => {
            this.cardState = "show";
          }, 500);
          this.predictionCount++;
        } else {
          Toast(this.$t("mobile.noMoreDiseases"));
        }
      }, 500);
    },
    async loadDiseaseData() {
      try {
        const dataFile =
          this.$i18n.locale === "cn"
            ? await import("@/assets/data/diseases_chinese.json")
            : await import("@/assets/data/diseases.json");
        this.diseases = dataFile.default;
        this.diseaseNames = Object.keys(this.diseases);
        // this.exploreSymptomsByDisease();
        this.exploreSymptomsByDisease();
      } catch (error) {
        console.error("Failed to load disease data:", error);
      }
    },
    // exploreSymptomsByDisease(diseaseName) {
    //   const nameToSearch = diseaseName || this.$route.query.diseaseName;
    //   console.log(this.$route.query.diseaseName);

    //   // console.log(nameToSearch);

    //   // if (!nameToSearch || !this.diseases) {
    //   //   this.currentDiseaseName = "";
    //   //   this.diseaseDetails = { Symptoms: [] };
    //   //   this.selectedSymptoms = {};
    //   //   return;
    //   // }
    //   // if (this.diseaseNames.includes(nameToSearch)) {
    //   //   this.currentDiseaseName = nameToSearch;
    //   //   this.diseaseDetails = this.diseases[nameToSearch] || { Symptoms: [] };
    //   //   this.selectedSymptoms = {};
    //   //   this.userSelections = [];
    //   // } else {
    //   //   this.currentDiseaseName = "";
    //   //   this.diseaseDetails = { Symptoms: [] };
    //   //   this.selectedSymptoms = {};
    //   // }
    //   if (this.diseases != null) {
    //     for (let i = 0; i < this.diseaseNames.length; i++) {
    //       if (nameToSearch == this.diseaseNames[i]) {
    //         this.diseaseDetails = this.diseases[nameToSearch];
    //         this.currentDiseaseName = nameToSearch;
    //         this.selectedSymptoms = {}; // Reset selected symptoms

    //         this.userSelections = []; // Clear previous selections

    //         break;
    //       }
    //     }
    //   }
    // },
    exploreSymptomsByDisease(diseaseName) {
      const nameToSearch = diseaseName || this.queryDiseaseName; // The passed parameters will be used first, if not, textarea will be used.
      console.log(this.queryDiseaseName);

      console.log(nameToSearch);
      console.log(this.diseases);

      if (this.diseases != null) {
        for (let i = 0; i < this.diseaseNames.length; i++) {
          if (nameToSearch == this.diseaseNames[i]) {
            this.diseaseDetails = this.diseases[nameToSearch];
            this.currentDiseaseName = nameToSearch;

            // 保存上一个疾病的症状选择状态
            const previousSelections = { ...this.selectedSymptoms }; // 复制之前的选择状态
            this.selectedSymptoms = {}; // 重置当前的选择

            // 遍历新疾病的症状，检查是否有与之前相同的症状
            this.diseaseDetails.Symptoms.forEach((symptom) => {
              const symptomName = symptom.SymptomName;
              // 如果新疾病的症状在之前的选择中存在，则继承之前的勾选状态
              if (previousSelections[symptomName] !== undefined) {
                this.selectedSymptoms[symptomName] =
                  previousSelections[symptomName];
              }
            });
            // this.selectedSymptoms = {}; // Reset selected symptoms
            this.userSelections = []; // Clear previous selections

            break;
          }
        }
      }
    },
  },
  created() {
    // console.log(this.$route.query.diseaseName);
    this.queryDiseaseName = this.$route.query.diseaseName;
    this.predictedDiseases = []; // 确保初始化
    this.loadDiseaseData();
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
  max-height: 90px;
  object-fit: cover;
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

.radio_container input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  margin-right: 8px;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
}

.radio_container input[type="radio"]:checked::before {
  content: "\2713";
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
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="radio"][value="yes"]:checked::before {
  background-color: green;
}

input[type="radio"][value="no"]:checked::before {
  background-color: red;
}

input[type="radio"][value="maybe"]:checked::before {
  background-color: rgb(244, 147, 9);
  color: white;
}

.radio_container label {
  font-size: 14px;
  font-weight: 500;
  color: #101828;
  position: relative;
}

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
  transform: translateY(100%);
  opacity: 0;
}

.disease_card.slide-out {
  transform: translateY(-100%);
  opacity: 0;
}

.disease_card.show {
  transform: translateY(0);
  opacity: 1;
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

.dialog_info {
  width: 100%;
  height: 250px;
  box-sizing: border-box;
  padding: 20px;
}

.dialog_info_title {
  font-weight: 600;
  font-size: 18px;
  color: #101828;
  margin-bottom: 10px;
}

.dialog_info_desc {
  font-size: 14px;
  color: #475467;
  font-weight: 400;
  margin-bottom: 20px;
}

.dialog_info input {
  width: 100%;
  height: 30px;
  border-radius: 10px;
  border: 1px solid grey;
  margin-bottom: 30px;
}

.dialog_info .button_done {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog_info .button_inner {
  width: 140px;
  height: 40px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  font-weight: 600;
  background: purple;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.no-disease-message {
  text-align: center;
  padding: 20px;
  color: #475467;
  font-size: 16px;
}

.go-back-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  display: inline-block;
  cursor: pointer;
}
</style>
