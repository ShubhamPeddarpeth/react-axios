// UserDetails.js
import React from 'react';
import { Paper, Typography } from '@mui/material';

const UserDetails = ({ user }) => {
    return (
        <div>
            <h2>User Details</h2>
            {user && (
                <Paper elevation={3} style={{ padding: '16px', maxWidth: '400px' }}>
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography>Email: {user.email}</Typography>
                    <Typography>Username: {user.username}</Typography>
                    <Typography>Phone: {user.phone || 'N/A'}</Typography>
                    <Typography>
                        Address: {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
                    </Typography>
                    <Typography>Website: {user.website || 'N/A'}</Typography>
                    <Typography>Company: {user.company.name || 'N/A'}</Typography>
                </Paper>
            )}
        </div>
    );
};

export default UserDetails;
