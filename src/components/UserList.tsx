// import React, { useEffect, useState } from 'react';
// import { User } from '../interfaces/User';

// const UserList: React.FC = () => {
//     const [users, setUsers] = useState<User[]>([]);

//     useEffect(() => {
//         fetch('https://monkfish-app-v42dg.ondigitalocean.app/api/users')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error ('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => setUsers(data))
//         .catch(error => console.error('Error fetching Users: ', error));
// }, []);

//     return (
//         <div>
//             <h1>Användare</h1>
//             <ul>
//                 {users.map(user => (
//                     <li key={user.id}>
//                         <p>{user.username}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default UserList;