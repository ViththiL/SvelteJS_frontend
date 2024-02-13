<script>
  // @ts-nocheck

  import Icon from "@iconify/svelte"
  import { showCalculator } from "../../../Store/Homepage"
  import { createEventDispatcher, onMount } from "svelte"
  import Select from "../../Shared/Select/Select.svelte"
  import CancelBtn from "../../Shared/Buttons/ButtonSecondary.svelte"
  import Button from "../../Shared/Buttons/ButtonPrimary.svelte"
  import * as API from "../../../api/base"
  import {notifications} from "../../../Store/notifications"


  const dispatch = createEventDispatcher()
  export let info

  let allCategories =[]
  let allFeatures = []
  let packages =[]
  let formData = {
    features:[],
    cost:"",
    costMethod:"Monthly",
    discount:"",
    discountInYearly:false,
    companyId:info.companyId
  }
  let formError = {
    cost:false,
    discount:false,
    overall:false
  }
  let step= 0
  let selectedBillingMethod = "Monthly"
 

  let featureList =[]
  let billingCycle = [
    {
      name: "Monthly",
    },
    {
      name: "Yearly",
    },
  ]
  let subToatal = 0
  let netTotal = 0
  let uniqueCategories = []
  let isExcuting =false



  const hanndleFeatureSelect = (value) => {
    if (formData.features.includes(value)) {
      formData.features = formData.features.filter((item) => item !== value)
    } else {
      formData.features = [...formData.features, value]
    }
  }

  const handleNextStep = () => {
    
    if(step === 1){
      if(formData.cost ===""){
        formError.cost = true  
             
      }else{
        formError.cost = false
        
      }

      if(formData.discountInYearly && formData.discount ===""){
        formError.discount = true
      }else{
        formError.discount = false
      }
      
      if(!formError.cost && !formError.discount){
        step++
      }else{
        formError.overall = true
      }

    }else {
      step++
    }
  }

  const handlePrevStep = () => {
    step--
  }

  const handleSubmit = async()=>{
    console.log(formData)

      try {
        isExcuting = true
        const res = await API.addAddonCompany(formData)
        console.log(formData)
        notifications.success("Successfully Addons added ...!",2000)
        dispatch("close")
      } catch (error) {
        console.log(error)
        isExcuting =false
        notifications.danger("Ops... somthing wrong ... !",2000)
      }
  }

  

  onMount(async() => {
    uniqueCategories = [...new Set(featureList.map((item) => item.category))]
    const resCategories = await API.getFeaturesCategories()
      allCategories = resCategories.data
      const resFeatures = await API.getAllFeatures()
      allFeatures = resFeatures.data

      const resPackages = await API.getAllPackeges()
      packages = [...resPackages.data, ...packages]
      if (info.method === "Edit") {
        formData = info.data
      }
  })
  
  $:if(formData.costMethod === "Monthly"){
    subToatal = formData.cost
  }else{
    subToatal = formData.cost * 12
  }

  $:if(formData.cost){
     if(formData.discountInYearly){
      netTotal = subToatal - subToatal*formData.discount/100

     }else{
      netTotal = subToatal
      console.log(netTotal)
    }
    
  }
  
</script>

