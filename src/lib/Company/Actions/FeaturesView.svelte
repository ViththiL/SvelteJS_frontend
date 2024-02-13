<script>
  import Icon from "@iconify/svelte"
  import { allFeatures, allPackages } from "../../../Store/Homepage"
  import { createEventDispatcher, onMount } from "svelte"
  const dispatch = createEventDispatcher()

  export let featureList = []

  function getAllFeatures(id) {
    let name = $allFeatures.find((item) => item.id === id)?.name
    if (name) {
      return name
    } else {
      return "No Feature"
    }
  }
</script>

<div class="body_wrapper">
  <div class="popup_wrapper">
    <div class="pop_header">
      <h5 class="mb-0 fw-bold">Features List</h5>
      <span class="close_btn" on:click={() => dispatch("close")}>
        <Icon icon="icon-park-outline:close-one" width="28" />
      </span>
    </div>
    <div class="list_wrapper">
      {#each featureList as feature}
        <div class="list_item">
          <small>{getAllFeatures(feature)}</small>
        </div>
      {/each}
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
    align-items: flex-start;
    justify-content: center;
    background-color: var(--backgroudtrasparent);
    width: 100%;
    min-height: 750px;
    height: 100%;
  }
  .popup_wrapper {
    width: 800px;
    height: 60%;
    margin-top: 100px;
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
    height: 85%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    overflow-y: auto;
  }
  .list_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: var(--background);
    border-radius: 15px;
  }
</style>
