import {Box, Button, Dialog as MuiDialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useContext, useState} from "react";
import ActiveUserContext from "../../Contexts/ActiveUserContext";
import {ListElement} from "../../types/models/ListElement.model";
import ListElementForm from "../molecules/ListElementForm";
import ListElementService from "../../Services/ListElementService";

type DialogProps = {
    id?: string;
    open: boolean;
    setOpen?: (setOpen: boolean) => void;
    dialogTitle?: string;
    dialogContent?: string;
    listElement?: ListElement;
    onUpdate?: (updated: ListElement) => void;
    deleteAction?: () => void;
    submitAction?: () => void;
}

const Dialog = ({
                    id,
                    open,
                    setOpen,
                    dialogTitle,
                    dialogContent,
                    listElement,
                    onUpdate,
                    deleteAction,
                    submitAction
                }: DialogProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const handleClose = () => setOpen?.(false);

    const {checkRole, user: activeUser} = useContext(ActiveUserContext);

    const checkUser = () => {
        if (checkRole("ADMIN")) return true;
        if (id === activeUser?.id) return true;
        return false;
    }

    return (
        <MuiDialog
            open={open}
            onClose={handleClose}
            sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}
        >
            <DialogTitle>{dialogTitle}</DialogTitle>

            <DialogContent>
                {isEditing && listElement && onUpdate ? (
                    <ListElementForm
                        listElement={listElement}
                        submitActionHandler={(values: ListElement) => {
                            ListElementService.updateListElement(values).then(res => {
                                const updatedElement = res.data;
                                onUpdate(updatedElement);
                                setIsEditing(false);
                                handleClose();
                            });
                        }}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <Box>{dialogContent}</Box>
                )}
            </DialogContent>

            {!isEditing && (
                <DialogActions>
                    <Box sx={{display: "flex", width: "100%", justifyContent: "space-between"}}>
                        {checkUser() && listElement && (
                            <Box sx={{display: "flex", gap: 1}}>
                                <Button onClick={() => setIsEditing(true)}>Update</Button>
                                <Button onClick={deleteAction} color="error">Delete</Button>
                            </Box>
                        )}

                        <Box sx={{display: "flex", gap: 1}}>
                            <Button onClick={submitAction} variant="contained">Submit</Button>
                            <Button onClick={handleClose}>Cancel</Button>
                        </Box>
                    </Box>
                </DialogActions>
            )}
        </MuiDialog>
    );
}

export default Dialog;
