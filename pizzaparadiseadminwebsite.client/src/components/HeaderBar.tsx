import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography } from '@mui/material';

export default function HeaderBar() {
    return (
        <AppBar position='sticky'>
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                    Admin portal
                </Typography>
            </Toolbar>
        </AppBar>
    );
}