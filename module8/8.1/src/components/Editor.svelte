<script>
    export let onAdd;
    let input;
  </script>
  
  <input type="text" bind:value={input} />
  <button on:click={() => { onAdd(input); input = ''; }}>Add text</button>