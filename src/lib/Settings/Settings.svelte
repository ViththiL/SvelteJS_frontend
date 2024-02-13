<script>
  // @ts-nocheck

  import Icon from "@iconify/svelte"
  import AccessLevels from "./AccessLevels/AccessLevels.svelte"
  import Employees from "./Employess/Employees.svelte"
  import Emails from "./Emails/Emails.svelte"
  import {
    accessLevels,
    sideBarTab,
    userAccessLevel,
  } from "../../Store/Company"
  import { onMount } from "svelte"

  let selectedTab = ""

  const handleSelectTab = tab => {
    selectedTab = tab
  }

  onMount(() => {
    sideBarTab.update(() => "settings")
    if ($userAccessLevel?.access?.settings?.accessLevels?.main) {
      selectedTab = "accessLevels"
    } else if ($userAccessLevel?.access?.settings?.employees?.main) {
      selectedTab = "employees"
    } else if ($userAccessLevel?.access?.settings?.emails?.main) {
      selectedTab = "emails"
    }
  })
</script>

<div class="body_wrapper">
  <h3 class="mb-0 fw-bold">
    <span>
      <Icon icon="lucide:settings" inline={true} />
    </span>Settings
  </h3>
  <div class="settings_wrapper mt-3">
    <div class="side_bar">
      {#if $userAccessLevel?.access?.settings?.accessLevels?.main}
        <div
          class="bar_item"
          class:bar_item_active={selectedTab === "accessLevels"}
          on:click={() => handleSelectTab("accessLevels")}
        >
          Access Levels
        </div>
      {/if}
      {#if $userAccessLevel?.access?.settings?.employees?.main}
        <div
          class="bar_item"
          class:bar_item_active={selectedTab === "employees"}
          on:click={() => handleSelectTab("employees")}
        >
          Employees
        </div>
      {/if}
      {#if $userAccessLevel?.access?.settings?.emails?.main}
        <div
          class="bar_item"
          class:bar_item_active={selectedTab === "emails"}
          on:click={() => handleSelectTab("emails")}
        >
          Email Templates
        </div>
      {/if}
    </div>
    <div class="content_wrapper">
      {#if selectedTab === "accessLevels"}
        <AccessLevels />
      {:else if selectedTab === "employees"}
        <Employees />
      {:else if selectedTab === "emails"}
        <Emails />
      {/if}
    </div>
  </div>
</div>

<style>
  .body_wrapper {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin-left: 280px;
    margin-top: 20px;
  }
  .settings_wrapper {
    width: 100%;
    height: 700px;
    background-color: white;
    border-radius: 15px;
    padding: 20px;
    display: flex;
  }
  .side_bar {
    width: 220px;
    height: 100%;
    background-color: var(--background);
    border-radius: 15px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .bar_item {
    width: 100%;
    height: 40px;
    background-color: white;
    border-radius: 15px;
    padding: 0px 20px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: bold;
    gap: 10px;
    cursor: pointer;
  }
  .bar_item:not(.bar_item_active):hover {
    background-color: var(--backgroundSecondary);
  }
  .bar_item_active {
    background-color: var(--primary);
    color: white;
  }
  .content_wrapper {
    display: flex;
    flex: 1;
    background-color: white;
    border-radius: 15px;
    padding: 0px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .content_wrapper h5 {
    font-weight: 4500;
  }
</style>
