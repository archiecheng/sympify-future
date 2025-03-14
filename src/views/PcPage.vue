<template>
  <div class="pc_page">
    <el-container style="height: 100vh">
      <!-- Left navigation bar -->
      <el-aside width="400px">
        <div class="sidebar">
          <div class="sidebar_left">
            <div class="icon">
              <img src="../assets/img/pc/icon.png" alt="" />
            </div>
            <div class="home">
              <img src="../assets/img/pc/home.png" alt="" />
            </div>
            <div class="file" @click="jumpWebsite()">
              <img src="../assets/img/pc/file.png" alt="" />
            </div>
          </div>
          <div class="sidebar_right">
            <div class="sidebar_right_top">
              <div class="header">
                <div>{{ $t("findDisease") }}</div>
                <img
                  src="../assets/img/pc/lang.png"
                  alt=""
                  @click="showLangDialog"
                />
              </div>
              <div class="content">
                <div class="sub_header">{{ $t("enterDisease") }}</div>
                <el-input
                  type="textarea"
                  :rows="4"
                  :placeholder="$t('addDiseasePlaceholder')"
                  v-model="textarea"
                  style="margin-bottom: 20px"
                >
                </el-input>
                <div class="search_disease" @click="exploreSymptomsByDisease()">
                  <div class="search_text">{{ $t("exploreSymptoms") }}</div>
                  <img src="../assets/img/pc/sparkle.png" class="custom-icon" />
                </div>
                <div class="small_intro">
                  <div>{{ $t("sympifyAi") }}</div>
                  <div>{{ $t("minimizingMisdiagnosis") }}</div>
                </div>
              </div>
            </div>
            <div class="sidebar_right_bottom">
              <el-divider></el-divider>
              <div style="margin-bottom: 12px" class="more" @click="goHowUse">
                <img src="../assets/img/pc/help.png" alt="" />
                <div>{{ $t("howToUse") }}</div>
              </div>
              <div class="more" @click="showDisclaimers = true">
                <img src="../assets/img/pc/disclaimers.png" alt="" />
                <div>{{ $t("disclaimers") }}</div>
              </div>
            </div>
          </div>
        </div>
      </el-aside>
      <el-container>
        <!-- middle part -->
        <el-main>
          <!-- Card part, dynamic binding class name -->
          <div
            class="disease_card"
            :class="{
              'slide-in': cardState === 'enter',
              'slide-out': cardState === 'leave',
              show: cardState === 'show',
            }"
            v-if="showDisease"
            @wheel="handleScroll"
          >
            <div class="disease_header">
              {{ $t("diseasePrefix") }}<span>{{ currentDiseaseName }}</span>
            </div>
            <el-divider></el-divider>
            <div class="disease_content">
              <div class="disease_explanation">
                <div class="disease_explanation_text">
                  {{ diseaseDetails.Overview }}
                </div>
                <div
                  class="disease_explanation_detail"
                  @click="dialogVisible = true"
                >
                  <img src="../assets/img/pc/info.png" alt="" />
                </div>
              </div>
              <div class="disease_img">
                <img :src="imageUrl" alt="Image" v-if="imageUrl" />
                <img src="../assets/img/pc/disease.png" alt="" v-else />
              </div>
              <div class="disease_symptoms">
                <div class="tip">
                  {{ $t("symptomSelectionTip") }}
                </div>
                <div class="symptom_table">
                  <!-- table area -->
                  <div class="table_head">
                    <table>
                      <thead>
                        <th width="40%">{{ $t("symptom") }}</th>
                        <th width="20%">{{ $t("yes") }}</th>
                        <th width="20%">{{ $t("no") }}</th>
                        <th width="20%">{{ $t("maybe") }}</th>
                      </thead>
                    </table>
                  </div>
                  <div class="table_body" @wheel.stop ref="symptomList">
                    <table>
                      <tbody id="tbody">
                        <tr
                          v-for="symptom in diseaseDetails.Symptoms"
                          :key="symptom.SymptomName"
                        >
                          <td>{{ symptom.SymptomName }}</td>
                          <td>
                            <input
                              type="radio"
                              :id="symptom.SymptomName + '_yes'"
                              :name="symptom.SymptomName"
                              value="yes"
                              v-model="selectedSymptoms[symptom.SymptomName]"
                            />
                            <label :for="symptom.SymptomName + '_yes'"></label>
                          </td>
                          <td>
                            <input
                              type="radio"
                              :id="symptom.SymptomName + '_no'"
                              :name="symptom.SymptomName"
                              value="no"
                              v-model="selectedSymptoms[symptom.SymptomName]"
                            />
                            <label :for="symptom.SymptomName + '_no'"></label>
                          </td>
                          <td>
                            <input
                              type="radio"
                              :id="symptom.SymptomName + '_maybe'"
                              :name="symptom.SymptomName"
                              value="maybe"
                              v-model="selectedSymptoms[symptom.SymptomName]"
                            />
                            <label
                              :for="symptom.SymptomName + '_maybe'"
                            ></label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="scroll_down" @click="processDiseaseScoring()">
                {{ $t("scrollDown") }}
              </div>
            </div>
          </div>
          <div class="disease_card" v-else>
            <div class="disease_header">{{ $t("disease") }}</div>
            <el-divider></el-divider>
            <div class="disease_no_content">
              <img src="../assets/img/pc/Illustration.png" alt="" />
              <!-- <div class="desc">{{ $t("noDiseaseAdded") }}</div> -->
            </div>
          </div>
        </el-main>
      </el-container>
      <!-- right column -->
      <el-aside width="500px">
        <div class="profile_section" v-if="showSymptom">
          <div class="profile_header">
            <span>{{ $t("symptomProfile") }}</span>
            <el-button @click="showDialog()">{{
              $t("generateReport")
            }}</el-button>
          </div>
          <el-divider></el-divider>
          <div class="profile_content">
            <div
              class="profile_item"
              v-for="symptom in allSymptomSelections"
              :key="symptom.SymptomName"
            >
              <div class="profile_item_left">
                <div
                  class="possibility"
                  :class="{
                    yes: symptom.UserChoice === 'yes',
                    no: symptom.UserChoice === 'no',
                    maybe: symptom.UserChoice === 'maybe',
                  }"
                ></div>
                <div class="profile_item_name">{{ symptom.SymptomName }}</div>
              </div>
              <div
                class="profile_item_right"
                @click="removeSymptom(symptom.SymptomName)"
              >
                X
              </div>
            </div>
          </div>
        </div>
        <div class="profile_section" v-else>
          <div class="profile_header">{{ $t("symptom") }}</div>
          <el-divider></el-divider>
          <div class="profile_no_content">
            <img src="../assets/img/pc/Illustration.png" alt="" />
            <!-- <div class="desc">{{ $t("noSymptomsAdded") }}</div> -->
          </div>
        </div>
      </el-aside>
    </el-container>

    <el-dialog :title="currentDiseaseName" :visible.sync="dialogVisible">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item :title="$t('overview')" name="1">
          <div>{{ diseaseDetails.Overview }}</div>
        </el-collapse-item>
        <el-collapse-item :title="$t('causes')" name="2">
          <div>{{ diseaseDetails.Causes }}</div>
        </el-collapse-item>
        <el-collapse-item :title="$t('symptoms')" name="3">
          <div v-for="item in diseaseDetails.Symptoms" :key="item.SymptomName">
            {{ item.SymptomName }}
          </div>
        </el-collapse-item>
        <el-collapse-item :title="$t('departmentsThatTreat')" name="4">
          {{ diseaseDetails.departmentsThatTreatThisCondition }}
        </el-collapse-item>
        <el-collapse-item :title="$t('riskFactors')" name="5">
          {{ diseaseDetails.riskFactors }}
        </el-collapse-item>
        <el-collapse-item :title="$t('prevention')" name="6">
          {{ diseaseDetails.Prevention }}
        </el-collapse-item>
        <el-collapse-item :title="$t('diagnosis')" name="7">
          {{ diseaseDetails.Diagnosis }}
        </el-collapse-item>
        <el-collapse-item :title="$t('treatments')" name="8">
          {{ diseaseDetails.Treatments }}
        </el-collapse-item>
      </el-collapse>
    </el-dialog>

    <el-dialog :visible.sync="showMemberId" class="input_member_id">
      <div class="input_member_id_title">{{ $t("memberId") }}</div>
      <div class="input_member_id_desc">{{ $t("memberIdDescription") }}</div>
      <input type="text" v-model="userId" />
      <div class="button_done">
        <div class="button_inner" @click="generateReport()">
          {{ $t("done") }}
        </div>
      </div>
    </el-dialog>

    <el-dialog
      :title="$t('disclaimersTitle')"
      :visible.sync="showDisclaimers"
      width="30%"
    >
      <span>{{ $t("disclaimersContent") }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="showDisclaimers = false"
          style="background: rgb(102, 96, 255)"
        >
          {{ $t("confirm") }}
        </el-button>
      </span>
    </el-dialog>

    <!-- 疾病选择对话框 -->
    <el-dialog
      :title="$t('selectDisease')"
      :visible.sync="selectDiseasesVisible"
      width="30%"
      class="select_a_disease"
    >
      <div>
        <p>{{ $t("selectDiseaseDescription") }}</p>
        <el-button
          v-for="(match, index) in fuzzyMatches"
          :key="index"
          type="primary"
          @click="displayDiseaseDetails(match)"
          style="margin: 5px"
          color="purple"
        >
          {{ match }}
        </el-button>
      </div>
    </el-dialog>

    <!-- 多语言弹框 -->
    <el-dialog
      :title="$t('languageDialogTitle')"
      :visible.sync="langDialogVisible"
      width="30%"
    >
      <el-row>
        <el-button
          :type="$i18n.locale === 'en' ? 'primary' : 'plain'"
          @click="changeLanguage('en')"
        >
          <!-- {{ $t("languageEnglish") }} -->
          English(United States)
        </el-button>
        <el-button
          :type="$i18n.locale === 'cn' ? 'primary' : 'plain'"
          @click="changeLanguage('cn')"
        >
          <!-- {{ $t("languageChinese") }} -->
          简体中文(中国)
        </el-button>
      </el-row>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="langDialogVisible = false">{{ $t("cancel") }}</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import diseasesData from "@/assets/data/diseases.json";
import { db } from "@/utils/firebase"; // Make sure the path is correct

import { collection, addDoc, getDocs, query, where } from "firebase/firestore"; // Import necessary Firestore methods

export default {
  data() {
    return {
      langDialogVisible: false,
      dialogVisible: false,
      activeName: "1",
      textarea: "",
      showDisease: false,
      diseases: "",
      diseaseNames: "",
      diseaseDetails: "",
      currentDiseaseName: "",
      generateDisesaseName: "",
      selectedSymptoms: {}, // User-selected options (yes, no, maybe)

      userSelections: [],
      cardState: "show", // Control the entry and exit animation states of cards

      allSymptomSelections: "",
      predictionCount: 0, // Counter to track the number of predictions

      maxPredictions: 5, // Maximum number of predictions allowed

      isScrolling: "",
      locked: "",
      showMemberId: false,
      predictedDiseases: [], // Initialized to an empty array

      showSymptom: false,
      userId: "",
      showDisclaimers: false,
      fuzzyMatches: "",
      selectDiseasesVisible: false,
    };
  },
  computed: {
    // Dynamically generate image links

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
  watch: {
    "$i18n.locale"(newLocale) {
      this.loadDiseaseData();
    },
    textarea(newVal, oldVal) {
      if (newVal !== "" && newVal !== null && newVal !== undefined) {
        this.$nextTick(() => {
          $(".search_disease").addClass("search_disease_active");
          $(".search_text").addClass("search_text_active");
        });
      } else {
        // Remove class when textarea is empty string

        this.$nextTick(() => {
          $(".search_disease").removeClass("search_disease_active");
          $(".search_text").removeClass("search_text_active");
        });
      }
    },
  },
  methods: {
    // 动态加载疾病数据
    async loadDiseaseData() {
      try {
        // 根据当前语言加载对应的 JSON 文件
        const dataFile =
          this.$i18n.locale === "cn"
            ? await import("@/assets/data/diseases_chinese.json")
            : await import("@/assets/data/diseases.json");

        this.diseases = dataFile.default; // 加载数据
        this.diseaseNames = Object.keys(this.diseases); // 更新疾病名称列表
        console.log(this.diseases);
        // 如果当前有选中的疾病，重新加载疾病详情
        if (this.currentDiseaseName) {
          this.displayDiseaseDetails(this.currentDiseaseName);
        }
      } catch (error) {
        console.error("Failed to load disease data:", error);
      }
    },
    changeLanguage(lang) {
      console.log("Switching to language:", lang);
      this.$i18n.locale = lang;
      const currentPath = this.$route.path.replace(/\/(en|cn)$/, "");
      const newPath = `${currentPath}/${lang}`;
      console.log("New path:", newPath);
      this.$router.push(newPath);
      this.langDialogVisible = false;
    },
    showLangDialog() {
      this.langDialogVisible = true;
    },
    goHowUse() {
      const lang = this.$i18n.locale; // 获取当前语言（en 或 cn）
      this.$router.push({
        path: `/howtouse/${lang}`, // 动态构造路径
      });
    },
    jumpWebsite() {
      window.location.href = "https://www.sympify.org";
    },
    handleScroll(event) {
      if (event.deltaY > 0 && !this.locked) {
        this.locked = true; // locking

        this.throttle(this.processDiseaseScoring, 3000)(); // Use throttling to prevent multiple executions in a short period of time

        setTimeout(() => {
          this.locked = false; // Unlock
        }, 3000); // Unlocks after 3 seconds, allowing next scroll to trigger
      }
    },
    throttle(func, limit) {
      let inThrottle;
      return function (...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit); // Limit trigger frequency
        }
      };
    },
    showDialog() {
      this.showMemberId = true;
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
          this.$message({
            message: this.$t("idExistsWarning"),
            type: "warning",
          });
          this.userId = "";
          return;
        }
        await addDoc(collection(db, "diseaseInfo"), {
          userId: this.userId,
          predictedDiseases: this.predictedDiseases,
          allSymptomSelections: this.allSymptomSelections,
        });
        this.$message({
          message: this.$t("storeSuccess"),
          type: "success",
        });
        this.showMemberId = false;
        const lang = this.$i18n.locale; // 获取当前语言
        this.$router.push({
          path: `/report/${lang}`, // 动态跳转到 /report/en 或 /report/cn
          query: { userId: this.userId },
        });
      } catch (error) {
        console.error("Error storing results: ", error);
      }
    },
    // exploreSymptomsByDisease(diseaseName) {
    //   var flag = true; //Assume not found
    //   const nameToSearch = diseaseName || this.textarea; //Use the passed parameters first, if not, use textarea
    //   if (this.diseases != null) {
    //     for (let i = 0; i < this.diseaseNames.length; i++) {
    //       if (nameToSearch == this.diseaseNames[i]) {
    //         this.showDisease = true;
    //         this.diseaseDetails = this.diseases[nameToSearch];
    //         this.currentDiseaseName = nameToSearch;
    //         flag = false; //found
    //         break;
    //       }
    //     }

    //     if (flag) {
    //       this.$message({
    //         message: "No this disease, please reenter",
    //         type: "warning",
    //       });
    //       this.textarea = "";
    //     }
    //   }
    // },
    // Get user-selected symptoms and their probabilities

    exploreSymptomsByDisease(diseaseName) {
      const nameToSearch = diseaseName || this.textarea.trim(); // 优先使用传入参数
      let flag = true; // 初始化为未找到

      if (this.diseases != null) {
        const lowerCaseInput = nameToSearch.toLowerCase();

        // 精确匹配
        let matchedDisease = this.diseaseNames.find(
          (disease) => disease.toLowerCase() === lowerCaseInput
        );

        // 如果没有精确匹配，尝试模糊匹配
        if (!matchedDisease) {
          const fuzzyMatches = this.diseaseNames.filter((disease) =>
            disease.toLowerCase().includes(lowerCaseInput)
          );

          if (fuzzyMatches.length > 0) {
            // 显示弹框让用户选择
            this.showDiseaseSelectionDialog(fuzzyMatches);
            return; // 暂时中断后续逻辑，等待用户选择
          }
        }

        if (matchedDisease) {
          // 如果找到匹配的疾病
          this.displayDiseaseDetails(matchedDisease);
          flag = false; // 标记为找到疾病
        }

        if (flag) {
          this.$message({
            message: this.$t("noDiseaseFound"), // 使用翻译
            type: "warning",
          });
          this.textarea = "";
        }
      }
    },

    // 显示疾病选择对话框
    showDiseaseSelectionDialog(fuzzyMatches) {
      this.fuzzyMatches = fuzzyMatches; // 保存匹配结果
      this.selectDiseasesVisible = true; // 显示弹框
    },

    // 显示疾病详情
    displayDiseaseDetails(diseaseName) {
      this.showDisease = true;
      this.diseaseDetails = this.diseases[diseaseName];
      // console.log(this.diseaseDetails);

      this.currentDiseaseName = diseaseName;
      this.selectedSymptoms = {}; // 重置已选症状
      this.userSelections = []; // 清空之前的选择
      this.textarea = ""; // 清空输入框
      this.selectDiseasesVisible = false; // 隐藏弹框
    },

    // getSelectedSymptomsWithProbability() {
    //   // const selectedData = [];

    //   // Go through all symptoms
    //   for (let symptom of this.diseaseDetails.Symptoms) {
    //     const userChoice = this.selectedSymptoms[symptom.SymptomName]; //Get the options selected by the user

    //     // Only processed if the user selects a symptom
    //     if (userChoice !== undefined) {
    //       this.userSelections.push({
    //         SymptomName: symptom.SymptomName,
    //         Possibility: symptom.Possibility,
    //         UserChoice: userChoice,
    //       });
    //     }
    //   }
    //   console.log(this.userSelections);

    //   // Returns selected symptoms and their likelihood
    //   // return selectedData;
    // },

    // 加入症状函数
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
        diseaseInfo.Symptoms.forEach((symptomInfo) => {
          const symptomName = symptomInfo.SymptomName;
          const symptomPossibility = parseFloat(symptomInfo.Possibility) / 100;

          userSelection = this.userSelections.find(
            (selection) => selection.SymptomName === symptomName
          );
          console.log(userSelection);

          if (userSelection) {
            const userChoice = userSelection.UserChoice;
            if (userChoice === "yes") {
              score += symptomPossibility;
            } else if (userChoice === "maybe") {
              score += symptomPossibility * 0.5;
            }
          }
        });
        diseaseScores[diseaseName] = score;
      }

      return diseaseScores;
    },

    // Calling process: first get the selection, then calculate the matching score
    // processDiseaseScoring() {
    //   // First obtain the symptoms selected by the user and their probability
    //   this.getSelectedSymptomsWithProbability();

    //   // Disease matching scores are then calculated based on user selections
    //   const diseaseScores = this.calculateDiseaseScores();
    //   // Convert object to array and sort by score in descending order
    //   const sortedDiseaseScores = Object.entries(diseaseScores)
    //     .sort(([, a], [, b]) => b -a) //Sort in descending order
    //     .map(([diseaseName, score]) => ({ diseaseName, score })); //Convert the array into an object array containing the disease name and score

    //   const newSortedDiseaseScores = sortedDiseaseScores.filter(
    //     (element) => element.diseaseName !== this.currentDiseaseName
    //   ); //Remove duplicates of existing diseases
    //   // Obtain the disease with the highest score and start a new round of predictions
    //   // Get the disease with the highest score and display it
    //   const mostLikelyDisease = newSortedDiseaseScores[0];

    //   // Simulate sliding to reveal next card
    //   if (mostLikelyDisease) {
    //     this.exploreSymptomsByDisease(mostLikelyDisease.diseaseName);
    //   } else {
    //     this.$message({
    //       message: "No more diseases to predict.",
    //       type: "warning",
    //     });
    //   }
    // },
    // processDiseaseScoring() {
    //   // Make sure you have processing logic after scrolling
    //   this.cardState = "leave";

    //   setTimeout(() => {
    //     this.getSelectedSymptomsWithProbability();

    //     const diseaseScores = this.calculateDiseaseScores();

    //     const sortedDiseaseScores = Object.entries(diseaseScores)
    //       .sort(([, a], [, b]) => b -a)
    //       .map(([diseaseName, score]) => ({ diseaseName, score }));

    //     const newSortedDiseaseScores = sortedDiseaseScores.filter(
    //       (element) => element.diseaseName !== this.currentDiseaseName
    //     );

    //     const mostLikelyDisease = newSortedDiseaseScores[0];

    //     if (mostLikelyDisease) {
    //       this.exploreSymptomsByDisease(mostLikelyDisease.diseaseName);
    //       this.cardState = "enter";

    //       setTimeout(() => {
    //         this.cardState = "show";
    //       }, 500);
    //       this.predictionCount++;
    //     } else {
    //       this.$message({
    //         message: "No more diseases to predict.",
    //         type: "warning",
    //       });
    //     }
    //   }, 500);
    // },

    processDiseaseScoring() {
      // Verify that all symptoms are selected

      const allSelected = this.diseaseDetails.Symptoms.every(
        (symptom) => this.selectedSymptoms[symptom.SymptomName] !== undefined
      );

      if (!allSelected) {
        // If there are unselected symptoms, prompt the user and terminate

        this.$message.warning(this.$t("selectAllSymptomsWarning")); // 使用翻译
        return;
      }

      // If the maximum number of predictions has been reached, stop prediction and prompt

      if (this.predictionCount >= this.maxPredictions) {
        this.$message({
          message: this.$t("maxPredictionsReached"), // 使用翻译
          type: "warning",
        });
        return;
      }

      // Get the current card element

      this.cardState = "leave"; // Set card to away state

      setTimeout(() => {
        // Get user-selected symptoms and their probabilities

        this.getSelectedSymptomsWithProbability();

        // Calculate disease match score

        const diseaseScores = this.calculateDiseaseScores();
        if (this.allSymptomSelections) {
          this.showSymptom = true;
        }
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
          this.$message({
            message: this.$t("noMoreDiseases"), // 使用翻译
            type: "warning",
          });
        }
      }, 500); // Animation duration 500ms
    },
  },
  created() {
    // this.diseases = diseasesData; // Assign JSON data to component data

    // this.diseaseNames = Object.keys(this.diseases); // Get all disease names
    this.loadDiseaseData();
  },
};
</script>

