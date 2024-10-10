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
                <div class="search_disease">
                  <div class="search_text">Explore Symptoms</div>
                  <img
                    src="../assets/img/pc/sparkle.png"
                    class="custom-icon"
                  />
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
      <el-container>
        <!-- 中间部分 -->
        <el-main>
          <!-- 无疾病时的结果 -->
          <!-- <div class="disease_card">
            <div class="disease_header">Disease</div>
            <el-divider></el-divider>
            <div class="disease_content">
              <img src="../assets/img/pc/Illustration.png" alt="" />
              <div class="desc">No disease added</div>
            </div>
          </div> -->
          <div class="disease_card">
            <div class="disease_header">Disease: <span>Covid-19</span></div>
            <el-divider></el-divider>
            <div class="disease_content">
              <div class="disease_explanation">
                <div class="disease_explanation_text">
                  Brief Explanation about COVID-19...
                </div>
                <div
                  class="disease_explanation_detail"
                  @click="dialogVisible = true"
                >
                  <img src="../assets/img/pc/info.png" alt="" />
                </div>
              </div>
              <div class="disease_img">
                <img src="../assets/img/pc/disease.png" alt="" />
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
                  <div class="table_body">
                    <table>
                      <tbody id="tbody">
                        <tr>
                          <td>Sore throat</td>
                          <td>
                            <input
                              type="radio"
                              id="sore_throat_yes"
                              name="sore_throat"
                              value="yes"
                            />
                            <label for="sore_throat_yes"></label>
                          </td>
                          <td>
                            <input
                              type="radio"
                              id="sore_throat_no"
                              name="sore_throat"
                              value="no"
                            />
                            <label for="sore_throat_no"></label>
                          </td>
                          <td>
                            <input
                              type="radio"
                              id="sore_throat_maybe"
                              name="sore_throat"
                              value="maybe"
                            />
                            <label for="sore_throat_maybe"></label>
                          </td>
                        </tr>
                        <tr>
                          <td>Muscle or body aches</td>
                          <td>
                            <input
                              type="radio"
                              id="muscle_aches_yes"
                              name="muscle_aches"
                              value="yes"
                            />
                            <label for="muscle_aches_yes"></label>
                          </td>
                          <td>
                            <input
                              type="radio"
                              id="muscle_aches_no"
                              name="muscle_aches"
                              value="no"
                            />
                            <label for="muscle_aches_no"></label>
                          </td>
                          <td>
                            <input
                              type="radio"
                              id="muscle_aches_maybe"
                              name="muscle_aches"
                              value="maybe"
                            />
                            <label for="muscle_aches_maybe"></label>
                          </td>
                        </tr>
                        <tr>
                          <td>Headache</td>
                          <td>
                            <input
                              type="radio"
                              id="headache_yes"
                              name="Headache"
                              value="yes"
                            />
                            <label for="headache_yes"></label>
                          </td>
                          <td>
                            <input
                              type="radio"
                              id="headache_no"
                              name="Headache"
                              value="no"
                            />
                            <label for="headache_no"></label>
                          </td>
                          <td>
                            <input
                              type="radio"
                              id="headache_maybe"
                              name="Headache"
                              value="maybe"
                            />
                            <label for="headache_maybe"></label>
                          </td>
                        </tr>
                        <tr>
                          <td>Shortness of breath or difficulty breathing</td>
                          <td>
                            <input
                              type="radio"
                              id="breath_yes"
                              name="Shortness of breath or difficulty breathing"
                              value="yes"
                            />
                            <label for="breath_yes"></label>
                          </td>
                          <td>
                            <input
                              type="radio"
                              id="breath_no"
                              name="Shortness of breath or difficulty breathing"
                              value="no"
                            />
                            <label for="breath_no"></label>
                          </td>
                          <td>
                            <input
                              type="radio"
                              id="breath_maybe"
                              name="Shortness of breath or difficulty breathing"
                              value="maybe"
                            />
                            <label for="breath_maybe"></label>
                          </td>
                        </tr>

                        <tr>
                          <td>New loss of taste or smell</td>
                          <td>
                            <input
                              type="radio"
                              id="taste_yes"
                              name="New loss of taste or smell"
                              value="yes"
                            />
                            <label for="taste_yes"></label>
                          </td>
                          <td>
                            <input
                              type="radio"
                              id="taste_no"
                              name="New loss of taste or smell"
                              value="no"
                            />
                            <label for="taste_no"></label>
                          </td>
                          <td>
                            <input
                              type="radio"
                              id="taste_maybe"
                              name="New loss of taste or smell"
                              value="maybe"
                            />
                            <label for="taste_maybe"></label>
                          </td>
                        </tr>

                        <tr>
                          <td>Cough</td>
                          <td>
                            <input
                              type="radio"
                              id="cough_yes"
                              name="Cough"
                              value="yes"
                            />
                            <label for="cough_yes"></label>
                          </td>
                          <td>
                            <input
                              type="radio"
                              id="cough_no"
                              name="Cough"
                              value="no"
                            />
                            <label for="cough_no"></label>
                          </td>
                          <td>
                            <input
                              type="radio"
                              id="cough_maybe"
                              name="Cough"
                              value="maybe"
                            />
                            <label for="cough_maybe"></label>
                          </td>
                        </tr>

                        <tr>
                          <td>Congestion or runny nose</td>
                          <td>
                            <input
                              type="radio"
                              id="congestion_yes"
                              name="Congestion or runny nose"
                              value="yes"
                            />
                            <label for="congestion_yes"></label>
                          </td>
                          <td>
                            <input
                              type="radio"
                              id="congestion_no"
                              name="Congestion or runny nose"
                              value="no"
                            />
                            <label for="congestion_no"></label>
                          </td>
                          <td>
                            <input
                              type="radio"
                              id="congestion_maybe"
                              name="Congestion or runny nose"
                              value="maybe"
                            />
                            <label for="congestion_maybe"></label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="scroll_down">Scroll Down</div>
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
            <div class="profile_item">
              <div class="profile_item_left">
                <div class="possibility yes"></div>
                <div class="profile_item_name">Sore throat</div>
              </div>
              <div class="profile_item_right">X</div>
            </div>
            <div class="profile_item">
              <div class="profile_item_left">
                <div class="possibility yes"></div>
                <div class="profile_item_name">Sore throat</div>
              </div>
              <div class="profile_item_right">X</div>
            </div>
            <div class="profile_item">
              <div class="profile_item_left">
                <div class="possibility yes"></div>
                <div class="profile_item_name">Sore throat</div>
              </div>
              <div class="profile_item_right">X</div>
            </div>
            <div class="profile_item">
              <div class="profile_item_left">
                <div class="possibility yes"></div>
                <div class="profile_item_name">Sore throat</div>
              </div>
              <div class="profile_item_right">X</div>
            </div>
            <div class="profile_item">
              <div class="profile_item_left">
                <div class="possibility yes"></div>
                <div class="profile_item_name">Sore throat</div>
              </div>
              <div class="profile_item_right">X</div>
            </div>
            <div class="profile_item">
              <div class="profile_item_left">
                <div class="possibility yes"></div>
                <div class="profile_item_name">Sore throat</div>
              </div>
              <div class="profile_item_right">X</div>
            </div>
            <div class="profile_item">
              <div class="profile_item_left">
                <div class="possibility yes"></div>
                <div class="profile_item_name">Sore throat</div>
              </div>
              <div class="profile_item_right">X</div>
            </div>
            <div class="profile_item">
              <div class="profile_item_left">
                <div class="possibility yes"></div>
                <div class="profile_item_name">Sore throat</div>
              </div>
              <div class="profile_item_right">X</div>
            </div>
            <div class="profile_item">
              <div class="profile_item_left">
                <div class="possibility yes"></div>
                <div class="profile_item_name">Sore throat</div>
              </div>
              <div class="profile_item_right">X</div>
            </div>
            <div class="profile_item">
              <div class="profile_item_left">
                <div class="possibility yes"></div>
                <div class="profile_item_name">Sore throat</div>
              </div>
              <div class="profile_item_right">X</div>
            </div>
            <div class="profile_item">
              <div class="profile_item_left">
                <div class="possibility yes"></div>
                <div class="profile_item_name">Sore throat</div>
              </div>
              <div class="profile_item_right">X</div>
            </div>
            <div class="profile_item">
              <div class="profile_item_left">
                <div class="possibility yes"></div>
                <div class="profile_item_name">Sore throat</div>
              </div>
              <div class="profile_item_right">X</div>
            </div>
            <div class="profile_item">
              <div class="profile_item_left">
                <div class="possibility yes"></div>
                <div class="profile_item_name">Sore throat</div>
              </div>
              <div class="profile_item_right">X</div>
            </div>
          </div>
        </div>
      </el-aside>
    </el-container>

    <el-dialog
      title="Coronavirus disease 2019 (COVID-19)"
      :visible.sync="dialogVisible"
    >
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="Overview" name="1">
          <div>
            COVID-19, also called coronavirus disease 2019, is an illness caused by a virus. The virus is called severe acute respiratory syndrome coronavirus 2, or more commonly, SARS-CoV-2. It started spreading at the end of 2019 and became a pandemic disease in 2020
          </div>
          <div>
            The virus that causes COVID-19 spreads most commonly through the air in tiny droplets of fluid between people in close contact. Many people with COVID-19 have no symptoms or mild illness. But for older adults and people with certain medical conditions, COVID-19 can lead to the need for care in the hospital or death.
          </div>
          <div>
            Staying up to date on your COVID-19 vaccine helps prevent serious illness, the need for hospital care due to COVID-19 and death from COVID-19. Other ways that may help prevent the spread of this coronavirus includes good indoor air flow, physical distancing, wearing a mask in the right setting and good hygiene.
          </div>
        </el-collapse-item>
        <el-collapse-item title="Causes" name="2">
          <div>
            COVID-19, also called coronavirus disease 2019, is an illness caused by a virus. The virus is called severe acute respiratory syndrome coronavirus 2, or more commonly, SARS-CoV-2. It started spreading at the end of 2019 and became a pandemic disease in 2020
          </div>
          <div>
            The virus that causes COVID-19 spreads most commonly through the air in tiny droplets of fluid between people in close contact. Many people with COVID-19 have no symptoms or mild illness. But for older adults and people with certain medical conditions, COVID-19 can lead to the need for care in the hospital or death.
          </div>
          <div>
            Staying up to date on your COVID-19 vaccine helps prevent serious illness, the need for hospital care due to COVID-19 and death from COVID-19. Other ways that may help prevent the spread of this coronavirus includes good indoor air flow, physical distancing, wearing a mask in the right setting and good hygiene.
          </div>
        </el-collapse-item>
        <el-collapse-item title="Symptoms" name="3">
          <div>
            COVID-19, also called coronavirus disease 2019, is an illness caused by a virus. The virus is called severe acute respiratory syndrome coronavirus 2, or more commonly, SARS-CoV-2. It started spreading at the end of 2019 and became a pandemic disease in 2020
          </div>
          <div>
            The virus that causes COVID-19 spreads most commonly through the air in tiny droplets of fluid between people in close contact. Many people with COVID-19 have no symptoms or mild illness. But for older adults and people with certain medical conditions, COVID-19 can lead to the need for care in the hospital or death.
          </div>
          <div>
            Staying up to date on your COVID-19 vaccine helps prevent serious illness, the need for hospital care due to COVID-19 and death from COVID-19. Other ways that may help prevent the spread of this coronavirus includes good indoor air flow, physical distancing, wearing a mask in the right setting and good hygiene.
          </div>
        </el-collapse-item>
        <el-collapse-item title="Departments that treat this condition" name="4">
          <div>
            COVID-19, also called coronavirus disease 2019, is an illness caused by a virus. The virus is called severe acute respiratory syndrome coronavirus 2, or more commonly, SARS-CoV-2. It started spreading at the end of 2019 and became a pandemic disease in 2020
          </div>
          <div>
            The virus that causes COVID-19 spreads most commonly through the air in tiny droplets of fluid between people in close contact. Many people with COVID-19 have no symptoms or mild illness. But for older adults and people with certain medical conditions, COVID-19 can lead to the need for care in the hospital or death.
          </div>
          <div>
            Staying up to date on your COVID-19 vaccine helps prevent serious illness, the need for hospital care due to COVID-19 and death from COVID-19. Other ways that may help prevent the spread of this coronavirus includes good indoor air flow, physical distancing, wearing a mask in the right setting and good hygiene.
          </div>
        </el-collapse-item>
        <el-collapse-item title="Risk Factors" name="4">
          <div>
            COVID-19, also called coronavirus disease 2019, is an illness caused by a virus. The virus is called severe acute respiratory syndrome coronavirus 2, or more commonly, SARS-CoV-2. It started spreading at the end of 2019 and became a pandemic disease in 2020
          </div>
          <div>
            The virus that causes COVID-19 spreads most commonly through the air in tiny droplets of fluid between people in close contact. Many people with COVID-19 have no symptoms or mild illness. But for older adults and people with certain medical conditions, COVID-19 can lead to the need for care in the hospital or death.
          </div>
          <div>
            Staying up to date on your COVID-19 vaccine helps prevent serious illness, the need for hospital care due to COVID-19 and death from COVID-19. Other ways that may help prevent the spread of this coronavirus includes good indoor air flow, physical distancing, wearing a mask in the right setting and good hygiene.
          </div>
        </el-collapse-item>
        <el-collapse-item title="Complications" name="5">
          <div>
            COVID-19, also called coronavirus disease 2019, is an illness caused by a virus. The virus is called severe acute respiratory syndrome coronavirus 2, or more commonly, SARS-CoV-2. It started spreading at the end of 2019 and became a pandemic disease in 2020
          </div>
          <div>
            The virus that causes COVID-19 spreads most commonly through the air in tiny droplets of fluid between people in close contact. Many people with COVID-19 have no symptoms or mild illness. But for older adults and people with certain medical conditions, COVID-19 can lead to the need for care in the hospital or death.
          </div>
          <div>
            Staying up to date on your COVID-19 vaccine helps prevent serious illness, the need for hospital care due to COVID-19 and death from COVID-19. Other ways that may help prevent the spread of this coronavirus includes good indoor air flow, physical distancing, wearing a mask in the right setting and good hygiene.
          </div>
        </el-collapse-item>
        <el-collapse-item title="Prevention" name="6">
          <div>
            COVID-19, also called coronavirus disease 2019, is an illness caused by a virus. The virus is called severe acute respiratory syndrome coronavirus 2, or more commonly, SARS-CoV-2. It started spreading at the end of 2019 and became a pandemic disease in 2020
          </div>
          <div>
            The virus that causes COVID-19 spreads most commonly through the air in tiny droplets of fluid between people in close contact. Many people with COVID-19 have no symptoms or mild illness. But for older adults and people with certain medical conditions, COVID-19 can lead to the need for care in the hospital or death.
          </div>
          <div>
            Staying up to date on your COVID-19 vaccine helps prevent serious illness, the need for hospital care due to COVID-19 and death from COVID-19. Other ways that may help prevent the spread of this coronavirus includes good indoor air flow, physical distancing, wearing a mask in the right setting and good hygiene.
          </div>
        </el-collapse-item>
        <el-collapse-item title="Diagnosis" name="7">
          <div>
            COVID-19, also called coronavirus disease 2019, is an illness caused by a virus. The virus is called severe acute respiratory syndrome coronavirus 2, or more commonly, SARS-CoV-2. It started spreading at the end of 2019 and became a pandemic disease in 2020
          </div>
          <div>
            The virus that causes COVID-19 spreads most commonly through the air in tiny droplets of fluid between people in close contact. Many people with COVID-19 have no symptoms or mild illness. But for older adults and people with certain medical conditions, COVID-19 can lead to the need for care in the hospital or death.
          </div>
          <div>
            Staying up to date on your COVID-19 vaccine helps prevent serious illness, the need for hospital care due to COVID-19 and death from COVID-19. Other ways that may help prevent the spread of this coronavirus includes good indoor air flow, physical distancing, wearing a mask in the right setting and good hygiene.
          </div>
        </el-collapse-item>
        <el-collapse-item title="Treatments" name="8">
          <div>
            COVID-19, also called coronavirus disease 2019, is an illness caused by a virus. The virus is called severe acute respiratory syndrome coronavirus 2, or more commonly, SARS-CoV-2. It started spreading at the end of 2019 and became a pandemic disease in 2020
          </div>
          <div>
            The virus that causes COVID-19 spreads most commonly through the air in tiny droplets of fluid between people in close contact. Many people with COVID-19 have no symptoms or mild illness. But for older adults and people with certain medical conditions, COVID-19 can lead to the need for care in the hospital or death.
          </div>
          <div>
            Staying up to date on your COVID-19 vaccine helps prevent serious illness, the need for hospital care due to COVID-19 and death from COVID-19. Other ways that may help prevent the spread of this coronavirus includes good indoor air flow, physical distancing, wearing a mask in the right setting and good hygiene.
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
       activeName: '1'
    };
  },
  methods: {
    generateReport() {
      this.$router.push({ name: 'PcReport' });
    }
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
  transition: border 0.1s ease, transform 0.1s ease; /* 添加平滑过渡 */
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

.possibility {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
}

.yes {
  background: green;
}

::v-deep(.el-dialog){
  height: 450px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}

::v-deep(.el-dialog__body){
  overflow-y: auto;
  height: 100%;
}
</style>
