<script>
  // @ts-nocheck
  import Icon from "@iconify/svelte"
  import Button from "../../Shared/Buttons/ButtonPrimary.svelte"
  import EmailForm from "./EmailForm.svelte"
  import * as API from "./../../../api/base"
  import { onMount } from "svelte"
  import { allEmailTemplates, userAccessLevel } from "../../../Store/Company"
  import DeleteTemplate from "./DeleteEmailTemp.svelte"
  import DeleteEmailTemp from "./DeleteEmailTemp.svelte"

  let showEmailForm = false

  const handleShowEmailForm = (method, data) => {
    showEmailForm = !showEmailForm
    info.method = method
    info.data = data ? data : {}
  }

  let showDeleteTemplate = {
    show: false,
    id: "",
  }

  let info = {
    method: "",
    data: {},
  }

  const handleDeleteEmailTemplates = id => {
    showDeleteTemplate.show = !showDeleteTemplate.show
    showDeleteTemplate.id = id
  }

  onMount(async () => {
    try {
      const res = await API.getEmailTemplates()
      allEmailTemplates.update(() => res.data)
    } catch (error) {
      console.log(error)
    }
  })
</script>

<div class="body_wrapper">
  <h5>Emails Templates</h5>

  {#if $userAccessLevel?.access?.settings?.emails?.addEmail}
    <div class="top_action_bar">
      <Button
        title="Add"
        on:handleClick={() => handleShowEmailForm("Add", {})}
      />
    </div>
  {/if}

  <div class="table_wrapper">
    <div class="table_header">
      <div class="table_header_item col-5">
        <small>NAME </small>
      </div>
      <!-- <div class="table_header_item  col-5">
        <small>DESCRIPTIONS</small>
      </div> -->

      <div class="table_header_item   col-2">
        <small>ACTIONS</small>
      </div>
    </div>
    <div class="table_body">
      {#each $allEmailTemplates as email}
        <div class="table_row">
          <div class="table_row_item col-5">
            <small>{email.name}</small>
          </div>
          <!-- <div class="table_row_item col-5">
            <small>des</small>
          </div> -->

          <div class="table_row_item   col-2">
            <div class="button_row">
              <!-- <span><Icon icon="fluent:add-circle-16-regular" /></span> -->
              {#if $userAccessLevel?.access?.settings?.emails?.editEmail}
                <span
                  type="button"
                  on:click={() => handleShowEmailForm("Edit", email)}
                  ><Icon icon="akar-icons:edit" /></span
                >
              {/if}
              {#if $userAccessLevel?.access?.settings?.emails?.editEmail}
                <span
                  type="button"
                  on:click={() => handleDeleteEmailTemplates(email.id)}
                  ><Icon icon="ci:off-outline-close" /></span
                >
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

{#if showEmailForm}
  <EmailForm on:close={() => handleShowEmailForm()} {info} />
{/if}
{#if showDeleteTemplate.show}
  <DeleteEmailTemp
    on:close={() => handleDeleteEmailTemplates()}
    info={showDeleteTemplate}
  />
{/if}

<style>
  .table_wrapper {
    width: 100%;
    min-height: 500px;
    border-radius: 15px;
    margin-top: 10px;
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
    justify-content: flex-start;
    text-align: center;
    padding: 0 10px 0 30px;
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
    justify-content: flex-start;
    padding: 0 10px 0 30px;
  }

  .button_row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .top_action_bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
