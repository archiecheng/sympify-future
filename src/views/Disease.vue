<template>
  <div class="disease_page">
    <div class="disease_page_header">
      <div class="disease_page_header_left">
        <img src="../assets/img/mobile/logo.png" alt="" />
        <div>Sympify.ai</div>
      </div>
      <div class="disease_page_header_right" @click="show = true">
        <img src="../assets/img/mobile/more.png" alt="" />
      </div>
    </div>
    <div class="disease_page_content">
      <div class="disease_card">
        <div class="disease_summary">
          <div class="disease_name">
            <div class="disease_name_left">
              <van-icon name="arrow-left" size="25" />
              <span>Covid-19</span>
            </div>
            <div class="disease_name_right" @click="showDiseaseDetail = true">
              <img src="../assets/img/mobile/disease_info.png" alt="" />
            </div>
          </div>
          <div class="disease_pic">
            <img src="../assets/img/mobile/disease.png" alt="" />
          </div>
          <div class="disease_desc">
            For the following symptoms, please select Yes, No & Maybe according
            to your personal wellbeing
          </div>
          <van-divider />
        </div>
        <div class="disease_symptoms">
          <div class="disease_symptom_item">
            <div class="disease_symptom_name">Sore throat</div>
            <div class="disease_symptom_selections">
              <div class="radio_container">
                <input
                  type="radio"
                  id="sore_throat_yes"
                  name="sore_throat"
                  value="yes"
                />
                <label for="sore_throat_yes">Yes</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="sore_throat_no"
                  name="sore_throat"
                  value="no"
                />
                <label for="sore_throat_no">No</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="sore_throat_maybe"
                  name="sore_throat"
                  value="maybe"
                />
                <label for="sore_throat_maybe">Maybe</label>
              </div>
            </div>
          </div>
          <div class="disease_symptom_item">
            <div class="disease_symptom_name">Muscle or body aches</div>
            <div class="disease_symptom_selections">
              <div class="radio_container">
                <input
                  type="radio"
                  id="muscle_aches_yes"
                  name="muscle_aches"
                  value="yes"
                />
                <label for="muscle_aches_yes">Yes</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="muscle_aches_no"
                  name="muscle_aches"
                  value="no"
                />
                <label for="muscle_aches_no">No</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="muscle_aches_maybe"
                  name="muscle_aches"
                  value="maybe"
                />
                <label for="muscle_aches_maybe">Maybe</label>
              </div>
            </div>
          </div>
          <div class="disease_symptom_item">
            <div class="disease_symptom_name">Headache</div>
            <div class="disease_symptom_selections">
              <div class="radio_container">
                <input
                  type="radio"
                  id="headache_yes"
                  name="Headache"
                  value="yes"
                />
                <label for="headache_yes">Yes</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="headache_no"
                  name="Headache"
                  value="no"
                />
                <label for="headache_no">No</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="headache_maybe"
                  name="Headache"
                  value="maybe"
                />
                <label for="headache_maybe">Maybe</label>
              </div>
            </div>
          </div>
          <div class="disease_symptom_item">
            <div class="disease_symptom_name">
              Shortness of breath or difficulty breathing
            </div>
            <div class="disease_symptom_selections">
              <div class="radio_container">
                <input
                  type="radio"
                  id="breath_yes"
                  name="Shortness of breath or difficulty breathing"
                  value="yes"
                />
                <label for="breath_yes">Yes</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="breath_no"
                  name="Shortness of breath or difficulty breathing"
                  value="no"
                />
                <label for="breath_no">No</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="breath_maybe"
                  name="Shortness of breath or difficulty breathing"
                  value="maybe"
                />
                <label for="breath_maybe">Maybe</label>
              </div>
            </div>
          </div>
          <div class="disease_symptom_item">
            <div class="disease_symptom_name">Sore throat</div>
            <div class="disease_symptom_selections">
              <div class="radio_container">
                <input
                  type="radio"
                  id="sore_throat_yes"
                  name="sore_throat"
                  value="yes"
                />
                <label for="sore_throat_yes">Yes</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="sore_throat_no"
                  name="sore_throat"
                  value="no"
                />
                <label for="sore_throat_no">No</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="sore_throat_maybe"
                  name="sore_throat"
                  value="maybe"
                />
                <label for="sore_throat_maybe">Maybe</label>
              </div>
            </div>
          </div>
          <div class="disease_symptom_item">
            <div class="disease_symptom_name">Muscle or body aches</div>
            <div class="disease_symptom_selections">
              <div class="radio_container">
                <input
                  type="radio"
                  id="muscle_aches_yes"
                  name="muscle_aches"
                  value="yes"
                />
                <label for="muscle_aches_yes">Yes</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="muscle_aches_no"
                  name="muscle_aches"
                  value="no"
                />
                <label for="muscle_aches_no">No</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="muscle_aches_maybe"
                  name="muscle_aches"
                  value="maybe"
                />
                <label for="muscle_aches_maybe">Maybe</label>
              </div>
            </div>
          </div>
          <div class="disease_symptom_item">
            <div class="disease_symptom_name">Headache</div>
            <div class="disease_symptom_selections">
              <div class="radio_container">
                <input
                  type="radio"
                  id="headache_yes"
                  name="Headache"
                  value="yes"
                />
                <label for="headache_yes">Yes</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="headache_no"
                  name="Headache"
                  value="no"
                />
                <label for="headache_no">No</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="headache_maybe"
                  name="Headache"
                  value="maybe"
                />
                <label for="headache_maybe">Maybe</label>
              </div>
            </div>
          </div>
          <div class="disease_symptom_item">
            <div class="disease_symptom_name">
              Shortness of breath or difficulty breathing
            </div>
            <div class="disease_symptom_selections">
              <div class="radio_container">
                <input
                  type="radio"
                  id="breath_yes"
                  name="Shortness of breath or difficulty breathing"
                  value="yes"
                />
                <label for="breath_yes">Yes</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="breath_no"
                  name="Shortness of breath or difficulty breathing"
                  value="no"
                />
                <label for="breath_no">No</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="breath_maybe"
                  name="Shortness of breath or difficulty breathing"
                  value="maybe"
                />
                <label for="breath_maybe">Maybe</label>
              </div>
            </div>
          </div>
          <div class="disease_symptom_item">
            <div class="disease_symptom_name">Sore throat</div>
            <div class="disease_symptom_selections">
              <div class="radio_container">
                <input
                  type="radio"
                  id="sore_throat_yes"
                  name="sore_throat"
                  value="yes"
                />
                <label for="sore_throat_yes">Yes</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="sore_throat_no"
                  name="sore_throat"
                  value="no"
                />
                <label for="sore_throat_no">No</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="sore_throat_maybe"
                  name="sore_throat"
                  value="maybe"
                />
                <label for="sore_throat_maybe">Maybe</label>
              </div>
            </div>
          </div>
          <div class="disease_symptom_item">
            <div class="disease_symptom_name">Muscle or body aches</div>
            <div class="disease_symptom_selections">
              <div class="radio_container">
                <input
                  type="radio"
                  id="muscle_aches_yes"
                  name="muscle_aches"
                  value="yes"
                />
                <label for="muscle_aches_yes">Yes</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="muscle_aches_no"
                  name="muscle_aches"
                  value="no"
                />
                <label for="muscle_aches_no">No</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="muscle_aches_maybe"
                  name="muscle_aches"
                  value="maybe"
                />
                <label for="muscle_aches_maybe">Maybe</label>
              </div>
            </div>
          </div>
          <div class="disease_symptom_item">
            <div class="disease_symptom_name">Headache</div>
            <div class="disease_symptom_selections">
              <div class="radio_container">
                <input
                  type="radio"
                  id="headache_yes"
                  name="Headache"
                  value="yes"
                />
                <label for="headache_yes">Yes</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="headache_no"
                  name="Headache"
                  value="no"
                />
                <label for="headache_no">No</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="headache_maybe"
                  name="Headache"
                  value="maybe"
                />
                <label for="headache_maybe">Maybe</label>
              </div>
            </div>
          </div>
          <div class="disease_symptom_item">
            <div class="disease_symptom_name">
              Shortness of breath or difficulty breathing
            </div>
            <div class="disease_symptom_selections">
              <div class="radio_container">
                <input
                  type="radio"
                  id="breath_yes"
                  name="Shortness of breath or difficulty breathing"
                  value="yes"
                />
                <label for="breath_yes">Yes</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="breath_no"
                  name="Shortness of breath or difficulty breathing"
                  value="no"
                />
                <label for="breath_no">No</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="breath_maybe"
                  name="Shortness of breath or difficulty breathing"
                  value="maybe"
                />
                <label for="breath_maybe">Maybe</label>
              </div>
            </div>
          </div>
          <div class="disease_symptom_item">
            <div class="disease_symptom_name">Sore throat</div>
            <div class="disease_symptom_selections">
              <div class="radio_container">
                <input
                  type="radio"
                  id="sore_throat_yes"
                  name="sore_throat"
                  value="yes"
                />
                <label for="sore_throat_yes">Yes</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="sore_throat_no"
                  name="sore_throat"
                  value="no"
                />
                <label for="sore_throat_no">No</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="sore_throat_maybe"
                  name="sore_throat"
                  value="maybe"
                />
                <label for="sore_throat_maybe">Maybe</label>
              </div>
            </div>
          </div>
          <div class="disease_symptom_item">
            <div class="disease_symptom_name">Muscle or body aches</div>
            <div class="disease_symptom_selections">
              <div class="radio_container">
                <input
                  type="radio"
                  id="muscle_aches_yes"
                  name="muscle_aches"
                  value="yes"
                />
                <label for="muscle_aches_yes">Yes</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="muscle_aches_no"
                  name="muscle_aches"
                  value="no"
                />
                <label for="muscle_aches_no">No</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="muscle_aches_maybe"
                  name="muscle_aches"
                  value="maybe"
                />
                <label for="muscle_aches_maybe">Maybe</label>
              </div>
            </div>
          </div>
          <div class="disease_symptom_item">
            <div class="disease_symptom_name">Headache</div>
            <div class="disease_symptom_selections">
              <div class="radio_container">
                <input
                  type="radio"
                  id="headache_yes"
                  name="Headache"
                  value="yes"
                />
                <label for="headache_yes">Yes</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="headache_no"
                  name="Headache"
                  value="no"
                />
                <label for="headache_no">No</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="headache_maybe"
                  name="Headache"
                  value="maybe"
                />
                <label for="headache_maybe">Maybe</label>
              </div>
            </div>
          </div>
          <div class="disease_symptom_item">
            <div class="disease_symptom_name">
              Shortness of breath or difficulty breathing
            </div>
            <div class="disease_symptom_selections">
              <div class="radio_container">
                <input
                  type="radio"
                  id="breath_yes"
                  name="Shortness of breath or difficulty breathing"
                  value="yes"
                />
                <label for="breath_yes">Yes</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="breath_no"
                  name="Shortness of breath or difficulty breathing"
                  value="no"
                />
                <label for="breath_no">No</label>
              </div>
              <div class="radio_container">
                <input
                  type="radio"
                  id="breath_maybe"
                  name="Shortness of breath or difficulty breathing"
                  value="maybe"
                />
                <label for="breath_maybe">Maybe</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="disease_bottom">
      <div class="disease_bottom_button" @click="showSymptomProfile = true">
        View Summary
      </div>
      <div class="disease_bottom_button">Generate Report</div>
    </div>
    <van-popup
      v-model="showSymptomProfile"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <div class="symptom_profile">
        <div class="symptom_profile_header">
          <div class="symptom_profile_left">
            <van-icon name="arrow-left" />
            <div>Symptom Profile</div>
          </div>
          <div class="symptom_profile_right" @click="show = true">
            <img src="../assets/img/mobile/more.png" alt="" />
          </div>
        </div>
        <div class="symptom_profile_content">
          <div class="symptom_profile_item">
            <div class="symptom_profile_item_left">
              <div class="dot"></div>
              Sore Throat
            </div>
            <div class="symptom_profile_item_right">
              <van-icon name="cross" />
            </div>
          </div>
          <div class="symptom_profile_item">
            <div class="symptom_profile_item_left">
              <div class="dot"></div>
              Sore Throat
            </div>
            <div class="symptom_profile_item_right">
              <van-icon name="cross" />
            </div>
          </div>
          <div class="symptom_profile_item">
            <div class="symptom_profile_item_left">
              <div class="dot"></div>
              Sore Throat
            </div>
            <div class="symptom_profile_item_right">
              <van-icon name="cross" />
            </div>
          </div>
          <div class="symptom_profile_item">
            <div class="symptom_profile_item_left">
              <div class="dot"></div>
              Sore Throat
            </div>
            <div class="symptom_profile_item_right">
              <van-icon name="cross" />
            </div>
          </div>
          <div class="symptom_profile_item">
            <div class="symptom_profile_item_left">
              <div class="dot"></div>
              Sore Throat
            </div>
            <div class="symptom_profile_item_right">
              <van-icon name="cross" />
            </div>
          </div>
          <div class="symptom_profile_item">
            <div class="symptom_profile_item_left">
              <div class="dot"></div>
              Sore Throat
            </div>
            <div class="symptom_profile_item_right">
              <van-icon name="cross" />
            </div>
          </div>
          <div class="symptom_profile_item">
            <div class="symptom_profile_item_left">
              <div class="dot"></div>
              Sore Throat
            </div>
            <div class="symptom_profile_item_right">
              <van-icon name="cross" />
            </div>
          </div>
          <div class="symptom_profile_item">
            <div class="symptom_profile_item_left">
              <div class="dot"></div>
              Sore Throat
            </div>
            <div class="symptom_profile_item_right">
              <van-icon name="cross" />
            </div>
          </div>
          <div class="symptom_profile_item">
            <div class="symptom_profile_item_left">
              <div class="dot"></div>
              Sore Throat
            </div>
            <div class="symptom_profile_item_right">
              <van-icon name="cross" />
            </div>
          </div>
          <div class="symptom_profile_item">
            <div class="symptom_profile_item_left">
              <div class="dot"></div>
              Sore Throat
            </div>
            <div class="symptom_profile_item_right">
              <van-icon name="cross" />
            </div>
          </div>
          <div class="symptom_profile_item">
            <div class="symptom_profile_item_left">
              <div class="dot"></div>
              Sore Throat
            </div>
            <div class="symptom_profile_item_right">
              <van-icon name="cross" />
            </div>
          </div>
          <div class="symptom_profile_item">
            <div class="symptom_profile_item_left">
              <div class="dot"></div>
              Sore Throat
            </div>
            <div class="symptom_profile_item_right">
              <van-icon name="cross" />
            </div>
          </div>
          <div class="symptom_profile_item">
            <div class="symptom_profile_item_left">
              <div class="dot"></div>
              Sore Throat
            </div>
            <div class="symptom_profile_item_right">
              <van-icon name="cross" />
            </div>
          </div>
          <div class="symptom_profile_item">
            <div class="symptom_profile_item_left">
              <div class="dot"></div>
              Sore Throat
            </div>
            <div class="symptom_profile_item_right">
              <van-icon name="cross" />
            </div>
          </div>
          <div class="symptom_profile_item">
            <div class="symptom_profile_item_left">
              <div class="dot"></div>
              Sore Throat
            </div>
            <div class="symptom_profile_item_right">
              <van-icon name="cross" />
            </div>
          </div>
          <div class="symptom_profile_item">
            <div class="symptom_profile_item_left">
              <div class="dot"></div>
              Sore Throat
            </div>
            <div class="symptom_profile_item_right">
              <van-icon name="cross" />
            </div>
          </div>
          <div class="symptom_profile_item">
            <div class="symptom_profile_item_left">
              <div class="dot"></div>
              Sore Throat
            </div>
            <div class="symptom_profile_item_right">
              <van-icon name="cross" />
            </div>
          </div>
          <div class="symptom_profile_item">
            <div class="symptom_profile_item_left">
              <div class="dot"></div>
              Sore Throat
            </div>
            <div class="symptom_profile_item_right">
              <van-icon name="cross" />
            </div>
          </div>
        </div>
        <div class="symptom_profile_bottom">
          <div class="generate_buttop">Generate Report</div>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="showDiseaseDetail"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <div class="disease_detail">
        <div class="disease_detail_header">
          <div>Coronavirus disease 2019 (COVID-19)</div>
          <div><van-icon name="cross" /></div>
        </div>
        <div class="disease_detail_content">
          <van-collapse v-model="activeNames">
            <van-collapse-item title="OverView" name="1">
              COVID-19, also called coronavirus disease 2019, is an illness
              caused by a virus. The virus is called severe acute respiratory
              syndrome coronavirus 2, or more commonly, SARS-CoV-2. It started
              spreading at the end of 2019 and became a pandemic disease in
              2020. The virus that causes COVID-19 spreads most commonly through
              the air in tiny droplets of fluid between people in close contact.
              Many people with COVID-19 have no symptoms or mild illness. But
              for older adults and people with certain medical
              conditions, COVID-19 can lead to the need for care in the hospital
              or death. Staying up to date on your COVID-19 vaccine helps
              prevent serious illness, the need for hospital care due
              to COVID-19 and death from COVID-19. Other ways that may help
              prevent the spread of this coronavirus includes good indoor air
              flow, physical distancing, wearing a mask in the right setting and
              good hygiene.
            </van-collapse-item>
            <van-collapse-item title="Causes" name="2">
              COVID-19, also called coronavirus disease 2019, is an illness
              caused by a virus. The virus is called severe acute respiratory
              syndrome coronavirus 2, or more commonly, SARS-CoV-2. It started
              spreading at the end of 2019 and became a pandemic disease in
              2020. The virus that causes COVID-19 spreads most commonly through
              the air in tiny droplets of fluid between people in close contact.
              Many people with COVID-19 have no symptoms or mild illness. But
              for older adults and people with certain medical
              conditions, COVID-19 can lead to the need for care in the hospital
              or death. Staying up to date on your COVID-19 vaccine helps
              prevent serious illness, the need for hospital care due
              to COVID-19 and death from COVID-19. Other ways that may help
              prevent the spread of this coronavirus includes good indoor air
              flow, physical distancing, wearing a mask in the right setting and
              good hygiene.
            </van-collapse-item>
            <van-collapse-item title="Symptoms" name="3">
              COVID-19, also called coronavirus disease 2019, is an illness
              caused by a virus. The virus is called severe acute respiratory
              syndrome coronavirus 2, or more commonly, SARS-CoV-2. It started
              spreading at the end of 2019 and became a pandemic disease in
              2020. The virus that causes COVID-19 spreads most commonly through
              the air in tiny droplets of fluid between people in close contact.
              Many people with COVID-19 have no symptoms or mild illness. But
              for older adults and people with certain medical
              conditions, COVID-19 can lead to the need for care in the hospital
              or death. Staying up to date on your COVID-19 vaccine helps
              prevent serious illness, the need for hospital care due
              to COVID-19 and death from COVID-19. Other ways that may help
              prevent the spread of this coronavirus includes good indoor air
              flow, physical distancing, wearing a mask in the right setting and
              good hygiene.
            </van-collapse-item>
            <van-collapse-item
              title="Departments that treat this condition"
              name="4"
            >
              COVID-19, also called coronavirus disease 2019, is an illness
              caused by a virus. The virus is called severe acute respiratory
              syndrome coronavirus 2, or more commonly, SARS-CoV-2. It started
              spreading at the end of 2019 and became a pandemic disease in
              2020. The virus that causes COVID-19 spreads most commonly through
              the air in tiny droplets of fluid between people in close contact.
              Many people with COVID-19 have no symptoms or mild illness. But
              for older adults and people with certain medical
              conditions, COVID-19 can lead to the need for care in the hospital
              or death. Staying up to date on your COVID-19 vaccine helps
              prevent serious illness, the need for hospital care due
              to COVID-19 and death from COVID-19. Other ways that may help
              prevent the spread of this coronavirus includes good indoor air
              flow, physical distancing, wearing a mask in the right setting and
              good hygiene.
            </van-collapse-item>
            <van-collapse-item title="Risk Factors" name="5">
              COVID-19, also called coronavirus disease 2019, is an illness
              caused by a virus. The virus is called severe acute respiratory
              syndrome coronavirus 2, or more commonly, SARS-CoV-2. It started
              spreading at the end of 2019 and became a pandemic disease in
              2020. The virus that causes COVID-19 spreads most commonly through
              the air in tiny droplets of fluid between people in close contact.
              Many people with COVID-19 have no symptoms or mild illness. But
              for older adults and people with certain medical
              conditions, COVID-19 can lead to the need for care in the hospital
              or death. Staying up to date on your COVID-19 vaccine helps
              prevent serious illness, the need for hospital care due
              to COVID-19 and death from COVID-19. Other ways that may help
              prevent the spread of this coronavirus includes good indoor air
              flow, physical distancing, wearing a mask in the right setting and
              good hygiene.
            </van-collapse-item>
            <van-collapse-item title="Complications" name="6">
              COVID-19, also called coronavirus disease 2019, is an illness
              caused by a virus. The virus is called severe acute respiratory
              syndrome coronavirus 2, or more commonly, SARS-CoV-2. It started
              spreading at the end of 2019 and became a pandemic disease in
              2020. The virus that causes COVID-19 spreads most commonly through
              the air in tiny droplets of fluid between people in close contact.
              Many people with COVID-19 have no symptoms or mild illness. But
              for older adults and people with certain medical
              conditions, COVID-19 can lead to the need for care in the hospital
              or death. Staying up to date on your COVID-19 vaccine helps
              prevent serious illness, the need for hospital care due
              to COVID-19 and death from COVID-19. Other ways that may help
              prevent the spread of this coronavirus includes good indoor air
              flow, physical distancing, wearing a mask in the right setting and
              good hygiene.
            </van-collapse-item>
            <van-collapse-item title="Prevention" name="7">
              COVID-19, also called coronavirus disease 2019, is an illness
              caused by a virus. The virus is called severe acute respiratory
              syndrome coronavirus 2, or more commonly, SARS-CoV-2. It started
              spreading at the end of 2019 and became a pandemic disease in
              2020. The virus that causes COVID-19 spreads most commonly through
              the air in tiny droplets of fluid between people in close contact.
              Many people with COVID-19 have no symptoms or mild illness. But
              for older adults and people with certain medical
              conditions, COVID-19 can lead to the need for care in the hospital
              or death. Staying up to date on your COVID-19 vaccine helps
              prevent serious illness, the need for hospital care due
              to COVID-19 and death from COVID-19. Other ways that may help
              prevent the spread of this coronavirus includes good indoor air
              flow, physical distancing, wearing a mask in the right setting and
              good hygiene.
            </van-collapse-item>
            <van-collapse-item title="Diagnosis" name="8">
              COVID-19, also called coronavirus disease 2019, is an illness
              caused by a virus. The virus is called severe acute respiratory
              syndrome coronavirus 2, or more commonly, SARS-CoV-2. It started
              spreading at the end of 2019 and became a pandemic disease in
              2020. The virus that causes COVID-19 spreads most commonly through
              the air in tiny droplets of fluid between people in close contact.
              Many people with COVID-19 have no symptoms or mild illness. But
              for older adults and people with certain medical
              conditions, COVID-19 can lead to the need for care in the hospital
              or death. Staying up to date on your COVID-19 vaccine helps
              prevent serious illness, the need for hospital care due
              to COVID-19 and death from COVID-19. Other ways that may help
              prevent the spread of this coronavirus includes good indoor air
              flow, physical distancing, wearing a mask in the right setting and
              good hygiene.
            </van-collapse-item>
            <van-collapse-item title="Treatments" name="9">
              COVID-19, also called coronavirus disease 2019, is an illness
              caused by a virus. The virus is called severe acute respiratory
              syndrome coronavirus 2, or more commonly, SARS-CoV-2. It started
              spreading at the end of 2019 and became a pandemic disease in
              2020. The virus that causes COVID-19 spreads most commonly through
              the air in tiny droplets of fluid between people in close contact.
              Many people with COVID-19 have no symptoms or mild illness. But
              for older adults and people with certain medical
              conditions, COVID-19 can lead to the need for care in the hospital
              or death. Staying up to date on your COVID-19 vaccine helps
              prevent serious illness, the need for hospital care due
              to COVID-19 and death from COVID-19. Other ways that may help
              prevent the spread of this coronavirus includes good indoor air
              flow, physical distancing, wearing a mask in the right setting and
              good hygiene.
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSymptomProfile: false,
      showDiseaseDetail: false,
      activeNames: ["1"],
    };
  },
};
</script>

