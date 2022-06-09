import React from 'react'
import { Grid, makeStyles } from '@material-ui/core';
import Controls from "../components/controls/Controls";
import { useForm, Form } from '../components/useForm';
import { BACKEND_URL } from '../assets/constants/backendURL';
import axios from 'axios';
import { useAlert } from 'react-alert';

const useStyles = makeStyles(theme => ({
    grid: {
        display: 'flex',
        alignItems: 'center',
        margin: '30px 0',
    }
}))

const AddOutOfStock = (props) => {

    const formData = {
        name: props.name,
        price: props.price,
        isEdit: props.isEdit,
        id: props.id
    }

    const alert = useAlert()
    const classes = useStyles();

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('price' in fieldValues)
            temp.price = fieldValues.price ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(formData, true, validate);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validate()) {
            let url;
            if (formData.isEdit) {
                url = `${BACKEND_URL}/outofstocks/${formData.id}`
            }
            else {
                url = `${BACKEND_URL}/outofstocks/add`
            }
            const result = await axios.post(url, { name: values.name, price: values.price })
            if (result.data.status) {
                alert.success(result.data.message)
            }
            resetForm()
            formData.isEdit = false
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Price"
                        name="price"
                        value={values.price}
                        onChange={handleInputChange}
                        error={errors.price}
                    />
                </Grid>
            </Grid>
            <Grid className={classes.grid}>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                    <Controls.Button
                        type="submit"
                        text={formData.isEdit ? "Edit" : "Add"}
                        onClick={handleSubmit} />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Button
                        text="Reset"
                        color="default"
                        onClick={resetForm} />
                </Grid>
            </Grid>
        </Form>
    )
}

export default AddOutOfStock