import { useEffect, useState } from 'react';

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const res = await fetch('/api/users');
            const data = await res.json();
            setUsers(data);
        }

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Users List</h1>
            <table border="1">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
