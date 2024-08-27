import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import UserList from '../view/UserList';
import { MemoryRouter } from 'react-router-dom';

const mock = new MockAdapter(axios);

describe('UserList Component', () => {
    afterEach(() => {
        mock.reset();
    });

    test('displays loading message initially', () => {
        render(<UserList />, { wrapper: MemoryRouter });
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('displays users after fetching', async () => {
        const users = [{ _id: '1', name: 'John Doe' }, { _id: '2', name: 'Jane Doe' }];
        mock.onGet('/api/users').reply(200, users);

        render(<UserList />, { wrapper: MemoryRouter });

        expect(await screen.findByText('John Doe')).toBeInTheDocument();
        expect(await screen.findByText('Jane Doe')).toBeInTheDocument();
    });

    test('displays error message on fetch failure', async () => {
        mock.onGet('/api/users').reply(500);

        render(<UserList />, { wrapper: MemoryRouter });

        expect(await screen.findByText(/error/i)).toBeInTheDocument();
    });
});
