import {Box} from '@mui/system';
import Navbar from "../../molecules/Navbar";
import {useEffect, useState} from "react";
import {User} from "../../../types/models/User.model";
import {useParams} from "react-router-dom";
import UserService from "../../../Services/UserService";

export default function HomePage() {
    const [user, setUser] = useState<User>();
    const { userId } = useParams();

    useEffect(() => {
        if (userId) {
            UserService.getUser(userId).then((res) => {
                return setUser(res);
            });
        }
    }, [userId]);

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

            </Box>
    );
}
