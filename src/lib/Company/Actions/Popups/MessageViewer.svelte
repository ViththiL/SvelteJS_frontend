<script>
  // @ts-nocheck

  import { afterUpdate, createEventDispatcher, onMount } from "svelte"
  import Button from "../../../shared/Buttons/ButtonPrimary.svelte"
  import * as API from "../../../../api/base"
  import { notifications } from "../../../../store/notifications"
  import { format } from "date-fns"
  //import { directory } from "../../../../store/store"
  //import ProfileImage from "../../../shared/ProfilePicStack/ProfileImage.svelte"

  const dispatch = createEventDispatcher()
  const profile = JSON.parse(localStorage.getItem("profile"))
  //const companyData = JSON.parse(localStorage.getItem("companyData"))

  export let id
  export let cId
  let formData = {
    msgId: "",
    msg: {},
    subject: "",
    senderId: "",
    sennderName: "",
    profileImage: "",
    companyId: "",
    client: false,
  }
  let element
  let msgArray = []

  function getInfo(emp) {
    // let obj = $directory.find(item => item.employeeId === emp)
    // if (obj) {
    //   return obj.jobTitle
    // }

    return "N/A"
  }

  const handleSumbitMsg = async () => {
    formData.msgId = id
    formData.senderId = profile.employeeId
    formData.companyId = cId

    console.log(formData)
    try {
      const res = await API.setCustomerSupport(formData)
      if (res.status === 201) {
        const resComments = await API.getCustomSupport(id)

        msgArray = resComments.data
        notifications.success("Comment added successfully", 2000)
        formData.msg = ""
      }
    } catch (error) {
      console.log(error)
      notifications.danger("Something went wrong", 2000)
    }
  }

  onMount(async () => {
    try {
      const resComments = await API.getCustomSupport(id)
      msgArray = resComments.data
      console.log(id)
    } catch (error) {
      console.log(error)
    }
  })

  afterUpdate(() => {
    if (msgArray) scrollToBottom(element)
  })

  const scrollToBottom = async node => {
    node.scroll({ top: node.scrollHeight, behavior: "smooth" })
  }
</script>

<div class="main">
  <div class=" container d-flex align-items-center flex-column">
    <div class="justChecking_title">
      <h5 class="fw-bold mb-0">Comments</h5>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-interactive-supports-focus -->
      <div on:click={() => dispatch("closeModal")} role="button" class="close_btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          width="30px"
          height="30px"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 23"
        >
          <g fill="none">
            <path
              d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7z"
              fill="currentColor"
            />
          </g>
        </svg>
      </div>
    </div>
    <div class="content_body">
      <div class="form_wrapper">
        <div class="mgs_content_wrapper" bind:this={element}>
          {#each msgArray as msg}
            {@const jobTitle = getInfo(msg.senderId)}
            {#if msg.client}
              <div class="my_mgs_wrapper">
                <div class="my_msg">
                  <div class="d-flex align-items-center">
                    <div class="d-flex align-items-center">
                      <!-- <div class="avatar">
                      <ProfileImage imagePath={msg.senderProfilePhoto} width={40} height={40} /> 
                      </div> -->
                      <div class="name">
                        <small class="fw-bold mb-0">{msg.senderName}</small>
                        <small class="job_title">{jobTitle}</small>
                      </div>
                    </div>
                  </div>
                  <div class="msg">
                    <small>{msg.msg.text}</small>
                    <div class="time_wrapper">
                      <small class="time">{format(new Date(msg.createdAt), "PPpp")}</small>
                    </div>
                  </div>
                </div>
              </div>
            {:else}
              <div class="sup_mgs_wrapper">
                <div class="sup_msg">
                  <div class="d-flex align-items-center">
                    <div class="d-flex align-items-center">
                      <div class="name">
                        <small class="fw-bold mb-0">RomeoHR</small>
                        <small class="job_title" />
                      </div>
                    </div>
                  </div>
                  <div class="msg">
                    <small>{msg.msg.text}</small>
                    <div class="time_wrapper">
                      <small class="time">{format(new Date(msg.createdAt), "PPpp")}</small>
                    </div>
                  </div>
                </div>
              </div>
            {/if}
          {/each}
        </div>

        <div class="msg_editor">
          <div class="col-8">
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="2" bind:value={formData.msg.text} />
          </div>
          <Button title="Send" on:handleClick={() => handleSumbitMsg()} disable={formData.msg === "" ? true : false} />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .main {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0000009f;
    width: 100%;
    min-height: 750px;
    height: 100%;
  }

  .justChecking_title {
    width: 600px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    color: white;
    background-color: var(--primary);
    padding: 15px;
    border-radius: 15px 15px 0 0;
  }
  .justChecking_title h5 {
    color: white;
  }

  .close_btn:hover {
    background-color: var(--primary);
    cursor: pointer;
    border-radius: 3px;
  }

  .content_body {
    width: 600px;
    overflow: hidden;
    background-color: white;
    height: auto;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding-top: 20px;
    border-radius: 0 0 15px 15px;
  }

  .form_wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
    padding: 10px;
    width: 550px;
    gap: 8px;
    border: 1px solid #f4f4f4;
    border-radius: 15px;
    margin-bottom: 10px;
    height: 500px;
  }
  .mgs_content_wrapper {
    width: 100%;
    height: 400px;
    display: flex;
    align-self: start;
    flex-flow: column nowrap;
    border-radius: 15px;
    overflow: auto;
    gap: 15px;
  }
  .my_mgs_wrapper {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: start;
  }
  .sup_mgs_wrapper {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  .sup_msg {
    display: flex;
    flex-direction: column;
    width: 80%;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 10px;
    background-color: var(--backgroudtrasparent);
    border-radius: 15px;
  }
  .my_msg {
    display: flex;
    flex-direction: column;
    width: 80%;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 10px;
    background-color: var(--backgroundheader);
    border-radius: 15px;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
  }
  .name {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    line-height: 1;
  }
  .job_title {
    font-size: 12px;
    color: grey;
  }
  .msg {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0px 10px;
    margin-top: 10px;
  }
  .time_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    font-size: 12px;
    margin-top: 5px;
  }
  .msg_editor {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #f4f4f4;
    border-radius: 15px;
    background-color: var(--grey4);
  }
</style>
