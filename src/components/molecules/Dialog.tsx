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
    importance?: string;
    listElement?: ListElement;
    deleteAction?: () => void;
}

const Dialog = ({
                    id,
                    open,
                    setOpen,
                    dialogTitle,
                    dialogContent,
                    importance,
                    listElement,
                    deleteAction,
                }: DialogProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const handleClose = () => setOpen?.(false);

    const {checkRole, user: activeUser} = useContext(ActiveUserContext);

    const checkUser = () => {
        if (checkRole("ADMIN")) return true;
        return id === activeUser?.id;

    }

    return (
        <MuiDialog
            open={open}
            onClose={handleClose}
            sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}
        >
            <DialogTitle>{dialogTitle}</DialogTitle>

            <DialogContent>
                {isEditing && listElement ? (
                    <ListElementForm
                        listElement={listElement}
                        submitActionHandler={(values: ListElement) => {
                            ListElementService.updateListElement(values).then(() => {
                                setIsEditing(false);
                                window.location.reload();
                                handleClose();
                            });
                        }}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 2,
                            flexDirection: "column"
                        }}
                    >
                        <Box>{dialogContent}</Box>
                        <Box>Importance: {importance}</Box>
                    </Box>
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
                            <Button onClick={handleClose}>Cancel</Button>
                        </Box>
                    </Box>
                </DialogActions>
            )}
        </MuiDialog>
    );
}

export default Dialog;
