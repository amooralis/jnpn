import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoItem } from './TodoItem';


const mockCheckTodo = jest.fn();
const mockDeleteTodo = jest.fn();
const mockSelectTodoIdForEdit = jest.fn();


const todo = {
    id: 1,
    name: 'Test Todo',
    description: 'This is a test todo item',
    checked: false
};

describe('TodoItem component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the todo item with correct data', () => {
        render(<TodoItem
            todo={todo}
            checkTodo={mockCheckTodo}
            deleteTodo={mockDeleteTodo}
            selectTodoIdForEdit={mockSelectTodoIdForEdit}
        />);


        expect(screen.getByText(todo.name)).toBeInTheDocument();
        expect(screen.getByText(todo.description)).toBeInTheDocument();
    });

    it('applies correct styles when todo is checked', () => {
        const checkedTodo = { ...todo, checked: true };

        render(<TodoItem
            todo={checkedTodo}
            checkTodo={mockCheckTodo}
            deleteTodo={mockDeleteTodo}
            selectTodoIdForEdit={mockSelectTodoIdForEdit}
        />);


        const nameElement = screen.getByText(checkedTodo.name);
        const descriptionElement = screen.getByText(checkedTodo.description);

        expect(nameElement).toHaveStyle('text-decoration: line-through');
        expect(nameElement).toHaveStyle('opacity: 0.5');
        expect(descriptionElement).toHaveStyle('text-decoration: line-through');
        expect(descriptionElement).toHaveStyle('opacity: 0.5');
    });

    it('calls checkTodo when the checkbox is clicked', () => {
        render(<TodoItem
            todo={todo}
            checkTodo={mockCheckTodo}
            deleteTodo={mockDeleteTodo}
            selectTodoIdForEdit={mockSelectTodoIdForEdit}
        />);

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);


        expect(mockCheckTodo).toHaveBeenCalledTimes(1);
        expect(mockCheckTodo).toHaveBeenCalledWith(todo.id);
    });

    it('calls selectTodoIdForEdit when edit button is clicked', () => {
        render(<TodoItem
            todo={todo}
            checkTodo={mockCheckTodo}
            deleteTodo={mockDeleteTodo}
            selectTodoIdForEdit={mockSelectTodoIdForEdit}
        />);

        // Находим кнопку редактирования
        const editButton = screen.getByLabelText(/edit/i);
        fireEvent.click(editButton);


        expect(mockSelectTodoIdForEdit).toHaveBeenCalledTimes(1);
        expect(mockSelectTodoIdForEdit).toHaveBeenCalledWith(todo.id);
    });

    it('calls deleteTodo when delete button is clicked', () => {
        render(<TodoItem
            todo={todo}
            checkTodo={mockCheckTodo}
            deleteTodo={mockDeleteTodo}
            selectTodoIdForEdit={mockSelectTodoIdForEdit}
        />);


        const deleteButton = screen.getByLabelText(/delete/i);
        fireEvent.click(deleteButton);


        expect(mockDeleteTodo).toHaveBeenCalledTimes(1);
        expect(mockDeleteTodo).toHaveBeenCalledWith(todo.id);
    });

    it('does not show edit and delete buttons if the todo is checked', () => {
        const checkedTodo = { ...todo, checked: true };

        render(<TodoItem
            todo={checkedTodo}
            checkTodo={mockCheckTodo}
            deleteTodo={mockDeleteTodo}
            selectTodoIdForEdit={mockSelectTodoIdForEdit}
        />);

        expect(screen.queryByRole('button', { name: /edit/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();
    });
});