<style scoped>
.sidebar {
  display: flex;
  height: 100vh;
  width: auto;
}

.sidebar_left {
  width: auto;
  background: #f2f4f7;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 20px;
}

.sidebar_left .icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #7f56d9;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.sidebar_left .home {
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.sidebar_left .home:hover {
  border-radius: 10px; /* rounded corners effect */
  transition: background-color 0.3s ease; /* animated transition effects */
  background-color: #ffffff; /* White background on mouseover */
}

.sidebar_left .file {
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.sidebar_left .file:hover {
  border-radius: 10px; /* rounded corners effect */
  transition: background-color 0.3s ease; /* animated transition effects */
  background-color: #ffffff; /* White background on mouseover */
}

.sidebar_right {
  width: auto;
  background: #ffffff;
  box-sizing: border-box;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}

.sidebar_right .header {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar_right .header div {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}

.sidebar_right .header img {
  width: 32px;
  height: 32px;
  cursor: pointer;
}

.sidebar_right .content .sub_header {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
}

.sidebar_right .search_disease {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  background: #eaecf0;
  height: 35px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

.sidebar_right .search_disease .search_text {
  font-size: 14px;
  color: #667085;
}

.small_intro div:nth-child(1) {
  font-size: 20px;
  font-weight: 600;
  color: #353535;
  margin-bottom: 10px;
}

.small_intro div:nth-child(2) {
  font-weight: 500;
  font-size: 14px;
  color: #344054;
}

.sidebar_right_bottom .more {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}

.sidebar_right_bottom .more img {
  margin-right: 10px;
}

.sidebar_right_bottom .more div {
  color: #344054;
  font-size: 16px;
}

.custom-icon {
  width: 20px; /* Resize image as needed */
  height: 20px;
  margin-left: 8px; /* Leave a little space between text and icon */
}

.pc_page ::v-deep .el-main {
  background-color: #eaecf0;
}

.disease_card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  justify-content: flex-start;
  padding: 20px;
  align-items: center;
  border-radius: 20px;
  height: 100%;
  font-size: 16px;
  box-sizing: border-box;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out; /* Add smooth transition animation */
}

.disease_card:hover {
  -webkit-box-shadow: 0px 0px 20px 5px #d3b6ff;
  -moz-box-shadow: 0px 0px 20px 5px #d3b6ff;
  box-shadow: 0px 0px 20px 5px #d3b6ff;
}

.disease_card .disease_header {
  font-size: 24px;
  color: #98a2b3;
  font-weight: 600;
  width: 100%;
  text-align: left;
}

.disease_header span {
  font-weight: 600;
  font-size: 24px;
  color: #353535;
}

.disease_card .disease_content {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  justify-content: space-between;
  align-items: center;
  flex: 1;
  width: 100%;
}

.disease_card .disease_no_content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* justify-content: space-between; */
  align-items: center;
  flex: 1;
}
.disease_card .disease_no_content img {
  width: 316px;
  height: 228px;
}

.disease_explanation {
  width: 100%;
  margin-bottom: 10px;
}

.disease_explanation {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.disease_explanation .disease_explanation_text {
  font-weight: 600;
  color: #101828;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.disease_explanation_detail img {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.disease_img {
  width: 100%;
  /* height: 100%;
  flex: 1; */
  margin-bottom: 5px;
}

.disease_img img {
  border-radius: 10px;
  width: 100%;
  /* height: 100%; */
  max-height: 200px;
}

.disease_symptoms {
  width: 100%;
}

.disease_symptoms .tip {
  font-size: 14px;
  font-weight: 500;
  color: #475467;
  margin-bottom: 15px;
}

.symptom_table {
  overflow-y: auto;
}

.symptom_table th {
  /* line-height: 5vh; */
  color: #666666;
  font-size: 16px;
  border-bottom: none; /* Remove the bottom border of the header */
  text-align: left;
  padding: 10px 20px 10px 20px;
}

.symptom_table table {
  border-collapse: collapse;
  width: 100%;
  border-spacing: 0; /* Remove table spacing */
}

.symptom_table td {
  padding: 20px 20px 20px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #101828;
  border-bottom: 1px solid #e6e6e6; /* Keep only the separators between rows */
}

.symptom_table .table_head {
  background-color: #f2f4f7;
  color: #000;
  height: 5vh;
  border-radius: 10px;
  margin-bottom: 10px;
}

.symptom_table .table_body {
  width: 100%;
  max-height: 200px;
  overflow: auto;
  scrollbar-width: none; /* Firefox hides scroll bars */
}

.symptom_table .table_body td {
  text-align: left;
}

.symptom_table .table_body::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge hide scroll bars */
}

.symptom_table .table_body table tbody td:nth-child(1) {
  width: 40%;
}

.symptom_table .table_body table tbody td:nth-child(2) {
  width: 20%;
}

.symptom_table .table_body table tbody td:nth-child(3) {
  width: 20%;
}

.symptom_table .table_body table tbody td:nth-child(4) {
  width: 20%;
}

.symptom_table .table_head table,
.table_body table {
  width: 100%;
  border: none; /* Remove the entire table border */
}

/* Hide original radio */
input[type="radio"] {
  display: none;
}

/* Customize radio appearance */
input[type="radio"] + label {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #f2f2f2;
  border: 2px solid #ccc;
  position: relative;
  cursor: pointer;
  vertical-align: middle;
}

/* "Yes" turns green and displays a check mark when checked */
input[type="radio"][value="yes"]:checked + label {
  background-color: #28a745;
  border-color: #28a745;
}

input[type="radio"][value="yes"]:checked + label::after {
  content: "✔";
  position: absolute;
  top: 2px;
  left: 5px;
  font-size: 16px;
  color: white;
  font-weight: bold;
}

/* "No" turns red and displays a check mark when checked */
input[type="radio"][value="no"]:checked + label {
  background-color: #dc3545;
  border-color: #dc3545;
}

input[type="radio"][value="no"]:checked + label::after {
  content: "✔";
  position: absolute;
  top: 2px;
  left: 5px;
  font-size: 16px;
  color: white;
  font-weight: bold;
}

/* "Maybe" turns yellow and displays a check mark when checked */
input[type="radio"][value="maybe"]:checked + label {
  background-color: #ffc107;
  border-color: #ffc107;
}

input[type="radio"][value="maybe"]:checked + label::after {
  content: "✔";
  position: absolute;
  top: 2px;
  left: 5px;
  font-size: 16px;
  color: white;
  font-weight: bold;
}

.scroll_down {
  width: auto;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #344054;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #d0d5dd;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;
  cursor: pointer;
  padding: 20px;
}

.desc {
  color: #353535;
  font-size: 20px;
  font-weight: 600;
}

.profile_section {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.profile_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white; /* Head background color */
  position: sticky; /* Keep the head fixed at the top */
  top: 0;
  z-index: 10; /* Make sure the header is above the content */
}

.profile_header span {
  font-size: 20px;
  font-weight: 600;
  color: #353535;
}

.profile_content {
  flex-grow: 1; /* Let the content area automatically fill the remaining space */
  overflow-y: auto; /* Enable vertical scrolling */
  scrollbar-width: none; /* Firefox hides scroll bars */
}

.profile_no_content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.profile_no_content img {
  width: 316px;
  height: 228px;
}

.profile_content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge hide scroll bars */
}

