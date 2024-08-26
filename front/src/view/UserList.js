import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from '../components/User/User';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users');
                setUsers(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="user-list-container">
            <h1 className="user-list-title">Users List</h1>
            <Link to="/add" className="user-list-link">
                Add New User
            </Link>
            <ul>
                {users.map(user => (
                    <User key={user._id} user={user} />
                ))}
            </ul>
        </div>
    );
};

export default UserList;
