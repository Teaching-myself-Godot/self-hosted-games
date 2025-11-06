import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { selectCredentials } from "./superSafeCredentialsSlice";
import { addTask, selectTodoItems, removeTask, updateTask, toggleTaskDone, moveTaskUp } from "./todoListSlice";
import dragIcon from "./drag.svg";

export function TodoListForm() {
    const dispatch = useAppDispatch()
    const { todos } = useAppSelector(selectTodoItems);
    const { unlocked } = useAppSelector(selectCredentials);
    const [newTask, setNewTask] = useState<string>("");
    return (<>
        <div>Takenlijst</div>
        {todos.map((todo, idx) => unlocked ? (
            <div key={idx} style={{display: "flex"}}>
                {idx > 0 && (
                    <button className="move-up-button" onClick={() => dispatch(moveTaskUp(idx))}>
                        <img src={dragIcon} />{" "}
                    </button>
                )}
                <input type="text" value={todo.task} onChange={(ev) => dispatch(updateTask({idx: idx, val: ev.target.value}))} />
                <button onClick={() => dispatch(removeTask(idx))}>Verwijder</button>
            </div>
        ) : (
            <div key={idx}>
                <input type="checkbox" checked={todo.done} id={`todo-${idx}`} onChange={() => dispatch(toggleTaskDone(idx))} />
                <label htmlFor={`todo-${idx}`}>{todo.task}</label>
            </div>
        ))}
        {unlocked && (
            <input autoComplete="none" type="text"
                placeholder="Nieuwe taak..."
                 onChange={(ev) => setNewTask(ev.target.value)} value={newTask} onKeyDown={(ev) => {if (ev.key === 'Enter') { dispatch(addTask(newTask)); setNewTask("")}}} />
        )}
        {!unlocked && todos.filter((t) => !t.done).length === 0 && <h1>✅ GOED ZO!!!</h1> }
    </>)
}