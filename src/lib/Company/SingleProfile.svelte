<script>
  // @ts-nocheck

  import Icon from "@iconify/svelte"
  import Button from "../Shared/Buttons/ButtonPrimary.svelte"
  import Select from "../Shared/Select/Select.svelte"
  import FeatureViewModel from "./Actions/FeaturesView.svelte"
  import FeatureModel from "./Actions/Features.svelte"
  import SendEmail from "../Settings/Emails/Emailmodel.svelte"
  import Emailmodel from "../Settings/Emails/Emailmodel.svelte"
  import EmailHistory from "./Actions/EmailHistory.svelte"
  import * as API from "../../api/base"
  import { onMount } from "svelte"
  import { format } from "date-fns"
  import { allFeatures, allPackages } from "../../Store/Homepage"
  import { showCustomRefund, singleCompanyEmails, userAccessLevel } from "../../Store/Company"
  import { addFeatures } from "../../Store/Company"
  import Repayment from "./Actions/Repayment.svelte"
  import AddAddones from "./Actions/AddAddones.svelte"
  import CustomRefund from "./Actions/CustomRefund.svelte"
  import EmailCount from "./Actions/EmailCount.svelte"
  import MessageViewer from "./Actions/Popups/MessageViewer.svelte"

  export let id
  let list = [
    {
      id: 1,
      name: "Company 1",
      package: "Package 1",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      status: "Active",
      date: "2021-01-01",
      trial: false,
    },
    {
      id: 2,
      name: "Company 2",
      package: "Package 2",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      status: "Active",
      date: "2021-01-01",
      trial: false,
    },
    {
      id: 3,
      name: "Company 3",
      package: "Package 3",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      status: "On Hold",
      date: "2021-01-01",
      trial: true,
    },
    {
      id: 4,
      name: "Company 4",
      package: "Package 4",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      status: "Active",
      date: "2021-01-01",
      trial: false,
    },
  ]
  let companyList = []
  let featureTableList = []
  let statusList = [
    {
      name: "Active",
    },
    {
      name: "On Hold",
    },
  ]
  let selectedStatus = "Active"
  let singleProfile = false
  let name = ""
  let companyInfo = {}
  let admin = {
    id: "",
    name: "",
    email: "",
  }
  let info = {
    companyId: "",
    companyFeaturesId: "",
    companyName: "",
  }
  let allEmployees = []
  let empCount = ""
  let selectedFeatures = []
  let showFeatureModel = false
  let showFeatureViewModel = false
  let showEmailModel = false
  let showEmailHistory = false
  let showEmailCount = false
  let selectedRow = {
    method: "Edit",
    data: {},
  }
  let selectedRepayment = {
    showModel: false,
    selectedId: "",
  }
  let allCustomSupports = []
  let showAddon = {
    show: false,
    method: "",
    data: "",
    companyId: id,
  }
  let emailCount = ""
  let emailCountList = []
  let showMessageViewer = {
    show: false,
    msgId: "",
  }

  const handleShowMessageViewer = id => {
    if (id) {
      showMessageViewer.msgId = id
    } else {
      showMessageViewer.msgId = ""
    }

    showMessageViewer.show = !showMessageViewer.show
  }

  const handleShowFeatureViewModel = list => {
    list ? (selectedFeatures = list) : (selectedFeatures = [])
    showFeatureViewModel = !showFeatureViewModel
  }

  const handleShowRepayment = id => {
    selectedRepayment.showModel = !selectedRepayment.showModel
    selectedRepayment.selectedId = id
  }

  const handleEmailCount = () => {
    showEmailCount = !showEmailCount
  }

  const handleShowFeatureModel = (method, info) => {
    showFeatureModel = !showFeatureModel
    console.log(showFeatureModel)
    addFeatures.update(() => showFeatureModel)
    selectedRow.method = method
    selectedRow.data = info
  }

  const handleShowEmailModel = cfId => {
    showEmailModel = !showEmailModel
    info.companyFeaturesId = cfId
    info.companyId = id
    info.companyName = name
  }

  const handleShowEmailHistory = id => {
    showEmailHistory = !showEmailHistory
    if (id) {
      info.companyId = id
      info.companyName = name
    } else {
      info.companyId = ""
      info.companyName = ""
    }
  }

  const handleShowAddones = (method, data) => {
    showAddon.show = !showAddon.show
    showAddon.method = method
    showAddon.data = data
  }

  const handleShowCustomRefund = () => {
    showCustomRefund.update(() => true)
  }

  function getPackageInfo(id) {
    let packageInfo = $allPackages.find(item => item.id == id)

    if (packageInfo) {
      return packageInfo.name
    } else {
      return {}
    }
  }

  function getEmailCount(id) {
    let ob = $singleCompanyEmails.filter(item => item.companyFeaturesId === id)
    if (ob) {
      return ob.length
    } else {
      return 0
    }
  }

  function getEmpInfo(id) {
    let empInfo = allEmployees.find(item => item.employeeId == id)

    if (empInfo) {
      let obj = {
        name: empInfo.fullName.first + " " + empInfo.fullName.last,
        email: empInfo.username,
      }
      return obj
    } else {
      return {}
    }
  }

  onMount(async () => {
    try {
      console.log("ran")
      const res = await API.getCompanyInfoById(id)
      companyInfo = res.data
      console.log(companyInfo)
      name = companyInfo.companyName
      const resEmails = await API.getEmailCompany(id)
      singleCompanyEmails.update(() => resEmails.data)
      const resAllFeatues = await API.getCompanyFeatuesById(id)
      featureTableList = resAllFeatues.data.sort((a, b) => {
        return a.createdAt < b.createdAt ? 1 : -1
      })
      const resEmployees = await API.getCompanyEmployees(id)
      allEmployees = resEmployees.data
      empCount = resEmployees.data.length
      let aId = allEmployees.find(item => item.owner === true).employeeId
      admin.id = aId
      admin.name = getEmpInfo(aId).name
      admin.email = getEmpInfo(aId).email
      const resAllCustomSupports = await API.getCustomSupportSubjects(id)
      allCustomSupports = resAllCustomSupports.data
      // const resEmailCount = await API.getEmailCount(id)
      // let sum = resEmailCount.data.reduce((a, b) => a + b.count, 0)
      // emailCountList = structuredClone(resEmailCount.data)
      // emailCount = sum
    } catch (error) {
      console.log(error)
    }
  })
