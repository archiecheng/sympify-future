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
            <img :src="imageUrl" alt="Image" v-if="imageUrl" />
            <!-- <img src="../assets/img/pc/disease.png" alt="" v-else /> -->
            <img src="../assets/img/mobile/disease.png" alt="" v-else />
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
          <div class="generate_buttop" @click="showDialog()">
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
            <van-collapse-item title="Overview" name="1">
              {{ diseaseDetails.Overview }}
            </van-collapse-item>
            <van-collapse-item title="Causes" name="2">
              {{ diseaseDetails.Causes }}
            </van-collapse-item>
            <van-collapse-item title="Symptoms" name="3">
              <div
                v-for="item in diseaseDetails.Symptoms"
                :key="item.SymptomName"
              >
                {{ item.SymptomName }}
              </div>
            </van-collapse-item>
            <van-collapse-item
              title="Departments that treat this condition"
              name="4"
            >
              {{ diseaseDetails.departmentsThatTreatThisCondition }}
            </van-collapse-item>
            <van-collapse-item title="Risk Factors" name="5">
              {{ diseaseDetails.riskFactors }}
            </van-collapse-item>
            <van-collapse-item title="Prevention" name="6">
              {{ diseaseDetails.Prevention }}
            </van-collapse-item>
            <van-collapse-item title="Diagnosis" name="7">
              {{ diseaseDetails.Diagnosis }}
            </van-collapse-item>
            <van-collapse-item title="Treatments" name="8">
              {{ diseaseDetails.Treatments }}
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
    </van-popup>
    <van-dialog v-model="showDialogInfo" :show-confirm-button="false">
      <div class="dialog_info">
        <div class="dialog_info_title">Member ID</div>
        <div class="dialog_info_desc">
          Please enter your member ID or skip it if you want
        </div>
        <input type="text" v-model="userId" />
        <div class="button_done">
          <div class="button_inner" @click="generateReport()">Done</div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import diseasesData from "@/assets/data/diseases.json";
import { db } from "@/utils/firebase"; // Make sure the path is correct

import { collection, addDoc, getDocs, query, where } from "firebase/firestore"; // Import necessary Firestore methods

