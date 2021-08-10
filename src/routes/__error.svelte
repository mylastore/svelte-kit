<script context="module">
  export function load ({ error, status }) {
    return {
      props: {
        status: status,
        error: error
      }
    }
  }
</script>

<script>
  import { AlertTriangleIcon } from 'svelte-feather-icons'

  export let status
  export let error
</script>

{#if error}
  <div class="container">
    <div class="alert-container">
      <div class="alert-icon">
        <AlertTriangleIcon size="5x"/>
      </div>
      <h1>{status}</h1>
      <h4>{error.message}</h4>
    </div>
  </div>
{/if}

<style>
  .alert-icon {
    margin-bottom: 1rem;
    color: var(--bs-danger);
  }

  .alert-container {
    display: block;
    text-align: center;
    margin: 5rem auto;
  }
</style>
