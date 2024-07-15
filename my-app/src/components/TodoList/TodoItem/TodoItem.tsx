import React from 'react'
import {Button} from "../../Button/Button";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
    todo: Todo;
    checkTodo: (id: Todo["id"]) => void,
    deleteTodo: (id: Todo["id"]) => void,
    selectTodoIdForEdit: (id: Todo["id"]) => void,
}

export const TodoItem: React.FC<TodoItemProps> = ({todo, checkTodo, selectTodoIdForEdit, deleteTodo}) => {
    return <div className={styles.todoItemCard}
                style={{
                    opacity: todo.checked ? 0.5 : 1}

                }
    >
        <input type="checkbox"
               className={styles.todoItemCheckBox}
               checked={todo.checked}
               onChange={() => checkTodo(todo.id)}></input>
        <div className={styles.line}></div>
        <div
        style={{
            opacity: todo.checked ? 0.5 : 1,
            textDecoration: todo.checked ? "line-through" : "none"

        }}
        >{todo.name}</div>

        <div
            className={styles.todoDescription}
            style={{
            opacity: todo.checked ? 0.5 : 1,
            textDecoration: todo.checked ? "line-through" : "none"}
        }>{todo.description}</div>

        <div className={styles.line}></div>

        {!todo.checked && <Button color={'orange'} onClick={()=>selectTodoIdForEdit(todo.id)}></Button>}
        {/*<Button color={'orange'} onClick={()=>selectTodoIdForEdit(todo.id)}></Button>*/}
        {!todo.checked && <Button color={'red'} onClick={()=>deleteTodo(todo.id)}></Button>}

    </div>
}