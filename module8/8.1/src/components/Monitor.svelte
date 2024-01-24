<script>
  import Editor from "./Editor.svelte";
  let texts = [];

  function addToTexts(newText) {
    texts = [...texts, newText];
  }
</script>

<Editor onAdd={addToTexts} />

<ul>
  {#each texts as text}
    <li>{text}</li>
  {/each}
</ul>
