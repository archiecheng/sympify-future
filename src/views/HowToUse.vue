<template>
  <div class="how_use">
    <el-container>
      <el-header
        ><van-nav-bar
          title="How To Use"
          left-arrow
          @click-left="onClickLeft"
        />
      </el-header>
      <el-main>
        <div class="content">
          <div class="desc">
            1. Hello! To start, please input the diagnosed disease from your
            doctor in the chat box and click ‘Explore Symptoms’
          </div>
          <div class="desc_img">
            <el-image :src="imageUrl1"></el-image>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="content">
          <div class="desc">
            2. Once completed, you will be directed to a second screen. On this
            screen, you will be able to scroll through diseases that have
            similarities to the one you have been previously diagnosed with.
            Please select YES/NO/MAYBE for the following symptoms in each slide.
            Our app’s algorithm will automatically update as you select more
            accurate matches. Additionally, each disease will be indicated by
            icons that represent the likelihood of the disease, the severity,
            and the rarity.
          </div>
          <div class="desc_img">
            <el-image :src="imageUrl2"></el-image>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="content">
          <div class="desc">
            3. While you’re scrolling through the different diseases, you can
            review your selected symptoms in your Symptom Profile (on mobile
            you’ll need to press ‘View Summary’). There will be a download
            option at the bottom of the screen for users who would like their
            report. Once you select Generate Report, you will be asked to enter
            a Member ID. Ia Sympify Member recommended this platform to you,
            please put in their ID, if not, you can skip this step.
          </div>
          <div class="desc_img">
            <el-image :src="imageUrl3"></el-image>
            <el-image :src="imageUrl4"></el-image>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="content">
          <div class="desc">
            4. The report generated will have a list of all the symptoms that
            you clicked yes and unsure for. The disease matches at the top have
            the highest percentages, meaning you’re more likely to have those
            diseases. As you go down, the percentages will decrease. At the
            bottom, you will be met with our medical disclaimer that states this
            is not meant to replace an official diagnosis and that you are still
            required to check with your doctor along with additional
            information. Diseases on the report will have icons such as a
            diamond or a warning symbol. The diamond means it’s a rare disease
            and the warning symbol means it’s a threatening disease.
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
  font-size: 30px !important;
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
