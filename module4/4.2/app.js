import postgres from "https://deno.land/x/postgresjs@v3.4.2/mod.js";

const sql = postgres({
    host : 'localhost',         
    port : 5432,      
    database : 'scalable-web-application',       
    username : 'postgres',
    password : '1234',  
  })

const handleGetTodo = async (request, urlPatternResult) => {
    const id = urlPatternResult.pathname.groups.id;
    const items = await sql`SELECT * FROM todos WHERE id = ${id}`;
    if(items.length === 0) {
        return new Response('Bad id', { status: 404 })
    }
    return Response.json(items[0]);
}

const handleGetTodos = async (request) => {
    const items = await sql`SELECT * FROM todos`;
    return Response.json(items);
};


const handlePostTodo = async (request) => {
  let todo;
  try { 
    todo = await request.json()
  } catch (error) {
    return new Response('Bad request', {status:400})
  }

  if (!todo || !todo.item) {
    return new Response('Invalid json', { status: 400 });
  }

  await sql`INSERT INTO todos (item) VALUES (${todo.item})`
  return new Response('OK', {status: 200 })
};

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/todos/:id" }),
    fn: handleGetTodo,
  },
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