.profile_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  padding: 20px 0;
}

.profile_item_left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.profile_item_right {
  cursor: pointer;
}

.possibility {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
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

::v-deep(.el-dialog) {
  height: 450px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}

::v-deep(.el-dialog__body) {
  overflow-y: auto;
  height: 100%;
}

.search_disease_active {
  background: #7f56d9 !important;
}

.search_text_active {
  color: #fff !important;
}

.disease_card.show {
  transform: translateY(0); /* Card comes into view */
  opacity: 1; /* Make sure the card is fully displayed */
}

.disease_card.slide-in {
  transform: translateY(100%); /* Card slides in from below */
  opacity: 0; /* transparency animation */
}

.disease_card.slide-out {
  transform: translateY(-100%); /* Card slides up */
  opacity: 0; /* transparency animation */
}

.input_member_id ::v-deep(.el-dialog) {
  width: 600px;
  height: 250px;
}

.input_member_id ::v-deep(.el-dialog__header) {
  padding: 0px;
}

.input_member_id ::v-deep(.el-dialog__body) {
  padding: 30px 20px;
}

.input_member_id .input_member_id_title {
  font-weight: 600;
  font-size: 18px;
  color: #101828;
  margin-bottom: 10px;
}

.input_member_id_desc {
  font-size: 14px;
  color: #475467;
  font-weight: 400;
  margin-bottom: 20px;
}

.input_member_id input {
  width: 100%;
  height: 30px;
  border-radius: 10px;
  border: 1px solid grey;
  margin-bottom: 30px;
}

.button_done {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button_inner {
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

.select_a_disease ::v-deep(.el-dialog__title) {
  font-weight: bold;
}

.select_a_disease ::v-deep(.el-dialog__body) {
  padding: 0 20px 20px 20px;
}

.select_a_disease p {
  font-size: 14px;
  color: black;
}

.select_a_disease ::v-deep(.el-button--primary) {
  background-color: #7f56d9;
  border-color: #7f56d9;
}
</style>
