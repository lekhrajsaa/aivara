import React from 'react';
import { useRouter } from "next/router";
import {
    Dialog,
    DialogTitle,
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
} from "@mui/material";

const LogoutPopup = ({setOpenLogoutPopup, open}) => {
    const router = useRouter();
    //loggin out the user
    const removeDetail = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        router.push('/');
    };

    return (
        <Dialog
            open={open}
            // onClose={() => setOpen(false)}
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
