import { postgres } from "../deps.js";

const sql = postgres({})

const getTodo = async(id) => {
    return await sql`SELECT * FROM todos WHERE id = ${id}`
}

const getTodos = async () => {
    return await sql`SELECT * FROM todos`;
  };
  
const addTodo = async (item) => {
    return await sql`INSERT INTO todos (item) VALUES (${item})`;
};

const deleteTodo = async(id) => {
    return await sql`DELETE FROM todos WHERE id = ${id}`
}

export { getTodo, getTodos, addTodo, deleteTodo }