<style scoped>
.disease_page_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1018280d;
  box-sizing: border-box;
  padding: 10px;
}

.disease_page_header_left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.disease_page_header_left img {
  margin-right: 5px;
}

.disease_page_header_left div {
  font-weight: 600;
  font-size: 14px;
  color: #353535;
}

.disease_page_header_right img {
  width: 18px;
  height: 12px;
}

.disease_page_content {
  height: calc(100vh - 113px);
}

.disease_card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.disease_name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
}

.disease_name .disease_name_left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.disease_name .disease_name_left span {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 20px;
  color: #353535;
  margin-left: 10px;
}

.disease_pic {
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.disease_pic img {
  width: 100%;
  border-radius: 10px;
}

.disease_desc {
  box-sizing: border-box;
  padding: 0 10px;
  font-size: 14px;
  font-weight: 500;
  color: #475467;
}

.disease_symptoms {
  box-sizing: border-box;
  padding: 0 10px;
  flex: 1;
  overflow-y: auto;
}

.disease_symptom_item {
  border-bottom: 1px solid #eaecf0;
  box-sizing: border-box;
  padding: 10px 0;
}

.disease_symptom_name {
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #101828;
}

.disease_symptom_selections {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 样式定义 */
.radio_container {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  margin-right: 10px;
}

/* 隐藏默认的 radio 样式 */
.radio_container input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  margin-right: 8px;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 50%; /* 圆形按钮 */
  position: relative;
  cursor: pointer;
}

/* 自定义选中的样式 */
.radio_container input[type="radio"]:checked::before {
  content: "\2713"; /* 对勾箭头 */
  display: block;
  width: 20px;
  height: 20px;
  font-size: 16px;
  color: white;
  text-align: center;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 确保对勾箭头居中 */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 根据 name 属性选中不同颜色 */
/* Yes - 选中时变绿色 */
input[type="radio"][value="yes"]:checked::before {
  background-color: green;
}

/* No - 选中时变红色 */
input[type="radio"][value="no"]:checked::before {
  background-color: red;
}

/* Maybe - 选中时变橙色 */
input[type="radio"][value="maybe"]:checked::before {
  background-color: rgb(244, 147, 9);
  color: white;
}

/* Label 的样式 */
.radio_container label {
  font-size: 14px;
  font-weight: 500;
  color: #101828;
  position: relative;
}

/* 鼠标悬停时的效果 */
.radio_container:hover {
  background-color: #f7f7f7;
  border-color: #007bff;
}

.disease_bottom {
  position: sticky;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #d0d5dd;
  background: white;
  box-sizing: border-box;
  padding: 10px;
}

.disease_bottom_button {
  width: 168px;
  height: 37px;
  color: #101828;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #d0d5dd;
  font-weight: 600;
}

.symptom_profile_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1018280d;
  box-sizing: border-box;
  padding: 10px;
}

.symptom_profile_left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.symptom_profile_left img {
  margin-right: 5px;
}

.symptom_profile_left div {
  font-weight: 600;
  font-size: 14px;
  color: #353535;
}

.symptom_profile_right img {
  width: 18px;
  height: 12px;
}

.symptom_profile_content {
  box-sizing: border-box;
  padding: 0 10px;
}

.symptom_profile_item {
  padding: 20px 0;
  border-bottom: 1px solid #eaecf0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.symptom_profile_item_left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #101828;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: green;
  margin-right: 10px;
}

.symptom_profile_bottom {
  position: sticky;
  bottom: 0;
  height: 64px;
  width: 100%;
  background: white;
  border-top: 1px solid #eaecf0;
}

.symptom_profile {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.symptom_profile_content {
  height: calc(100vh - 102px);
  overflow-y: auto;
}

.symptom_profile_bottom {
  box-sizing: border-box;
  padding: 10px;
}

.generate_buttop {
  border: 1px solid #eaecf0;
  font-size: 16px;
  font-weight: 500;
  color: #101828;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
}

.disease_detail {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.disease_detail_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
}

.disease_detail_header div:nth-child(1) {
  font-size: 16px;
  font-weight: 600;
  color: #353535;
}

.disease_detail_header div:nth-child(2) {
  width: 36px;
  height: 36px;
  background-color: #f2f4f7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.disease_detail_content {
    height: calc(100vh - 56px);
    overflow-y: auto;
}

.disease_detail_content ::v-deep(.van-cell__title){
    font-weight: 600;
    font-size: 18px;
    color: #101828;
}
</style>
