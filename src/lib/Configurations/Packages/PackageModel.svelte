<script>
  // @ts-nocheck

  import Icon from "@iconify/svelte"
  import { createEventDispatcher, onMount } from "svelte"
  import Button from "../../Shared/Buttons/ButtonPrimary.svelte"
  import CancelBtn from "../../Shared/Buttons/ButtonSecondary.svelte"
  import Select from "../../Shared/Select/Select.svelte"
  import * as API from "../../../api/base"
  import { allFeatures, allpackages, allFeaturesCategories } from "../../../Store/Company"
  import { notifications } from "../../../Store/notifications"

  const dispatch = createEventDispatcher()

  export let info
  let isExcuting = false
  let formData = {
    name: "",
    costMethod: "Paid",
    monthlyCost: [
      {
        currency: "usd",
        cost: "0",
      },
      {
        currency: "cad",
        cost: "0",
      },
      {
        currency: "aud",
        cost: "0",
      },
      {
        currency: "sgd",
        cost: "0",
      },
      {
        currency: "lkr",
        cost: "0",
      },
    ],
    yearlyCost: "",
    discountInYearly: false,
    discount: "0",
    features: [],
    defaultUserCount: "4",
  }

  let formError = {
    name: false,
    overall: false,
    monthlyCost: [
      {
        currency: "usd",
        error: false,
      },
      {
        currency: "cad",
        error: false,
      },
      {
        currency: "aud",
        error: false,
      },
      {
        currency: "sgd",
        error: false,
      },
      {
        currency: "lkr",
        error: false,
      },
    ],
  }

  let billingMethods = [
    {
      name: "Free",
    },
    {
      name: "Paid",
    },
  ]

  let selectedBillingMethod = "Paid"
  let featureList = []
  let uniqueCategories = []

  const handleSelectFeatures = id => {
    if (formData.features.includes(id)) {
      let arr = formData.features.filter(item => item != id)
      formData.features = [...arr]
    } else {
      formData.features = [...formData.features, id]
    }
  }

  // function calculateCost() {
  //   for (let i = 0; i <= formData.features.length; i++) {
  //     let fe = $allFeatures.find(item => item.id === formData.features[i])
  //     if (fe) {
  //       formData.monthlyCost = parseInt(formData.monthlyCost) + parseInt(fe.monthlyCost)
  //     } else {
  //       formData.monthlyCost += 0
  //     }
  //   }
  //   if (formData.discount !== "") {
  //     formData.monthlyCost = formData.monthlyCost - formData.monthlyCost * parseInt(formData.discount) * 0.01
  //   }
  //   formData.yearlyCost = formData.monthlyCost * 12
  // }

  const handleSubmit = async () => {
    if (formData.name === "") {
      formError.name = true
    } else {
      formError.name = false
    }

    for (let i = 0; i < formData.monthlyCost.length; i++) {
      if (formData.monthlyCost[i].cost === "") {
        let index = formError.monthlyCost.findIndex(item => item.currency === formData.monthlyCost[i].currency)
        formError.monthlyCost[index].error = true
      }
    }
    formError.overall = formError.name || formError.monthlyCost.some(item => item.error) ? true : false

    if (!formError.overall && info.method === "Add") {
      try {
        isExcuting = true
        formData.yearlyCost = formData.monthlyCost * 12
        const resPackages = await API.setPackages(formData)
        if (resPackages.status === (200 || 201)) {
          const resAllPackages = await API.getAllPackeges()
          if (resAllPackages.status === 200) {
            allpackages.update(() => resAllPackages.data)
            dispatch("close")
            notifications.success("Package Added Successfully ..!", 2000)
          }
          isExcuting = false
        }
      } catch (error) {
        isExcuting = false
        console.log(error)
        notifications.danger("Ops... Somthing Wrong !", 2000)
      }
    }
    if (!formError.overall && info.method === "Edit") {
      try {
        isExcuting = true
        formData.monthlyCost = String(formData.monthlyCost)
        formData.yearlyCost = String(formData.monthlyCost * 12)
        formData.discount = String(formData.discount)
        console.log(formData)
        const resPackages = await API.updatePackages(formData.id, formData)
        if (resPackages.status === (200 || 201)) {
          const resAllPackages = await API.getAllPackeges()
          if (resAllPackages.status === 200) {
            allpackages.update(() => resAllPackages.data)
            dispatch("close")
            notifications.success("Package Updated Successfully ..!", 2000)
          }
          isExcuting = false
        }
      } catch (error) {
        isExcuting = false
        console.log(error)
        notifications.danger("Ops... Somthing Wrong !", 2000)
      }
    }
  }

  onMount(async () => {
    uniqueCategories = [...new Set(featureList.map(item => item.category))]

    try {
      const resCategories = await API.getFeaturesCategories()
      allFeaturesCategories.update(() => resCategories.data)
      const resFeatures = await API.getAllFeatures()
      allFeatures.update(() => resFeatures.data)
    } catch (error) {
      console.log(error)
    }
    if (info.method === "Edit") {
      formData = JSON.parse(JSON.stringify(info.data))
    }
  })
