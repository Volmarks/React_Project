import TodoModel from "../models/todo";
import axios from "axios"

const api_url = "https://todo-api-vy.herokuapp.com";
//http://localhost:8080
const u_email = localStorage.getItem("user_email");

export const addTodosAPI = async (todo: TodoModel) => {
  try {
    const url = `${api_url}/api/todo/add/${u_email}`;
    console.log(url)
    const { data: res } = await axios.patch(url, {todo: todo})

    return res.data;

  } catch (e) {
    throw new Error("Sending Todo Fail");
  }
};

export const removeTodoAPI = async (code: string) => {
  try {
    const url = `${api_url}/api/todo/delete/${u_email}/${code}`;
    const { data: res } = await axios.patch(url);

  } catch (error) {
    throw new Error("Cannot Delete Todos");
  }
};


export const editTodoAPI = async (code: string, updateText: string) => {
  try {

    const url = `${api_url}/api/todo/edit/${u_email}/${code}`;
    const { data: res } = await axios.patch(url, {newTodo: updateText});
    
  } catch (error) {
    throw new Error("Updating Todo Fail");
  }
};


export const checkTodoAPI = async (code: string, updateComplete: boolean) => {
  try {

    const url = `${api_url}/api/todo/comlete/${u_email}/${code}`;
    const { data: res } = await axios.patch(url, { complete: updateComplete });
  } catch (error) {
    throw new Error("Updating Todo Fail");
  }
};


export const getTodosAPI = async () => {
  try {
    const url = `${api_url}/api/todo/${u_email}`;
    const { data: res } = await axios.get(url)

    const loadedTodos: TodoModel[] = [];

    for (const key in res.data) {
      loadedTodos.push({
        code: key,
        id: res.data[key].id,
        text: res.data[key].text,
        createdAt: res.data[key].createdAt,
        complete: res.data[key].complete,
      });
    }

    return loadedTodos;

  } catch (error) {
    throw new Error("Cannot get Todos");
  }
};
