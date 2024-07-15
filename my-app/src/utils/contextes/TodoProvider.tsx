import React, {useEffect, useState} from "react";
import {TodoContext} from "./TodoContext";

interface TodoProviderProps {
    children: React.ReactNode;
}

const DEFAULT_TODO_LIST = [
    {id: 1, name: 'Полить цветы', description: 'холодной водой', checked: false},
    {id: 2, name: 'Вынести мусор', description: 'до вечера', checked: false},
    {
        id: 3,
        name: 'Помыть посуду',
        description:
            'чашки, тарелки, сковородку, чайник, вилки, ложки',
        checked: false
    },
    {
        id: 4,
        name: 'Выгулять собаку',
        description:
            'в парке',
        checked: true
    },
    {
        id: 5,
        name: 'Приготовить ужин',
        description:
            'курицу с картошкой',
        checked: false
    },
    {
        id: 6,
        name: 'Помыть полы',
        description:
            'шваброй',
        checked: false
    }
];
export const TodoProvider: React.FC<TodoProviderProps> = ({children}) => {

    const [todos, setTodos] = React.useState(DEFAULT_TODO_LIST);
    const [todoIdForEdit, setTodoIdForEdit] = React.useState<Todo["id"] | null>(null);
    const [searchString, setSearchString] = useState('');
    const [searchStatus, setSearchStatus] = useState('all');
    const [filteredTodos, setFilteredTodos] = useState(todos);

    const searchTodo = (searchString: string) => {
        setSearchString(searchString);
    };

    const searchTodoByStatus = (searchStatus: string) => {
        setSearchStatus(searchStatus);
    };

    useEffect(() => {
        let filtered = todos;

        if (searchStatus !== 'all') {
            filtered = filtered.filter((todo) =>
                searchStatus === 'done' ? todo.checked === true : todo.checked === false
            );
        }

        if (searchString) {
            filtered = filtered.filter((todo) =>
                todo.name.toLowerCase().includes(searchString.toLowerCase()) ||
                todo.description.toLowerCase().includes(searchString.toLowerCase())
            );
        }

        setFilteredTodos(filtered);
    }, [searchString, searchStatus, todos, setFilteredTodos]);



    const selectTodoIdForEdit = (id: Todo["id"]) => {
        setTodoIdForEdit(id)
    }

    const changeTodo = ({name, description}: Omit<Todo, 'checked' | 'id'>) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === todoIdForEdit) {
                    return {...todo, name, description}
                }
                return todo;
            })
        )
        setTodoIdForEdit(null)
    }


    const addTodo = ({name, description}: Omit<Todo, 'checked' | 'id'>) => {
        setTodos([{id: todos[todos.length - 1].id + 1, name, description, checked: false}, ...todos]);
    }




    const checkTodo = (id: Todo['id']) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return {...todo, checked: !todo.checked}
                }
                return todo;
            })
        )
    }


    const deleteTodo = (id: Todo['id']) => {
        setTodos(
            todos.filter((todo) => todo.id !== id)
        )
    }


    const value = React.useMemo(() => ({
        todos,
        todoIdForEdit,
        deleteTodo,
        changeTodo,
        addTodo,
        selectTodoIdForEdit,
        checkTodo,
        searchString,
        filteredTodos,
        // setNewSearchString,
        searchTodo,
        searchTodoByStatus,
        // filteredTodos,
    }), [todos,
        todoIdForEdit,
        deleteTodo,
        changeTodo,
        addTodo,
        selectTodoIdForEdit,
        checkTodo,
        searchString,
        filteredTodos,
        // setNewSearchString,
        searchTodo,
        searchTodoByStatus,
        // filteredTodos
    ])

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}