<script>
  import { createEventDispatcher } from "svelte"

  const dispatch = createEventDispatcher()
  export let title = ""
  export let type
  export let disable = false
  export let excuting = false
</script>

<main>
  <button
    class="btn"
    {type}
    on:click={() => dispatch("handleClick")}
    disabled={disable}
  >
    {#if excuting}
      <div class="spinner-border spinner-border-sm " role="status" />
    {:else}
      <slot name="icon" />
      <p class="mb-0 ">{title}</p>
    {/if}
  </button>
</main>

<style>
  .btn {
    background-color: var(--primary);
    border: 1px solid var(--primary);
    color: white;
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
