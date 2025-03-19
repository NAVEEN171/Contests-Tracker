import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker';
import { useSearchParams } from 'react-router-dom';

export default function ResponsiveDateRangePickers({ dateRange, setDateRange }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const UpdateParams = (name, dateRangeArray) => {
        const newParams = new URLSearchParams(searchParams);

        const formattedDates = dateRangeArray.map(date => {
            if (date) {
                return date.format('YYYY-MM-DD');
            }
            return '';
        });

        // Join with comma and set parameter
        if (formattedDates[0] && formattedDates[1]) {
            newParams.set(name, formattedDates.join(','));
        } else {
            // If either date is missing, remove the parameter
            newParams.delete(name);
        }

        setSearchParams(newParams);
    }

    const handleDateRangeChange = (newDateRange) => {
        if (newDateRange[0] && newDateRange[1] && newDateRange[1].isBefore(newDateRange[0])) {
            newDateRange[1] = newDateRange[0];
        }

        setDateRange(newDateRange);
        UpdateParams("ContestPeriod", newDateRange);
        console.log("Start date:", newDateRange[0]);
        console.log("End date:", newDateRange[1]?.format('YYYY-MM-DD'));
    };

    // This is a workaround approach using a custom shouldDisableDate function
    const shouldDisableDate = (date, position) => {
        if (position === 'end' && dateRange[0]) {
            return date.isBefore(dateRange[0], 'day');
        }
        return false;
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem label="Contest Period" component="MobileDateRangePicker">
                <MobileDateRangePicker
                    value={dateRange}
                    onChange={handleDateRangeChange}
                    shouldDisableDate={shouldDisableDate}
                    calendars={1}
                />
            </DemoItem>
        </LocalizationProvider>
    );
}