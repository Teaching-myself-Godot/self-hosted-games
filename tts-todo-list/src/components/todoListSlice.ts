import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type TodoItem = {
    done : boolean
    task : string
}

export interface TodoItemState {
    todos : TodoItem[]
}

const TODO_ITEM_KEY = "todos";
const initialState : TodoItemState = {
    todos: localStorage.getItem(TODO_ITEM_KEY) ? JSON.parse(localStorage.getItem(TODO_ITEM_KEY)!) : []
};


export const todoItemSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTask(state, { payload }) {
            state.todos.push({
                done: false,
                task: payload
            })
            localStorage.setItem(TODO_ITEM_KEY, JSON.stringify(state.todos.map((todo) => ({done: false, task: todo.task})) ))
        },
        removeTask(state, { payload }) {
            state.todos = state.todos.filter((_, idx) => idx !== payload);
            localStorage.setItem(TODO_ITEM_KEY, JSON.stringify(state.todos.map((todo) => ({done: false, task: todo.task})) ))
        },
        updateTask(state, { payload : { idx, val} } : { payload : { idx : number, val : string }}) {
            state.todos[idx].task = val
            localStorage.setItem(TODO_ITEM_KEY, JSON.stringify(state.todos.map((todo) => ({done: false, task: todo.task})) ))
        },
        toggleTaskDone(state, { payload }) {
            state.todos[payload].done = !state.todos[payload].done
        }
    }
});

export const { addTask, removeTask, updateTask, toggleTaskDone } = todoItemSlice.actions;
export const selectTodoItems = (state : RootState) => state.todos;
export default todoItemSlice.reducer;