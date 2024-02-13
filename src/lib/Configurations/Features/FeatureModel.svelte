<script>
  // @ts-nocheck

  import Icon from "@iconify/svelte"
  import Button from "../../Shared/Buttons/ButtonPrimary.svelte"
  import CancelBtn from "../../Shared/Buttons/ButtonSecondary.svelte"
  import { createEventDispatcher, onMount } from "svelte"
  import Select from "../../Shared/Select/Select.svelte"
  import SelectId from "../../Shared/Select/SelectById.svelte"
  import { allFeaturesCategories, allFeatures } from "../../../Store/Company"
  import * as API from "../../../api/base"

  import { notifications } from "../../../Store/notifications"

  const dispatch = createEventDispatcher()
  export let info
  let billingMethods = [
    {
      name: "Free",
    },
    {
      name: "Paid",
    },
  ]

  let selectedBillingMethod = "Paid"

  let categoryList = []
  let statusList = [
    {
      name: "Development",
    },
    {
      name: "Testing",
    },
    {
      name: "Active",
    },
  ]

  let countMethod = [
    {
      name: "Single",
    },
    {
      name: "Multiple",
    },
  ]

  let isExcuting = false

  let formData = {
    name: "",
    countableItem: "Single",
    count: 0,
    slug: "",
    costMethod: "Paid",
    monthlyCost: 0,
    category: "",
    status: "Development",
    description: "",
  }

  let formError = {
    name: false,
    slug: false,
    category: false,
    overall: false,
  }

  const handleSubmit = async () => {
    if (formData.name === "") {
      formError.name = true
    } else {
      formError.name = false
    }
    console.log(formError.name)

    if (formData.slug === "") {
      formError.slug = true
    } else {
      formError.slug = false
    }

    if (formData.category === "") {
      formError.category = true
    } else {
      formError.category = false
    }

    if (formError.name || formError.slug || formError.category) {
      formError.overall = true
    } else {
      formError.overall = false
    }

    if (!formError.overall && info.method === "Add") {
      isExcuting = true
      try {
        const resFeature = await API.setFeatures(formData)
        if (resFeature.status === 200) {
          const resAllFeatures = await API.getAllFeatures()
          if (resAllFeatures.status === 200) {
            allFeatures.update(() => resAllFeatures.data)
            notifications.success("Feature created successfully !", 2000)
          }
          isExcuting = false
          dispatch("close")
        }
      } catch (error) {
        console.log(error)
        isExcuting = false
        notifications.danger("Ops..Somthing wrong !", 2000)
      }
    }
    if (!formError.overall && info.method === "Edit") {
      isExcuting = true
      try {
        console.log(formData)
        const resFeature = await API.updateFeatures(formData.id, formData)
        console.log(resFeature)
        if (resFeature.status === 200) {
          const resAllFeatures = await API.getAllFeatures()
          if (resAllFeatures.status === 200) {
            allFeatures.update(() => resAllFeatures.data)
            notifications.success("Feature updated successfully !", 2000)
          }
          isExcuting = false
          dispatch("close")
        }
      } catch (error) {
        console.log(error)
        isExcuting = false
        notifications.danger("Ops..Somthing wrong !", 2000)
      }
    }
  }

  onMount(() => {
    categoryList = $allFeaturesCategories.map((item) => {
      return {
        id: item.id,
        name: item.name,
      }
    })

    if (info.method === "Add") {
      if (categoryList.length > 0) {
        formData.category = categoryList[0].id
      }
    } else {
      formData = info.data
    }

    console.log(info)
  })
</script>

<div class="body_wrapper">
  <div class="popup_wrapper">
    <div class="pop_header">
      <h5 class="mb-0 fw-bold">
        {info.method === "Add" ? "Add Feature" : "Update Feature"}
      </h5>
      <span class="close_btn" on:click={() => dispatch("close")}>
        <Icon icon="icon-park-outline:close-one" width="28" />
      </span>
    </div>
    <div class="form_wrapper">
      <div class="input_row col-3">
        <small>Feature name</small>
        <input
          type="text"
          class="form-control "
          bind:value={formData.name}
          class:form-control_error={formError.name}
        />
      </div>
      <div class="input_row col-3">
        <small>Slug</small>
        <input
          type="text"
          class="form-control "
          bind:value={formData.slug}
          class:form-control_error={formError.slug}
        />
      </div>
      <div class="input_line">
        <div class="input_row col-3">
          <small>Cost Method</small>
          <div>
            <Select
              categories={billingMethods}
              bind:selectedItem={formData.costMethod}
            />
          </div>
        </div>
        <!-- {#if formData.costMethod === "Paid"}
          <div class="input_row col-3">
            <small>Cost</small>
            <div>
              <input
                type="number"
                class="form-control "
                min="0"
                bind:value={formData.monthlyCost}
              />
            </div>
          </div>
        {/if} -->
      </div>
      <div class="input_row col-3">
        <small>Category</small>
        <div>
          <SelectId
            categories={categoryList}
            bind:selectedItemId={formData.category}
          />
        </div>
      </div>
      <div class="input_row col-3">
        <small>Status</small>
        <div>
          <Select categories={statusList} bind:selectedItem={formData.status} />
        </div>
      </div>
      <div class="input_line">
        <div class="input_row col-3">
          <small>Count Method</small>
          <div>
            <Select
              categories={countMethod}
              bind:selectedItem={formData.countableItem}
            />
          </div>
        </div>
        {#if formData.countableItem === "Multiple"}
          <div class="input_row col-3">
            <small>Count</small>
            <div>
              <input
                type="number"
                class="form-control "
                min="0"
                bind:value={formData.count}
              />
            </div>
          </div>
        {/if}
      </div>
      <div class="input_row col-6">
        <small>Description</small>
        <div>
          <textarea
            name=""
            class="form-control"
            id=""
            rows="3"
            bind:value={formData.description}
          />
        </div>
      </div>
      <div class="action_bar">
        <CancelBtn title="Cancel" on:handleClick={() => dispatch("close")} />
        <Button
          title="Save"
          on:handleClick={() => handleSubmit()}
          excuting={isExcuting}
        />
      </div>
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
    min-height: 750px;
    height: 100%;
  }
  .popup_wrapper {
    width: 800px;
    height: 72%;
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
    height: 80%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px 20px;
  }

  .action_bar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 20px;
    gap: 10px;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .input_line {
    display: flex;
    align-items: flex-start;
    justify-content: start;
    gap: 60px;
  }
</style>
