import React, { useState, useEffect } from 'react'
import "./Home.css"
import MaterialUISwitch from "../../components/UI/DarkmodeSwitch"
import CustomFilter from '../../components/UI/CustomFilter'
import BasicSwitch from '../../components/UI/BasicSwitch'
import ResponsiveDateRangePickers from '../../components/UI/DatePicker'
import DiscreteSliderLabel from '../../components/UI/SingleSlider'
import dayjs from 'dayjs';
import ContestListing from '../../components/ContestListing/ContestListing'
import BasicPagination from '../../components/UI/Pagination'
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { contestActions } from '@/store/Substores/Contestslice'
import Filters from '@/components/Filters/Filters'



const StatusList = ["Active", "Expired", "Upcoming"];
const PlatformList = ["LeetCode", "CodeForces", "CodeChef"]


const Home = () => {
    const dispatch = useDispatch()
    const DarkMode = useSelector((state) => state.contests.DarkMode)

    const handleChange = (event) => {
        dispatch(contestActions.setDarkMode(event.target.checked));
    }




    return (
        <div className='container'>
            <div className='title-wrapper'>
                <div className='title-container'>
                    <h2 className="title">ContestHub</h2>
                    <MaterialUISwitch checked={DarkMode} onChange={handleChange} />
                </div>
                <Link to="/SavedContests"><button className='savedContests'>Saved contests</button></Link>

            </div>
            <div className={`sub-title ${DarkMode ? "dark-mode" : ""}`}>Your programming contest hub. We continuously monitor CodeForces, LeetCode, and CodeChef to bring you the most up-to-date competition information all in one dashboard.</div>

            <Filters />
            <ContestListing />
            <BasicPagination />
        </div>


    )
}

export default Home