</script>

<div class="body_wrapper">
  {#if showFeatureModel}
    <FeatureModel on:close={() => handleShowFeatureModel("Add", {})} info={selectedRow} />
  {:else}
    <div class="top_bar">
      <div class="top_bar_left">
        <div class="profile_wrapper">
          <img src="https://zelora.s3.amazonaws.com/logo/romeohr_hero.png" alt="Avatar" class="profile_avatar" />
          <p class="mb-0 mt-1 fw-bold">{name}</p>
          <span class="active_badge"> <Icon icon="ci:dot-03-m" />Active</span>
          <hr class="divider" />
          <div class="owner_wrapper">
            <img src="https://zelora.s3.amazonaws.com/logo/romeohr_hero.png" alt="Avatar" class="owner_avatar" />
            <div class="owner_info">
              <small class="fw-bold">Account Owner</small>
              <small>Name : {admin.name}</small>
              <small>Email : {admin.email}</small>
            </div>
          </div>
          <div class="Owner_action">
            <Button title="Change" />
          </div>
          <div class="status_wrapper">
            <small class="fw-bold">Status</small>

            <Select
              categories={statusList}
              bind:selectedItem={selectedStatus}
              width="150px"
              disable={!$userAccessLevel?.access?.companies?.changeCompanyStatus}
            />
          </div>
        </div>
      </div>
      <div class="top_bar_right">
        <div class="top_bar_right_col col-6">
          <div class="top_bar_right_col_item">
            <h4 class="mb-0">Employee <br />Count</h4>
            <h2 class="fw-bold mb-0">{empCount}</h2>
          </div>
          <div class="top_bar_right_col_item type_button" on:click={handleShowCustomRefund}>
            <h4 class="mb-0">Refund <br /></h4>
            <Icon icon="ri:money-dollar-circle-fill" width="40" />
          </div>
          <div class="top_bar_right_col_item type_button" on:click={handleEmailCount}>
            <h4 class="mb-0">Email <br /> Count</h4>
            <h2 class="fw-bold mb-0">{emailCount}</h2>
          </div>
        </div>

        <div class="top_bar_left_col col-6">
          <div class="banner">
            <small>This account created using <b>{companyInfo?.initialEmail}</b></small>
          </div>
          <div class="customer_support_wrapper">
            <small class="fw-bold">Customer Support requests</small>
            {#each allCustomSupports as msg}
              <div class="single_msg_wrapper" on:click={() => handleShowMessageViewer(msg.msgId)}>
                <div class="single_msg_wrapper_top">
                  <div class="single_msg_wrapper_top_left">
                    <img src="./user.png" alt="" class="single_msg_wrapper_top_left" />
                  </div>
                  <div class="single_msg_wrapper_top_right">
                    <small class="fw-bold">{msg.senderName}</small>
                    <small>{msg.subject}</small>
                  </div>
                  <span>
                    <iconify-icon icon="uil:comment-alt-message" />
                  </span>
                </div>

                <!-- <div class="msg">
                  <small>
                    {msg.msg.text}
                  </small>
                </div> -->
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
    <div class="bottom_bar">
      <div class="feature_actionbar">
        <p class="mb-0 fw-bold">Features</p>
        <Button title="Add Addons" on:handleClick={() => handleShowAddones("Add", {})} disable={false} />
      </div>
      <div class="features_table">
        <div class="table_header">
          <div class="table_header_item col-1">
            <small class="">EFFECTIVE DATE</small>
          </div>
          <div class="table_header_item col-2">
            <small class="">PACKAGE NAME</small>
          </div>
          <div class="table_header_item col-1">
            <small class="">FEATURES</small>
          </div>
          <div class="table_header_item col-1">
            <small class="">END DATE</small>
          </div>
          <div class="table_header_item col-1">
            <small class="">COST</small>
          </div>
          <div class="table_header_item col-1">
            <small class="">BILLING PERIOD</small>
          </div>
          <div class="table_header_item col-2">
            <small class="">COMMENT</small>
          </div>
          <div class="table_header_item col-1">
            <small class="">CONFIGURED BY</small>
          </div>
          <div class="table_header_item col-1">
            <small class="">EMAIL COUNT</small>
          </div>
          <div class="table_header_item col-1">
            <small class="">ACTIONS</small>
          </div>
        </div>
        <div class="table_body">
          {#each featureTableList as item}
            {@const count = getEmailCount(item.id)}
            <div class="table_row">
              <div class="table_row_item col-1">
                <!-- <small class=""
                  >{format(new Date(item?.effectiveDate), "yyyy-MM-dd")}</small
                > -->
                {#if item.status === "Active"}
                  <span class="active_dot">
                    <Icon icon="mdi:dot" width="32" style="color:#8bd448" />
                  </span>
                {/if}
                <small class="">{item?.effectiveDate}</small>
              </div>
              <div class="table_row_item col-2">
                {#if item.type === "ADDON"}
                  <small>Addon</small>
                {:else}
                  <small class="">{getPackageInfo(item?.packageId)}</small>
                {/if}
              </div>

              <div class="table_row_item list_wrapper col-1">
                <small class="link">{item.features.length}</small>
                <span type="button" on:click={() => handleShowFeatureViewModel(item.features)}><Icon icon="ic:baseline-expand-more" /></span>
              </div>
              <div class="table_row_item col-1">
                <small class="">{item.expiredDate}</small>
              </div>
              <div class="table_row_item col-1">
                <small class="">${item.cost}</small>
              </div>
              <div class="table_row_item col-1">
                <small class="">{item.billingPeriod === "month" ? "Monthly" : "Yearly"}</small>
              </div>
              <div class="table_row_item col-2">
                <small class="">-</small>
              </div>
              <div class="table_row_item col-1">
                <span>
                  <img class="profile_img_small" src="https://i.ibb.co/qgctGwW/staff.png" alt="" />
                </span>
              </div>
              <div class="table_row_item col-1">
                <small class="">{count}</small>
                <span type="button" on:click={() => handleShowEmailHistory(item.id)}><Icon icon="ic:baseline-expand-more" /></span>
              </div>
              <div class="table_row_item col-1">
                <div class="button_row">
                  <!-- {#if $userAccessLevel?.access?.companies?.editFeatures}
                    <span on:click={() => handleShowFeatureModel("Edit", item)}
                      ><Icon icon="akar-icons:edit" /></span
                    >
                  {/if} -->

                  <span on:click={() => handleShowRepayment(item.id)}><Icon icon="material-symbols:attach-money-rounded" /></span>
                  {#if $userAccessLevel?.access?.companies?.sendEmails}
                    <span on:click={() => handleShowEmailModel(item.id)}>
                      <Icon icon="mdi:email-arrow-right" />
                    </span>
                  {/if}
                  <span><Icon icon="ci:off-outline-close" /></span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>

{#if showFeatureViewModel}
  <FeatureViewModel on:close={() => handleShowFeatureViewModel()} bind:featureList={selectedFeatures} />
{/if}

{#if showEmailModel}
  <Emailmodel on:close={handleShowEmailModel} {info} />
{/if}

{#if showEmailHistory}
  <EmailHistory on:close={handleShowEmailHistory} {info} />
{/if}

{#if selectedRepayment.showModel}
  <Repayment on:close={handleShowRepayment} id={selectedRepayment.selectedId} />
{/if}

{#if showAddon.show}
  <AddAddones on:close={() => handleShowAddones()} info={showAddon} />
{/if}

{#if $showCustomRefund}
  <CustomRefund companyId={id} />
{/if}

{#if showEmailCount}
  <EmailCount on:close={handleEmailCount} info={emailCountList} />
{/if}

{#if showMessageViewer.show}
  <MessageViewer on:closeModal={handleShowMessageViewer} id={showMessageViewer.msgId} cId={id} />
{/if}

<style>
  .body_wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
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
    justify-content: center;
    text-align: center;
    padding: 0 10px;
  }

  .table_row {
    width: 100%;
    padding: 22px 0;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: white;
    border-bottom: 1px solid var(--background);
  }
  .table_row_item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    position: relative;
  }
  .active_dot {
    position: absolute;
    left: 0px;
  }
  /* .list_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 5px;
    padding: 0px 10px;
    max-height: 75px;
    overflow-y: auto;
  } */

  .top_bar {
    width: 100%;
    height: 450px;
    display: flex;
    align-items: flex-start;
    justify-content: start;
    padding: 20px 0;
    gap: 20px;
  }
  .profile_wrapper {
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    background-color: white;
    border-radius: 15px;
    padding: 15px;
    position: relative;
  }
  .profile_avatar {
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15%;
  }
  .active_badge {
    padding: 0px 8px;
    border-radius: 15px;
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 12px;
    color: white;
    background-color: #8bd448;
  }
  .divider {
    width: 100%;
    height: 2px;
    background-color: var(--background);
    opacity: 1;
  }
  .owner_wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 15px;
  }
  .owner_info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
    font-weight: 500;
  }
  .owner_avatar {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15%;
  }
  .Owner_action {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .status_wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 15px;
    background-color: var(--background);
    border-radius: 15px;
    margin-top: 30px;
  }
  .top_bar_right {
    width: 100%;
    display: flex;
  }
  .top_bar_right_col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
    gap: 20px;
  }
  .top_bar_left_col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
    gap: 20px;
  }
  .customer_support_wrapper {
    width: 550px;
    height: 340px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 15px;
    padding: 10px;
    background-color: white;
    border-radius: 15px;
  }
  .banner {
    width: 100%;
    padding: 10px;
    background-color: var(--backgroundheader);
    border-radius: 10px;
  }
  .single_msg_wrapper {
    width: 100%;
    background-color: var(--background);
    border-radius: 15px;
    padding: 10px;
  }
  .single_msg_wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
    max-height: 100px;
    overflow: hidden;
  }
  .single_msg_wrapper_top {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
  }
  .single_msg_wrapper_top_left {
    display: flex;
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    background-color: white;
    border-radius: 50%;
  }
  .single_msg_wrapper_top_right {
    display: flex;
    line-height: 8px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
    font-size: 13px;
  }
  .msg {
    font-size: 13px;
    font-weight: 500;
  }
  .top_bar_right_col_item {
    display: flex;
    width: 40%;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    background-color: var(--primary);
    border-radius: 15px;
    color: white;
    font-weight: 500;
    gap: 30px;
  }
  .type_button {
    cursor: pointer;
  }
  .feature_actionbar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
  }
  .bottom_bar {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .features_table {
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 15px;
    padding: 20px;
  }
  .table_body {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    overflow-y: auto;
  }
  .button_row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
  }
  .profile_img_small {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15%;
  }
  /* .link {
    color: blue;
  }
  .link:hover {
    cursor: pointer;
    text-decoration: underline;
    color: blue;
  } */
</style>
