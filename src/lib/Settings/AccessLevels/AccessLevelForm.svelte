<script>
  // @ts-nocheck

  import Icon from "@iconify/svelte"
  import Button from "../../Shared/Buttons/ButtonPrimary.svelte"
  import CancelBtn from "../../Shared/Buttons/ButtonSecondary.svelte"

  let accessLevelForm = {
    name: "",
    access: {
      overview: {
        main: false,
      },
      companies: {
        main: false,
        deleteCompany: false,
        addCompany: false,
        changeAccountOwner: false,
        changeCompanyStatus: false,
        addFeatures: false,
        deleteFeatures: false,
        editFeatures: false,
        sendEmails: false,
      },
      configurations: {
        main: false,
        viewFeatures: false,
        viewPackages: false,
        addFeatures: false,
        addPackages: false,
        editFeatures: false,
        editPackages: false,
        deleteFeatures: false,
        deletePackages: false,
      },
      settings: {
        main: false,
        accessLevels: {
          main: false,
          addAccessLevel: false,
          editAccessLevel: false,
          deleteAccessLevel: false,
        },
        roles: {
          main: false,
          addRole: false,
          editRole: false,
          deleteRole: false,
        },

        employees: {
          main: false,
          addEmployee: false,
          editEmployee: false,
          deleteEmployee: false,
        },
        emails: {
          main: false,
          addEmail: false,
          editEmail: false,
          deleteEmail: false,
        },
      },
    },
  }
</script>

<!-- svelte-ignore a11y-role-has-required-aria-props -->
<div class="form_wrapper pt-4">
  <div class="input_row col-3">
    <small> Name </small>
    <input type="text" class="form-control" />
  </div>
  <div class="access_list_wrapper">
    <div class="access_list_header">
      <div class="access_list_header_item col-10">
        <small>ACCESS NAME</small>
      </div>
      <div class="access_list_header_item col-2">
        <small>EDIT ACCESS</small>
      </div>
    </div>
    <div class="access_list_body">
      <div class="category_row">
        <small>Companies</small>
        <div class="form-check form-switch p-0 m-0">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>Create Company</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.companies.addCompany}
            />
          </div>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>Delecte company</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.companies.deleteCompany}
            />
          </div>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>Change company account owner</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.companies.changeAccountOwner}
            />
          </div>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>Change company status</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.companies.changeCompanyStatus}
            />
          </div>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>Customize features</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.companies.addFeatures}
            />
          </div>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>Update customize features</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.companies.addCompany}
            />
          </div>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>Delete customize features</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.companies.addCompany}
            />
          </div>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>Send Emails</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.companies.addCompany}
            />
          </div>
        </div>
      </div>
      <div class="category_row">
        <small>Configurations</small>
        <div class="form-check form-switch p-0 m-0">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>View features</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.companies.addCompany}
            />
          </div>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>Update features</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.companies.updateFeatures}
            />
          </div>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>Delete features</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.companies.addCompany}
            />
          </div>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>View packages</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.companies.addCompany}
            />
          </div>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>Update packages</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.companies.addCompany}
            />
          </div>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>Delete packages</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.companies.addCompany}
            />
          </div>
        </div>
      </div>
      <div class="category_row">
        <small>Settings</small>
        <div class="form-check form-switch p-0 m-0">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      </div>

      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small class="sub_category">Access Levels</small>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>View access levels</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.settings.accessLevels.main}
            />
          </div>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>Create access levels</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.settings.accessLevels
                .addAccessLevel}
            />
          </div>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>Update access levels</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.settings.accessLevels
                .updateAccessLevels}
            />
          </div>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>Delete access levels</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.settings.accessLevels
                .deleteAccessLevels}
            />
          </div>
        </div>
      </div>

      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small class="sub_category">Employees</small>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>View employees</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.settings.employees.main}
            />
          </div>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>Create employees</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.settings.employees.addEmployee}
            />
          </div>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>Update employees</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.settings.employees
                .updateEmployee}
            />
          </div>
        </div>
      </div>
      <div class="access_list_row">
        <div class="access_list_row_item col-10">
          <small>Create access levels</small>
        </div>
        <div class="access_list_row_item col-2 ps-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              bind:value={accessLevelForm.access.settings.employees
                .deleteEmployee}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="action_bar">
    <CancelBtn title="Cancel" />
    <Button title="Save" />
  </div>
</div>

<style>
  .access_list_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    background-color: var(--background);
    border-radius: 15px;
    padding: 20px;
    margin-top: 20px;
    height: 450px;
  }
  .action_bar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 20px 0;
    gap: 10px;
    cursor: pointer;
  }
  .access_list_header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 10px;
    border-radius: 15px;
    background-color: var(--backgroundheader);
    font-weight: 500;
  }
  .access_list_body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    margin-top: 10px;
    overflow: hidden;
    overflow-y: scroll;
  }

  .category_row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    border-radius: 15px;
    background-color: white;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .sub_category {
    font-weight: 600;
    font-size: 13px;
  }
  .access_list_row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 5px 10px 5px 30px;
    font-size: 14px;
  }
</style>
