<script>
</script>

<main>
  <!-- <img src={image} alt="" class="image" /> -->
  <div class="loading">
    <h2>LOADING .....</h2>
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
  </div>
</main>

<style>
  main {
    background: var(--background);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
  }
  .image {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
  }
  h2 {
    color: #ccc;
    margin: 0;
    font: 1em verdana;
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }

  .loading span {
    display: inline-block;
    vertical-align: middle;
    width: 0.7em;
    height: 0.7em;
    margin: 0.21em;
    background: #007db6;
    border-radius: 0.6em;
    animation: loading 1s infinite alternate;
  }

  .loading span:nth-of-type(2) {
    background: #008fb2;
    animation-delay: 0.2s;
  }
  .loading span:nth-of-type(3) {
    background: #009b9e;
    animation-delay: 0.4s;
  }
  .loading span:nth-of-type(4) {
    background: #00a77d;
    animation-delay: 0.6s;
  }
  .loading span:nth-of-type(5) {
    background: #00b247;
    animation-delay: 0.8s;
  }
  .loading span:nth-of-type(6) {
    background: #5ab027;
    animation-delay: 1s;
  }
  .loading span:nth-of-type(7) {
    background: #a0b61e;
    animation-delay: 1.2s;
  }

  /*
 * Animation keyframes
 * Use transition opacity instead of keyframes?
 */
  @keyframes loading {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
