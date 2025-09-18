import {Box} from '@mui/system';
import logo from '../../logo1.png';
import Navbar from "../molecules/Navbar";

export default function HomePage() {

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
                <h1 style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '2.5rem',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                    Welcome to the Homepage
                </h1>
                <Box
                    component="img"
                    src={logo}
                    alt="logo"
                    sx={{
                        maxWidth: '350px',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.1)',
                        },
                    }}/>
            </Box></>
    );
}
