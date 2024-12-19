import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/users');
        console.log('Fetched users:', response.data); // Debugging
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []);
  

  // Save selected user to MongoDB
  const saveUser = async (email) => {
    const name = prompt('Enter name for the user:');
    const photoURL = prompt('Enter photo URL for the user:');
  
    try {
      const response = await axios.post('http://localhost:5002/api/users/save-user', {
        email,
        name,
        photoURL,
      });
      console.log('User saved:', response.data); // Debugging
      alert(`User ${email} saved successfully!`);
      setSelectedUser(response.data.user);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };
  
  return (
    <div>
      <h2>User List</h2>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.email}>
            <button onClick={() => saveUser(user.email)}>{user.email}</button>
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
      {selectedUser && (
        <div>
          <h3>Selected User:</h3>
          <p>Email: {selectedUser.email}</p>
          <p>Name: {selectedUser.name}</p>
          <p>
            Photo: <img src={selectedUser.photoURL} alt="User" width={50} />
          </p>
        </div>
      )}
    </div>
  );
}  

export default UserList;
