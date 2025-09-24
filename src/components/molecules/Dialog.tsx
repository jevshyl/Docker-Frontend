import {Box, Button, Dialog as MuiDialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

type DialogProps = {
    open: boolean;
    setOpen?: (setOpen: boolean) => void;
    dialogTitle?: string;
    dialogContent?: string;
    okAction?: () => void;
    submitAction?: () => void;
    updateAction?: () => void;
    deleteAction?: () => void;
}


const Dialog = ({
                    open,
                    setOpen,
                    dialogTitle,
                    dialogContent,
                    okAction,
                    submitAction,
                    updateAction,
                    deleteAction,
                }: DialogProps) => {

    const handleClose = () => {
        if (setOpen !== undefined) {
            setOpen(false);
        }
    };

    return (
        <MuiDialog
            open={open}
            onClose={handleClose}
            sx={{
                display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"
            }}
        >
            <DialogTitle>
                {dialogTitle}
            </DialogTitle>
            <DialogContent>
                {dialogContent}
            </DialogContent>

            <DialogActions>
                <Box sx={{display: "flex", width: "100%", justifyContent: "space-between"}}>
                    <Box sx={{display: "flex", gap: 1}}>
                        <Button onClick={updateAction}>Update</Button>
                        <Button onClick={deleteAction} color="error">Delete</Button>
                    </Box>

                    <Box sx={{display: "flex", gap: 1}}>
                        <Button onClick={submitAction} variant="contained">Submit</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </Box>
                </Box>
            </DialogActions>
        </MuiDialog>


    )

}

export default Dialog;