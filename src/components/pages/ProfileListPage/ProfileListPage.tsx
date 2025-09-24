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
        if (values.id) {
            ListElementService.updateListElement(values).then(res => {
                const updatedElement = res.data;
                setUser(prev => prev ? {
                    ...prev,
                    listElements: prev.listElements.map(el => el.id === updatedElement.id ? updatedElement : el)
                } : prev);
                setAddElement(null);
                setOpen(false);
            });
        } else {
            ListElementService.addListElement(values).then(res => {
                const newElement = res.data;
                if (!newElement) return;
                setUser(prev => ({
                    ...prev,
                    listElements: [...(prev?.listElements || []), newElement]
                }));
                setAddElement(null);
            });
        }
    };

    const deleteActionHandler = () => {
        if (selectedElement?.id) {
            ListElementService.deleteListElement(selectedElement.id).then(() => {
                setUser(prev => prev ? {
                    ...prev,
                    listElements: prev.listElements.filter(el => el.id !== selectedElement.id)
                } : prev);
                setOpen(false);
            });
        }
    };

    const [open, setOpen] = useState<boolean>(false);
    const [selectedElement, setSelectedElement] = useState<ListElement | null>(null);
    const [addElement, setAddElement] = useState<ListElement | null>(null);

    const activeUser = useContext(ActiveUserContext);

    const checkUser = () => {
        if (user.id === activeUser?.user?.id) return true;
        return false;
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
                listElement={selectedElement || undefined}
                onUpdate={submitActionHandler}
                deleteAction={deleteActionHandler}
            />

            {checkUser() && (

                <Box sx={{margin: '20px 0'}}>
                    <Button
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
