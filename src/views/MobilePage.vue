<template>
  <div class="mobile_page">
    <div class="mobile_page_header">
      <div class="mobile_page_header_left">
        <img src="../assets/img/mobile/logo.png" alt="" />
        <div>Sympify.ai</div>
      </div>
      <div class="mobile_page_header_right" @click="show = true">
        <img src="../assets/img/mobile/more.png" alt="" />
      </div>
    </div>
    <div class="mobile_page_content">
      <div class="mobile_page_content_top">
        <div class="caption">Find your disease</div>
        <div class="input_area">
          <div class="input_title">Enter your disease</div>
          <div class="input_textarea">
            <van-field
              v-model="message"
              rows="4"
              autosize
              type="textarea"
              placeholder="Add a disease name here..."
            />
          </div>
          <div class="search_disease" @click="searchDisease()">
            <div class="search_text">Explore Symptoms</div>
            <img src="../assets/img/pc/sparkle.png" class="custom-icon" />
          </div>
        </div>
      </div>
      <div class="mobile_page_content_bottom">
        <div class="bottom_tip">
          <div>Sympify.ai</div>
          <div>
            The World's First AI Platform <br />
            Minimizing Misdiagnosis
          </div>
        </div>
      </div>
    </div>
    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <div class="mobile_page_header">
        <div class="mobile_page_header_left">
          <img src="../assets/img/mobile/logo.png" alt="" />
          <div>Sympify.ai</div>
        </div>
        <div class="mobile_page_header_right" @click="show = false">
          <img
            src="../assets/img/mobile/close.png"
            alt=""
            style="width: 12px; height: 12px"
          />
        </div>
      </div>
      <div class="popup_content">
        <div class="popup_content_items">
          <div class="popup_content_item">
            <img src="../assets/img/pc/home.png" alt="" />
            <div>Home</div>
          </div>
          <div class="popup_content_item" @click="jumpWebsite()">
            <img src="../assets/img/pc/file.png" alt="" />
            <div>About us</div>
          </div>
          <div class="popup_content_item" @click="goHowUse()">
            <img src="../assets/img/pc/help.png" alt="" />
            <div>How to Use</div>
          </div>
          <div class="popup_content_item" @click="showDisclaimers = true">
            <img src="../assets/img/pc/disclaimers.png" alt="" />
            <div>Disclaimers</div>
          </div>
        </div>
        <div class="mobile_page_content_bottom">
          <div class="bottom_tip">
            <div>Sympify.ai</div>
            <div>
              The World's First AI Platform <br />
              Minimizing Misdiagnosis
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="showDisclaimers"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <van-nav-bar title="Disclaimers" left-arrow @click-left="onClickLeft" />
      <div style="box-sizing: border-box; padding: 20px; font-size: 18px">
        This app does not provide personal medical advice or diagnosis. All
        content is general and for educational purposes. Information on the app
        has been gathered from reputable sources, but we are not responsible for
        explanation errors. Individuals should not rely on this app to
        self-diagnose any medical conditions. Healthcare professionals should be
        consulted to understand the information provided in terms of your own
        situation. No information should be used as a substitute for your
        healthcare provider or professional medical advice. Always consult your
        own physician regarding medical conditions, diagnosis, treatment, and
        health programs. In the case of a medical emergency, call your local
        emergency services.
      </div>
    </van-popup>
    <van-dialog
      v-model="showDialog"
      class="show_dialog"
      confirmButtonText="Close"
    >
      <div>
        <p>We found multiple matches. Please select one:</p>
        <van-button
          v-for="(match, index) in fuzzyMatches"
          :key="index"
          type="primary"
          @click="findDisease(match)"
          style="margin: 5px"
          color="#7f56d9"
        >
          {{ match }}</van-button
        >
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { Popup } from "vant";
import diseasesData from "@/assets/data/diseases.json";
import { Toast } from "vant";
import { Dialog } from "vant";
import { Button } from "vant";
export default {
  data() {
    return {
      message: "",
      show: false,
      diseases: "",
      diseaseNames: "",
      showDisclaimers: false,
      showDialog: false,
      fuzzyMatches: "",
    };
  },
  watch: {
    message(newVal, oldVal) {
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
    goHowUse() {
      this.$router.push({
        name: "HowToUse",
      });
    },
    jumpWebsite() {
      window.location.href = "https://www.sympify.org";
    },
    onClickLeft() {
      this.showDisclaimers = false;
    },
    /**
     * 搜索疾病的主逻辑
     */
    searchDisease() {
      const nameToSearch = this.message.trim(); // 用户输入的疾病名称
      if (!nameToSearch) {
        Toast("Please enter a valid disease name");
        return;
      }

      // 转换为小写
      const lowerCaseInput = nameToSearch.toLowerCase();

      // 精确匹配
      const matchedDisease = this.diseaseNames.find(
        (disease) => disease.toLowerCase() === lowerCaseInput
      );

      if (matchedDisease) {
        // 精确匹配成功，跳转到疾病详情页
        this.navigateToDiseasePage(matchedDisease);
      } else {
        // 模糊匹配
        const fuzzyMatches = this.diseaseNames.filter((disease) =>
          disease.toLowerCase().includes(lowerCaseInput)
        );

        if (fuzzyMatches.length > 0) {
          // 显示模糊匹配结果弹框
          this.showDiseaseDialog(fuzzyMatches);
        } else {
          // 没有找到匹配项
          Toast("No such disease, please reenter");
          this.message = ""; // 清空输入框
        }
      }
    },

    /**
     * 显示模糊匹配的对话框
     */
    showDiseaseDialog(fuzzyMatches) {
      this.fuzzyMatches = fuzzyMatches; // 保存模糊匹配结果
      this.showDialog = true; // 打开对话框
    },

    /**
     * 处理用户在弹框中选择的疾病
     */
    findDisease(selectedDisease) {
      this.showDialog = false; // 关闭对话框
      this.navigateToDiseasePage(selectedDisease); // 跳转到疾病详情页
    },

    /**
     * 跳转到疾病详情页的逻辑
     */
    navigateToDiseasePage(diseaseName) {
      this.$router.push({
        name: "disease",
        query: { diseaseName }, // 将选中的疾病名传递到详情页
      });
    },
  },
  created() {
    this.diseases = diseasesData; // Assign JSON data to component data

    this.diseaseNames = Object.keys(this.diseases); // Get all disease names
    console.log(this.diseaseNames);
  },
};
</script>

<style scoped>
.mobile_page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.mobile_page_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1018280d;
  box-sizing: border-box;
  padding: 10px;
}

