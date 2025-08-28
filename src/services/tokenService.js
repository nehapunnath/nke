// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import { app } from './firebase'; // Your Firebase config

// const auth = getAuth(app);

// // Store admin credentials (in a real app, use environment variables)
// const ADMIN_CREDENTIALS = {
//   email: 'nke_admin@gmail.com',
//   password: process.env.REACT_APP_ADMIN_PASSWORD // Store password in env variables
// };

// // Refresh token function
// export const refreshToken = async () => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth, 
//       ADMIN_CREDENTIALS.email, 
//       ADMIN_CREDENTIALS.password
//     );
    
//     const newToken = await userCredential.user.getIdToken();
//     localStorage.setItem('token', newToken);
    
//     return newToken;
//   } catch (error) {
//     console.error('Token refresh failed:', error);
//     throw error;
//   }
// };

// // Check if token is expired
// export const isTokenExpired = (token) => {
//   if (!token) return true;
  
//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     const expirationTime = payload.exp * 1000; // Convert to milliseconds
//     return Date.now() >= expirationTime;
//   } catch (error) {
//     return true;
//   }
// };