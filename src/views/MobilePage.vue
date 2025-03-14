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
        <div class="caption">
          <!-- <div></div> -->
          {{ $t("mobile.findDisease") }}
          <img src="../assets/img/pc/lang.png" @click="showLangDialog" />
        </div>
        <div class="input_area">
          <div class="input_title">{{ $t("mobile.enterDisease") }}</div>
          <div class="input_textarea">
            <van-field
              v-model="message"
              rows="4"
              autosize
              type="textarea"
              :placeholder="$t('mobile.addDiseasePlaceholder')"
            />
          </div>
          <div class="search_disease" @click="searchDisease()">
            <div class="search_text">{{ $t("mobile.exploreSymptoms") }}</div>
            <img src="../assets/img/pc/sparkle.png" class="custom-icon" />
          </div>
        </div>
      </div>
      <div class="mobile_page_content_bottom">
        <div class="bottom_tip">
          <div>{{ $t("mobile.sympifyAi") }}</div>
          <div>{{ $t("mobile.minimizingMisdiagnosis") }}</div>
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
            <div>{{ $t("mobile.home") }}</div>
          </div>
          <div class="popup_content_item" @click="jumpWebsite()">
            <img src="../assets/img/pc/file.png" alt="" />
            <div>{{ $t("mobile.aboutUs") }}</div>
          </div>
          <div class="popup_content_item" @click="goHowUse()">
            <img src="../assets/img/pc/help.png" alt="" />
            <div>{{ $t("mobile.howToUse") }}</div>
          </div>
          <div class="popup_content_item" @click="showDisclaimers = true">
            <img src="../assets/img/pc/disclaimers.png" alt="" />
            <div>{{ $t("mobile.disclaimers") }}</div>
          </div>
        </div>
        <div class="mobile_page_content_bottom">
          <div class="bottom_tip">
            <div>Sympify.ai</div>
            <div>{{ $t("mobile.minimizingMisdiagnosis") }}</div>
          </div>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="showDisclaimers"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <van-nav-bar
        :title="$t('mobile.disclaimersTitle')"
        left-arrow
        @click-left="onClickLeft"
      />
      <div style="box-sizing: border-box; padding: 20px; font-size: 18px">
        {{ $t("mobile.disclaimersContent") }}
      </div>
    </van-popup>
    <van-dialog
      v-model="showDialog"
      class="show_dialog"
      :confirmButtonText="$t('mobile.close')"
    >
      <div>
        <p>{{ $t("mobile.selectDiseaseDescription") }}</p>
        <van-button
          v-for="(match, index) in fuzzyMatches"
          :key="index"
          type="primary"
          @click="findDisease(match)"
          style="margin: 5px"
          color="#7f56d9"
        >
          {{ match }}
        </van-button>
      </div>
    </van-dialog>

    <!-- 多语言弹框 -->
    <van-popup
      v-model="langDialogVisible"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <van-nav-bar
        :title="$t('mobile.languageDialogTitle')"
        left-arrow
        @click-left="langDialogVisible = false"
      />
      <div style="box-sizing: border-box; padding: 20px">
        <van-button
          :type="$i18n.locale === 'en' ? 'primary' : 'default'"
          @click="changeLanguage('en')"
          style="margin-bottom: 10px; width: 100%"
          :color="$i18n.locale === 'en' ? '#7f56d9' : ''"
        >
          English (United States)
        </van-button>
        <van-button
          :type="$i18n.locale === 'cn' ? 'primary' : 'default'"
          @click="changeLanguage('cn')"
          style="width: 100%"
          :color="$i18n.locale === 'cn' ? '#7f56d9' : ''"
        >
          简体中文 (中国)
        </van-button>
      </div>
    </van-popup>
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
      langDialogVisible: false, // 控制多语言弹框的显示
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
        this.$nextTick(() => {
          $(".search_disease").removeClass("search_disease_active");
          $(".search_text").removeClass("search_text_active");
        });
      }
    },
    "$i18n.locale"(newLocale) {
      this.loadDiseaseData(); // 语言切换时重新加载疾病数据
    },
  },
  methods: {
    // 判断设备类型（基于当前路径）
    getDeviceType() {
      return this.$route.path.startsWith("/mobile") ? "mobile" : "pc";
    },
    // 动态加载疾病数据
    async loadDiseaseData() {
      try {
        const dataFile =
          this.$i18n.locale === "cn"
            ? await import("@/assets/data/diseases_chinese.json")
            : await import("@/assets/data/diseases.json");

        this.diseases = dataFile.default;
        this.diseaseNames = Object.keys(this.diseases);
        console.log(this.diseaseNames);
      } catch (error) {
        console.error("Failed to load disease data:", error);
      }
    },
    // 切换语言
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      const deviceType = this.getDeviceType();
      const basePath = deviceType === "mobile" ? "/mobile" : "/pc";
      const newPath = `${basePath}/${lang}`;
      this.$router.push(newPath).catch((err) => {
        if (err.name !== "NavigationDuplicated") {
          console.error("Navigation error:", err);
        }
      });
      this.langDialogVisible = false;
    },
    // 显示多语言弹框
    showLangDialog() {
      this.langDialogVisible = true;
    },
    goHowUse() {
      const lang = this.$i18n.locale;
      this.$router
        .push({
          path: `/howtouse/${lang}`,
        })
        .catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            console.error("Navigation error:", err);
          }
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
      const nameToSearch = this.message.trim();
      if (!nameToSearch) {
        Toast(this.$t("mobile.enterValidDisease"));
        return;
      }

      // 根据当前语言进行匹配
      const searchInput = nameToSearch.toLowerCase();
      const matchedDisease = this.diseaseNames.find(
        (disease) => disease.toLowerCase() === searchInput
      );

      if (matchedDisease) {
        this.navigateToDiseasePage(matchedDisease);
      } else {
        const fuzzyMatches = this.diseaseNames.filter((disease) =>
          disease.toLowerCase().includes(searchInput)
        );

        if (fuzzyMatches.length > 0) {
          this.showDiseaseDialog(fuzzyMatches);
        } else {
          Toast(this.$t("mobile.noDiseaseFound"));
          this.message = "";
        }
      }
    },
    /**
     * 显示模糊匹配的对话框
     */
    showDiseaseDialog(fuzzyMatches) {
      this.fuzzyMatches = fuzzyMatches;
      this.showDialog = true;
    },
    /**
     * 处理用户在弹框中选择的疾病
     */
    findDisease(selectedDisease) {
      this.showDialog = false;
      this.navigateToDiseasePage(selectedDisease);
    },
    /**
     * 跳转到疾病详情页的逻辑
     */
    navigateToDiseasePage(diseaseName) {
      const lang = this.$i18n.locale;
      const deviceType = this.getDeviceType();
      const routeName = deviceType === "mobile" ? "MobileDisease" : "PcDisease";
      this.$router
        .push({
          name: routeName,
          params: { lang },
          query: { diseaseName },
        })
        .then(() => {
          // 跳转成功后，延迟重定向到不带查询参数的路径
          this.$router
            .replace({
              name: routeName,
              params: { lang },
            })
            .catch((err) => {
              if (err.name !== "NavigationDuplicated") {
                console.error("Navigation redirect error:", err);
              }
            });
        })
        .catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            console.error("Navigation error:", err);
          }
        });
    },
  },
  created() {
    this.loadDiseaseData(); // 初始化时加载疾病数据
  },
};
</script>

<style scoped>
.mobile_page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.mobile_page_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1018280d;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
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
  width: 100%;
}

.mobile_page_content_top .caption {
  font-size: 20px;
  font-weight: 600;
  color: #353535;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile_page_content_top .caption img {
  width: 32px;
  height: 32px;
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
