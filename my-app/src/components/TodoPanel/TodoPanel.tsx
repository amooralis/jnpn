import React, {useState} from 'react'
import {Button} from "../Button/Button";
import {useTodo} from "../../utils/contextes/useTodo";

import styles from "./TodoPanel.module.css";
import add from '../../images/add.png';
import edit from '../../images/edit.png';

const DEFAULT_ITEM = {name: '', description: ''}

interface AddTodoPanelProps {
    mode: 'add',

}

interface EditTodoPanelProps {
    mode: 'edit',
    editTodo: Omit<Todo, 'checked' | 'id'>,
}

type TodoPanelProps = AddTodoPanelProps | EditTodoPanelProps;

export const TodoPanel: React.FC<TodoPanelProps> = (props) => {


    const {addTodo, changeTodo} = useTodo();



    const isEdit = props.mode === 'edit';

    const [todo, setTodo] = useState(isEdit ? props.editTodo : DEFAULT_ITEM)

    const onClick = () => {
        const todoItem = {name: todo.name, description: todo.description}
        if (isEdit) {
            return changeTodo(todoItem)
        }

        addTodo(todoItem)
        setTodo(DEFAULT_ITEM)
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setTodo({...todo, [name]: value})
    }

    return (
        <div className={styles.createTodoCard}>
            <div>
                <p>name</p>
                <input type="text" value={todo.name} id='name' name='name' onChange={onChange}/>
            </div>
            <div>
                <p>description</p>
                <input type="text" value={todo.description} id='description' name='description' onChange={onChange}/>
            </div>

            {!isEdit && <Button color="blue" onClick={onClick}></Button>}
            {isEdit && <Button color="green" onClick={onClick}></Button>}

        </div>
    )
}