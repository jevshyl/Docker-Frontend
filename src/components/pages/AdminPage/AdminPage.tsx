import {Box} from '@mui/system';

export default function AdminPage () {

    return (

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
                    <h1>Welcome to admin page</h1>
                </Box>

            </Box>
    );
}
