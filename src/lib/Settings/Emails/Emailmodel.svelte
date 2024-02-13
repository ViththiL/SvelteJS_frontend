<script>
  // @ts-nocheck

  import Icon from "@iconify/svelte"
  import Select from "../../Shared/Select/SelectById.svelte"
  import Button from "../../Shared/Buttons/ButtonPrimary.svelte"
  import ButtonSecondary from "../../Shared/Buttons/ButtonSecondary.svelte"
  import { createEventDispatcher, onMount } from "svelte"
  import ButtonPrimary from "../../Shared/Buttons/ButtonPrimary.svelte"
  import TextEditor from "../../Shared/TextEditor/TextEditor.svelte"
  import * as API from "../../../api/base"
  import { notifications } from "../../../Store/notifications"
  import { singleCompanyEmails } from "../../../Store/Company"

  export let info
  let profile = JSON.parse(localStorage.getItem("profile"))
  let getText
  let allTemp = []
  let emailTemplates = []
  let selectedEmailTemplate = ""
  let formData = {
    sender: "",
    subject: "",
    email: {
      delta: {},
      text: "",
      justHtml: "",
    },
    companyId: "",
    companyFeaturesId: "",
  }

  let formError = {
    subject: false,
  }

  const dispatch = createEventDispatcher()

  const handleSetText = () => {
    let ob = allTemp.find((item) => item.id === selectedEmailTemplate)
    if (ob) {
      formData.email = ob.email
      console.log(formData)
      getText.SetText()
    } else {
      formData.email = {
        delta: {},
        text: "",
        justHtml: "",
      }
      getText.SetText()
    }
  }

  const handleSend = async () => {
    if (formData.subject === "") {
      formError.subject = true
    } else {
      formError.subject = false
    }

    if (!formError.subject) {
      try {
        const res = await API.setEmailCompany(formData)
        const resEmails = await API.getEmailCompany(formData.companyId)
        singleCompanyEmails.update(() => resEmails.data)
        notifications.success("Email sent successfully ...!", 2000)
        dispatch("close")
      } catch (error) {
        console.log(error)
        notifications.danger("Ops...Something wrong", 2000)
        dispatch("close")
      }
    }
  }

  onMount(async () => {
    if (info) {
      formData.companyId = info.companyId
      formData.companyFeaturesId = info.companyFeaturesId
      formData.sender = profile.employeeId
    }

    try {
      const res = await API.getEmailTemplates()
      allTemp = res.data
      let arr = res.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
        }
      })
      emailTemplates = [...emailTemplates, ...arr]
      selectedEmailTemplate = emailTemplates[0].id
      handleSetText()
    } catch (error) {
      console.log(error)
    }
  })
</script>

<div class="body_wrapper">
  <div class="popup_wrapper">
    <div class="pop_header">
      <h5 class="mb-0 fw-bold">Send Email - {info.companyName}</h5>
      <span class="close_btn" on:click={() => dispatch("close")}>
        <Icon icon="icon-park-outline:close-one" width="28" />
      </span>
    </div>
    <div class="d-flex">
      <div class="input_row col-5 ps-2 mt-3 mb-2">
        <small> Select Template </small>
        <Select
          categories={emailTemplates}
          bind:selectedItemId={selectedEmailTemplate}
          on:select={() => handleSetText()}
        />
      </div>
      <div class="input_row col-5 ps-2 mt-3 mb-2">
        <small> Subject </small>
        <input
          type="text"
          class="form-control"
          bind:value={formData.subject}
          class:form-control_error={formError.subject}
        />
      </div>
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
      <ButtonPrimary title="Send" on:handleClick={() => handleSend()} />
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
