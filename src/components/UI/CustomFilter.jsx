import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

import { useSearchParams } from 'react-router-dom';




const CustomFilter = ({ selectedValues, setSelectedValues, StatusList, name }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateSearchParams = (paramName, Values) => {
        const newParams = new URLSearchParams(searchParams);
        if (!Values.length) {
            newParams.delete(paramName)
        }
        else {
            let str = Values.join(",");
            newParams.set(paramName, str);
        }
        setSearchParams(newParams);
    }



    const handleStatusChange = (event, newValue) => {
        setSelectedValues(newValue);
        updateSearchParams(name, newValue)

    };

    return (
        <Box sx={{
            width: 'fit-content',
        }}>
            <Autocomplete
                multiple
                id="status-filter-autocomplete"
                size="small"
                onChange={handleStatusChange}
                options={StatusList}
                value={selectedValues}
                sx={{
                    minWidth: 200,
                    width: 'fit-content'
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={name}
                        placeholder={`select ${name}`}
                    />
                )}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            variant="outlined"
                            label={option}
                            size="small"
                            {...getTagProps({ index })}
                        />
                    ))
                }
            />
        </Box>
    );
};

export default CustomFilter;