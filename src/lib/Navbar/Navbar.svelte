<script>
  import Icon from "@iconify/svelte"
  import { createEventDispatcher, onMount } from "svelte"
  import { showCalculator, showTesting, showCoupons } from "../../Store/Homepage"
  import { useNavigate } from "svelte-navigator"

  const navigate = useNavigate()

  const profile = JSON.parse(localStorage.getItem("profile"))

  const handleOpentTesting = () => {
    showTesting.update(() => true)
  }
  const handleOpentCoupons = () => {
    showCoupons.update(() => true)
  }

  const handleLogout = () => {
    let theme = JSON.parse(localStorage.getItem("companydata"))?.color
    window.document.body.classList.remove(theme)
    localStorage.removeItem("profile")
    navigate("/login")
  }

  $: console.log(profile)
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<div class=" navbar_warapper">
  <div class="search">
    <span><Icon icon="akar-icons:search" /></span>
    <input type="text" class="input_feild" />
  </div>
  <div class="right_side">
    <div class="nav_item" on:click={() => handleOpentCoupons()}>
      <span><Icon icon="mdi:coupon-outline" width="25" /></span>
    </div>
    <div class="nav_item" on:click={() => handleOpentTesting()}>
      <span><Icon icon="fluent:window-dev-tools-24-regular" width="25" /></span>
    </div>
    <div class="nav_item">
      <span><Icon icon="eva:plus-square-outline" width="28" /></span>
    </div>
    <div class="nav_item">
      <span><Icon icon="lucide:settings" width="28" /></span>
    </div>
    <div class="nav_item">
      <span><Icon icon="ion:notifications-outline" width="28" /></span>
    </div>
    <div class="dropdown">
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a class="btn profile_wrapper dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="../1.png" class="profile_photo" alt="" />
        <small class="fw-bold">{profile.employeeName}</small>
      </a>

      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li on:click={handleLogout}>
          <a class="dropdown-item" href="#">Sign Out</a>
        </li>
      </ul>
    </div>
  </div>
</div>

<style>
  .navbar_warapper {
    width: calc(100% - 280px);
    display: flex;
    left: 280px;
    position: relative;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px 20px 10px;
    margin-top: 20px;
    background-color: var(--backgroundheader);
    border-radius: 15px;
  }
  .search {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 250px;
    height: 40px;
    background-color: white;
    padding: 10px;
    border-radius: 15px;
    color: gray;
  }
  .input_feild {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    background-color: transparent;
  }
  .right_side {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
  }
  .nav_item {
    cursor: pointer;
    padding: 5px;
  }
  .nav_item:hover {
    background-color: white;
    border-radius: 50%;
  }
  .profile_photo {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .profile_wrapper {
    background-color: white;
    border-radius: 10px;
    border: none;
  }
  .profile_wrapper:focus {
    box-shadow: none;
    border: none;
  }
</style>
