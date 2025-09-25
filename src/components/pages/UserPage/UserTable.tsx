import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {useContext, useEffect, useState} from 'react';
import {User} from '../../../types/models/User.model';
import UserService from '../../../Services/UserService';
import {useNavigate} from 'react-router-dom';
import ActiveUserContext from "../../../Contexts/ActiveUserContext";

const UserTable = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const {checkRole} = useContext(ActiveUserContext);

    useEffect(() => {
        UserService.getAllUsers().then((data) => {
            setUsers(data.data);
        });
    }, []);

    const handleAdd = () => {
        navigate('../useredit/');
    };

    const handleEdit = (id: string) => {
        navigate('../useredit/' + id);
    };

    const handleDelete = (id: string) => {
        UserService.deleteUser(id);
    };

    return (
        <>
            {users.map((user) => (
                <div key={user.id}>
                    <Card sx={{minWidth: 275}}>
                        <CardContent data-cy="userCard">
                            {user.firstName} {user.lastName}
                            {checkRole("ADMIN") && user.email}
                            <CardActions>
                                {checkRole("ADMIN") && (
                                    <>
                                        <Button
                                            size='small'
                                            color='primary'
                                            variant='contained'
                                            onClick={() => handleEdit(user.id)}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            size='small'
                                            color='error'
                                            variant='contained'
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </Button>
                                    </>
                                )}
                                <Button
                                    size='small'
                                    data-cy="view-button"
                                    color='primary'
                                    variant='contained'
                                    onClick={() => navigate(`../profileList/${user?.id}`)}
                                >
                                    View
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </div>
            ))}
            {checkRole("ADMIN") && (
                <Button
                    size='small'
                    color='success'
                    variant='contained'
                    onClick={handleAdd}
                >
                    Add
                </Button>
            )}
        </>
    );
};

export default UserTable;
