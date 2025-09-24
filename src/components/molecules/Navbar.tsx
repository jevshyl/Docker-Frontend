import {Box} from '@mui/system';
import React, {useContext} from "react";
import NavButton from "../atoms/NavButton";
import ActiveUserContext from "../../Contexts/ActiveUserContext";
import {Button} from "@mui/material";

export default function Navbar() {

    const activeUser = useContext(ActiveUserContext);
    const {checkRole} = useContext(ActiveUserContext);

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
            {!activeUser.user && (
                <NavButton path={"login"} name={"Login"}/>
            )}
            {activeUser.user && (
                <>
                    {checkRole("ADMIN") && (
                        <>
                            <NavButton path={"admin"} name={"Admin"}/>
                        </>
                    )}
                    <NavButton path={"users"} name={"Users"}/>
                    <NavButton path={`profileList/${activeUser.user?.id}`} name={"Profile Page"}/>
                    <Button onClick={activeUser.logout}>Logout</Button>
                </>
            )}
        </Box>
    );
}
