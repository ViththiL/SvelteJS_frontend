<script>
  // @ts-nocheck
  import Icon from "@iconify/svelte"
  import FeatureViewModel from "./Actions/FeaturesView.svelte"
  import SingleProfile from "./SingleProfile.svelte"
  import * as API from "../../api/base"
  import { onMount } from "svelte"
  import { format } from "date-fns"
  import { allFeatures, allPackages } from "../../Store/Homepage"
  import { addFeatures, companyList, sideBarTab, userAccessLevel } from "../../Store/Company"
  import Toast from "../Shared/Toast/Toast.svelte"
  import { notifications } from "../../Store/notifications"

  let singleProfile = false
  let selectedCompanyId = ""
  let selectedFeatures = []

  let showFeatureViewModel = false

  const handleProfile = id => {
    singleProfile = true
    selectedCompanyId = id
  }
  const handleUnSelectProfile = () => {
    singleProfile = false
    selectedCompanyId = ""
  }
  const handleHideSingleProfile = () => {
    if ($addFeatures) {
      addFeatures.update(() => false)
    } else {
      singleProfile = false
      selectedCompanyId = ""
    }
  }

  const handleShowFeatureViewModel = list => {
    list ? (selectedFeatures = list) : (selectedFeatures = [])
    showFeatureViewModel = !showFeatureViewModel
  }

  const getPackageName = id => {
    let name = ""

    $allPackages.find(item => {
      if (item.id === id) {
        name = item.name
      }
    })
    return name
  }

  const excuteFunction = () => {
    notifications.success("success", 3000)
  }

  onMount(async () => {
    try {
      sideBarTab.update(() => "companies")
      const resAllFeatures = await API.getAllFeatures()
      allFeatures.update(() => resAllFeatures.data)
      const resAllPackages = await API.getAllPackeges()
      allPackages.update(() => resAllPackages.data)
      const res = await API.getAllCompaines()
      companyList.update(() => res.data)
    } catch (error) {
      console.log(error)
    }
  })
</script>

<div class="body_wrapper">
  <h3 class="mb-0 fw-bold">
    {#if singleProfile}
      <span type="button" on:click={() => handleUnSelectProfile()}> <Icon icon="material-symbols:arrow-back-rounded" inline={true} /></span>
    {:else}
      <span><Icon icon="heroicons-outline:office-building" inline={true} /></span>
    {/if}
    Companies {singleProfile ? "> Profile" : ""}
    {$addFeatures ? "> Add Features" : ""}
  </h3>
  {#if singleProfile}
    <SingleProfile id={selectedCompanyId} />
  {:else}
    <div class="table_wrapper">
      <div class="table_header">
        <div class="table_header_item col-1">
          <small class="">#NO</small>
        </div>

        <div class="table_header_item col-2">
          <small class="">COMPANY NAME</small>
        </div>
        <div class="table_header_item col-2">
          <small class="">ACTIVE PACKAGE</small>
        </div>
        <div class="table_header_item col-1">
          <small class="">FEATURES</small>
        </div>
        <div class="table_header_item col-1">
          <small class="">PAID STATUS</small>
        </div>
        <div class="table_header_item col-1">
          <small class="">STATUS</small>
        </div>
        <div class="table_header_item col-2">
          <small class="">LAST ACTIVITY</small>
        </div>
        <div class="table_header_item col-1">
          <small class="">CREATED DATE</small>
        </div>
        <div class="table_header_item col-1">
          <small class="">ACTIONS</small>
        </div>
      </div>
      {#each $companyList as item, i (i)}
        {@const packName = getPackageName(item.packages.packageId)}
        <div class="table_row">
          <div class="table_row_item col-1">
            <small class="">{i + 1}</small>
          </div>

          <div class="table_row_item col-2">
            <small class="">{item.companyName}</small>
          </div>
          <div class="table_row_item col-2">
            {#if item.packages.customPackage}
              <small class="">Custom</small>
            {:else}
              <small class="">{packName}</small>
            {/if}
          </div>
          <div class="table_row_item col-1">
            <small class="">{item.features.length}</small>
            <span type="button" on:click={() => handleShowFeatureViewModel(item.features)}><Icon icon="ic:baseline-expand-more" /></span>
          </div>
          <div class="table_row_item col-1">
            {#if item.paidStatus === "UN_PAID"}
              <span class="badge_hold rounded-pill">Un-Paid</span>
            {:else}
              <span class="badge_active rounded-pill">Paid</span>
            {/if}
          </div>
          <div class="table_row_item col-1">
            {#if item.status === "Active"}
              <span class="badge_active rounded-pill"> {item.paidStatus === "UN_PAID" ? "Active-Trial" : "Active"}</span>
            {:else}
              <span class="badge_hold rounded-pill"> On hold</span>
            {/if}
          </div>
          <div class="table_row_item col-2">
            <small class="">-</small>
          </div>
          <div class="table_row_item col-1">
            <small class="">{format(new Date(item.createdAt), "yyyy-MM-dd")}</small>
          </div>
          <div class="table_row_item col-1">
            <div class="button_set">
              <span on:click={() => handleProfile(item.id)}>
                <Icon icon="bx:log-in-circle" width="20" type="button" />
              </span>
              {#if $userAccessLevel?.access?.companies?.deleteCompany}
                <span on:click={() => excuteFunction()}>
                  <Icon icon="carbon:close-outline" width="20" type="button" />
                </span>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

{#if showFeatureViewModel}
  <FeatureViewModel featureList={selectedFeatures} on:close={handleShowFeatureViewModel} />
{/if}

<style>
  .body_wrapper {
    width: 80%;
    position: relative;
    left: 280px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }
  .table_wrapper {
    width: 100%;
    height: 700px;
    background-color: white;
    border-radius: 15px;
    margin-top: 20px;
    padding: 20px;
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
    justify-content: center;
    text-align: center;
    padding: 0 10px;
  }

  .table_row {
    width: 100%;
    padding: 22px 0;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: white;
    border-bottom: 1px solid var(--background);
  }
  .table_row_item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
  }
  /* .list_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 5px;
    padding: 0px 10px;
    max-height: 75px;
    overflow-y: auto;
  } */
  .button_set {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  /* .link {
    color: blue;
  }
  .link:hover {
    cursor: pointer;
    text-decoration: underline;
    color: blue;
  } */
  .badge_active {
    font-size: 12px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 75px;
    background-color: #8bd448;
    color: white;
    font-weight: 500;
  }
  .badge_hold {
    font-size: 12px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75px;
    background-color: red;
    color: white;
    font-weight: 500;
  }
</style>
