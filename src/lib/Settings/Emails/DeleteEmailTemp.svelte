<script>
  // @ts-nocheck

  import Icon from "@iconify/svelte"
  import Button from "../../Shared/Buttons/ButtonPrimary.svelte"
  import CancelBtn from "../../Shared/Buttons/ButtonSecondary.svelte"
  import { createEventDispatcher, onMount } from "svelte"

  import { allEmailTemplates } from "../../../Store/Company"
  import * as API from "../../../api/base"

  import { notifications } from "../../../Store/notifications"

  const dispatch = createEventDispatcher()
  export let info

  let isExcuting = false

  const handleDelete = async () => {
    try {
      isExcuting = true
      const resDelete = await API.deleteEmailTemplates(info.id)
      if (resDelete.status === 200) {
        const resAllEmail = await API.getEmailTemplates()
        if (resAllEmail.status === 200) {
          allEmailTemplates.update(() => resAllEmail.data)
          notifications.success("Successfully Deleted !", 2000)
          dispatch("close")
        }
      }
    } catch (error) {
      isExcuting = false
      console.log(error)
      notifications.danger("Ops.. Somthing Wrong !", 2000)
      dispatch("close")
    }
  }

  onMount(() => {})
</script>

<div class="body_wrapper">
  <div class="popup_wrapper">
    <div class="pop_header">
      <h5 class="mb-0 fw-bold">Delete Email Template</h5>
      <span class="close_btn" on:click={() => dispatch("close")}>
        <Icon icon="icon-park-outline:close-one" width="28" />
      </span>
    </div>
    <div class="action_body">
      <span class="mt-3"
        ><Icon
          icon="mingcute:delete-2-fill"
          width="50"
          style="color:crimson"
        /></span
      >
      <p class="fw-bold">Are you sure deleting this template?</p>
    </div>
    <div class="action_bar">
      <CancelBtn title="Cancel" on:handleClick={() => dispatch("close")} />
      <Button
        title="Save"
        on:handleClick={() => handleDelete()}
        excuting={isExcuting}
      />
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
    width: 700px;
    height: 40%;
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

  .action_body {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 35px;
    padding: 20px;
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
</style>
