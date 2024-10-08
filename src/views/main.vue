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
              <div style="margin-bottom: 12px;">How to Use</div>
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
            <div class="disease_header">Disease: Covid-19</div>
            <el-divider></el-divider>
            <div class="disease_content">
              <img src="../assets/img/main/Illustration.png" alt="" />
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
            <el-button>Generate Report</el-button>
          </div>
          <el-divider></el-divider>
          <div class="profile_content"></div>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {

  
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
  box-sizing: border-box;
  padding: 20px;
  align-items: center;
  border-radius: 20px;
  height: 100%;
  font-size: 16px;
}

.disease_card .disease_header {
  font-size: 24px;
  color: #98a2b3;
  font-weight: 600;
  width: 100%;
  text-align: left;
}

.disease_card .disease_content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.desc {
  color: #353535;
  font-size: 20px;
  font-weight: 600;
}

.profile_section {
  padding: 20px;
}

.profile_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile_header span {
  font-size: 20px;
  font-weight: 600;
  color: #353535;
}
</style>
