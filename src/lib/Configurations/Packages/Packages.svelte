<script>
  // @ts-nocheck

  import Icon from "@iconify/svelte"
  import PackageModal from "./PackageModel.svelte"
  import Button from "../../Shared/Buttons/ButtonPrimary.svelte"
  import { onMount } from "svelte"
  import * as API from "../../../api/base"
  import { allpackages, allFeatures, userAccessLevel, sideBarTab } from "../../../Store/Company"
  import { format } from "date-fns"
  import FeatureViewModel from "../../Company/Actions/FeaturesView.svelte"
  import DeletePackage from "./DeletePackages.svelte"

  let showPackageModel = false
  let selectedFeatures = []
  let showFeatureViewModel = false

  let info = {
    method: "",
    data: {},
  }
  let showDeleteModel = {
    show: false,
    id: "",
  }

  const handleShowPackageModel = (method, data) => {
    showPackageModel = !showPackageModel
    info.method = method
    if (data) {
      info.data = data
    } else {
      info.data = {}
    }
  }
  const handleShowFeatureViewModel = list => {
    list ? (selectedFeatures = list) : (selectedFeatures = [])
    showFeatureViewModel = !showFeatureViewModel
  }

  const handleShowDeletePackagesModel = id => {
    showDeleteModel.show = !showDeleteModel.show
    showDeleteModel.id = id ? id : ""
  }

  function getMinimumCost(priceList) {
    let price = priceList.find(item => item.currency === "usd")
    let cost = ""
    if (price) {
      cost = price.cost
    } else {
      cost = ""
    }
    return cost
  }

  onMount(async () => {
    sideBarTab.update(() => "packages")
    try {
      const resPackages = await API.getAllPackeges()
      if (resPackages.status === 200) {
        allpackages.update(() => resPackages.data)
        console.log($allpackages)
      }
      const resFeatures = await API.getAllFeatures()
      if (resFeatures.status === 200) {
        allFeatures.update(() => resFeatures.data)
      }
    } catch (error) {
      console.log(error)
    }
  })
</script>

<div class="body_wrapper">
  <h3 class="mb-0 fw-bold">
    {#if showPackageModel}
      <span on:click={() => handleShowPackageModel()} type="button">
        <Icon icon="ion:arrow-back-circle-outline" inline={true} />
      </span>
    {:else}
      <span type="button">
        <Icon icon="iconoir:packages" inline={true} />
      </span>
    {/if}
    Configurations > Packages {showPackageModel && info.method === "Add" ? "> Add Packeges" : ""}
    {showPackageModel && info.method === "Edit" ? "> Edit Packeges" : ""}
  </h3>
  {#if showPackageModel}
    <PackageModal on:close={handleShowPackageModel} {info} />
  {:else}
    <div class="feature_actionbar">
      <Button title="Add Package" on:handleClick={() => handleShowPackageModel("Add", {})} />
    </div>
    <div class="table_wrapper">
      <div class="table_header">
        <div class="table_header_item col-3">
          <small class="">PACKAGE NAME</small>
        </div>

        <div class="table_header_item col-2">
          <small class="">FEATURES</small>
        </div>
        <div class="table_header_item col-2">
          <small class="">MINIMUM COST</small>
        </div>
        <div class="table_header_item col-2">
          <small class="">PACKAGE COST</small>
        </div>

        <div class="table_header_item col-2">
          <small class="">MODIFIED DATE</small>
        </div>
        <div class="table_header_item col-2">
          <small class="">ACTIONS</small>
        </div>
      </div>
      {#each $allpackages as item}
        <div class="table_row">
          <div class="table_row_item col-3">
            <small class="">{item.name}</small>
          </div>
          <div class="table_row_item col-2">
            <small class="">{item.features.length}</small>
            <span type="button" on:click={() => handleShowFeatureViewModel(item.features)}><Icon icon="ic:baseline-expand-more" /></span>
          </div>
          <div class="table_row_item col-2">
            {#if item.costMethod === "Paid"}
              <span class="badge_active rounded-pill">
                ${getMinimumCost(item.monthlyCost)}
              </span>
            {:else}
              <span class="badge_hold rounded-pill">Free</span>
            {/if}
          </div>
          <div class="table_row_item col-2">
            {#if item.costMethod === "Paid"}
              <span class="badge_active rounded-pill">
                {#if item.defaultUserCount > 999}
                  ${getMinimumCost(item.monthlyCost)}
                {:else}
                  ${getMinimumCost(item.monthlyCost) * item.defaultUserCount}
                {/if}
              </span>
            {:else}
              <span class="badge_hold rounded-pill">Free</span>
            {/if}
          </div>
          <div class="table_row_item col-2">
            <small class="">{format(new Date(item.modifiedAt), "yyyy-MM-dd")}</small>
          </div>
          <div class="table_row_item col-2">
            <div class="button_set">
              {#if $userAccessLevel?.access?.configurations?.editPackages}
                <span on:click={() => handleShowPackageModel("Edit", item)}>
                  <Icon icon="bx:log-in-circle" width="20" type="button" />
                </span>
              {/if}
              {#if $userAccessLevel?.access?.configurations?.deletePackages}
                <span on:click={() => handleShowDeletePackagesModel(item.id)}>
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
{#if showDeleteModel.show}
  <DeletePackage on:close={handleShowDeletePackagesModel} info={showDeleteModel} />
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
    justify-content: start;
    padding: 0 10px 0 20px;
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
    justify-content: start;
    padding: 0 10px 0 20px;
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
  .feature_actionbar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 10px;
  }
</style>
