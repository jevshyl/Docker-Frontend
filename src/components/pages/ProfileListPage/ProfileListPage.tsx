import {Box} from '@mui/system';
import logo from '../../logo1.png';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Navbar from "../../molecules/Navbar";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar/>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                height="100vh"
                sx={{
                    background: 'linear-gradient(135deg, ' +
                        '#0f0fcf, #00d4ff)',
                    color: '#fff',
                    textAlign: 'center',
                }}
            >
                <Box>
                    <h1>HI</h1>
                </Box>

            </Box></>
    );
}
