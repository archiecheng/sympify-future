<template>
  <div class="pc_page">
    <el-container style="height: 100vh">
      <!-- 左侧导航栏 -->
      <el-aside width="400px">
        <div class="sidebar">
          <div class="sidebar_left">
            <div class="icon">
              <img src="../assets/img/pc/icon.png" alt="" />
            </div>
            <div class="home">
              <img src="../assets/img/pc/home.png" alt="" />
            </div>
            <div class="file">
              <img src="../assets/img/pc/file.png" alt="" />
            </div>
          </div>
          <div class="sidebar_right">
            <div class="sidebar_right_top">
              <div class="header">Find your disease</div>
              <div class="content">
                <div class="sub_header">Enter your disease</div>
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="Add a disease name here..."
                  v-model="textarea"
                  style="margin-bottom: 20px"
                >
                </el-input>
                <div class="search_disease" @click="exploreSymptomsByDisease()">
                  <div class="search_text">Explore Symptoms</div>
                  <img src="../assets/img/pc/sparkle.png" class="custom-icon" />
                </div>
                <div class="small_intro">
                  <div>Sympify.ai</div>
                  <div>
                    The World's First AI Platform Minimizing Misdiagnosis
                  </div>
                </div>
              </div>
            </div>
            <div class="sidebar_right_bottom">
              <el-divider></el-divider>
              <div style="margin-bottom: 12px" class="more">
                <img src="../assets/img/pc/help.png" alt="" />
                <div>How to Use</div>
              </div>
              <div class="more">
                <img src="../assets/img/pc/disclaimers.png" alt="" />
                <div>Disclaimers</div>
              </div>
            </div>
          </div>
        </div>
      </el-aside>
      <!-- <el-container>
        <el-main>
          <div class="disease_card" v-if="showDisease">
            <div class="disease_header">
              Disease: <span>{{ currentDiseaseName }}</span>
            </div>
            <el-divider></el-divider>
            <div class="disease_content">
              <div class="disease_explanation">
                <div class="disease_explanation_text">
                  Brief Explanation about {{ currentDiseaseName }}...
                </div>
                <div
                  class="disease_explanation_detail"
                  @click="dialogVisible = true"
                >
                  <img src="../assets/img/pc/info.png" alt="" />
                </div>
              </div>
              <div class="disease_img">
                <img :src="imageUrl" alt="" />
              </div>
              <div class="disease_symptoms">
                <div class="tip">
                  For the following symptoms, please select Yes, No & Maybe
                  according to your personal wellbeing
                </div>
                <div class="symptom_table">
                  <div class="table_head">
                    <table>
                      <thead>
                        <th width="40%">Symptom</th>
                        <th width="20%">Yes</th>
                        <th width="20%">No</th>
                        <th width="20%">Maybe</th>
                      </thead>
                    </table>
                  </div>
                  <div class="table_body">
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
                Scroll Down
              </div>
            </div>
          </div>
          <div class="disease_card" v-else>
            <div class="disease_header">Disease</div>
            <el-divider></el-divider>
            <div class="disease_no_content">
              <img src="../assets/img/pc/Illustration.png" alt="" />
              <div class="desc">No disease added</div>
            </div>
          </div>
        </el-main>
      </el-container> -->
      <el-container>
        <!-- 中间部分 -->
        <el-main>
          <!-- 卡片部分，动态绑定类名 -->
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
              Disease: <span>{{ currentDiseaseName }}</span>
            </div>
            <el-divider></el-divider>
            <div class="disease_content">
              <div class="disease_explanation">
                <div class="disease_explanation_text">
                  Brief Explanation about {{ currentDiseaseName }}...
                </div>
                <div
                  class="disease_explanation_detail"
                  @click="dialogVisible = true"
                >
                  <img src="../assets/img/pc/info.png" alt="" />
                </div>
              </div>
              <div class="disease_img">
                <!-- <img :src="imageUrl" alt="" /> -->
                <img src="../assets/img/pc/disease.png" alt="" />
                <!-- <img :src="imageUrl" alt="" /> -->
              </div>
              <div class="disease_symptoms">
                <div class="tip">
                  For the following symptoms, please select Yes, No & Maybe
                  according to your personal wellbeing
                </div>
                <div class="symptom_table">
                  <!-- 表格区域 -->
                  <div class="table_head">
                    <table>
                      <thead>
                        <th width="40%">Symptom</th>
                        <th width="20%">Yes</th>
                        <th width="20%">No</th>
                        <th width="20%">Maybe</th>
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
                Scroll Down
              </div>
            </div>
          </div>
          <div class="disease_card" v-else>
            <div class="disease_header">Disease</div>
            <el-divider></el-divider>
            <div class="disease_no_content">
              <img src="../assets/img/pc/Illustration.png" alt="" />
              <div class="desc">No disease added</div>
            </div>
          </div>
        </el-main>
      </el-container>
      <!-- 右侧栏 -->
      <el-aside width="500px">
        <div class="profile_section">
          <div class="profile_header">
            <span>Symptom Profile</span>
            <el-button @click="generateReport()">Generate Report</el-button>
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
      </el-aside>
    </el-container>

    <el-dialog
      :title="currentDiseaseName"
      :visible.sync="dialogVisible"
    >
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="Causes" name="1">
          <div>
            {{ diseaseDetails.Causes }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="Symptoms" name="2">
          <div v-for="item in diseaseDetails.Symptoms" :key="item.SymptomName">
            {{ item.SymptomName }}
          </div>
        </el-collapse-item>
        <el-collapse-item
          title="Departments that treat this condition"
          name="3"
        >
          {{ diseaseDetails.departmentsThatTreatThisCondition }}
        </el-collapse-item>
        <el-collapse-item title="Risk Factors" name="4">
          {{ diseaseDetails.riskFactors }}
        </el-collapse-item>
        <el-collapse-item title="Prevention" name="5">
          {{ diseaseDetails.Prevention }}
        </el-collapse-item>
        <el-collapse-item title="Diagnosis" name="6">
          {{ diseaseDetails.Diagnosis }}
        </el-collapse-item>
        <el-collapse-item title="Treatments" name="7">
          {{ diseaseDetails.Treatments }}
        </el-collapse-item>
      </el-collapse>
    </el-dialog>
    <el-dialog :visible.sync="showMemberId" class="input_member_id">
      <div class="input_member_id_title">Member ID</div>
      <div class="input_member_id_desc">
        Please enter your member ID or skip it if you want
      </div>
      <input type="text" />
      <div class="button_done">
        <div class="button_inner">Done</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import diseasesData from "@/assets/data/diseases.json";
export default {
  data() {
    return {
      dialogVisible: false,
      activeName: "1",
      textarea: "",
      showDisease: false,
      diseases: "",
      diseaseNames: "",
      diseaseDetails: "",
      currentDiseaseName: "",
      generateDisesaseName: "",
      selectedSymptoms: {}, // 用户选择的选项（yes、no、maybe）
      userSelections: [],
      cardState: "show", // 控制卡片的进入与离开动画状态
      allSymptomSelections: "",
      predictionCount: 0, // 计数器，跟踪预测次数
      maxPredictions: 3, // 最大允许预测次数
      isScrolling: "",
      locked: "",
      showMemberId: false,
    };
  },
  computed: {
    // 动态生成图片链接
    imageUrl() {
      const link = this.diseaseDetails.imageLink;
      console.log(link);
      const fileId = link.match(/\/d\/(.+?)\//); // 正则表达式提取文件 ID
      if (fileId && fileId[1]) {
        return `https://drive.usercontent.google.com/download?id=${fileId[1]}&export=view&authuser=0`;
      }
      return ""; // 返回空字符串以防文件 ID 不存在
    },
  },
  watch: {
    textarea(newVal, oldVal) {
      if (newVal !== "" && newVal !== null && newVal !== undefined) {
        this.$nextTick(() => {
          $(".search_disease").addClass("search_disease_active");
          $(".search_text").addClass("search_text_active");
        });
      } else {
        // 当 textarea 为空字符串时，移除类
        this.$nextTick(() => {
          $(".search_disease").removeClass("search_disease_active");
          $(".search_text").removeClass("search_text_active");
        });
      }
    },
  },
  methods: {
    handleScroll(event) {
      if (event.deltaY > 0 && !this.locked) {
        this.locked = true; // 锁定
        this.throttle(this.processDiseaseScoring, 3000)(); // 使用节流防止短时间内多次执行
        setTimeout(() => {
          this.locked = false; // 解锁
        }, 3000); // 3秒后解锁，允许下一次滚动触发
      }
    },
    throttle(func, limit) {
      let inThrottle;
      return function (...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit); // 限制触发频率
        }
      };
    },
    generateReport() {
      this.showMemberId = true;
      // this.$router.push({ name: "Report" });
    },
    // exploreSymptomsByDisease(diseaseName) {
    //   var flag = true; // 假设没找到
    //   const nameToSearch = diseaseName || this.textarea; // 优先使用传入的参数，如果没有就用 textarea
    //   if (this.diseases != null) {
    //     for (let i = 0; i < this.diseaseNames.length; i++) {
    //       if (nameToSearch == this.diseaseNames[i]) {
    //         this.showDisease = true;
    //         this.diseaseDetails = this.diseases[nameToSearch];
    //         this.currentDiseaseName = nameToSearch;
    //         flag = false; // 找到了
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
    // 获取用户选择的症状及其概率

    exploreSymptomsByDisease(diseaseName) {
      var flag = true; // 假设没找到
      const nameToSearch = diseaseName || this.textarea; // 优先使用传入的参数，如果没有就用 textarea
      if (this.diseases != null) {
        for (let i = 0; i < this.diseaseNames.length; i++) {
          if (nameToSearch == this.diseaseNames[i]) {
            this.showDisease = true;
            this.diseaseDetails = this.diseases[nameToSearch];
            console.log(this.diseaseDetails);
            this.currentDiseaseName = nameToSearch;
            this.selectedSymptoms = {}; // 重置已选症状
            this.userSelections = []; // 清空之前的选择
            flag = false; // 找到了
            break;
          }
        }

        if (flag) {
          this.$message({
            message: "No this disease, please reenter",
            type: "warning",
          });
          this.textarea = "";
        }
      }
    },
    // getSelectedSymptomsWithProbability() {
    //   // const selectedData = [];

    //   // 遍历所有症状
    //   for (let symptom of this.diseaseDetails.Symptoms) {
    //     const userChoice = this.selectedSymptoms[symptom.SymptomName]; // 获取用户选择的选项

    //     // 只有当用户选择了症状时，才处理
    //     if (userChoice !== undefined) {
    //       this.userSelections.push({
    //         SymptomName: symptom.SymptomName,
    //         Possibility: symptom.Possibility,
    //         UserChoice: userChoice,
    //       });
    //     }
    //   }
    //   console.log(this.userSelections);

    //   // 返回选择的症状及其可能性
    //   // return selectedData;
    // },
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
      // 渲染去重后的症状集合
      console.log(this.allSymptomSelections); // 检查去重后的数据
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

            // 根据用户选择来计算匹配分数
            if (userChoice === "yes") {
              score += symptomPossibility; // "yes" 完全符合
            } else if (userChoice === "maybe") {
              score += symptomPossibility * 0.5; // "maybe" 部分符合，权重为 0.5
            }
            // "no" 不加分，因此这里不需要明确处理
          }
        });

        // 将当前疾病的匹配分数存储到 diseaseScores 对象中
        diseaseScores[diseaseName] = score;
      }

      // 返回每个疾病的匹配分数
      return diseaseScores;
    },

    // 调用流程：先获取选择，然后计算匹配分数
    // processDiseaseScoring() {
    //   // 先获取用户选择的症状和其概率
    //   this.getSelectedSymptomsWithProbability();

    //   // 然后根据用户选择计算疾病匹配分数
    //   const diseaseScores = this.calculateDiseaseScores();
    //   // 将对象转换为数组并按得分降序排列
    //   const sortedDiseaseScores = Object.entries(diseaseScores)
    //     .sort(([, a], [, b]) => b - a) // 降序排序
    //     .map(([diseaseName, score]) => ({ diseaseName, score })); // 将数组转换为包含疾病名称和得分的对象数组

    //   const newSortedDiseaseScores = sortedDiseaseScores.filter(
    //     (element) => element.diseaseName !== this.currentDiseaseName
    //   ); // 移除重复已经存在的疾病
    //   // 取得分最高的疾病，开启新一轮的预测
    //   // 取得分最高的疾病并显示
    //   const mostLikelyDisease = newSortedDiseaseScores[0];

    //   // 模拟滑动显示下一张卡片
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
    //   // 确保在滚动后有处理逻辑
    //   this.cardState = "leave";

    //   setTimeout(() => {
    //     this.getSelectedSymptomsWithProbability();

    //     const diseaseScores = this.calculateDiseaseScores();

    //     const sortedDiseaseScores = Object.entries(diseaseScores)
    //       .sort(([, a], [, b]) => b - a)
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
      // 校验是否所有症状都已选择
      const allSelected = this.diseaseDetails.Symptoms.every(
        (symptom) => this.selectedSymptoms[symptom.SymptomName] !== undefined
      );

      if (!allSelected) {
        // 如果有未选择的症状，提示用户并终止
        this.$message.warning("Please select an option for all symptoms.");
        return;
      }

      // 如果已达到最大预测次数，停止预测并提示
      if (this.predictionCount >= this.maxPredictions) {
        this.$message({
          message: "You have reached the maximum number of predictions.",
          type: "warning",
        });
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
          this.$message({
            message: "No more diseases to predict.",
            type: "warning",
          });
        }
      }, 500); // 动画时长500ms
    },
  },
  created() {
    this.diseases = diseasesData; // 将 JSON 数据赋值给组件的 data
    this.diseaseNames = Object.keys(this.diseases); // 获取所有疾病名称
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
  border-radius: 10px; /* 圆角效果 */
  transition: background-color 0.3s ease; /* 动画过渡效果 */
  background-color: #ffffff; /* 鼠标悬停时的白色背景 */
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
  border-radius: 10px; /* 圆角效果 */
  transition: background-color 0.3s ease; /* 动画过渡效果 */
  background-color: #ffffff; /* 鼠标悬停时的白色背景 */
}

