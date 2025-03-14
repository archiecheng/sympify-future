<template>
  <div class="how_use">
    <el-container>
      <el-header>
        <van-nav-bar
          :title="$t('howToUseTitle')"
          left-arrow
          @click-left="onClickLeft"
        />
      </el-header>
      <el-main>
        <div class="content">
          <div class="desc">
            {{ $t("howToUseStep1") }}
          </div>
          <div class="desc_img">
            <el-image :src="imageUrl1"></el-image>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="content">
          <div class="desc">
            {{ $t("howToUseStep2") }}
          </div>
          <div class="desc_img">
            <el-image :src="imageUrl2"></el-image>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="content">
          <div class="desc">
            {{ $t("howToUseStep3") }}
          </div>
          <div class="desc_img">
            <el-image :src="imageUrl3"></el-image>
            <el-image :src="imageUrl4"></el-image>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="content">
          <div class="desc">
            {{ $t("howToUseStep4") }}
          </div>
          <div class="desc_img">
            <el-image :src="imageUrl5"></el-image>
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
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
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
  /* color: black;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 60px; */
  padding: 0px;
}
.how_use .el-main {
  color: black;
  font-size: 24px;
  text-align: left;
}

.how_use .content {
  display: flex;
  flex-direction: column;
}
.how_use .content .desc {
  margin-bottom: 20px;
}
.how_use .content img {
  margin-right: 10px;
}
.how_use .content .desc_img {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
