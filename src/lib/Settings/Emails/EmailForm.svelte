<script>
  // @ts-nocheck

  import Icon from "@iconify/svelte"
  import ButtonSecondary from "../../Shared/Buttons/ButtonSecondary.svelte"
  import { createEventDispatcher, onMount } from "svelte"
  import ButtonPrimary from "../../Shared/Buttons/ButtonPrimary.svelte"
  import TextEditor from "../../Shared/TextEditor/TextEditor.svelte"
  import { notifications } from "../../../Store/notifications"
  import * as API from "../../../api/base"
  import { allEmailTemplates } from "../../../Store/Company"

  const dispatch = createEventDispatcher()

  export let info
  let getText
  let isExcuting = false

  let formData = {
    name: "",
    description: "Text",
    email: {
      delta: {},
      text: "",
      justHtml: "",
    },
  }

  let formError = {
    name: false,
  }

  const handleEmailSubmit = async () => {
    if (formData.name === "") {
      formError.name = true
    } else {
      formError.name = false
    }

    if (!formError.name && info.method === "Add") {
      getText.GetText()

      try {
        isExcuting = true
        const resEmail = await API.setEmailTemplates(formData)
        if (resEmail.status === (200 || 201)) {
          const resAll = await API.getEmailTemplates()
          allEmailTemplates.update(() => resAll.data)
          notifications.success("Successfully Addded ...!", 2000)
          isExcuting = false
          dispatch("close")
        }
      } catch (error) {
        console.log(error)
        isExcuting = false
        notifications.danger("Ops..Somthing wrong ...!", 2000)
      }
    }
    if (!formError.name && info.method === "Edit") {
      try {
        getText.GetText()
        isExcuting = true
        const resEmail = await API.updateEmailTemplates(formData.id, formData)
        if (resEmail.status === (200 || 201)) {
          const resAll = await API.getEmailTemplates()
          allEmailTemplates.update(() => resAll.data)
          notifications.success("Successfully Updated ...!", 2000)
          isExcuting = false
          dispatch("close")
        }
      } catch (error) {
        isExcuting = false
        console.log(error)
        notifications.danger("Ops..Somthing wrong ...!", 2000)
      }
    }
  }

  onMount(() => {
    if (info.method === "Edit") {
      formData = info.data
      getText.SetText()
    }
  })
</script>

<div class="body_wrapper">
  <div class="popup_wrapper">
    <div class="pop_header">
      {#if info.method === "Add"}
        <h5 class="mb-0 fw-bold">Create Email Template</h5>
      {:else}
        <h5 class="mb-0 fw-bold">Update Email Template</h5>
      {/if}
      <span class="close_btn" on:click={() => dispatch("close")}>
        <Icon icon="icon-park-outline:close-one" width="28" />
      </span>
    </div>
    <div class="input_row col-5 ps-2 mt-3 mb-2">
      <small> Name </small>
      <input
        type="text"
        class="form-control"
        bind:value={formData.name}
        class:form-control_error={formError.name}
      />
    </div>
    <div class="input_row col-5 ps-2 mt-3 mb-2">
      <small> Content </small>
    </div>
    <div class="canvas_main">
      <TextEditor
        height="250px"
        bind:this={getText}
        textData={formData.email}
      />
    </div>

    <div class="action_bar">
      <ButtonSecondary
        title="Cancel"
        on:handleClick={() => dispatch("close")}
      />
      <ButtonPrimary
        title="Save"
        on:handleClick={() => handleEmailSubmit()}
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
  .action_bar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    padding: 10px 0;
  }
  .canvas_main {
    height: 355px;
    margin: 0px 10px;
  }

  .editor {
    position: relative;
    border-radius: 15px;
    border-top: 1px solid var(--grey5) !important;
    height: 300px;
  }
</style>
