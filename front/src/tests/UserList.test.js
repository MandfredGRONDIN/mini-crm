import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserList from '../view/UserList';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('UserList Component', () => {
    test('displays loading message initially', () => {
        render(<UserList />, { wrapper: MemoryRouter });
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('displays users after fetching', async () => {
        const users = [
            { _id: '1', firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
            { _id: '2', firstname: 'Jane', lastname: 'Doe', email: 'jane.doe@example.com', phone: '098-765-4321' }
        ];
        axios.get.mockResolvedValueOnce({ data: users });

        render(<UserList />, { wrapper: MemoryRouter });

        expect(await screen.findByText('John Doe')).toBeInTheDocument();
        expect(await screen.findByText('Jane Doe')).toBeInTheDocument();
    });

    test('displays error message on fetch failure', async () => {
        axios.get.mockRejectedValueOnce(new Error('Network Error'));

        render(<UserList />, { wrapper: MemoryRouter });

        expect(await screen.findByText(/error/i)).toBeInTheDocument();
    });
});
