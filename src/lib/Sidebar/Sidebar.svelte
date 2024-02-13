<script>
  // @ts-nocheck

  import Icon from "@iconify/svelte"
  import Toast from "../Shared/Toast/Toast.svelte"
  import { useNavigate } from "svelte-navigator"
  import { sideBarTab } from "../../Store/Company"
  import * as API from "../../api/base"
  import { onMount } from "svelte"
  import { userAccessLevel } from "../../Store/Company"
  import { showCoupons, showTesting } from "../../Store/Homepage"
  import Testing from "../Company/Actions/Testing.svelte"
  import Coupons from "../Coupons/Coupons.svelte"

  const navigate = useNavigate()
  const profile = JSON.parse(localStorage.getItem("profile"))

  onMount(async () => {
    try {
      const res = await API.getAccessLevelsById(profile.accessLevelId)
      userAccessLevel.update(() => res.data)
      console.log($userAccessLevel)
    } catch (error) {
      console.log(error)
    }
  })
</script>

<div class="sidebar_wrapper">
  <img src="https://zelora.s3.amazonaws.com/logo/romeohr_main.png" alt="" />

  <div class="item_wrapper">
    {#if $userAccessLevel?.access?.overview?.main}
      <div class="item" class:item_active={$sideBarTab === "overview"}>
        <span><Icon icon="radix-icons:dashboard" inline={true} /></span>
        <p class="mb-0">Overview</p>
      </div>
    {/if}
    {#if $userAccessLevel?.access?.companies?.main}
      <div class="item" class:item_active={$sideBarTab === "companies"} on:click={() => navigate("companies")}>
        <span><Icon icon="heroicons-outline:office-building" inline={true} /></span>
        <p class="mb-0">Companies</p>
      </div>
    {/if}
    {#if $userAccessLevel?.access?.configurations?.main}
      <div
        class="item"
        class:item_active={$sideBarTab === "configuration"}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#tabOne"
        aria-expanded="false"
        aria-controls="tabOne"
      >
        <span>
          <Icon icon="iconoir:packages" inline={true} />
        </span>
        <p class="mb-0">Configurations</p>
      </div>
    {/if}

    <div id="tabOne" class="sidebar_submenu collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      {#if $userAccessLevel?.access?.configurations?.viewFeatures}
        <div class="sub_item" class:item_active={$sideBarTab === "features"} on:click={() => navigate("connfiguration/features")}>
          <small>Features</small>
        </div>
      {/if}
      {#if $userAccessLevel?.access?.configurations?.viewPackages}
        <div class="sub_item" class:item_active={$sideBarTab === "packages"} on:click={() => navigate("connfiguration/packages")}>
          <small>Packages</small>
        </div>
      {/if}
    </div>

    {#if $userAccessLevel?.access?.settings?.main}
      <div class="item" class:item_active={$sideBarTab === "settings"} on:click={() => navigate("settings")}>
        <span><Icon icon="lucide:settings" inline={true} /></span>
        <p class="mb-0">Settings</p>
      </div>
    {/if}
  </div>
</div>

{#if $showTesting}
  <Testing />
{/if}
{#if $showCoupons}
  <Coupons />
{/if}

<style>
  .sidebar_wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 280px;
    height: 100vh;
    padding: 40px;
    background-color: #f7f7fc;
    z-index: 100;
  }
  .item_wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
    padding: 50px 0px;
    gap: 15px;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 25px;
    font-weight: bold;
    gap: 10px;
    width: 200px;
    height: 40px;
    cursor: pointer;
  }

  .item_active {
    background-color: var(--primary);
    color: white;
    border-radius: 15px;
  }
  .item:not(.item_active):hover {
    background-color: var(--backgroundSecondary);
    border-radius: 15px;
  }
  .sidebar_submenu {
    padding-left: 25px;
  }
  .sub_item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 20px;
    font-weight: bold;
    gap: 10px;
    width: 170px;
    height: 40px;
    cursor: pointer;
    margin-bottom: 5px;
  }
  .sub_item:not(.item_active):hover {
    background-color: var(--backgroundSecondary);
    border-radius: 15px;
  }
</style>
