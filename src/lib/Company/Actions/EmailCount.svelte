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
  export let info

  onMount(async () => {
    console.log("info", info)
  })
</script>

<div class="body_wrapper">
  <div class="popup_wrapper">
    <div class="pop_header">
      <h5 class="mb-0 fw-bold">Email Count</h5>
      <span class="close_btn" on:click={() => dispatch("close")}>
        <Icon icon="icon-park-outline:close-one" width="28" />
      </span>
    </div>
    <div class="form_wrapper">
      <div class="feature_table">
        <div class="feature_table_header">
          <div class="feature_table_header_item col-10">
            <small>Email Type</small>
          </div>

          <div class="feature_table_header_item col-2">
            <small>amount</small>
          </div>
        </div>
        <div class="feature_table_body">
          <div class="feature_table_row_wrapper">
            {#each info.reverse() as email}
              <div class="feature_table_row">
                <div class="feature_table_row_item col-10">
                  <small>{email.name}</small>
                </div>

                <div class="feature_table_row_item col-2">
                  <small>{email.count}</small>
                </div>
              </div>
            {/each}
          </div>
        </div>
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
