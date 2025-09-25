import {Box} from '@mui/system';
import {useContext, useEffect, useState} from "react";
import {User} from "../../../types/models/User.model";
import {useParams} from "react-router-dom";
import UserService from "../../../Services/UserService";
import {Button, Grid} from "@mui/material";
import ElementCard from "../../atoms/ElementCard";
import Dialog from "../../molecules/Dialog";
import {ListElement} from "../../../types/models/ListElement.model";
import ListElementForm from "../../molecules/ListElementForm";
import ListElementService from "../../../Services/ListElementService";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";

export default function ProfileListPage() {
    const [user, setUser] = useState<User>({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        roles: [],
        listElements: []
    });

    const {userId} = useParams();

    useEffect(() => {
        if (userId) {
            UserService.getUser(userId).then((res) => {
                return setUser(res);
            });
        }
    }, [userId]);

    const submitActionHandler = (values: ListElement) => {
        ListElementService.addListElement(values).then(res => {
            const newElement = res.data;
            if (!newElement) return;
            setAddElement(null);
        });
        window.location.reload();
    };

    const deleteActionHandler = () => {
        if (selectedElement?.id) {
            ListElementService.deleteListElement(selectedElement.id).then(() => {
                setOpen(false);
            });
        }
        window.location.reload();
    };

    const [open, setOpen] = useState<boolean>(false);
    const [selectedElement, setSelectedElement] = useState<ListElement | null>(null);
    const [addElement, setAddElement] = useState<ListElement | null>(null);
    const {checkRole} = useContext(ActiveUserContext);
    const activeUser = useContext(ActiveUserContext);

    const checkUser = () => {
        return user.id === activeUser?.user?.id;

    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            height="100vh"
            sx={{
                background: 'linear-gradient(135deg, ' +
                    '#0f0fcf, #00d4ff)',
                color: '#fff',
                textAlign: 'center',
            }}
        >
            <Dialog
                id={user?.id}
                open={open}
                setOpen={setOpen}
                dialogTitle={selectedElement?.title}
                dialogContent={selectedElement?.text}
                importance={selectedElement?.importance}
                listElement={selectedElement || undefined}
                deleteAction={deleteActionHandler}
            />

            {checkUser() && checkRole("USER") && (

                <Box sx={{margin: '20px 0'}}>
                    <Button
                        data-cy="addListElement"
                        variant="contained"
                        color="primary"
                        onClick={() =>
                            setAddElement({id: '', title: '', text: '', importance: ''})
                        }
                    >
                        Add New List Element
                    </Button>
                </Box>
            )}
            {addElement && (
                <ListElementForm
                    submitActionHandler={submitActionHandler}
                />
            )}
            <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-start"
                margin="25px"
                flexDirection="column"
                height="250px"
                sx={{
                    color: '#fff',
                    textAlign: 'center',
                }}>
                <h3>Name: {user?.firstName} {user?.lastName}</h3>
            </Box>

            <Grid container spacing={2}>
                {user?.listElements?.map((element, index) => (
                    <Grid item xs={12} sm={6} md={4} key={element.id || index}>
                        <ElementCard
                            listElement={element}
                            onClick={() => {
                                setSelectedElement(element);
                                setOpen(true);
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
