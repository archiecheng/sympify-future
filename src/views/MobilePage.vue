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
          <div class="popup_content_item">
            <img src="../assets/img/pc/file.png" alt="" />
            <div>About us</div>
          </div>
          <div class="popup_content_item">
            <img src="../assets/img/pc/help.png" alt="" />
            <div>How to Use</div>
          </div>
          <div class="popup_content_item">
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
  </div>
</template>

<script>
import { Popup } from "vant";
export default {
  data() {
    return {
      message: "",
      show: false,
    };
  },
  methods: {
    searchDisease() {
        this.$router.push({ name: 'disease' });
    }
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

::v-deep(.van-popup){
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
    border-bottom: 1px solid #EAECF0;
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
</style>
