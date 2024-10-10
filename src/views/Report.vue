<template>
  <div class="pc_report">
    <div class="pc_report_header">
      <div class="pc_report_header_left">
        <img src="../assets/img/mobile/logo.png" alt="" />
        <div>Sympify.ai</div>
      </div>
      <div class="pc_report_header_center">
        <div>Medical Report</div>
      </div>
      <div class="pc_report_header_right">Download</div>
    </div>
    <div class="pc_report_content">
        <div class="pers_info">
            <div>Reported: 123456</div>
            <div>Time: 16:29</div>
        </div>
        <div class="symptoms_do_occur">
            <div class="do_occur_title">These symptoms do occur</div>
            <div class="do_occur_diseases">
                <div class="symptom">Headache</div>
                <div class="symptom">Headache</div>
                <div class="symptom">Headache</div>
                <div class="symptom">Headache</div>
            </div>
        </div>
        <div class="symptoms_unsure_occur">
            <div class="unsure_occur_title">Unsure if these symptoms occur</div>
            <div class="unsure_occur_diseases">
                <div class="unsure_symptom">Headache</div>
                <div class="unsure_symptom">Headache</div>
                <div class="unsure_symptom">Headache</div>
                <div class="unsure_symptom">Headache</div>
            </div>
        </div>
        <div class="dash_line"></div>
        <div class="predicted">Predicted diseases</div>
        <div class="disease_matches">
            <div class="disease_matches_title">Disease Matches (85%-100%)</div>
            <div class="disease_matches_content">
                <div class="predicted_symptom">Malaria</div>
                <div class="predicted_symptom">Malaria</div>
                <div class="predicted_symptom">Malaria</div>
                <div class="predicted_symptom">Malaria</div>
            </div>
        </div>
        <div class="disease_matches">
            <div class="disease_matches_title">Disease Matches (70%-85%)</div>
            <div class="disease_matches_content">
                <div class="predicted_symptom">Malaria</div>
                <div class="predicted_symptom">Malaria</div>
                <div class="predicted_symptom">Malaria</div>
                <div class="predicted_symptom">Malaria</div>
            </div>
        </div>
        <div class="disease_matches">
            <div class="disease_matches_title">Disease Matches (55%-70%)</div>
            <div class="disease_matches_content">
                <div class="predicted_symptom">Malaria</div>
                <div class="predicted_symptom">Malaria</div>
                <div class="predicted_symptom">Malaria</div>
                <div class="predicted_symptom">Malaria</div>
            </div>
        </div>
    </div>
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
.pc_report_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1018280d;
  box-sizing: border-box;
  padding: 10px;
}

.pc_report_header_left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pc_report_header_left img {
  margin-right: 5px;
}

.pc_report_header_left div {
  font-weight: 600;
  font-size: 14px;
  color: #353535;
}

.pc_report_header_center div {
  font-size: 18px;
  font-weight: 600;
  color: #101828;
}

.pc_report_header_right {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: #101828;
  border: 1px solid #eaecf0;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10cqh;
}

.pc_report_content {
    box-sizing: border-box;
}

.pers_info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 20px;
    border-bottom: 1px solid #eaecf0;
}

.pers_info div{ 
    font-weight: 500;
    font-size: 12px;
    color: #667085;
}

.pers_info div:nth-child(1) {
    margin-right: 20px;
}

.symptoms_do_occur, .symptoms_unsure_occur {
    box-sizing: border-box;
    padding: 0 20px;
    margin-bottom: 20px;
}

.do_occur_diseases {
    display: flex;
}

.symptom {
    background:#ECFDF3;
    color: #067647;
    border: 1px solid #ABEFC6;
    font-size: 14px;
    font-weight: 500;
    width: auto;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 5px;
    margin-right: 10px;
    cursor: pointer;
}

.do_occur_title, .unsure_occur_title {
    font-weight: 600;
    font-size: 16px;
    color: #101828;
    margin-bottom: 10px;
}

.unsure_occur_diseases {
    display: flex;
}

.unsure_symptom {
    background:#FEF6EE;
    color: #B93815;
    border: 1px solid #F9DBAF;
    font-size: 14px;
    font-weight: 500;
    width: auto;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 5px;
    margin-right: 10px;
    cursor: pointer;
}

.dash_line {
    border: 1px dashed #eaecf0;
    box-sizing: border-box;
    padding: 0 10px;
    margin-bottom: 10px;
}

.predicted {
    font-weight: 600;
    font-size: 16px;
    color: #667085;
    box-sizing: border-box;
    padding: 0 20px;
}

.disease_matches {
    /* box-sizing: border-box;
    padding: 10px; */
}

.disease_matches .disease_matches_title {
    font-weight: 600;
    font-size: 16px;
    color: #101828;
    box-sizing: border-box;
    padding: 20px;
}

.disease_matches_content {
    border: 1px solid #EAECF0;
    display: flex;
    box-sizing: border-box;
    padding: 20px;
    
}

.predicted_symptom {
    background: #F8F9FC;
    border: 1px solid #D5D9EB;
    color: #363F72;
    width: auto;
    border-radius: 10px;
    margin-right: 10px;
    box-sizing: border-box;
    padding: 10px;
}
</style>
