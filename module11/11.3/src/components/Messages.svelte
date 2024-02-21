<script>
    import { onMount } from "svelte";
  
    let messages = [];
    let ws;
  
    onMount(() => {
      const host = window.location.hostname;
      ws = new WebSocket("ws://" + host + ":7777/api/json-ws");
      ws.onmessage = (event) => {
          console.log(event.data);
          const data = JSON.parse(event.data);
          messages = [...messages, `${data.user}: ${data.message}`];
      };
      
      return () => {
          if(ws.readyState === 1) {
          ws.close();
          }
      };
    });
  </script>
  
  <h2>Messages</h2>
  <ul>
      {#each messages as message}
           <li>{message}</li>
      {/each}
  </ul>