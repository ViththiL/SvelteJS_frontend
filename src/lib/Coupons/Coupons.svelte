<script>
  // @ts-nocheck

  import Icon from "@iconify/svelte"
  import { createEventDispatcher, onMount } from "svelte"
  import ButtonPrimary from "../Shared/Buttons/ButtonPrimary.svelte"
  import { showCoupons } from "../../Store/Homepage"
  import { companyList } from "../../Store/Company"
  import * as API from "../../api/base"
  import { notifications } from "../../Store/notifications"

  const dispatch = createEventDispatcher()

  let comList = []
  let coupon = ""
  let isExcuting = false

  onMount(async () => {
    try {
    } catch (error) {
      console.log(error)
    }
  })

  const handleSelect = id => {
    if (comList.includes(id)) {
      comList = comList.filter(item => item !== id)
    } else {
      comList = [...comList, id]
    }
  }

  const handleClose = () => {
    showCoupons.update(() => false)
  }

  const handleAdd = async () => {
    try {
      isExcuting = true
      console.log({ promotionCodeId: coupon, companyIds: comList })
      const res = await API.sendCoupon({ promotionCodeId: coupon, companyIds: comList })
      if (res.status === 200) {
        isExcuting = false
        notifications.success("Coupon added successfully", 2000)
        handleClose()
      }
    } catch (error) {
      isExcuting = false
      notifications.danger("Oops ! Somthing Wrong ..", 2000)
      console.log(error)
    }
  }
</script>

<div class="body_wrapper">
  <div class="popup_wrapper">
    <div class="pop_header">
      <h5 class="mb-0 fw-bold">Coupons</h5>
      <span class="close_btn" on:click={() => handleClose()}>
        <Icon icon="icon-park-outline:close-one" width="28" />
      </span>
    </div>
    <div class="form_wrapper">
      <div class="email-row mt-2">
        <div class="input_row col-6">
          <small>Coupon</small>

          <input type="text" class="form-control" bind:value={coupon} />
        </div>
      </div>
      <div class="feature_table">
        <div class="feature_table_header">
          <div class="feature_table_header_item col-9">
            <small>Company</small>
          </div>
          <div class="feature_table_header_item col-1">
            <small>Action</small>
          </div>
        </div>
        <div class="feature_table_body">
          <div class="feature_table_row_wrapper">
            {#each $companyList as com}
              <div class="feature_table_row">
                <div class="feature_table_row_item col-9">
                  <small>{com.companyName}</small>
                </div>

                <div class="feature_table_row_item col-1">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    class="form-check-input"
                    on:change={() => handleSelect(com.id)}
                    checked={comList.includes(com.id)}
                  />
                </div>
              </div>
            {/each}
          </div>
          {#if $companyList.length === 0}
            <div class="empty">
              <small>No Companies</small>
            </div>
          {/if}
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <ButtonPrimary title="Send" disable={comList.length === 0 || coupon === ""} on:handleClick={handleAdd} excuting={isExcuting} />
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
    min-height: 350px;
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
