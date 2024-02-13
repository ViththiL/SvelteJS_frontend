<script>
  import { createEventDispatcher } from "svelte"

  export let categories = []

  let selectedItemNameById = ""
  export let selectedItemId
  export let selectedItemName = ""
  export let selectedObject = {}
  export let disable = false
  export let error = false
  export let width = "220px"

  const dispatch = createEventDispatcher()

  const handleSelect = (value) => {
    selectedItemId = value.id
    selectedItemName = value.name
    selectedObject = value
    dispatch("select", value)
  }

  $: if (selectedItemId) {
    selectedItemNameById = categories.find(
      (item) => item?.id === selectedItemId
    )?.name
  } else {
    selectedItemNameById = ""
  }

  $: cssVarStyles = `width:${width}`
</script>

<div class="btn-group ">
  <button
    type="button"
    class="btn  dropdown-toggle "
    data-bs-toggle="dropdown"
    aria-expanded="false"
    class:btn_error={error}
    style={cssVarStyles}
    disabled={disable}
  >
    <span
      >{selectedItemNameById === undefined || selectedItemNameById === ""
        ? "-- select --"
        : selectedItemNameById}</span
    >
  </button>
  <ul class="dropdown-menu">
    <div class="search_body">
      {#each categories as item}
        <li on:click={() => handleSelect(item)}>
          <small> {item.name}</small>
        </li>
      {/each}
    </div>
  </ul>
</div>

<style>
  ::placeholder {
    color: gray;
    font-size: 13px;
  }
  .btn-group {
    width: 100%;
    background-color: white;
    overflow-x: clip;
  }
  .btn {
    min-width: 220px !important;
    height: 38px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .btn_error {
    border: 1px solid red;
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.3);
  }
  .btn:focus {
    border: 1px solid var(--primary);
    box-shadow: 0 0 0 2px var(--primarytransparent);
  }
  .btn::after {
    color: gray;
  }
  .dropdown-menu {
    width: 100%;
    border: 1px solid var(--primary);
    box-shadow: 0 0 0 2px var(--primarytransparent);
    border-radius: 15px;
    padding: 0;
  }
  .search_body {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 150px;
  }

  .search_body li {
    padding: 3px 10px;
    cursor: pointer;
    color: var(--black80);
    font-weight: normal;
  }
  .search_body li:hover {
    background-color: var(--primary);
    color: white;
    border-radius: 15px;
  }
</style>
