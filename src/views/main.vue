<template>
  <div class="main">
    <el-container style="height: 100vh">
      <!-- 左侧导航栏 -->
      <el-aside>
        <div class="sidebar">
          <div class="sidebar_left">
            <div class="icon">
              <img src="../assets/img/main/icon.png" alt="" />
            </div>
            <div class="home">
              <img src="../assets/img/main/home.png" alt="" />
            </div>
            <div class="file">
              <img src="../assets/img/main/file.png" alt="" />
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

                <el-button type="info" plain size="medium">
                  Explore Symptoms
                  <img
                    src="../assets/img/main/sparkle.png"
                    class="custom-icon"
                  />
                </el-button>
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
              <div style="margin-bottom: 12px">How to Use</div>
              <div>Disclaimers</div>
            </div>
          </div>
        </div>
      </el-aside>
      <el-container>
        <!-- 中间部分 -->
        <el-main>
          <!-- <div class="disease_card">
            <div class="disease_header">Disease</div>
            <el-divider></el-divider>
            <div class="disease_content">
              <img src="../assets/img/main/Illustration.png" alt="" />
              <div class="desc">No disease added</div>
            </div>
          </div> -->
          <div class="disease_card">
            <div class="disease_header">Disease: <span>Covid-19</span></div>
            <el-divider></el-divider>
            <div class="disease_content">
              <div class="disease_explanation">
                Brief Explanation about COVID-19...
              </div>
              <div class="disease_img">
                <img src="../assets/img/main/disease.png" alt="" />
              </div>
              <div class="disease_symptoms">
                <div class="tip">
                  For the following symptoms, please select Yes, No & Maybe
                  according to your personal wellbeing
                </div>
                <div class="symptom_table">
                  <!-- 表格区域 -->
                  <div class="table-head">
                    <table>
                      <thead>
                        <th width="40%">Symptom</th>
                        <th width="20%">Yes</th>
                        <th width="20%">No</th>
                        <th width="20%">Maybe</th>
                      </thead>
                    </table>
                  </div>
                  <div class="table-body">
                    <table>
                      <tbody id="tbody">
                        <tr>
                          <td>Sore throat</td>
                          <td>
                            <input
                              type="radio"
                              name="sore_throat"
                              value="yes"
                            />
                          </td>
                          <td>
                            <input type="radio" name="sore_throat" value="no" />
                          </td>
                          <td>
                            <input
                              type="radio"
                              name="sore_throat"
                              value="maybe"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Sore throat</td>
                          <td>
                            <input
                              type="radio"
                              name="sore_throat"
                              value="yes"
                            />
                          </td>
                          <td>
                            <input type="radio" name="sore_throat" value="no" />
                          </td>
                          <td>
                            <input
                              type="radio"
                              name="sore_throat"
                              value="maybe"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Sore throat</td>
                          <td>
                            <input
                              type="radio"
                              name="sore_throat"
                              value="yes"
                            />
                          </td>
                          <td>
                            <input type="radio" name="sore_throat" value="no" />
                          </td>
                          <td>
                            <input
                              type="radio"
                              name="sore_throat"
                              value="maybe"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Sore throat</td>
                          <td>
                            <input
                              type="radio"
                              name="sore_throat"
                              value="yes"
                            />
                          </td>
                          <td>
                            <input type="radio" name="sore_throat" value="no" />
                          </td>
                          <td>
                            <input
                              type="radio"
                              name="sore_throat"
                              value="maybe"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Sore throat</td>
                          <td>
                            <input
                              type="radio"
                              name="sore_throat"
                              value="yes"
                            />
                          </td>
                          <td>
                            <input type="radio" name="sore_throat" value="no" />
                          </td>
                          <td>
                            <input
                              type="radio"
                              name="sore_throat"
                              value="maybe"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Sore throat</td>
                          <td>
                            <input
                              type="radio"
                              name="sore_throat"
                              value="yes"
                            />
                          </td>
                          <td>
                            <input type="radio" name="sore_throat" value="no" />
                          </td>
                          <td>
                            <input
                              type="radio"
                              name="sore_throat"
                              value="maybe"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Sore throat</td>
                          <td>
                            <input
                              type="radio"
                              name="sore_throat"
                              value="yes"
                            />
                          </td>
                          <td>
                            <input type="radio" name="sore_throat" value="no" />
                          </td>
                          <td>
                            <input
                              type="radio"
                              name="sore_throat"
                              value="maybe"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Sore throat</td>
                          <td>
                            <input
                              type="radio"
                              name="sore_throat"
                              value="yes"
                            />
                          </td>
                          <td>
                            <input type="radio" name="sore_throat" value="no" />
                          </td>
                          <td>
                            <input
                              type="radio"
                              name="sore_throat"
                              value="maybe"
                            />
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
            <el-button>Generate Report</el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
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
  padding: 12px;
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

.sidebar_right ::v-deep(.el-button) {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
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

.sidebar_right_bottom div {
  color: #344054;
  font-size: 16px;
}

.custom-icon {
  width: 20px; /* 根据需要调整图片大小 */
  height: 20px;
  margin-left: 8px; /* 给文本和图标之间留一点间距 */
}

.main ::v-deep .el-main {
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
  font-size: 14px;
  margin-bottom: 10px;
  font-weight: 600;
  color: #101828;
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

.disease_symptoms .tip {
  font-size: 14px;
  font-weight: 500;
  color: #475467;
  margin-bottom: 15px;
}

.symptom_table th {
  line-height: 5vh;
  color: #666666;
  font-size: 16px;
  border-bottom: none; /* 移除表头的底部边框 */
}

.symptom_table table {
  border-collapse: collapse;
  width: 100%;
  border-spacing: 0; /* 移除表格间距 */
}

.symptom_table td {
  padding: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #101828;
  border-bottom: 1px solid #e6e6e6; /* 只保留行之间的分隔线 */
}

.symptom_table .table-head {
  background-color: #F2F4F7;
  color: #000;
  height: 5vh;
  border-radius: 10px;
  margin-bottom: 10px;
}

.symptom_table .table-body {
  width: 100%;
  max-height: 200px;
  overflow: auto;
  scrollbar-width: none; /* Firefox 隐藏滚动条 */
}

.symptom_table .table-body::-webkit-scrollbar {
  display: none; /* Chrome、Safari、Edge 隐藏滚动条 */
}

.symptom_table .table-body table tbody td:nth-child(1){
  width: 40%;
}

.symptom_table .table-body table tbody td:nth-child(2){
  width: 20%;
}

.symptom_table .table-body table tbody td:nth-child(3){
  width: 20%;
}

.symptom_table .table-body table tbody td:nth-child(4){
  width: 20%;
}

.symptom_table .table-head table,
.table-body table {
  width: 100%;
  border: none; /* 移除整个表格的边框 */
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
  border: 1px solid #D0D5DD;
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
</style>
