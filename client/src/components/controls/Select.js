import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';

export default function Select(props) {

    const { name, label, value,error=null, onChange, options } = props;
    
    return (
        <FormControl variant="standard"
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">Select the item</MenuItem>
                {
                    options.map(item => (<MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>))
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
