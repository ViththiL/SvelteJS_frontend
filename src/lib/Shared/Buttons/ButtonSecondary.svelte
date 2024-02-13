<script>
  import { createEventDispatcher } from "svelte"

  const dispatch = createEventDispatcher()
  export let title = ""
  export let type
  export let disable = false
</script>

<main>
  <button
    class="btn"
    {type}
    on:click={() => dispatch("handleClick")}
    disabled={disable}
  >
    <slot name="icon" />
    <p class="mb-0 ">{title}</p>
  </button>
</main>

<style>
  .btn {
    background-color: var(--background);
    border: 1px solid var(--background);
    color: gray;
    display: flex;
    align-items: center;
    font-size: small;
    font-weight: 600;
    padding: 5px 20px;
    border-radius: 15px;
  }
  .btn:hover {
    cursor: pointer;
  }
  .btn:focus {
    box-shadow: none;
  }
  .btn:disabled {
    background-color: white;
    border: 2px solid var(--grey6);
    color: gray;
  }
</style>
