import {Box} from '@mui/system';
import Navbar from "../../molecules/Navbar";

export default function ListOverviewPage() {

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
                    <h1>Welcome to the admin page</h1>
                </Box>

            </Box></>
    );
}
