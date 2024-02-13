<script>
  import { flip } from "svelte/animate"
  import { fly } from "svelte/transition"
  import { notifications } from "../../../Store/notifications"
  import Icon from "@iconify/svelte"

  export let themes = {
    danger: "#c61d1d",
    success: "#107c0f",
    warning: "#f0ad4e",
    info: "#187cb7",
    default: "#aaaaaa",
  }
</script>

<div class="notifications">
  {#each $notifications as notification (notification.id)}
    <div
      animate:flip
      class="toast_custom"
      style="background: {themes[notification.type]};"
      transition:fly={{ y: -10 }}
    >
      <div class="content">
        {#if notification.icon}<Icon
            style="margin-right:8px"
            icon={notification.icon}
            width="22"
            height="22"
          />{/if}{notification.message}
      </div>
    </div>
  {/each}
</div>

<style>
  .notifications {
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 0;
    z-index: 1000000;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    pointer-events: none;
    width: 750px;
  }

  .toast_custom {
    flex: 0 0 auto;
    margin-bottom: 10px;
    display: block;
    align-items: center;
    width: 750px;
    border-radius: 5px;
  }

  .content {
    padding: 10px;
    display: flex;
    align-items: center;
    color: white;
    font-weight: 500;
    width: 750px;
  }
</style>
