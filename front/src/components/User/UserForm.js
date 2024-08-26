import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UserForm = () => {
    const [user, setUser] = useState({ firstname: '', lastname: '', email: '', phone: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams(); 

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`/api/users/${id}`);
                    setUser(response.data);
                } catch (err) {
                    setError(err.message);
                }
            };
            fetchUser();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`/api/users/${id}`, user);
            } else {
                await axios.post('/api/users', user);
            }
            navigate('/'); 
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="user-form-container">
            <h1 className="user-form-title">{id ? 'Edit User' : 'Add New User'}</h1>
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstname"
                        value={user.firstname}
                        onChange={handleChange}
                        className="user-form-input"
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastname"
                        value={user.lastname}
                        onChange={handleChange}
                        className="user-form-input"
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="user-form-input"
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        className="user-form-input"
                    />
                </div>
                <button type="submit" className="user-form-button">
                    {id ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={handleGoBack} className="user-form-button secondary">
                    Go Back
                </button>
            </form>
        </div>
    );
};

export default UserForm;
