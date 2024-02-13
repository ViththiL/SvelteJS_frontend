<script>
  // @ts-nocheck
  import Icon from "@iconify/svelte"
  import { createEventDispatcher, onMount } from "svelte"
  import Button from "../../Shared/Buttons/ButtonPrimary.svelte"
  import CancelBtn from "../../Shared/Buttons/ButtonSecondary.svelte"
  import Select from "../../Shared/Select/Select.svelte"
  import * as API from "../../../api/base"
  import SelectById from "../../Shared/Select/SelectById.svelte"
  import { allPackages } from "../../../Store/Homepage"
  import { notifications } from "../../../Store/notifications"
  import { companyList } from "../../../Store/Company"
  const dispatch = createEventDispatcher()

  export let info

  let billingMethods = [
    {
      name: "Monthly",
    },
    {
      name: "3 Months",
    },
    {
      name: "6 Months",
    },
    {
      name: "Yearly",
    },
  ]

  let selectedBillingMethod = "Monthly"

  let packages = [
    {
      id: "#custom",
      name: "Custom",
    },
  ]

  let allCategories = []
  let allFeatures = []

  let formData = {
    effectiveDate: "",
    packageId: "1",
    companyId: "",
    customPackage: false,
    expiredDate: "",
    billingPeriod: "",
    active: false,
    features: [],
    cost: "",
    comments: "",
  }

  const handleSelect = () => {
    if (formData.packageId === "#custom") {
      formData.customPackage = true
    } else {
      formData.features = []
      formData.customPackage = false
      let obj = $allPackages.find((item) => item.id === formData.packageId)

      if (obj) {
        formData.features = [...obj.features]
      } else {
        formData.features = []
      }
    }
  }

  const hanndleFeatureSelect = (value) => {
    if (formData.features.includes(value)) {
      formData.features = formData.features.filter((item) => item !== value)
    } else {
      formData.features = [...formData.features, value]
    }
  }

  const handleCustomFeatures = () => {
    formData.packageId = "#custom"
    formData.customPackage = true
  }

  const handleSubmit = async () => {
    try {
      const res = await API.updateCompantFeatures(info.data.id, formData)
      if (res.status === 200) {
        const resCompanies = await API.getAllCompaines()
        companyList.update(() => resCompanies.data)
        dispatch("close")
      }
    } catch (error) {
      console.log(error)
    }
  }

  onMount(async () => {
    console.log(info)
    try {
      const resCategories = await API.getFeaturesCategories()
      allCategories = resCategories.data
      const resFeatures = await API.getAllFeatures()
      allFeatures = resFeatures.data

      const resPackages = await API.getAllPackeges()
      packages = [...resPackages.data, ...packages]
      if (info.method === "Edit") {
        formData = info.data
      }
    } catch (error) {
      console.log(error)
    }
  })
</script>

<div class="body_wrapper">
  <div class="form_wrapper">
    <div class="input_row col-3">
      <small>Effective Date</small>
      <input
        type="date"
        class="form-control "
        bind:value={formData.effectiveDate}
      />
    </div>
    <div class="input_row col-3">
      <small>Packages</small>
      <div>
        <SelectById
          categories={packages}
          bind:selectedItemId={formData.packageId}
          on:select={handleSelect}
        />
      </div>
    </div>
    <div class="input_row col-3">
      <small>Billing Period</small>
      <div>
        <Select
          categories={billingMethods}
          bind:selectedItem={selectedBillingMethod}
        />
      </div>
    </div>

    <small>Features</small>
    <div class="feature_table">
      <div class="feature_table_header">
        <div class="feature_table_header_item col-1">
          <small>Enable</small>
        </div>
        <div class="feature_table_header_item col-10">
          <small>Feature Name</small>
        </div>
        <div class="feature_table_header_item col-1">
          <small>Cost</small>
        </div>
      </div>
      <div class="feature_table_body">
        {#each allCategories as category}
          <div class="feature_category my-2">
            <small class="fw-bold ">{category.name}</small>
          </div>
          <div class="feature_table_row_wrapper">
            {#each allFeatures.filter((item) => item.category === category.id) as feature}
              <div class="feature_table_row">
                <div class="feature_table_row_item col-1">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    value={feature.id}
                    on:click={() => hanndleFeatureSelect(feature.id)}
                    checked={formData.features.includes(feature.id)}
                    disabled={!formData.customPackage}
                  />
                </div>
                <div class="feature_table_row_item col-10">
                  <small>{feature.name}</small>
                </div>
                <div class="feature_table_row_item col-1">
                  {#if feature.costMethod === "Free"}
                    <small>free</small>
                  {:else}
                    <small>${feature.monthlyCost}</small>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
    <div class="total_row">
      <Button
        title="Change Features"
        disable={formData.customPackage}
        on:handleClick={handleCustomFeatures}
      />
      <small class="fw-bold">Total: &nbsp; $0 /{selectedBillingMethod}</small>
    </div>
    <div class="input_row col-3">
      <small>
        Sales Cost
        <span
          type="button"
          data-bs-toggle="tooltip"
          title="<em>Tooltip</em> <u>with</u> <b>HTML</b>"
        >
          <Icon icon="clarity:info-line" width="18" />
        </span>
      </small>
      <input type="text" class="form-control" disabled />
    </div>
  </div>
  <div class="action_bar">
    <CancelBtn title="Cancel" on:handleClick={() => dispatch("close")} />
    <Button title="Save" on:handleClick={() => handleSubmit()} />
  </div>
</div>

<style>
  .body_wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-color: white;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    padding: 40px;
    margin-top: 20px;
  }

  .form_wrapper {
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .action_bar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 20px 0;
    gap: 10px;
    cursor: pointer;
  }
  .feature_table {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 300px;
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
    justify-content: space-between;
    padding: 10px;
  }
</style>