<div class="body_wrapper">
  <div class="popup_wrapper">
    <div class="pop_header">
      <h5 class="mb-0 fw-bold">{info.method === "Add" ? "Add":"Update" } Addons</h5>
      <span class="close_btn" on:click={() => dispatch("close")}>
        <Icon icon="icon-park-outline:close-one" width="28" />
      </span>
    </div>
    <div class="form_wrapper">
      {#if step === 0 }
      <small>Features</small>
      <div class="feature_table">
        <div class="feature_table_header">
          <div class="feature_table_header_item col-1">
           
          </div>
          <div class="feature_table_header_item col-10">
            <small>Feature Name</small>
          </div>
          
        </div>
        <div class="feature_table_body">
          {#each allCategories as category}
            <div class="feature_category mt-1">
              <small class="fw-bold ">{category.name}</small>
            </div>
            <div class="feature_table_row_wrapper">
              {#each allFeatures.filter((item) => item.category === category.id) as feature}
                <div class="feature_table_row">
                  <div class="feature_table_row_item col-1">
                    <input type="checkbox" class="form-check-input" on:click={() => hanndleFeatureSelect(feature.id)}
                    checked={formData.features.includes(feature.id)} />
                  </div>
                  <div class="feature_table_row_item col-10">
                    <small>{feature.name}</small>
                  </div>
                  
                </div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
      {:else if step === 1}
       <div class="form_wrapper">
        <div class="input_row col-3">
          <small>Cost </small>
          <input
            type="text"
            class="form-control "
            bind:value={formData.cost}
            class:form-control_error={formError.cost}
            oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"
          />
          <small class="info">*Monthly price</small>
        </div>
        <div class="input_row col-3">
          <small>Cost Method</small>
          <div>
            <Select
              categories={billingCycle}
              bind:selectedItem={formData.costMethod}
            />
          </div>
        </div>
        <div class="input_row col-3">
          <small>Sub Total </small>
          <input
            type="text"
            class="form-control "
            bind:value={subToatal}
            disabled
          />
         
        </div>
        <span class="d-flex gap-3 align-items mt-2">
      <small >
        Include discount in percentage users who are years subscription
      </small>
      <div class="form-check form-switch">
            <!-- svelte-ignore a11y-role-has-required-aria-props -->
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:checked={formData.discountInYearly}
            />
          </div>
    </span>
    {#if formData.discountInYearly}
        <div class="input_row col-3">
          <small>Discount</small>
          <input
            type="text"
            class="form-control "
            bind:value={formData.discount}
             oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"
             class:form-control_error={formError.discount}
            
          />
         <small class="info">*As a percentage</small>
        </div>
        {/if}
        <div class="input_row col-3">
          <small>Net Total </small>
          <input
            type="text"
            class="form-control "
            bind:value={netTotal}
            disabled
          />
         
        </div>
       </div>
     
      {:else if step === 2}
      <small>Summary</small>
      <div class="addon_list_wrapper">
        {#each formData.features as feature}
         
            <div class="addon">
              <small>{allFeatures.find((item) => item.id === feature).name}</small>
            </div>
         {:else}
         <div class="empty"></div>
        {/each}
        
      </div>
      <div class="billing_info">
        <div class="billing_info_row">
          <small>Cost</small>
          <small>${formData.cost}</small>
        </div>
        <div class="billing_info_row">
          <small>Billing Cycle</small>
          <small>{formData.costMethod}</small>
        </div>
        <div class="billing_info_row">
          <small>Sub Total</small>
          <small>${subToatal}</small>
        </div>
        {#if formData.discountInYearly}
        <div class="billing_info_row">
          <small>Discount</small>
          <small>{formData.discount}</small>
        </div>
        {/if}
        <div class="billing_info_row net_total">
          <small>Net Total</small>
          <small>${netTotal}</small>
        </div>
      </div>
      {/if}

    </div>
    <div class="action_bar">
      {#if step === 0}
        <CancelBtn title="Cancel" on:handleClick={() => dispatch("close")} />
        <Button
          title="Next"
          on:handleClick={() => handleNextStep()}
          disable={formData.features.length === 0}
        />
        {:else if step === 1}
        <CancelBtn title="Back" on:handleClick={() => handlePrevStep()} />
        <Button
          title="Next"
          on:handleClick={() => handleNextStep()}
           
        />
        {:else if step === 2}
        <CancelBtn title="Back" on:handleClick={() => handlePrevStep()} />
        <Button
          title="Submit"
          on:handleClick={() => handleSubmit()}
          disable={formData.features.length === 0}
          excuting={isExcuting}
        />

        {/if}
      </div>
  </div>
</div>

<style>
  .body_wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background-color: var(--backgroudtrasparent);
    width: 100%;
    min-height: 730px;
    height: 100%;
  }
  .popup_wrapper {
    width: 600px;
    min-height: 60%;
    margin-top: 100px;
    background-color: white;
    border-radius: 15px;
    padding: 10px;
    position: relative;
  }
  .pop_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: var(--background);
    border-radius: 15px;
  }
  .close_btn {
    cursor: pointer;
    color: grey;
  }

  .form_wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px 20px;
  }

  .feature_table {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 400px;
    background-color: var(--background);
    border-radius: 15px;
    padding: 15px 10px;
  }
  .feature_table_header {
    width: 100%;
    padding: 10px;
    display: flex;
    background-color: var(--backgroundheader);
    border-radius: 15px;
  }
  .feature_table_header_item {
    font-weight: 500;
  }
  .feature_table_body {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    overflow-y: overlay;
  }
  .feature_table_row_wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 15px;
  }
  .feature_table_row {
    width: 100%;
    padding: 10px;
    display: flex;
  }
  .total_row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
  }
  .action_bar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0px 20px;
    gap: 10px;
    cursor: pointer;
    position: absolute;
    bottom: 20px;
   
  }
   .input_line {
    display: flex;
    align-items: flex-start;
    justify-content: start;
    gap: 60px;
  }
  .info{
    color: grey;
    font-size: 11px;
    margin-left: 15px;
  }
  .addon_list_wrapper{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: 170px;
    overflow-y: auto;
  }
  .addon{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    background-color: var(--background);
    border-radius: 10px;
    margin-bottom: 5px;
    font-size: 13px;
  }
  
  .billing_info{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
   
    padding: 10px;
    background-color: var(--background);
    border-radius: 10px;
  }
  .billing_info_row{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
     color:grey;
     font-weight: 500;
  }
  .net_total{
    background-color: white;
    border-radius: 10px;
  }
  
  

</style>
