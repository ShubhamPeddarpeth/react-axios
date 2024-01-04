// UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, CircularProgress, Typography, Button } from '@mui/material';

const UserList = ({ onUserClick }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = () => {
        setLoading(true);
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching data');
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2>User List</h2>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <div>
                    <Typography variant="body2" color="error">{error}</Typography>
                    <Button variant="contained" color="primary" onClick={fetchData}>
                        Retry
                    </Button>
                </div>
            ) : (
                <List>
                    {users.map(user => (
                        <ListItem key={user.id} button onClick={() => onUserClick(user)}>
                            <ListItemText primary={user.name} />
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

export default UserList;