.sidebar_right {
  width: auto;
  background: #ffffff;
  box-sizing: border-box;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar_right .header {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
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
}

.sidebar_right_bottom .more img {
  margin-right: 10px;
}

.sidebar_right_bottom .more div {
  color: #344054;
  font-size: 16px;
}

.custom-icon {
  width: 20px; /* 根据需要调整图片大小 */
  height: 20px;
  margin-left: 8px; /* 给文本和图标之间留一点间距 */
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
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out; /* 加入平滑的过渡动画 */
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
  width: 100%;
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
}

.disease_explanation_detail img {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.disease_img {
  width: 100%;
  margin-bottom: 5px;
}

.disease_img img {
  border-radius: 10px;
  width: 100%;
  height: 130px;
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

.symptom_table th {
  /* line-height: 5vh; */
  color: #666666;
  font-size: 16px;
  border-bottom: none; /* 移除表头的底部边框 */
  text-align: left;
  padding: 10px 20px 10px 20px;
}

.symptom_table table {
  border-collapse: collapse;
  width: 100%;
  border-spacing: 0; /* 移除表格间距 */
}

.symptom_table td {
  padding: 20px 20px 20px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #101828;
  border-bottom: 1px solid #e6e6e6; /* 只保留行之间的分隔线 */
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
  scrollbar-width: none; /* Firefox 隐藏滚动条 */
}

.symptom_table .table_body td {
  text-align: left;
}

.symptom_table .table_body::-webkit-scrollbar {
  display: none; /* Chrome、Safari、Edge 隐藏滚动条 */
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
  border: none; /* 移除整个表格的边框 */
}

/* 隐藏原始的radio */
input[type="radio"] {
  display: none;
}

/* 自定义radio外观 */
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

/* "Yes" 勾选后变成绿色并显示对号 */
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

/* "No" 勾选后变成红色并显示对号 */
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

/* "Maybe" 勾选后变成黄色并显示对号 */
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
  background-color: white; /* 头部背景色 */
  position: sticky; /* 让头部固定在顶部 */
  top: 0;
  z-index: 10; /* 确保头部在内容之上 */
}

.profile_header span {
  font-size: 20px;
  font-weight: 600;
  color: #353535;
}

.profile_content {
  flex-grow: 1; /* 让内容区域自动填充剩余空间 */
  overflow-y: auto; /* 启用垂直滚动 */
  scrollbar-width: none; /* Firefox 隐藏滚动条 */
}

.profile_content::-webkit-scrollbar {
  display: none; /* Chrome、Safari、Edge 隐藏滚动条 */
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
  transform: translateY(0); /* 卡片进入视图 */
  opacity: 1; /* 确保卡片完全显示 */
}

.disease_card.slide-in {
  transform: translateY(100%); /* 卡片从下方滑入 */
  opacity: 0; /* 透明度动画 */
}

.disease_card.slide-out {
  transform: translateY(-100%); /* 卡片向上滑出 */
  opacity: 0; /* 透明度动画 */
}


.input_member_id ::v-deep(.el-dialog) {
  width: 600px;
  height: 250px;
}

.input_member_id ::v-deep(.el-dialog__header) {
  padding: 0px;
}

.input_member_id ::v-deep(.el-dialog__body){
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
}
</style>
