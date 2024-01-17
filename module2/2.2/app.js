let todos = [
    {
        item: "name"
    },
    {
        item: "another"
    }
];


const handleGetTodos = async (request) => {
  return Response.json(todos);
};

const handlePostTodo = async (request) => {
  let item;
  try { 
    item = await request.json()
  } catch (error) {
    return new Response(null, {status:400})
  }
  todos.push(item);
  return new Response(null, {status: 200 })
  
};

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/todos" }),
    fn: handleGetTodos,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/todos" }),
    fn: handlePostTodo,
  }
];

const handleRequest = async (request) => {
  const mapping = urlMapping.find(
    (um) => um.method === request.method && um.pattern.test(request.url)
  );

  if (!mapping) {
    return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);
  return await mapping.fn(request, mappingResult);
};

Deno.serve({ port: 7777 }, handleRequest);
