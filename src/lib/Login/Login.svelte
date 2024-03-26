<script>
  // @ts-nocheck
  import Button from "../Shared/Buttons/ButtonPrimary.svelte"
  import Icon from "@iconify/svelte"
  import * as API from "../../api/base"
  import { onMount } from "svelte"
  import { notifications } from "../../Store/notifications"
  import { useNavigate } from "svelte-navigator"
  import axios from "axios"
  import { user } from "../../Store/Company"

  const navigate = useNavigate()

  const profile = JSON.parse(localStorage.getItem("profile"))
  let formData = {
    username: "test@test.com",
    password: "test123",
  }
  let formError = {
    username: false,
    password: false,
    overrall: false,
  }
  let excuting = false

  function isValidEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const handleLogin = async () => {
    if (formData.username === "" || !isValidEmail(formData.username)) {
      formError.username = true
    } else if (formData.password === "") {
      formError.password = true
    }
    if (formError.username || formError.password) {
      formError.overrall = true
    }

    if (!formError.overrall) {
      try {
        excuting = true

        const res = await API.login(formData)
        console.log(res.data)
        if (res.status === 201 && res.data.success) {
          let token = res.data.token
          await API.setToken(token)
          localStorage.setItem("profile", JSON.stringify(res.data))
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
          navigate(`/sap/companies`)
        } else {
          excuting = false
          if (!res.data.username) {
            notifications.danger("Invalid User ..!", 2000)
          } else if (!res.data.password) {
            notifications.danger("Wrnong Password ..!", 2000)
          } else if (!res.data.emailVerified) {
            notifications.danger("Please verify your email..", 2000)
          }
        }
      } catch (error) {
        console.log(error)
        excuting = false
        notifications.danger("Invalid credentials", 2000)
      }
    }
  }

  onMount(async () => {})
</script>

<div class="body">
  <div class="signin_form">
    <div class="form_wrapper">
      <div class="form_header">
        <Icon icon="uis:keyhole-circle" width="40" style="color:var(--primary)" />
        <h1>Sign in</h1>
        <p>Sign in to your account</p>
      </div>
      <div class="form_body">
        <div class="form_group">
          <label for="email">Email</label>
          <input class="form-control" type="email" id="email" bind:value={formData.username} />
        </div>
        <div class="form_group">
          <label for="password">Password</label>
          <input class="form-control" type="password" id="password" bind:value={formData.password} />
        </div>
      </div>
      <div class="form_footer">
        <Button title="Sign in" on:handleClick={() => handleLogin()} bind:excuting />
      </div>
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
    height: 500px;
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
  .form_body {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 40px 0;
  }
  .form_group {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
  }

  .form_footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
