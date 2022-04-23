<script>
  import { onMount } from 'svelte';
  import {theme} from "$lib/themes/themeStore.js"

  let currentTheme

  const applyTheme = () => {
    const store = localStorage.getItem("theme")
    currentTheme = store ? store : $theme
    if (currentTheme === "dark") {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark")
      $theme = 'dark'
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("theme", "light")
      $theme = 'light'
    }
  }

  const toggleTheme = () => {
    const stored = localStorage.getItem("theme")
    if (stored === "dark") {
      localStorage.setItem("theme", "light")
      $theme = 'light'
    } else {
      localStorage.setItem("theme", "dark")
      $theme = 'dark'
    }
    applyTheme()
  }

  onMount(() => {
    applyTheme()
  })

</script>

<label>
  <input type="checkbox" checked={currentTheme !== "dark"} on:click={toggleTheme} />
  <span class="toggle a-link">
    <span class="toggleIcons"></span>
  </span>
</label>

<style>
  label {
    position: relative;
    right: 10px;
    margin: 1px 0;
    display: flex;
    align-items: center;
    padding: 0;
    background: transparent;
    border: none;
    box-sizing: border-box;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: grey;
    --toggle-height: 20px;
  }

  @media all and (min-width: 900px) {
    label {
      margin: 0;
      --toggle-height: 15px;
    }
  }

  input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    overflow: hidden;
  }

  .toggle {
    position: relative;
    display: inline-block;
    width: calc(var(--toggle-height) * 2);
    height: var(--toggle-height);
    margin: 0 0.5em;

    background: gray;
    color: grey;

    border-radius: var(--toggle-height);
    cursor: pointer;
  }

  .toggle::after {
    position: absolute;
    top: 1px;
    left: 1px;
    width: calc(var(--toggle-height) - 2px);
    height: calc(var(--toggle-height) - 2px);

    background: #F37E5B;
    box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, 0.2);

    border-radius: var(--toggle-height);
    content: '';
    transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);
  }

  input:checked ~ .toggle:after {
    left: calc(var(--toggle-height) + 1px);
  }

  .toggleIcons {
    position: absolute;
    top: 2px;
    left: 4px;
    width: calc(100% - 7px);
    height: calc(100% - 6px);
    z-index: 1;

    display: flex;
    justify-content: space-between;

    font-size: 14px;
    pointer-events: none;
  }

  @media all and (min-width: 900px) {
    .toggleIcons {
      display: none;
    }
  }
  @media screen and (max-width: 992px){
    label{
      position: relative;
      top: 0;
      right: 0;
      margin-top: 15px;
    }
  }
</style>
