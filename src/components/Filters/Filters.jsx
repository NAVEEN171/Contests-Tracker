import React, { useState, useEffect } from 'react'
import "../../pages/Home/Home.css"
import CustomFilter from '../../components/UI/CustomFilter'
import BasicSwitch from '../../components/UI/BasicSwitch'
import ResponsiveDateRangePickers from '../../components/UI/DatePicker'
import DiscreteSliderLabel from '../../components/UI/SingleSlider'
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';




const StatusList = ["Active", "Expired", "Upcoming"];
const PlatformList = ["LeetCode", "CodeForces", "CodeChef"]

const Filters = () => {
    const dispatch = useDispatch()
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const DarkMode = useSelector((state) => state.contests.DarkMode)

    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [Active, setActive] = useState(false);
    const [youtubeLinks, setYoutubeLinks] = useState(false);
    const [sortLatest, setSortLatest] = useState(false);
    const [duration, setDuration] = useState(3);
    const [contestRange, setContestRange] = useState([
        dayjs('2025-01-17'),
        dayjs('2025-03-21')
    ]);
    const [searchParams, setSearchParams] = useSearchParams();
    const matchedContests = useSelector((state) => state.contests.totalContestsMatched)
    useEffect(() => {
        const newParams = new URLSearchParams(searchParams);
        if (newParams.has("Latest")) {
            let latestValue = JSON.parse(newParams.get("Latest"))
            if (typeof latestValue === 'boolean') {
                setSortLatest(latestValue)
            }

        }
        else {
            newParams.set("Latest", true);
            setSearchParams(newParams);
            setSortLatest(true);
        }
        if (newParams.has("Active")) {
            let activeValue = JSON.parse(newParams.get("Active"))
            if (typeof activeValue === 'boolean') {
                setActive(activeValue);


            }

        }
        if (newParams.has("Solutions")) {
            let solutionValue = JSON.parse(newParams.get("Solutions"))
            if (typeof solutionValue === 'boolean') {
                setYoutubeLinks(solutionValue);

            }

        }
        if (newParams.has("ContestPeriod")) {
            let contestValue = newParams.get("ContestPeriod").split(",");
            setContestRange([
                dayjs(contestValue[0]),
                dayjs(contestValue[1])
            ])

        }
        if (newParams.has("duration")) {
            let durationValue = parseInt(newParams.get("duration"))
            if (typeof durationValue === 'number' && durationValue < 11) {
                setDuration(durationValue)
            }
        }
        if (newParams.has("Status")) {
            let statusList = newParams.get("Status").split(",");
            setSelectedStatuses(statusList)
        }
        if (newParams.has("Platform")) {
            let platformList = newParams.get("Platform").split(",");
            setSelectedPlatforms(platformList)
        }


    }, [])


    // Create theme based on dark mode preference
    const theme = createTheme({
        palette: {
            mode: DarkMode ? 'dark' : 'light',
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <div className='Filters'>
                <CustomFilter selectedValues={selectedStatuses} setSelectedValues={setSelectedStatuses} StatusList={StatusList} name="Status" />
                <CustomFilter selectedValues={selectedPlatforms} setSelectedValues={setSelectedPlatforms} StatusList={PlatformList} name="Platform" />
                <BasicSwitch toggle={Active} setToggle={setActive} name="Active" />
                <BasicSwitch toggle={youtubeLinks} setToggle={setYoutubeLinks} name="Solutions" />



                <ResponsiveDateRangePickers dateRange={contestRange} setDateRange={setContestRange} />
                <DiscreteSliderLabel value={duration} setValue={setDuration} />

                <div className='contests-summary'>
                    <div className='contests-summary__count'>
                        <span className='contests-summary__number'>{matchedContests}</span> Contests found at 3 Platforms
                    </div>
                    <BasicSwitch
                        toggle={sortLatest}
                        setToggle={setSortLatest}
                        name="Latest"
                    />
                </div>
            </div>
        </ThemeProvider>

    )
}

export default Filters
