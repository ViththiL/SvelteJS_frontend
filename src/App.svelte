<script>
  // @ts-nocheck

  import Companies from "./lib/Company/Companies.svelte"
  import Toast from "./lib/Shared/Toast/Toast.svelte"
  import { Router, Link, Route, createHistory } from "svelte-navigator"
  import Login from "./lib/Login/Login.svelte"
  import Sidebar from "./lib/Sidebar/Sidebar.svelte"
  import Navbar from "./lib/Navbar/Navbar.svelte"
  import PrivateRoute from "./lib/Guard/PrivateRoute.svelte"

  import NotFound from "./lib/Shared/404/NotFound.svelte"
  import FeatuesConfig from "./lib/Configurations/Features/Features.svelte"
  import PackageConfig from "./lib/Configurations/Packages/Packages.svelte"
  import EmailVerify from "./lib/Verify/EmailVerify.svelte"
  import Settings from "./lib/Settings/Settings.svelte"
  import createHashSource from "./hashHistory"

  const hash = createHistory(createHashSource())
</script>

<Toast />
<main>
  <Router history={hash}>
    <Route path="login" component={Login} />
    <Route path="/" component={Login} />
    <Route path="/sap/*">
      <Navbar />
      <Sidebar />

      <PrivateRoute path="/companies" let:location let:registerFocus>
        <Companies />
      </PrivateRoute>
      <PrivateRoute path="/connfiguration/features" let:location let:registerFocus>
        <FeatuesConfig />
      </PrivateRoute>
      <PrivateRoute path="/connfiguration/packages" let:location let:registerFocus>
        <PackageConfig />
      </PrivateRoute>
      <PrivateRoute path="/settings" let:location let:registerFocus>
        <Settings />
      </PrivateRoute>
    </Route>
    <Route path="/verify-email" component={EmailVerify} />
    <Route path="*" let:location let:navigate>
      <NotFound />
    </Route>
  </Router>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700;800;900&display=swap");
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  main {
    font-family: "Montserrat", sans-serif;
    /* font-family: "Rubik", sans-serif; */
  }
  :global(body) {
    --primary: #266e86;
    --background: rgb(247, 247, 252);
    --backgroundSecondary: #ececec;
    --backgroundheader: #ecf2f3;
    --backgroudtrasparent: rgba(247, 247, 252, 0.8);
    --primarytransparent: rgba(247, 247, 252, 0.3);
    --grey3: #fafafa;
    --grey4: #f4f4f4;
    --grey5: #dee2e6;
    --grey6: #ebebeb;
    --grey7: #999999;
  }

  :global(.ql-toolbar) {
    border-radius: 15px !important;
    margin-bottom: 15px;

    background-color: var(--backgroundheader);
  }
</style>
