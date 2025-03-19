import Pagination from '@mui/material/Pagination';
import "../../App.css"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { contestActions } from '@/store/Substores/Contestslice';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function BasicPagination() {
    const dispatch = useDispatch()
    const Page = useSelector((state) => state.contests.Page);
    const [searchParams, setSearchParams] = useSearchParams();
    const totalPages = useSelector((state) => state.contests.totalPages);
    const DarkMode = useSelector((state) => state.contests.DarkMode);
    const [size, setSize] = useState("high")
    const updateSize = () => {
        if (window.innerWidth > 900) {
            setSize("large")

        }
        else if (window.innerWidth > 500) {
            setSize("medium")
        }
        else {
            setSize("small")
        }
    }

    useEffect(() => {
        updateSize();

        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    const theme = createTheme({
        palette: {
            mode: DarkMode ? 'dark' : 'light',
        },
    });






    const handleChange = (event, value) => {
        dispatch(contestActions.setPage(value));
        const newParams = new URLSearchParams(searchParams);

        newParams.set("Page", value);

        setSearchParams(newParams)

    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {totalPages > 0 && <div className='pagination'>
                <Pagination size={size} page={Page} onChange={handleChange} count={totalPages} color="primary" />
            </div>}
        </ThemeProvider>
    );
}