import { Toast, Dialog, Notify } from "vant";
export default {
  data() {
    return {
      showSymptomProfile: false,
      showDiseaseDetail: false,
      activeNames: ["1"],

      diseases: "",
      diseaseNames: "",
      currentDiseaseName: "",
      selectedSymptoms: {}, // User-selected options (yes, no, maybe)

      userSelections: [],
      diseaseDetails: "",
      allSymptomSelections: "",
      predictionCount: 0, // Counter to track the number of predictions

      maxPredictions: 5, // Maximum number of predictions allowed

      cardState: "show", // Control the entry and exit animation states of cards

      predictedDiseases: [], // Initialized to an empty array
      showDialogInfo: false,
      userId: "",
    };
  },
  computed: {
    imageUrl() {
      const link = this.diseaseDetails.imageLink; // 获取链接
      if (link) {
        const fileId = link.match(/\/d\/([a-zA-Z0-9_-]+)/); // 正则提取文件 ID
        if (fileId && fileId[1]) {
          // 确保 fileId 存在且匹配成功
          return `https://drive.google.com/thumbnail?id=${fileId[1]}&export=view&authuser=0`; // 构造新的链接
        }
      } else {
        return ""; // 如果没有匹配成功，返回空字符串
      }
    },
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
    showDialog() {
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
      // 存数据库，暂定
      try {
        // 先检查数据库中是否已经有相同的ID
        const querySnapshot = await getDocs(
          query(collection(db, "diseaseInfo"), where("id", "==", this.userId))
        );

        if (!querySnapshot.empty) {
          // 如果有记录，说明ID已经存在，可以给用户提示或采取其他措施
          Notify({
            type: "warning",
            message:
              "This ID already exists in the database. Please use a different ID.",
          });
          this.userId = "";
          return;
        }
        await addDoc(collection(db, "diseaseInfo"), {
          userId: this.userId, // 将输入的ID存入数据库
          predictedDiseases: this.predictedDiseases,
          allSymptomSelections: this.allSymptomSelections,
        });
        Notify({ type: "success", message: "Store Results successfully" });
        this.showDialogInfo = false;
        this.$router.push({
          name: "Report",
          query: { userId: this.userId },
        });
      } catch (error) {
        console.error("Error storing results: ", error);
      }
    },
    getSelectedSymptomsWithProbability() {
      // Go through all symptoms of the current disease

      for (let symptom of this.diseaseDetails.Symptoms) {
        const userChoice = this.selectedSymptoms[symptom.SymptomName]; // Get the options selected by the user

        // Only processed if the user selects a symptom

        if (userChoice !== undefined) {
          // Check if the current symptom already exists in userSelections

          const existingSymptom = this.userSelections.find(
            (selection) => selection.SymptomName === symptom.SymptomName
          );

          // If not found, add it to userSelections

          if (!existingSymptom) {
            this.userSelections.push({
              SymptomName: symptom.SymptomName,
              Possibility: symptom.Possibility,
              UserChoice: userChoice,
            });
          } else {
            // If found, update its selection

            existingSymptom.UserChoice = userChoice;
          }
        }
      }
      // Merge the contents of userSelections into allSymptomSelections

      this.allSymptomSelections = [
        ...this.allSymptomSelections,
        ...this.userSelections,
      ];

      // Deduplication: Deduplication based on SymptomName

      this.allSymptomSelections = this.allSymptomSelections.reduce(
        (acc, current) => {
          const duplicate = acc.find(
            (item) => item.SymptomName === current.SymptomName
          );
          if (!duplicate) {
            acc.push(current);
          } else {
            // Update UserChoice if it already exists

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

    // Function to calculate disease match score

    calculateDiseaseScores() {
      // Store the matching score for each disease

      const diseaseScores = {};
      var userSelection;
      // Go through all diseases

      for (const [diseaseName, diseaseInfo] of Object.entries(this.diseases)) {
        // Initialize the matching score for the current disease

        let score = 0;
        let totalWeight = 0; // Calculate the total weight to ensure a weighted average
        // Go through all symptoms of the current disease

        diseaseInfo.Symptoms.forEach((symptomInfo) => {
          const symptomName = symptomInfo.SymptomName;
          // Convert a string in percentage format to a number (e.g. "7%" -> 0.07)

          const symptomPossibility = parseFloat(symptomInfo.Possibility) / 100;

          // Find symptoms matching symptomName in userSelections

          userSelection = this.userSelections.find(
            (selection) => selection.SymptomName === symptomName
          );
          // If the user's selection for this symptom is found

          if (userSelection) {
            const userChoice = userSelection.UserChoice;
            // Add weight to "yes" choices

            const weight = symptomPossibility * (userChoice === "yes" ? 2 : 1); // "yes" has a weight of 2, others have a weight of 1
            // Calculate match scores based on user selections

            if (userChoice === "yes") {
              score += symptomPossibility; // "yes" completely matches
            } else if (userChoice === "maybe") {
              score += symptomPossibility * 0.5; // "maybe" partially matched, with a weight of 0.5
            }
            // "no" does not add points, so no explicit handling is needed here

            totalWeight += weight; // cumulative weight
          }
        });
        // Store the matching scores for the current disease into the diseaseScores object
        // diseaseScores[diseaseName] = score;
        // Calculate weighted average score

        diseaseScores[diseaseName] = totalWeight > 0 ? score / totalWeight : 0;
      }
      // Returns the matching score for each disease

      return diseaseScores;
    },

    processDiseaseScoring() {
      // Verify that all symptoms are selected

      const allSelected = this.diseaseDetails.Symptoms.every(
        (symptom) => this.selectedSymptoms[symptom.SymptomName] !== undefined
      );

      if (!allSelected) {
        // If there are unselected symptoms, prompt the user and terminate

        Toast("Please select an option for all symptoms.");
        return;
      }

      // If the maximum number of predictions has been reached, stop prediction and prompt

      if (this.predictionCount >= this.maxPredictions) {
        Toast("You have reached the maximum number of predictions.");
        this.showSymptomProfile = true;
        return;
      }

      // Get the current card element

      this.cardState = "leave"; // Set card to away state

      setTimeout(() => {
        // Get user-selected symptoms and their probabilities

        this.getSelectedSymptomsWithProbability();

        // Calculate disease match score

        const diseaseScores = this.calculateDiseaseScores();

        // Convert object to array and sort by score in descending order

        const sortedDiseaseScores = Object.entries(diseaseScores)
          .sort(([, a], [, b]) => b - a)
          .map(([diseaseName, score]) => ({ diseaseName, score }));

        // Remove current disease to avoid duplication

        const newSortedDiseaseScores = sortedDiseaseScores.filter(
          (element) => element.diseaseName !== this.currentDiseaseName
        );

        // Get the disease with the highest score and display it

        const mostLikelyDisease = newSortedDiseaseScores[0];

        if (mostLikelyDisease) {
          this.predictedDiseases.push({
            diseaseName: mostLikelyDisease.diseaseName,
            score: mostLikelyDisease.score,
          });
          // Switch to new disease card

          this.exploreSymptomsByDisease(mostLikelyDisease.diseaseName);

          // Force scroll of symptoms table to top

          this.$nextTick(() => {
            const symptomTableBody = this.$refs.symptomList; // Get the DOM element of the symptom table

            if (symptomTableBody) {
              symptomTableBody.scrollTop = 0; // Scroll table to top
            }
          });

          // Update cardState to display the new card

          this.cardState = "enter"; // New card enters state

          // Remove animation classes to restore normal display

          setTimeout(() => {
            this.cardState = "show";
          }, 500); // Animation duration 500ms
          // Increase the number of predictions

          this.predictionCount++;
        } else {
          Toast("No more diseases to predict.");
        }
      }, 500); // Animation duration 500ms
    },

    exploreSymptomsByDisease(diseaseName) {
      const nameToSearch = diseaseName || this.$route.query.diseaseName; // The passed parameters will be used first, if not, textarea will be used.

      if (this.diseases != null) {
        for (let i = 0; i < this.diseaseNames.length; i++) {
          if (nameToSearch == this.diseaseNames[i]) {
            this.diseaseDetails = this.diseases[nameToSearch];
            this.currentDiseaseName = nameToSearch;
            this.selectedSymptoms = {}; // Reset selected symptoms

            this.userSelections = []; // Clear previous selections

            break;
          }
        }
      }
    },
  },
  created() {
    this.diseases = diseasesData; // Assign JSON data to component data

    this.diseaseNames = Object.keys(this.diseases); // Get all disease names

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

/* Style definition */
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

/* Hide the default radio style */
.radio_container input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  margin-right: 8px;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 50%; /* Round button */
  position: relative;
  cursor: pointer;
}

/* Customize the selected style */
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
  transform: translate(
    -50%,
    -50%
  ); /* Make sure the check mark arrow is centered */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Select different colors based on the name attribute */
/* Yes -turns green when selected */
input[type="radio"][value="yes"]:checked::before {
  background-color: green;
}

/* No -turns red when selected */
input[type="radio"][value="no"]:checked::before {
  background-color: red;
}

/* Maybe -turns orange when selected */
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
</style>
