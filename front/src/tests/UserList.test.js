import React from 'react';
import { render, screen, act } from '@testing-library/react';
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
        const users = [{ _id: '1', name: 'John Doe' }, { _id: '2', name: 'Jane Doe' }];
        axios.get.mockResolvedValueOnce({ data: users });

        await act(async () => {
            render(<UserList />, { wrapper: MemoryRouter });
        });

        expect(await screen.findByText('John Doe')).toBeInTheDocument();
        expect(await screen.findByText('Jane Doe')).toBeInTheDocument();
    });

    test('displays error message on fetch failure', async () => {
        axios.get.mockRejectedValueOnce(new Error('Network Error'));

        await act(async () => {
            render(<UserList />, { wrapper: MemoryRouter });
        });

        expect(await screen.findByText(/error/i)).toBeInTheDocument();
    });
});