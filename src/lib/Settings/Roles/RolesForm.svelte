<script>
  // @ts-nocheck

  import Icon from "@iconify/svelte"
  import Select from "../../Shared/Select/Select.svelte"
  import Button from "../../Shared/Buttons/ButtonPrimary.svelte"
  import ButtonSecondary from "../../Shared/Buttons/ButtonSecondary.svelte"
  import { createEventDispatcher, onMount } from "svelte"
  import ButtonPrimary from "../../Shared/Buttons/ButtonPrimary.svelte"
  const dispatch = createEventDispatcher()

  let accessLevelList = [
    {
      name: "Level 1",
    },
    {
      name: "Level 2",
    },
  ]
  let selectedAccessLevel = "level 1"
</script>

<div class="body_wrapper">
  <div class="popup_wrapper">
    <div class="pop_header">
      <h5 class="mb-0 fw-bold">Add Role</h5>
      <span class="close_btn" on:click={() => dispatch("close")}>
        <Icon icon="icon-park-outline:close-one" width="28" />
      </span>
    </div>
    <div class="list_wrapper">
      <div class="input_row col-5">
        <small> Name </small>
        <input type="text" class="form-control" />
      </div>
      <div class="input_row col-5">
        <small> Access Level </small>
        <Select
          categories={accessLevelList}
          selectedItem={selectedAccessLevel}
          width="258px"
        />
      </div>
    </div>
    <div class="action_bar">
      <ButtonSecondary
        title="Cancel"
        on:handleClick={() => dispatch("close")}
      />
      <ButtonPrimary title="Save" />
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
    height: 400px;
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
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .action_bar {
    margin-top: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    padding: 10px 0;
  }
</style>
