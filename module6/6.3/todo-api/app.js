import * as todoService from "./services/todoService.js"
import { cacheMethodCalls } from "./util/cacheUtil.js";

const cachedTodoService = cacheMethodCalls(todoService, ["addTodo", "deleteTodo"]);

const handleGetRoot = async (request) => {
  return new Response("Hello world at root!");
};

const handleGetTodo = async (request, urlPatternResult) => {
    const id = urlPatternResult.pathname.groups.id;
    const items = await cachedTodoService.getTodo(id);
    if(items.length === 0) {
        return new Response('Bad id', { status: 404 })
    }
    return Response.json(items[0]);
}

const handleGetTodos = async (request) => {
    const items = await cachedTodoService.getTodos();
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
  await cachedTodoService.addTodo(todo.item)
  return new Response('OK', {status: 200 })
};

const handleDeleteTodo = async (request, urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;
  const todo = await cachedTodoService.deleteTodo(id);
  if(todo.count === 0) {
      return new Response('No such id', { status: 404 })
  }
  return new Response('OK', {status: 200 })
}

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/" }),
    fn: handleGetRoot,
  },
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
  },
  {
    method: "DELETE",
    pattern: new URLPattern({ pathname: "/todos/:id" }),
    fn: handleDeleteTodo,
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
  try {
    return await mapping.fn(request, mappingResult);
  } catch (e) {
    console.log(e)
    return new Response(e.stack, { status: 500 })
  }
};

const portConfig = { port: 7777, hostname: '0.0.0.0' }
Deno.serve(portConfig, handleRequest);
