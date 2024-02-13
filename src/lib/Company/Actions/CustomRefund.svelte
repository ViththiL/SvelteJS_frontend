<script>
  // @ts-nocheck

  import Icon from "@iconify/svelte"
  import { showCustomRefund, allRefunds } from "../../../Store/Company"
  import { createEventDispatcher, onMount } from "svelte"
  import ButtonPrimary from "../../Shared/Buttons/ButtonPrimary.svelte"
  import * as API from "../../../api/base"
  import { notifications } from "../../../Store/notifications.js"
  import DeleteTesting from "../Actions/Popups/DeleteTestEmail.svelte"
  import Select from "../../Shared/Select/Select.svelte"

  const dispatch = createEventDispatcher()
  export let companyId = ""
  let emailList = []
  let email = ""
  let isEmailInvalid = false
  let isUsed = false
  let selectedId = ""
  let showDeleteTesting = false
  let refundLimit = 0

  let formData = {
    refundMethod: "Money",
    amount: "",
  }

  let refundMethod = [
    {
      name: "Money",
    },
    {
      name: "Credit",
    },
  ]

  onMount(async () => {
    console.log("companyId", companyId)
    try {
      const resALLRefunds = await API.getCompanyCustomRefund(companyId)
      if (resALLRefunds.status === 200) {
        allRefunds.update(() => resALLRefunds.data)
      }
      const resRefundLimit = await API.getSingleCompanyCustomRefundLimit(
        companyId
      )
      if (resRefundLimit.status === 200) {
        refundLimit = resRefundLimit.data
      }
      console.log("resRefundLimit", resRefundLimit)
    } catch (error) {
      console.log(error)
    }
  })

  const handleClose = () => {
    showCustomRefund.update(() => false)
  }

  const handleShowDeleteTesting = id => {
    selectedId = id
    showDeleteTesting = !showDeleteTesting
  }

  const handleAdd = async () => {
    let formData = {
      email: email,
    }
    try {
    } catch (error) {
      console.log(error)
      notifications.danger("Ops ... Somthing Worng !", 2000)
    }
  }

  $: isEmailInvalid = email === "" || !email.includes("@") ? true : false
  $: isUsed = emailList.find(item => item.email === email) ? true : false
</script>

<div class="body_wrapper">
  <div class="popup_wrapper">
    <div class="pop_header">
      <h5 class="mb-0 fw-bold">Refund</h5>
      <span class="close_btn" on:click={() => handleClose()}>
        <Icon icon="icon-park-outline:close-one" width="28" />
      </span>
    </div>
    <div class="form_wrapper">
      <div class="input_row col-3">
        <small>Cost Method</small>
        <div>
          <Select
            categories={refundMethod}
            bind:selectedItem={formData.refundMethod}
          />
        </div>
      </div>
      <div class="email-row mt-2">
        <div class="input_row col-6">
          <small>Amount</small>
          <input type="text" class="form-control" bind:value={email} />
        </div>
        <ButtonPrimary
          title="Refund"
          disable={isEmailInvalid || isUsed}
          on:handleClick={handleAdd}
        />
      </div>
      <div class="feature_table">
        <div class="feature_table_header">
          <div class="feature_table_header_item col-2">
            <small>Date</small>
          </div>
          <div class="feature_table_header_item col-5">
            <small>By</small>
          </div>
          <div class="feature_table_header_item col-2">
            <small>amount</small>
          </div>
        </div>
        <div class="feature_table_body">
          <div class="feature_table_row_wrapper">
            {#each $allRefunds as email}
              <div class="feature_table_row">
                <div class="feature_table_row_item col-9">
                  <small>{email.email}</small>
                </div>
                <div class="feature_table_row_item col-2">
                  {#if !email.hasCompany}
                    <small>Not used</small>
                  {:else}
                    <small>{email.comapnyName}</small>
                  {/if}
                </div>
                <div class="feature_table_row_item col-1 ">
                  <span on:click={() => handleShowDeleteTesting(email.id)}
                    ><Icon icon="typcn:delete" /></span
                  >
                </div>
              </div>
            {/each}
          </div>
          {#if emailList.length === 0}
            <div class="empty">
              <small>No refund details</small>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

{#if showDeleteTesting}
  <DeleteTesting on:close={handleShowDeleteTesting} id={selectedId} />
{/if}

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
  .email-row {
    display: flex;
    align-items: flex-end;
    justify-content: start;
    gap: 10px;
  }
  .feature_table {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 300px;
    margin-top: 20px;
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
  .feature_table_row:hover {
    background-color: var(--backgroundheader);
    border-radius: 15px;
  }
  .fs-xs {
    font-size: 11px;
    color: red;
  }

  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
  }
</style>
