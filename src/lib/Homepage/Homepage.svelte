<script>
  // @ts-ignore
  import Sidebar from "../Sidebar/Sidebar.svelte"
  import Navbar from "../Navbar/Navbar.svelte"
  import Company from "../Company/Companies.svelte"
  import Calculator from "../Company/Actions/Calculator.svelte"
  import FeatuesConfig from "../Configurations/Features/Features.svelte"
  import PackageConfig from "../Configurations/Packages/Packages.svelte"
  import Settings from "../Settings/Settings.svelte"
  import { showCalculator } from "../../Store/Homepage"
  import Toast from "../Shared/Toast/Toast.svelte"

  let tab = "companies"
</script>

<div class="body_wrapper">
  <!-- <div class="sidebar">
    <Sidebar bind:selectedTab={tab} />
  </div> -->
  <div class="content_wrapper">
    <Navbar />
    <div class="content">
      {#if tab === "companies"}
        <Company />
      {/if}
      {#if tab === "features"}
        <FeatuesConfig />
      {/if}
      {#if tab === "packages"}
        <PackageConfig />
      {/if}
      {#if tab === "settings"}
        <Settings />
      {/if}
    </div>
  </div>
</div>

{#if $showCalculator}
  <Calculator />
{/if}

<style>
  .body_wrapper {
    width: 100%;
    display: flex;
    height: 100vh;
  }

  .content_wrapper {
    width: 100%;
  }
  .content {
    width: 80%;
    height: 100%;
    padding: 40px 0px 0px 0px;
  }
</style>
