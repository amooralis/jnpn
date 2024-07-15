import React from "react";


export interface TodoContextProps {
    todos: Todo[];
    filteredTodos: Todo[];
    searchString: string;
    checkTodo: (id: Todo["id"]) => void;
    // setNewSearchString: (searchString: string) => void;
    searchTodo: (searchString: string) => void;
    searchTodoByStatus: (searchStatus: string) => void;
    todoIdForEdit: Todo["id"] | null;
    deleteTodo: (id: Todo["id"]) => void;
    selectTodoIdForEdit: (id: Todo["id"]) => void;
    changeTodo: ({name, description}: Omit<Todo, 'checked' | 'id'>)=> void;
    addTodo: ({name, description}: Omit<Todo, 'checked' | 'id'>)=> void;

}
export const TodoContext = React.createContext<TodoContextProps>({
    todos: [],
    filteredTodos: [],
    todoIdForEdit: null,
    searchString: '',
    searchTodo: () => {},
    searchTodoByStatus: () => {},
    checkTodo: () => {},
    deleteTodo: () => {},
    selectTodoIdForEdit: () => {},
    changeTodo: () => {},
    addTodo: () => {},
})