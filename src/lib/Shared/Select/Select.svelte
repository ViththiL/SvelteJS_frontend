<script>
  import { createEventDispatcher } from "svelte"

  const dispatch = createEventDispatcher()
  export let categories = []
  let search = ""
  export let selectedItem
  export let error = false
  export let width = "220px"
  export let height = "38px"
  export let disable

  const handleSelect = (value) => {
    selectedItem = value
    dispatch("selected", value)
  }
  const handleSelectObject = (value) => {
    dispatch("selectedObject", value)
  }

  $: cssVarStyles = `width:${width};height:${height};`
  $: console.log(selectedItem)
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
    <span>{selectedItem}</span>
  </button>
  <ul class="dropdown-menu">
    <div class="search_body">
      {#each categories as name}
        <li
          on:click={() => {
            handleSelect(name.name)
            handleSelectObject(name)
          }}
        >
          <small> {name.name}</small>
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
  /* .btn-group {
    min-width: 220px;
  } */
  .btn {
    height: 38px;
    font-size: 14px;
    min-width: 220px;
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
    padding: 0;
    border-radius: 15px;
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
