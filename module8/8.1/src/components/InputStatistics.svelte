<script>
  let number;
  let numbers = [];
  let sum = 0;
  let average = 0;

  const incrementSum = () => {
    sum += number;
    numbers = [...numbers, number];
    number = '';
  }
  
  $: totalNumbers = numbers.length;
  $: average = totalNumbers > 0 ? sum / totalNumbers : 0;

  </script>

<h1>Statistics generator</h1>

<input type="number" bind:value={number}/>
<button on:click={incrementSum}>Add value</button>

<h2>Statistics</h2>

<p>Sum: {sum}</p>
<p>Total numbers: {numbers.length}</p>
<p>Average: {average}</p>

<h2>Numbers entered so far</h2>

<ul>
  {#each numbers as number}
    <li>{number}</li>
  {/each}
</ul>
