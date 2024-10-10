import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from './TodoList';
import { useTodo } from '../../utils'; // Импортируем хук useTodo

jest.mock('../../utils', () => ({
    useTodo: jest.fn(),
}));


const mockTodos = [
    { id: '1', name: 'Test Todo 1', description: 'Description 1', checked: false },
    { id: '2', name: 'Test Todo 2', description: 'Description 2', checked: true },
];

describe('TodoList', () => {
    beforeEach(() => {
        (useTodo as jest.Mock).mockReturnValue({
            todos: mockTodos,
            todoIdForEdit: null,
            checkTodo: jest.fn(),
            selectTodoIdForEdit: jest.fn(),
            deleteTodo: jest.fn(),
            searchString: '',
            filteredTodos: mockTodos,
        });
    });

    test('renders TodoItems for each todo', () => {
        render(<TodoList />);

        expect(screen.getByText(/Test Todo 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Todo 2/i)).toBeInTheDocument();
    });

    test('renders TodoPanel when todoIdForEdit matches todo id', () => {
        (useTodo as jest.Mock).mockReturnValueOnce({
            todos: mockTodos,
            todoIdForEdit: '1',
            checkTodo: jest.fn(),
            selectTodoIdForEdit: jest.fn(),
            deleteTodo: jest.fn(),
            searchString: '',
            filteredTodos: mockTodos,
        });

        render(<TodoList />);

        expect(screen.queryByText(/Test Todo 1/i)).toBeNull();
        expect(screen.getByText(/Test Todo 2/i)).toBeInTheDocument();
    });

});
