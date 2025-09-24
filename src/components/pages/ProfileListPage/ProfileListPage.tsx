import {Box} from '@mui/system';
import {useEffect, useState} from "react";
import {User} from "../../../types/models/User.model";
import {useParams} from "react-router-dom";
import UserService from "../../../Services/UserService";
import {Grid} from "@mui/material";
import ElementCard from "../../atoms/ElementCard";
import Dialog from "../../molecules/Dialog";
import {ListElement} from "../../../types/models/ListElement.model";

export default function HomePage() {
    const [user, setUser] = useState<User>();
    const {userId} = useParams();

    useEffect(() => {
        if (userId) {
            UserService.getUser(userId).then((res) => {
                return setUser(res);
            });
        }
    }, [userId]);

    const [open, setOpen] = useState<boolean>(false);
    const [selectedElement, setSelectedElement] = useState<ListElement | null>(null);

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
            />
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
                {user?.listElements?.map((element) => (
                    <Grid item xs={12} sm={6} md={4} key={element.id}>
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