.mobile_page_header_left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile_page_header_left img {
  margin-right: 5px;
}

.mobile_page_header_left div {
  font-weight: 600;
  font-size: 14px;
  color: #353535;
}

.mobile_page_header_right img {
  width: 18px;
  height: 12px;
}

.mobile_page_content {
  flex: 1;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mobile_page_content_top .caption {
  font-size: 20px;
  font-weight: 600;
  color: #353535;
  margin-bottom: 20px;
}

.input_area .input_title {
  font-size: 14px;
  font-weight: 500;
  color: #344054;
  margin-bottom: 5px;
}

.input_textarea {
  margin-bottom: 20px;
}

.input_textarea ::v-deep(.van-cell) {
  padding: 0px;
  border-radius: 5px;
  border: 1px solid #d0d5dd;
}

.input_textarea ::v-deep(.van-field__control) {
  box-sizing: border-box;
  padding: 10px;
  font-weight: 500;
  font-size: 14px;
  color: #667085;
}

.search_disease {
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

.search_disease .search_text {
  font-size: 14px;
  color: #667085;
}

.bottom_tip div:nth-child(1) {
  font-weight: 600;
  font-size: 20px;
  color: #353535;
  margin-bottom: 10px;
}

.bottom_tip div:nth-child(2) {
  font-weight: 500;
  font-size: 14px;
  color: #344054;
}

::v-deep(.van-popup) {
  display: flex;
  flex-direction: column;
}

.popup_content {
  box-sizing: border-box;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.popup_content_item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 0;
  border-bottom: 1px solid #eaecf0;
}

.popup_content_item img {
  margin-right: 10px;
  width: 20px;
  height: 20px;
}

.popup_content_item div {
  font-weight: 500;
  font-size: 16px;
  color: #353535;
}

.search_disease_active {
  background: #7f56d9 !important;
}

.search_text_active {
  color: #fff !important;
}
.show_dialog p {
  box-sizing: border-box;
  padding: 5px;
  font-size: 14px;
}
.show_dialog ::v-deep(.van-dialog__confirm) {
  color: #7f56d9 !important;
}
</style>
