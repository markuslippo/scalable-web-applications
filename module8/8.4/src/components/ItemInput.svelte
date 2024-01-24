<script>
    let item = '';
    import { items } from "./itemStore";
    const addItem = (item) => {
        $items = [...$items, item];
        item = '';
    };
</script>

<h2>Add an item</h2>

<input type="text" bind:value={item}/>
<button on:click={() => addItem(item)}>Add!</button>