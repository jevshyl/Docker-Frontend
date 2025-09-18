import {Box} from '@mui/system';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            flexDirection="row"
            height="100px"
            sx={{
                background: 'linear-gradient(135deg, ' +
                    '#0f0fcf, #00d4ff)',
                color: '#fff',
                textAlign: 'center',
            }}
        >
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#00d4ff',
                    '&:hover': {backgroundColor: '#0f0fcf'},
                }}
                onClick={() => navigate('/login')}
            >
                Login
            </Button>

            NAVBAR

        </Box>
    );
}
