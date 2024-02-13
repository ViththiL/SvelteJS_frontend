<script>
  // @ts-nocheck

  import Icon from "@iconify/svelte"
  import Select from "../../Shared/Select/Select.svelte"
  import ButtonSecondary from "../../Shared/Buttons/ButtonSecondary.svelte"
  import { createEventDispatcher, onMount } from "svelte"
  import ButtonPrimary from "../../Shared/Buttons/ButtonPrimary.svelte"
  import { singleCompanyEmails } from "../../../Store/Company"
  import { format } from "date-fns"

  const dispatch = createEventDispatcher()

  export let info
  let emailHistory = []

  onMount(() => {
    emailHistory = $singleCompanyEmails.filter(
      (item) => item.companyFeaturesId === info.companyId
    )
  })
</script>

<div class="body_wrapper">
  <div class="popup_wrapper">
    <div class="pop_header">
      <h5 class="mb-0 fw-bold">Email History - {info.companyName}</h5>
      <span class="close_btn" on:click={() => dispatch("close")}>
        <Icon icon="icon-park-outline:close-one" width="28" />
      </span>
    </div>
    <div class="email_box">
      {#each emailHistory as email}
        <div class="email_wrapper">
          <div class="email_header">
            <div class="email_header_item">
              <small>{email.senderName}</small>
            </div>
            <div class="email_header_item">
              <small>{email.subject}</small>
            </div>
            <div class="email_header_item">
              {#if email.status}
                <span class="badge bg-success">Sent</span>
              {:else}
                <span class="badge bg-danger">Not sent</span>
              {/if}
            </div>
            <div class="email_header_item">
              <small>
                {format(new Date(email.createdAt), "PPp")}
                <!-- <span>
                  <Icon
                    icon="material-symbols:arrow-drop-down-circle-outline"
                    width="20"
                  />
                </span> -->
              </small>
            </div>
          </div>
        </div>
      {:else}
        <div class="empty">
          <span><Icon icon="ic:round-email" width="60" /></span>
          <h5 class="mb-0">No Email History</h5>
        </div>
      {/each}
    </div>

    <!-- <div class="action_bar">
      <ButtonSecondary
        title="Cancel"
        on:handleClick={() => dispatch("close")}
      />
      <ButtonPrimary title="Send" />
    </div> -->
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
    height: 600px;
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
  .email_box {
    max-height: 500px;
    overflow: hidden;
    overflow-y: auto;
  }
  .email_wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 30px 20px;
  }
  .email_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: var(--background);
    border-radius: 15px;
  }
  .empty {
    margin: 20px;
    height: 460px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--background);
    color: var(--grey5);
    border-radius: 15px;
  }
  .email_header_item {
    width: 25%;
  }
</style>
