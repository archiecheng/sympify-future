<template>
  <div class="how_use">
    <el-container>
      <el-header>
        <van-nav-bar :title="$t('pc.howToUseTitle')" left-arrow @click-left="onClickLeft" />
      </el-header>
      <el-main>
        <div class="content">
          <div class="desc" :class="{ mobile: isMobile }">
            {{ $t("pc.howToUseStep1") }}
          </div>
          <div class="desc_img">
            <el-image :src="imageUrl1" :class="{ mobile: isMobile }"></el-image>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="content">
          <div class="desc" :class="{ mobile: isMobile }">
            {{ $t("pc.howToUseStep2") }}
          </div>
          <div class="desc_img">
            <el-image :src="imageUrl2" :class="{ mobile: isMobile }"></el-image>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="content">
          <div class="desc" :class="{ mobile: isMobile }">
            {{ $t("pc.howToUseStep3") }}
          </div>
          <div class="desc_img">
            <el-image :src="imageUrl3" :class="{ mobile: isMobile }"></el-image>
            <el-image :src="imageUrl4" :class="{ mobile: isMobile }"></el-image>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="content">
          <div class="desc" :class="{ mobile: isMobile }">
            {{ $t("pc.howToUseStep4") }}
          </div>
          <div class="desc_img">
            <el-image :src="imageUrl5" :class="{ mobile: isMobile }"></el-image>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl1: require("@/assets/img/pc/how_use_1.png"),
      imageUrl2: require("@/assets/img/pc/how_use_2.png"),
      imageUrl3: require("@/assets/img/pc/how_use_3.png"),
      imageUrl4: require("@/assets/img/pc/how_use_4.png"),
      imageUrl5: require("@/assets/img/pc/how_use_5.png"),
    };
  },
  computed: {
    isMobile() {
      return /Mobile|Android|iPhone/.test(navigator.userAgent);
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  created() {
    // 确保语言与路由参数一致
    const lang = this.$route.params.lang;
    if (lang && this.$i18n.locale !== lang) {
      this.$i18n.locale = lang;
    }
  },
};
</script>

<style scoped>
.how_use {
  box-sizing: border-box;
  padding: 20px;
}

.how_use .el-container {
  margin-bottom: 10px;
}

.how_use ::v-deep(.van-nav-bar__title) {
  font-size: 20px !important;
  font-weight: bold !important;
}

.how_use .van-nav-bar ::v-deep(.van-icon) {
  color: black;
}

.how_use .el-header {
  padding: 0px;
}

.how_use .el-main {
  color: black;
  text-align: left;
}

.how_use .content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.how_use .content .desc {
  margin-bottom: 20px;
  font-size: 16px;
}

.how_use .content .desc.mobile {
  font-size: 14px; /* Mobile 上缩小字体 */
}

.how_use .content .desc_img {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; /* 允许图片换行 */
}

.how_use .desc_img .el-image {
  margin: 10px;
  max-width: 100%; /* 确保图片适配容器 */
  height: auto;
}

.how_use .desc_img .el-image.mobile {
  max-width: 80%; /* Mobile 上缩小图片 */
}
</style>