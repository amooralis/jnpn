import React from 'react'
import {TodoItem} from "./TodoItem/TodoItem";
import {TodoPanel} from "../TodoPanel/TodoPanel";
import {useTodo} from "../../utils";

import styles from "./TodoList.module.css";


export const TodoList: React.FC = () => {

    const {todos, todoIdForEdit, checkTodo, selectTodoIdForEdit, deleteTodo, searchString, filteredTodos} = useTodo();


    return (

        <div className={styles.todoList}>
            {filteredTodos.map(todo => {

                if (todo.id === todoIdForEdit) return (<TodoPanel mode='edit'
                                                                  editTodo={{
                                                                      name: todo.name,
                                                                      description: todo.description
                                                                  }}
                                                                  key={todo.id}/>)

                return (
                    <TodoItem key={todo.id}
                              todo={todo}
                              checkTodo={checkTodo}
                              selectTodoIdForEdit={selectTodoIdForEdit}
                              deleteTodo={deleteTodo}/>)

            })}
        </div>

    )
}