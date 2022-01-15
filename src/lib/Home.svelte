<script>
  import Logo from "$lib/images/Logo.svelte";
</script>

<div class='hero-bg'>
  <div class="container">
    <div class="center">
      <Logo/>
      <div class='tagline'>Simple starter template to build svelte apps</div>
    </div>
  </div>
</div>

<div class='container'>
  <div class='row blogs'>
    <div class='col-md'>
      <div class='card mb-3'>
        <img src='img/1.webp' width="550" height="368" class='card-img-top img-fluid' alt='mountains'>
        <div class='card-body'>
          <h5 class='card-title'>Power by Svelte</h5>
          <p class='card-text'>SvelteKit is an application framework powered by Svelte — build bigger apps with a
            smaller footprint and no headaches</p>
          <a href='https://svelte.dev/' class='btn btn-primary'>Learn more</a>
        </div>
      </div>
    </div>
    <div class='col-md'>
      <div class='card mb-3'>
        <img src='img/1.webp' width="550" height="368" class='card-img-top img-fluid' alt='mountains'>
        <div class='card-body'>
          <h5 class='card-title'>Sveltekit</h5>
          <p class='card-text'>A framework for building web applications, with a simple development experience and
            flexible filesystem-based routing</p>
          <a href='https://kit.svelte.dev' class='btn btn-primary'>Go somewhere</a>
        </div>
      </div>
    </div>
    <div class='col-md'>
      <div class='card mb-3'>
        <img src='img/1.webp' width="550" height="368" class='card-img-top img-fluid' alt='mountains'>
        <div class='card-body'>
          <h5 class='card-title'>Build fast</h5>
          <p class='card-text'>Hit the ground running with advanced routing, server-side rendering, code-splitting,
            offline support and more</p>
          <a href='https://kit.svelte.dev/docs' class='btn btn-primary'>Read docs</a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .center{
    padding: 50px 0
  }
  .tagline {
    margin-top: 5px;
  }

  .hero-bg {
    background: #d3d6d9;
    background: radial-gradient(34.14% 72.25% at 47.58% 31.75%, rgba(232, 244, 255, .52) 0, rgba(255, 255, 255, 0) 100%), linear-gradient(92.4deg, #d1d4d7 14.67%, rgba(238, 247, 255, .48) 54.37%, rgba(206, 216, 224, .62) 92.49%), linear-gradient(0deg, #dbe7ef, #dbe7ef);
    position: relative;
    height: 200px;
  }

  .blogs {
    margin-top: 20px;
  }
</style>