// UserCrud.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Paper, Snackbar } from '@mui/material';

const UserCrud = ({ onUserAdded }) => {
    const [userData, setUserData] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

    const handleAddUser = () => {
        if (!userData.name) {
            setErrorSnackbarOpen(true);
            return;
        }

        axios
            .post('https://jsonplaceholder.typicode.com/users', userData)
            .then((response) => {
                console.log('User added:', response.data);
                onUserAdded();
                setSnackbarOpen(true);
                setUserData({});
            })
            .catch((error) => {
                console.error('Error adding user:', error);
                setErrorSnackbarOpen(true);
            });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setErrorSnackbarOpen(false);
    };

    return (
        <div>
            <h2>Add User</h2>
            <Paper elevation={3} style={{ padding: '16px', maxWidth: '400px' }}>
                <TextField
                    label="Name"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
                {/* Add similar TextFields for other user properties */}
                <Button variant="contained" color="primary" onClick={handleAddUser}>
                    Add User
                </Button>
            </Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message="User added successfully!"
            />
            <Snackbar
                open={errorSnackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message="Error adding user. Please check your input."
            />
        </div>
    );
};

export default UserCrud;
