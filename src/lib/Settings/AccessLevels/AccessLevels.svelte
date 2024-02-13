<script>
  // @ts-nocheck
  import Icon from "@iconify/svelte"
  import Button from "../../Shared/Buttons/ButtonPrimary.svelte"
  import AccessLevelForm from "./AccessLevelForm.svelte"
  import * as API from "../../../api/base"
  import { onMount } from "svelte"
  import { accessLevels } from "../../../Store/Company"

  let viewMode = "list"

  const handleViewMode = (mode) => {
    viewMode = mode
  }

  onMount(async () => {
    try {
      const resAccessLvels = await API.getAccessLevels()
      if (resAccessLvels.status === 200) {
        accessLevels.update(() => resAccessLvels.data)
      }
    } catch (error) {
      console.log(error)
    }
  })
</script>

<div class="body_wrapper">
  <h5>
    Access Levels
    {#if viewMode === "add"}
      &gt; Add Access Level
    {:else if viewMode === "edit"}
      &gt; Add Access Level
    {/if}
  </h5>
  {#if viewMode === "list"}
    <div class="top_action_bar">
      <Button title="Add" on:handleClick={() => handleViewMode("add")} />
    </div>
  {/if}

  {#if viewMode === "list"}
    <div class="table_wrapper">
      <div class="table_header">
        <div class="table_header_item col-5">
          <small>NAME</small>
        </div>
        <div class="table_header_item  col-5">
          <small>COUNT</small>
        </div>
        <div class="table_header_item   col-1">
          <small>ACTIONS</small>
        </div>
      </div>
      <div class="table_body">
        {#each $accessLevels as level}
          <div class="table_row">
            <div class="table_row_item col-5">
              <small>{level.name}</small>
            </div>
            <div class="table_row_item  col-5">
              <small class="ps-3 fw-bold">{level.count}</small>
            </div>
            <div class="table_row_item   col-2">
              <div class="button_row">
                <!-- <span><Icon icon="fluent:add-circle-16-regular" /></span> -->
                <span><Icon icon="akar-icons:edit" /></span>
                <span><Icon icon="ci:off-outline-close" /></span>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {:else if viewMode === "add"}
    <AccessLevelForm />
  {:else if viewMode === "edit"}
    edit
  {/if}
</div>

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
