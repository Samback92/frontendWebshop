// import React, { useEffect, useState } from 'react';

// const UserInfo: React.FC = () => {
//     const [user, setUser] = useState<{ username: string } | null>(null);

//     useEffect(() => {
//         const fetchUserInfo = async () => {
//             fetch('http://localhost:8080/api/users/current', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include',
//             })
//             .then (response => {
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch user info');
//                 }
//                 return response.json();
//             })
//             .then(data => setUser(data))
//             .catch (error => console.error('Error fetching user info:', error));
//         }

//         fetchUserInfo();
//     }, []);

//     return (
//         <div>
//             {user ? <p>Inloggad som: {user.username}</p> : <p>Inte inloggad</p>}
//         </div>
//     );
// };

// export default UserInfo;
