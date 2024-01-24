<script>
    import { items } from "./itemStore";
</script>

<h2>Items</h2>

<ul>
  {#each $items as item}
    <li>{item}</li>
  {/each}
</ul>
