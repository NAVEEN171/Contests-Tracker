import Box from '@mui/material/Box';
import { useEffect, useRef, useState } from 'react';
import Slider from '@mui/material/Slider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const marks = [
    {
        value: 0,
        label: '0Hrs',
    },
    {
        value: 3,
        label: '3Hrs',
    },
    {
        value: 5,
        label: '5Hrs',
    },
    {
        value: 10,
        label: '10Hrs',
    },
];

function valuetext(value) {
    return `${value}Hrs`;
}

export default function DurationDropdown({ value, setValue }) {
    const [open, setOpen] = useState(false);
    const boxRef = useRef(null);

    // Get dark mode state from Redux
    const DarkMode = useSelector((state) => state.contests.DarkMode);

    const [searchParams, setSearchParams] = useSearchParams();

    const UpdateParams = (name, Value) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(name, Value);
        setSearchParams(newParams)
    }

    const handleClick = () => {
        setOpen(!open);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        UpdateParams("duration", newValue)
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [boxRef]);

    return (
        <Box
            sx={{ width: 300, position: 'relative', marginTop: '30px' }}
            ref={boxRef}
        >
            <Paper
                elevation={0}
                onClick={handleClick}
                sx={{
                    bgcolor: DarkMode ? '#1e2230' : 'white',
                    color: DarkMode ? '#fff' : 'inherit',
                    border: DarkMode ? '1px solid #3d4356' : '1px solid gray',
                    p: 2,
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                        bgcolor: DarkMode ? '#282f42' : 'grey.100'
                    }
                }}
            >
                <Typography variant="body1">
                    Duration: {value} Hrs
                </Typography>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Paper>

            {open && (
                <Paper
                    elevation={4}
                    sx={{
                        mt: 1,
                        p: 3,
                        borderRadius: 1,
                        position: 'absolute',
                        width: '100%',
                        zIndex: 1000,
                        bgcolor: DarkMode ? '#1e2230' : 'background.paper',
                        color: DarkMode ? '#fff' : 'inherit',
                        border: DarkMode ? '1px solid #3d4356' : 'none',
                        '& .MuiSlider-root': {
                            color: DarkMode ? '#4357ff' : undefined,
                        },
                        '& .MuiSlider-valueLabel': {
                            backgroundColor: DarkMode ? '#282f42' : undefined,
                        },
                        '& .MuiSlider-markLabel': {
                            color: DarkMode ? '#a8b0c1' : undefined,
                        }
                    }}
                >
                    <Slider
                        aria-label="Duration"
                        value={value}
                        onChange={handleChange}
                        getAriaValueText={valuetext}
                        step={1}
                        min={0}
                        max={10}
                        marks={marks}
                        valueLabelDisplay="on"
                    />
                </Paper>
            )}
        </Box>
    );
}