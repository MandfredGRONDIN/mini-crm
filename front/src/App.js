import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserList from './view/UserList';
import UserForm from './components/User/UserForm';

function App() {
    return (
        <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/add" element={<UserForm />} />
            <Route path="/edit/:id" element={<UserForm />} />
        </Routes>
    );
}

export default App;
