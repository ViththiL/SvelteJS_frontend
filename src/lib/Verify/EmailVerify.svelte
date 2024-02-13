<script>
  // @ts-nocheck
  import Button from "../Shared/Buttons/ButtonPrimary.svelte"
  import Icon from "@iconify/svelte"
  import * as API from "../../api/base"
  import { onMount } from "svelte"
  import { notifications } from "../../Store/notifications"
  import { useNavigate } from "svelte-navigator"

  const navigate = useNavigate()

  let verified = false
  let code = ""
  let id = ""
  let canUse = true
  let numbers = {
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
  }
  let excuting = false

  const handleVerify = async token => {
    let formData = {
      token: token,
    }
    try {
      excuting = true
      const resVerify = await API.updateEmailVerify(id, formData)
      if (resVerify.status === 200 && resVerify.data.verified) {
        verified = true
        notifications.success("Verified Successfully", 2000)
        excuting = false
      } else if (resVerify.status === 200 && !resVerify.data.verified) {
        notifications.danger("Invalid token ... !")
      }
    } catch (error) {
      notifications.danger("Invalid key...")
      excuting = false
      console.log(error)
    }
  }
  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search)
    id = urlParams.get("token")
    try {
      const resToken = await API.getEmailVerify(id)
      if (resToken.status === 200) {
        canUse = resToken.data.canUse
      }
    } catch (error) {
      console.log(error)
    }
  })
</script>

<div class="body">
  <div class="signin_form">
    <div class="form_wrapper">
      <div class="form_header">
        <Icon
          icon="uis:keyhole-circle"
          width="40"
          style="color:var(--primary)"
        />
        <h1>Email verify</h1>
      </div>
      {#if canUse}
        {#if verified}
          <div class="verify_success">
            <span>
              <Icon
                icon="material-symbols:verified-outline-rounded"
                width="30"
              />
            </span>
            <small>Email verified ... !</small>
            <div class="form_footer mt-3">
              <Button title="Login" on:handleClick={() => navigate("/login")} />
            </div>
          </div>
        {:else}
          <p>Enter your token</p>
          <div class="input-field">
            <input
              type="text"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              maxlength="1"
              bind:value={numbers.one}
            />
            <input
              type="text"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              maxlength="1"
              bind:value={numbers.two}
              disabled={numbers.one.length === 0}
            />
            <input
              type="text"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              maxlength="1"
              bind:value={numbers.three}
              disabled={numbers.two.length === 0}
            />
            <input
              type="text"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              maxlength="1"
              bind:value={numbers.four}
              disabled={numbers.three.length === 0}
            />
            <input
              type="text"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              maxlength="1"
              bind:value={numbers.five}
              disabled={numbers.four.length === 0}
            />
            <input
              type="text"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              maxlength="1"
              bind:value={numbers.six}
              disabled={numbers.five.length === 0}
            />
          </div>
          <div class="form_footer">
            <Button
              title="Verify"
              on:handleClick={() => handleVerify()}
              disable={numbers.six.length === 0}
              bind:excuting
            />
          </div>
        {/if}
      {:else}
        <div class="link_expired">
          <small>Link expired ... !</small>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .body {
    width: 100%;
    height: 100vh;
    background-color: var(--background);
  }
  .signin_form {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .form_wrapper {
    width: 500px;
    height: 300px;
    background-color: white;
    border-radius: 15px;
    padding: 15px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 10px;
  }
  .form_header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .form_header h1 {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary);
  }

  .form_footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .input-field {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 15px 0px;
  }

  .input-field {
    flex-direction: row;
    column-gap: 10px;
  }
  .input-field input {
    height: 45px;
    width: 42px;
    border-radius: 6px;
    outline: none;
    font-size: 1.125rem;
    text-align: center;
    border: 1px solid #ddd;
  }
  .input-field input:focus {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  }
  .input-field input::-webkit-inner-spin-button,
  .input-field input::-webkit-outer-spin-button {
    display: none;
  }
  .verify_success {
    color: green;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 128, 0, 0.267);
    width: 350px;
    padding: 25px;
    border-radius: 15px;
    font-weight: bold;
  }

  .link_expired {
    margin-top: 25px;
    width: 400px;
    color: red;
    background-color: rgba(255, 0, 0, 0.2);
    border-radius: 15px;
    padding: 25px;
    font-weight: bold;
    text-align: center;
  }
</style>
