<script>
  // @ts-nocheck

  import Icon from "@iconify/svelte"
  import FeatureModel from "./FeatureModel.svelte"
  import Button from "../../Shared/Buttons/ButtonPrimary.svelte"
  import * as API from "../../../api/base"
  import { onMount } from "svelte"
  import { allFeatures, allFeaturesCategories, userAccessLevel, sideBarTab } from "../../../Store/Company"
  import DeleteFeatures from "./DeleteFeatures.svelte"

  let showFeatureModel = false

  let showDeleteModel = {
    show: false,
    id: "",
  }

  let startCount = 0
  let endCount = 7
  let pageNo = 1

  let info = {
    method: "Add",
    data: {},
  }

  const handleShowFeatueModel = (method, data) => {
    showFeatureModel = !showFeatureModel
    info.method = method
    info.data = data
  }

  const handleShowDeleteFeaturesModel = id => {
    showDeleteModel.show = !showDeleteModel.show
    showDeleteModel.id = id ? id : ""
  }

  const nextPage = () => {
    pageNo = pageNo + 1
    startCount = startCount + 7
    endCount = endCount + 7
  }

  const previousPage = () => {
    pageNo = pageNo - 1
    startCount = startCount - 7
    endCount = endCount - 7
  }

  function getCategory(id) {
    let item = $allFeaturesCategories.find(item => item.id === id)
    if (item) {
      return { id: item.id, name: item.name }
    }
  }

  onMount(async () => {
    sideBarTab.update(() => "features")
    try {
      const resCategories = await API.getFeaturesCategories()
      if (resCategories.status === 200) {
        allFeaturesCategories.update(() => resCategories.data)
        console.log($allFeaturesCategories)
      }
      const resFeatures = await API.getAllFeatures()
      if (resFeatures.status === 200) {
        allFeatures.update(() => resFeatures.data)
        console.log($allFeatures)
      }
    } catch (error) {
      console.log(error)
    }
  })
</script>

<div class="body_wrapper">
  <h3 class="mb-0 fw-bold">Configurations > Features</h3>
  <div class="feature_actionbar">
    <Button title="Add Feature" on:handleClick={() => handleShowFeatueModel("Add", {})} />
  </div>
  <div class="table_wrapper">
    <div class="table_header">
      <div class="table_header_item col-2">
        <small class="">NAME</small>
      </div>

      <div class="table_header_item col-2">
        <small class="">CATEGORY</small>
      </div>
      <div class="table_header_item col-3">
        <small class="">DESCRIPTION</small>
      </div>
      <div class="table_header_item col-1">
        <small class="">STATUS</small>
      </div>
      <div class="table_header_item col-2">
        <small class="">MODIFIED DATE</small>
      </div>
      <div class="table_header_item col-1">
        <small class="">ACTIONS</small>
      </div>
    </div>
    {#each $allFeatures.slice(startCount, endCount) as item}
      {@const category = getCategory(item.category)}
      <div class="table_row">
        <div class="table_row_item col-2">
          <small class="">{item.name}</small>
        </div>

        <div class="table_row_item col-2">
          <small class="">{category.name}</small>
        </div>
        <div class="table_row_item col-3">
          <small class="">{item.description}</small>
        </div>
        <div class="table_row_item col-1">
          {#if item.status === "Development"}
            <span class="ms-3"> <Icon icon="fluent:window-dev-tools-24-filled" width="28" style="color:#fba949" /></span>
          {:else if item.status === "Testing"}
            <span class="ms-3"> <Icon icon="fluent:window-dev-tools-24-filled" width="28" style="color:#fba949" /></span>
          {:else if item.status === "Active"}
            <span class="ms-3"> <Icon icon="bi:check-circle-fill" width="28" style="color:#8bd448" /></span>
          {/if}
        </div>
        <div class="table_row_item col-2">
          <small class="">{item.modifiedAt}</small>
        </div>
        <div class="table_row_item col-1">
          <div class="button_set">
            {#if $userAccessLevel?.access?.configurations?.editFeatures}
              <span on:click={() => handleShowFeatueModel("Edit", item)}>
                <Icon icon="bx:log-in-circle" width="20" type="button" />
              </span>
            {/if}
            {#if $userAccessLevel?.access?.configurations?.deleteFeatures}
              <span on:click={() => handleShowDeleteFeaturesModel(item.id)}>
                <Icon icon="carbon:close-outline" width="20" type="button" />
              </span>
            {/if}
          </div>
        </div>
      </div>
    {/each}
    <div class="table_pagination">
      <span class="page_btn" on:click={() => previousPage()} class:page_btn_disable={startCount === 0}
        ><Icon icon="carbon:previous-filled" width="20" /></span
      >
      <small>page {pageNo}</small>
      <span
        on:click={() => nextPage()}
        class="page_btn"
        class:page_btn_disable={(pageNo === 1 && $allFeatures.lenght === 7) || endCount > $allFeatures.length}
        ><Icon icon="carbon:next-filled" width="20" /></span
      >
    </div>
  </div>
</div>

{#if showFeatureModel}
  <FeatureModel on:close={handleShowFeatueModel} {info} />
{/if}
{#if showDeleteModel.show}
  <DeleteFeatures on:close={handleShowDeleteFeaturesModel} info={showDeleteModel} />
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
    min-height: 700px;
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
  .table_pagination {
    padding: 10px;
    background-color: var(--background);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }
  .page_btn {
    color: var(--grey7);
    cursor: pointer;
  }
  .page_btn:hover {
    color: var(--primary);
  }
  .page_btn_disable {
    pointer-events: none;
    color: var(--grey4);
  }
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
