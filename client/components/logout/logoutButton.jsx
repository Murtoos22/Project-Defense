import React from 'react';

import { logout } from '../../api/user-api';

const logoutButton = () => {
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        };
    };
    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default logoutButton;