import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const User = ({ user }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/users/${user._id}`);
            window.location.reload(); 
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <li className="user-item">
            <h2>{user.firstname} {user.lastname}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <button onClick={() => navigate(`/edit/${user._id}`)} className="user-item button edit">
                Edit
            </button>
            <button onClick={handleDelete} className="user-item button delete">
                Delete
            </button>
        </li>
    );
};

export default User;
