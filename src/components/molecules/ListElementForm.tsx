import { useFormik } from 'formik';
import { object, string } from 'yup';
import { ListElement } from "../../types/models/ListElement.model";
import { Box, Button, TextField, InputLabel, Select, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";
import UserService from "../../Services/UserService";
import { User } from "../../types/models/User.model";
import { useEffect, useState } from "react";

interface ListElementFormProps {
    listElement?: ListElement;
    submitActionHandler: (values: ListElement) => void;
    onCancel?: () => void;
}

const ListElementForm = ({ listElement, submitActionHandler, onCancel }: ListElementFormProps) => {
    const { userId } = useParams();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (userId) {
            UserService.getUser(userId).then(res => setUser(res));
        }
    }, [userId]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: listElement?.id,
            title: listElement?.title || '',
            text: listElement?.text || '',
            importance: listElement?.importance || 'LOW',
            userId: user?.id || '',
            creationDate: listElement?.creationDate
        },
        validationSchema: object({
            title: string().required('Title is required').min(2, 'Too short').max(254, 'Too long'),
            text: string().required('Text is required').min(2, 'Too short').max(200, 'Too long'),
            importance: string().required('Importance is required').oneOf(['LOW', 'MEDIUM', 'HIGH']),
        }),
        onSubmit: values => submitActionHandler(values),
    });

    useEffect(() => {
        if (user?.id) {
            formik.setFieldValue('userId', user.id);
        }
    }, [user?.id]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box sx={{ paddingTop: '15px' }}>
                <TextField
                    id='title'
                    data-cy={"title"}
                    label='Title'
                    name="title"
                    variant='outlined'
                    sx={{ paddingRight: '10px', marginBottom: '10px' }}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.title && formik.errors.title)}
                    value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title && (
                    <div style={{ color: 'red' }}>{formik.errors.title}</div>
                )}

                <TextField
                    id='text'
                    data-cy={"text"}
                    label='Text'
                    name="text"
                    variant='outlined'
                    sx={{ paddingRight: '10px', marginBottom: '10px' }}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.text && formik.errors.text)}
                    value={formik.values.text}
                />
                {formik.touched.text && formik.errors.text && (
                    <div style={{ color: 'red' }}>{formik.errors.text}</div>
                )}

                <InputLabel id="importance-label">Importance</InputLabel>
                <Select
                    labelId="importance-label"
                    data-cy={"select"}
                    id="importance"
                    name="importance"
                    value={formik.values.importance}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <MenuItem value="LOW">Low</MenuItem>
                    <MenuItem value="MEDIUM">Medium</MenuItem>
                    <MenuItem value="HIGH">High</MenuItem>
                </Select>
                {formik.touched.importance && formik.errors.importance && (
                    <div style={{ color: 'red' }}>{formik.errors.importance}</div>
                )}

                <Box sx={{ marginTop: '15px' }}>
                    <Button
                        variant='contained'
                        data-cy="submit"
                        color='success'
                        type='submit'
                        disabled={!(formik.dirty && formik.isValid)}
                        sx={{ marginRight: '10px' }}
                    >
                        {formik.values.id ? 'Save' : 'Add'}
                    </Button>

                    {onCancel && (
                        <Button
                            variant='contained'
                            color='error'
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    )}
                </Box>
            </Box>
        </form>
    );
};

export default ListElementForm;
