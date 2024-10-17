import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../interfaces/User';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axios.get('/api/users')
            .then(response => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Användare</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <p>{user.username}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;