<script>
  // @ts-nocheck
  import Icon from "@iconify/svelte"
  import Button from "../..//Shared/Buttons/ButtonPrimary.svelte"
  import RoleSForm from "./RolesForm.svelte"

  let showRolesForm = false

  const handleShowForm = () => {
    showRolesForm = !showRolesForm
  }
</script>

<div class="body_wrapper">
  <h5>Roles</h5>

  <div class="top_action_bar">
    <Button title="Add" on:handleClick={() => handleShowForm()} />
  </div>

  <div class="table_wrapper">
    <div class="table_header">
      <div class="table_header_item  col-3">
        <small>NAME</small>
      </div>
      <div class="table_header_item  col-3">
        <small>ACCESS LEVEL</small>
      </div>
      <div class="table_header_item  col-3">
        <small>COUNT</small>
      </div>

      <div class="table_header_item   col-3">
        <small>ACTIONS</small>
      </div>
    </div>
    <div class="table_body">
      <div class="table_row">
        <div class="table_row_item col-3">
          <small>name</small>
        </div>
        <div class="table_row_item col-3">
          <small>manager</small>
        </div>
        <div class="table_row_item col-3">
          <small>0</small>
        </div>
        <div class="table_row_item   col-3">
          <div class="button_row">
            <!-- <span><Icon icon="fluent:add-circle-16-regular" /></span> -->
            <span><Icon icon="akar-icons:edit" /></span>
            <span><Icon icon="ci:off-outline-close" /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{#if showRolesForm}
  <RoleSForm on:close={handleShowForm} />
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
    align-items: flex-start;
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
