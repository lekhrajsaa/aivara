import React from 'react';
//useRouter used to route to another page
import { useRouter } from "next/router";
//Dialog used for container and rest are its components used in it to 
//display the message 
import {
    Dialog,
    DialogTitle,
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
} from "@mui/material";

//logout model 
const LogoutPopup = ({setOpenLogoutPopup, open}) => {
    const router = useRouter();
    //loggind out the user by removing token and email and routing to signin page
    const removeDetail = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        router.push('/');
    };

    return (
        <Dialog
            open={open}
            aria-labelledby="dilog-title"
            aria-aria-describedby="dilog-description"
            sx={{ p: 2 }}
        >
            <DialogTitle id="dilog-title">User Logout</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to logout?</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ mx: 1, mb: 1 }}>
                <Button
                    variant="text"
                    onClick={() => setOpenLogoutPopup(false)}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={removeDetail}
                >
                    Logout
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default LogoutPopup;