</script>

<div class="body_wrapper">
  <div class="form_wrapper">
    <div class="input_row col-3">
      <small>Package Name</small>
      <input type="text" class="form-control" bind:value={formData.name} />
    </div>
    <div class="input_row col-3">
      <small>Cost</small>
      <div>
        <Select categories={billingMethods} bind:selectedItem={selectedBillingMethod} />
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
      </div>
      <div class="feature_table_body">
        {#each $allFeaturesCategories as category}
          {@const features = $allFeatures.filter(item => item.category === category.id)}
          <div class="feature_category my-2">
            <small class="fw-bold">{category.name}</small>
          </div>
          <div class="feature_table_row_wrapper">
            {#each features as feature, index}
              <div class="feature_table_row">
                <div class="feature_table_row_item col-1">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    checked={formData.features.includes(feature.id)}
                    on:change={() => handleSelectFeatures(feature.id)}
                  />
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
    <!-- <div class="total_row">
      <small class="fw-bold"
        >Total: &nbsp; ${formData.monthlyCost} /{selectedBillingMethod}</small
      >
    </div> -->
    <div class="input-line col-2">
      <div>
        <small> Minimun free user count for package </small>
        <input
          type="text"
          class="form-control"
          bind:value={formData.defaultUserCount}
          oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"
        />
      </div>
      <div>
        <small> Monthly Sales Cost(per user) </small>
        <div class="d-flex gap-3">
          {#each formData.monthlyCost as price, index (index)}
            <div class="input_wrapper">
              <small>{price.currency}</small>
              <input
                type="text"
                class="form-control"
                bind:value={formData.monthlyCost[index].cost}
                oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"
              />
            </div>
          {/each}
        </div>
      </div>
    </div>
    <span class="d-flex gap-3 align-items mt-2">
      <small> Include discount in percentage users who are years subscription </small>
      <div class="form-check form-switch">
        <!-- svelte-ignore a11y-role-has-required-aria-props -->
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" bind:checked={formData.discountInYearly} />
      </div>
    </span>
    {#if formData.discountInYearly}
      <div class="input_row col-2">
        <small> Discount </small>
        <input
          type="text"
          class="form-control"
          bind:value={formData.discount}
          oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"
        />
      </div>
    {/if}
  </div>
  <div class="action_bar">
    <CancelBtn title="Cancel" on:handleClick={() => dispatch("close")} />
    <Button title="Save" on:handleClick={() => handleSubmit()} excuting={isExcuting} />
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
  .input-line {
    width: 100%;
    display: flex;
    gap: 10px;
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
    justify-content: flex-end;
    padding: 10px;
  }
  .input_wrapper {
    width: 150px;
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: var(--backgroundheader);
    border-radius: 15px;
    padding-left: 10px;
  }
</style>
