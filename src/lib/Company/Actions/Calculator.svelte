<script>
  // @ts-nocheck

  import Icon from "@iconify/svelte"
  import { showCalculator } from "../../../Store/Homepage"
  import { createEventDispatcher, onMount } from "svelte"
  import Select from "../../Shared/Select/Select.svelte"

  const dispatch = createEventDispatcher()

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

  let featureList = [
    {
      category: "HR Management",
      name: "Employee Records",
      cost: "",
      free: true,
    },
    {
      category: "HR Management",
      name: "Standard Reporting",
      cost: 10,
      free: false,
    },
    {
      category: "HR Management",
      name: "Document Storage",
      cost: 25,
      free: false,
    },
    {
      category: "HR Management",
      name: "Standard Access Levels",
      cost: 0,
      free: true,
    },
    {
      category: "HR Management",
      name: "Standard Emails",
      cost: "5",
      free: false,
    },
    {
      category: "Employee Self-Service",
      name: "Time-Off Management",
      cost: 0,
      free: true,
    },
    {
      category: "Employee Self-Service",
      name: "Employee Directory & Org Chart",
      cost: 0,
      free: true,
    },
    {
      category: "Employee Self-Service",
      name: "Company Calender",
      cost: 5,
      free: false,
    },
  ]

  let uniqueCategories = []

  onMount(() => {
    uniqueCategories = [...new Set(featureList.map((item) => item.category))]
  })

  const handleClose = () => {
    showCalculator.update(() => false)
  }
</script>

<div class="body_wrapper">
  <div class="popup_wrapper">
    <div class="pop_header">
      <h5 class="mb-0 fw-bold">Estimate Cost</h5>
      <span class="close_btn" on:click={() => handleClose()}>
        <Icon icon="icon-park-outline:close-one" width="28" />
      </span>
    </div>
    <div class="form_wrapper">
      <div class="input_row col-3">
        <small>Start Date</small>
        <input type="date" class="form-control " />
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
            <input type="checkbox" class="form-check-input" />
          </div>
          <div class="feature_table_header_item col-10">
            <small>Feature Name</small>
          </div>
          <div class="feature_table_header_item col-1">
            <small>Cost</small>
          </div>
        </div>
        <div class="feature_table_body">
          {#each uniqueCategories as category}
            <div class="feature_category mt-1">
              <small class="fw-bold ">{category}</small>
            </div>
            <div class="feature_table_row_wrapper">
              {#each featureList.filter((item) => item.category === category) as feature}
                <div class="feature_table_row">
                  <div class="feature_table_row_item col-1">
                    <input type="checkbox" class="form-check-input" />
                  </div>
                  <div class="feature_table_row_item col-10">
                    <small>{feature.name}</small>
                  </div>
                  <div class="feature_table_row_item col-1">
                    {#if feature.free}
                      <small>free</small>
                    {:else}
                      <small>${feature.cost}</small>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
      <div class="total_row">
        <small class="fw-bold">Total: &nbsp; $10 /{selectedBillingMethod}</small
        >
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
    height: 62%;
    margin-top: 100px;
    background-color: white;
    border-radius: 15px;
    padding: 10px;
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
</style>
