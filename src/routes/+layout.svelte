<script>
  import Nav from '$lib/Nav.svelte'
  import {variables} from '$lib/utils/variables'
  import Notification from '$lib/Noti.svelte'
  import {theme} from "$lib/themes/themeStore.js"

  const year = new Date().getFullYear()

</script>

{#if $theme && (typeof window != 'undefined')}
  <div class="site">
    <Nav/>
    <Notification duration='7000'/>
    <div class="site-content">
      <slot/>
    </div>
    <footer class="text-center">
      <p>
        <a href="/"><strong>&copy {year} {variables.appName}. All rights reserved</strong></a><br>
        The source code is open source - <a href="https://mylastore.com">Author</a>
      </p>
    </footer>
  </div>
{/if}

<style>
  footer {
    margin: 40px;
    overflow: hidden;
  }
</style>
