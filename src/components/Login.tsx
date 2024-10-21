// import React, { useState } from 'react';

// const Login: React.FC = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ username, password }),
//                 credentials: 'include'
//             });
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             window.location.href = '/'; // Redirect after login
//         } catch (error) {
//             console.error('Error logging in:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleLogin}>
//             <div>
//                 <label htmlFor="username">Username:</label>
//                 <input
//                     type="text"
//                     id="username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="password">Password:</label>
//                 <input
//                     type="password"
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//             </div>
//             <button type="submit">Login</button>
//         </form>
//     );
// };

// export default Login;
