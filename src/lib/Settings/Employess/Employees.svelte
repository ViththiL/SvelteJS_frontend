<script>
  // @ts-nocheck
  import Icon from "@iconify/svelte"
  import Button from "../../Shared/Buttons/ButtonPrimary.svelte"
  import EmployeeForm from "./EmployeeForm.svelte"
  import * as API from "../../../api/base"
  import { allUsers, userAccessLevel } from "../../../Store/Company"
  import { onMount } from "svelte"

  let showEmployeeForm = false
  let accessLevels = []
  let showEmployeeModal = {
    show: false,
    method: "",
    data: {},
  }

  const handleEmployeeModal = (method, data) => {
    showEmployeeModal.show = !showEmployeeModal.show
    showEmployeeModal.method = method
    showEmployeeModal.data = data ? data : {}
  }

  function getAccessName(id) {
    let ob = accessLevels.find(item => item.id === id)
    if (ob) {
      return ob.name
    } else {
      return "-"
    }
  }

  onMount(async () => {
    try {
      const resAccess = await API.getAccessLevels()
      if (resAccess.status === 200) {
        accessLevels = resAccess.data
      }
      const resUsers = await API.getUsers()
      if ((resUsers.status = 200 || 201)) {
        allUsers.update(() => resUsers.data)
        console.log($allUsers)
      }
    } catch (error) {
      console.log(error)
    }
  })
</script>

<div class="body_wrapper">
  <h5>Employee</h5>
  {#if $userAccessLevel?.access?.settings?.employees?.addEmployee}
    <div class="top_action_bar">
      <Button
        title="Add"
        on:handleClick={() => handleEmployeeModal("Add", {})}
      />
    </div>
  {/if}

  <div class="table_wrapper">
    <div class="table_header">
      <div class="table_header_item col-1">
        <small>PROFILE </small>
      </div>
      <div class="table_header_item  col-2">
        <small>NAME</small>
      </div>
      <div class="table_header_item  col-4">
        <small>EMAIL</small>
      </div>

      <div class="table_header_item  col-2">
        <small>ACCESS LEVEL</small>
      </div>
      <div class="table_header_item   col-1">
        <small>ACTIONS</small>
      </div>
    </div>
    <div class="table_body">
      {#each $allUsers as user}
        {@const accessName = getAccessName(user.accessLevelId)}
        <div class="table_row">
          <div class="table_row_item col-1">
            <img src={`../${user.profileImg}.png`} alt="" width="40px" />
          </div>
          <div class="table_row_item col-2">
            <small>{user.name}</small>
          </div>
          <div class="table_row_item col-4">
            <small>{user.email}</small>
          </div>

          <div class="table_row_item col-2">
            <small>{accessName}</small>
          </div>

          <div class="table_row_item   col-2">
            <div class="button_row">
              <!-- <span><Icon icon="fluent:add-circle-16-regular" /></span> -->
              {#if $userAccessLevel?.access?.settings?.employees?.editEmployee}
                <span
                  type="button"
                  on:click={() => handleEmployeeModal("Edit", user)}
                  ><Icon icon="akar-icons:edit" /></span
                >
              {/if}
              {#if $userAccessLevel?.access?.settings?.employees?.deleteEmployee}
                <span type="button"><Icon icon="ci:off-outline-close" /></span>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

{#if showEmployeeModal.show}
  <EmployeeForm
    on:close={() => handleEmployeeModal()}
    info={showEmployeeModal}
  />
{/if}

<style>
  .table_wrapper {
    width: 100%;
    min-height: 500px;
    border-radius: 15px;
    margin-top: 10px;
  }
  .table_header {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--background);
    border-radius: 15px;
  }
  .table_header_item {
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    padding: 0 10px 0 30px;
  }

  .table_row {
    width: 100%;
    padding: 25px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: white;
    border-bottom: 1px solid var(--background);
  }
  .table_row_item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 10px 0 30px;
  }

  .button_row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .top_action_bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
