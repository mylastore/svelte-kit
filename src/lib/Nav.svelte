<script>
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { api } from '$lib/utils/api'
  import { logout } from '$lib/utils/auth'
  import { session } from '$app/stores'
  import 'bootstrap/dist/css/bootstrap.css'
  import '../../src/app.css'
  import {variables} from '$lib/utils/variables'
  import Github from '$lib/images/Gighub.svelte'
  let user = $session.user

  let isActive = false

  function toggleNav () {
    isActive = !isActive
  }

  onMount(async () => {
    await import('bootstrap/js/dist/dropdown')
    await import('bootstrap/js/dist/collapse')

    var elements = document.getElementsByClassName('a-link')

    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', toggleNav, false)
    }

  })

  async function logOut () {
    const res = await api('POST', 'user/logout')
    if (res) {
      await logout()
    }
  }
</script>

<nav class='navbar navbar-expand-lg navbar-light bg-light'>
    <div class='container'>
        <a class='navbar-brand a-link' href='/'>
            {variables.appName}
        </a>
        <button
                class='navbar-toggler third-button'
                on:click={toggleNav}
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navbarSupportedContent'
                aria-controls='navbarSupportedContent'
                aria-expanded='false'
                aria-label='Toggle navigation'
        >
            <div class="animated-icon {isActive ? 'open' : undefined}"><span></span><span></span><span></span></div>
        </button>
        <div class='collapse navbar-collapse' class:show={isActive} id='navbarSupportedContent'>
            <ul class='navbar-nav me-auto'>
                <li class='nav-item'>
                    <a href="/support" class="nav-link">Support</a>
                </li>
            </ul>
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link active git a-link" aria-current="page" target='_blank' href="https://github.com/mylastore/svelte-kit.git">
                        <Github />
                    </a>
                </li>
            </ul>
            <ul class='navbar-nav'>
                {#if !user}
                    <li class='nav-item'>
                        <a class='nav-link a-link' class:active={$page.path === '/login'} href='/login'>Sing In</a>
                    </li>
                    <li class='nav-item'>
                        <a class='a-link btn btn-outline-secondary' role="button" class:active={$page.path === '/register'} href='/register'>Sing Up</a>
                    </li>
                {/if}
                {#if user}
                    <li class='nav-item dropdown'>
                        <a
                                class:active={$page.path === `user/profile/${user.username}`}
                                class='nav-link dropdown-toggle'
                                href='#'
                                id='navbarDropdown'
                                role='button'
                                data-bs-toggle='dropdown'
                                aria-expanded='false'
                        >
                            {user.username}
                        </a>
                        <ul class='dropdown-menu dropdown-menu-end' aria-labelledby='navbarDropdown'>
                            <li>
                                <a
                                        class='dropdown-item a-link'
                                        class:active={$page.path === `user/profile/${user.username}`}
                                        href='/user/profile/{user.username}'>Profile</a
                                >
                            </li>
                            {#if user.role === 'admin'}
                                <li>
                                    <a class='dropdown-item a-link' class:active={$page.path === '/admin'} href='/admin'
                                    >Admin</a
                                    >
                                </li>
                            {/if}
                            <li>
                                <a class='dropdown-item a-link' class:active={$page.path === '/support'} href='/support'
                                >Support</a
                                >
                            </li>
                            <li>
                                <hr class='dropdown-divider'/>
                            </li>
                            <li><a class='dropdown-item a-link' on:click|preventDefault={logOut} href='#'>Logout</a>
                            </li>
                        </ul>
                    </li>
                {/if}
            </ul>
        </div>
    </div>
</nav>

<style>
    .animated-icon {
        width: 30px;
        height: 22px;
        position: relative;
        margin: 0;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: .5s ease-in-out;
        -moz-transition: .5s ease-in-out;
        -o-transition: .5s ease-in-out;
        transition: .5s ease-in-out;
        cursor: pointer;
    }

    .animated-icon span {
        display: block;
        position: absolute;
        height: 3px;
        width: 100%;
        border-radius: 9px;
        opacity: 1;
        left: 0;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
    }

    .animated-icon span {
        background: red;
    }

    .animated-icon span:nth-child(1) {
        top: 1px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
    }

    .animated-icon span:nth-child(2) {
        top: 10px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
    }

    .animated-icon span:nth-child(3) {
        top: 19px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
    }

    .animated-icon.open span:nth-child(1) {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
        top: 0px;
        left: 3px;
    }

    .animated-icon.open span:nth-child(2) {
        width: 0%;
        opacity: 0;
    }

    .animated-icon.open span:nth-child(3) {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        top: 21px;
        left: 3px;
    }
</style>