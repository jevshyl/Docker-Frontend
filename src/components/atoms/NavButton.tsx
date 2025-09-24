import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

type NavButtonProps = {
    path: string;
    name: string;
};

export default function NavButton({ path, name }: Readonly<NavButtonProps>) {
    const navigate = useNavigate();


    return (
        <Button
            variant="contained"
            sx={{
                backgroundColor: '#00d4ff',
                '&:hover': {backgroundColor: '#0f0fcf'},
            }}
            onClick={() => navigate(`/${path}`)}
        >
            {name}
        </Button>
    );
}
