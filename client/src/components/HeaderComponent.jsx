import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const HeaderComponent = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    Artisan Alleyway
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderComponent;
