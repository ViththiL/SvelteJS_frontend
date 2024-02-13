<script>
  // @ts-nocheck

  import Icon from "@iconify/svelte"
  import Button from "../../../Shared/Buttons/ButtonPrimary.svelte"
  import CancelBtn from "../../../Shared/Buttons/ButtonSecondary.svelte"
  import { createEventDispatcher, onMount } from "svelte"
  import * as API from "../../../../api/base"
  import { allTestEmails } from "../../../../Store/Homepage"
  import { notifications } from "../../../../Store/notifications.js"

  export let id = ""
  const dispatch = createEventDispatcher()
  let isExcuting = false

  const handleDelete = async () => {
    isExcuting = true
    try {
      const resDelete = await API.deleteTestEmail(id)
      if (resDelete.status === 200) {
        const resEmails = await API.getTestEmail()
        if (resEmails.status === 200) {
          allTestEmails.update(() => resEmails.data)
        }
        dispatch("close")
        notifications.success("Test Email Deleted Successfully", 2000)
      }
    } catch (error) {
      console.log(error)
      isExcuting = false
      dispatch("close")
      notifications.danger("Ops ... Somthing Worng !", 2000)
    }
  }

  onMount(() => {})
</script>

<div class="body_wrapper">
  <div class="popup_wrapper">
    <div class="pop_header">
      <h5 class="mb-0 fw-bold">Delete Email</h5>
      <span class="close_btn" on:click={() => dispatch("close")}>
        <Icon icon="icon-park-outline:close-one" width="28" />
      </span>
    </div>
    <div class="form_wrapper ">
      <span class="mt-5">
        <Icon icon="mdi:shield-warning" width="55" color="#ff8b3d" />
      </span>
      <small>Are you sure about delete? </small>

      <div class="action_bar">
        <CancelBtn title="Cancel" on:handleClick={() => dispatch("close")} />
        <Button title="Delete" on:handleClick={() => handleDelete()} />
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
    align-items: center;
    justify-content: center;
    background-color: var(--backgroudtrasparent);
    width: 100%;
    min-height: 750px;
    height: 100%;
  }
  .popup_wrapper {
    width: 800px;
    height: 30%;
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
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 20px;
  }

  .action_bar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 10px;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
