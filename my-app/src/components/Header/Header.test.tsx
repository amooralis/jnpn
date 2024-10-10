import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // для использования дополнительных матчеров
import { Header } from './Header';
import { useTodo } from '../../utils/contextes/useTodo';

// Создаем mock для useTodo
jest.mock('../../utils/contextes/useTodo');

describe('Header component', () => {
    beforeEach(() => {
        // Настраиваем mock данных для useTodo
        (useTodo as jest.Mock).mockReturnValue({
            todos: [
                { id: 1, name: 'Task 1', description: 'Test task 1', checked: true },
                { id: 2, name: 'Task 2', description: 'Test task 2', checked: false },
                { id: 3, name: 'Task 3', description: 'Test task 3', checked: false },
            ],
        });
    });

    it('renders the correct number of total tasks', () => {
        render(<Header />);

        // Проверяем, что отображается правильное количество задач
        const totalTasksElement = screen.getByText(/Всего задач:/i);
        expect(totalTasksElement).toHaveTextContent('Всего задач: 3');
    });

    it('renders the correct number of done and undone tasks', () => {
        render(<Header />);

        // Проверяем, что количество выполненных задач корректно
        const doneTasksElement = screen.getByText(': 1'); // Тестируем через текст, соответствующий количеству done
        expect(doneTasksElement).toBeInTheDocument();

        // Проверяем, что количество невыполненных задач корректно
        const undoneTasksElement = screen.getByText(': 2'); // Тестируем через текст, соответствующий количеству undone
        expect(undoneTasksElement).toBeInTheDocument();
    });

    it('renders the images with correct alt text', () => {
        render(<Header />);

        // Проверяем наличие изображений
        const doneImage = screen.getByAltText('done');
        const waitingImage = screen.getByAltText('undone');

        expect(doneImage).toBeInTheDocument();
        expect(waitingImage).toBeInTheDocument();
    });
});
