<script>
  // @ts-nocheck

  import Icon from "@iconify/svelte"
  import Select from "../../Shared/Select/SelectById.svelte"
  import Button from "../../Shared/Buttons/ButtonPrimary.svelte"
  import ButtonSecondary from "../../Shared/Buttons/ButtonSecondary.svelte"
  import { createEventDispatcher, onMount } from "svelte"
  import ButtonPrimary from "../../Shared/Buttons/ButtonPrimary.svelte"
  import * as API from "../../../api/base"
  import { allUsers } from "../../../Store/Company"
  import { notifications } from "../../../Store/notifications"

  const dispatch = createEventDispatcher()
  export let info
  let accessLevelList = []

  let profileImages = [
    {
      name: "/1.png",
    },
    {
      name: "/2.png",
    },
    {
      name: "/3.png",
    },
  ]

  let accessLevels = []
  let isExcuting = false

  let formData = {
    name: "",
    email: "",
    accessLevelId: "",
    profileImg: "",
    password: "123456",
  }

  let formError = {
    name: false,
    email: false,
    accessLevelId: false,
    overall: false,
  }

  const handleChoose = (name) => {
    formData.profileImg = name
  }

  const handleSubmit = async () => {
    if (formData.name === "") {
      formError.name = true
    } else {
      formError.name = false
    }

    if (formData.email === "" || !formData.email.includes("@")) {
      formError.email = true
    } else {
      formError.email = false
    }

    formError.overall =
      formError.name || formError.email || formError.accessLevelId
        ? true
        : false

    if (!formError.overall && info.method === "Add") {
      try {
        isExcuting = true
        const res = await API.setUser(formData)
        if (res.status === (200 || 201)) {
          const resUsers = await API.getUsers()
          allUsers.update(() => resUsers.data)
          dispatch("close")
          isExcuting = false
          notifications.success("Successfully user added ...!", 2000)
        }
      } catch (error) {
        console.log(error)
        isExcuting = false
        notifications.danger("Ops... Somthing wrong ...!", 2000)
      }
    }

    if (!formError.overall && info.method === "Edit") {
      try {
        isExcuting = true
        const res = await API.updateUser(formData.id, formData)
        if (res.status === (200 || 201)) {
          const resUsers = await API.getUsers()
          allUsers.update(() => resUsers.data)
          isExcuting = false
          dispatch("close")
          notifications.success("Successfully updated ...!", 2000)
        }
      } catch (error) {
        isExcuting = false
        console.log(error)
        notifications.danger("Ops... Somthing wrong ..!", 2000)
      }
    }
  }

  onMount(async () => {
    formData.profileImg = profileImages[0].name
    try {
      const resAccess = await API.getAccessLevels()
      if (resAccess.status === 200) {
        accessLevels = resAccess.data
        accessLevelList = accessLevels.map((item) => {
          return {
            id: item.id,
            name: item.name,
          }
        })
      }

      if (info.method === "Edit") {
        formData = JSON.parse(JSON.stringify(info.data))
        console.log(formData)
      } else {
        formData.accessLevelId = accessLevelList[0].id
      }
      console.log(info)
    } catch (error) {
      console.log(error)
    }
  })

  $: console.log(formData)
</script>

<div class="body_wrapper">
  <div class="popup_wrapper">
    <div class="pop_header">
      <h5 class="mb-0 fw-bold">
        {info.method === "Add" ? "Add" : "Edit"} Employee
      </h5>
      <span class="close_btn" on:click={() => dispatch("close")}>
        <Icon icon="icon-park-outline:close-one" width="28" />
      </span>
    </div>
    <div class="list_wrapper">
      <div class="list_wrapper_left">
        <div class="input_row col-10">
          <small> Name </small>
          <input type="text" class="form-control" bind:value={formData.name} />
        </div>
        <div class="input_row col-10">
          <small> Email </small>
          <input type="text" class="form-control" bind:value={formData.email} />
        </div>

        <div class="input_row col-5">
          <small> Access Level </small>
          <Select
            categories={accessLevelList}
            bind:selectedItemId={formData.accessLevelId}
            width="270px"
          />
        </div>
      </div>
      <div class="list_wrapper_right">
        <div class="profile_img_wrapper mb-4">
          <img src={formData.profileImg} alt="" class="profile_img" />
        </div>
        <small>Choose image</small>
        <div class="image_row">
          {#each profileImages as img}
            <span on:click={() => handleChoose(img.name)} type="button">
              <img src={img.name} alt="" width="30px" />
            </span>
          {/each}
        </div>
      </div>
    </div>
    <div class="action_bar">
      <ButtonSecondary
        title="Cancel"
        on:handleClick={() => dispatch("close")}
      />
      <ButtonPrimary
        title="Save"
        on:handleClick={() => handleSubmit()}
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
    width: 800px;
    height: 450px;
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
  .list_wrapper {
    padding: 40px 80px;
    display: flex;

    gap: 8px;
  }
  .list_wrapper_left {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .list_wrapper_right {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .profile_img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
  .image_row {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .action_bar {
    margin-top: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    padding: 10px 0;
  }
</style>
