import React, { useState, useEffect } from 'react';
import "./ContestListing.css";
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { contestActions } from '@/store/Substores/Contestslice';
import ContestCardLoader from '../Loaders/ContestCardLoader';
import BookMark from './Bookmark/BookMark';


// Helper function to format date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Helper function to get only date part
const getDateOnly = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
};

const ContestCard = ({ contest }) => {

    const {
        _id,
        contestName,
        contestLink,
        startTime,
        endTime,
        duration,
        Status,
        Platform,
        youtubeLinks
    } = contest;



    return (
        <div className="contest-card">
            <div className="contest-card__header">
                <div className="contest-card__platform">
                    <img
                        src={`${Platform === "LeetCode" ? `/svgs/platform/${Platform.toLowerCase()}.svg` : `/svgs/platform/${Platform}.svg`}`}
                        alt={Platform}
                        className="contest-card__platform-logo"
                    />
                </div>
                <div className="contest-card__title-container">
                    <h3 className="contest-card__title">{contestName}</h3>
                    <div className="contest-card__status-chip" data-status={Status.toLowerCase()}>
                        {Status}
                    </div>
                </div>
                <BookMark contestId={_id} />
            </div>

            <div className="contest-card__info">
                {Status === "Expired" ? (
                    <div className="contest-card__date-info">
                        <span className="contest-card__label">Date:</span> {getDateOnly(startTime)}
                    </div>
                ) : (
                    <div className="contest-card__date-info">
                        <span className="contest-card__label">Starts:</span> {formatDate(startTime)}
                    </div>
                )}

                <div className="contest-card__duration">
                    <span className="contest-card__label">Duration:</span> {duration}
                </div>
            </div>

            <div className="contest-card__actions">
                {Status === "Active" || Status === "Upcoming" ?
                    (
                        <a href={contestLink} target="_blank" rel="noopener noreferrer" >

                            <button disabled={Status === "Upcoming"} className={`contest-card__button ${Status === "Active" ? "contest-card__button--register" : "contest-card__button--upcoming"}`}>
                                {Status !== "Upcoming" ? "Register" : "Declared Soon"}
                            </button>
                        </a>

                    ) : (
                        <a href={contestLink} target="_blank" rel="noopener noreferrer" >

                            <button className="contest-card__button contest-card__button--view">
                                View Contest
                            </button>
                        </a>


                    )
                }

                {youtubeLinks && youtubeLinks.length > 0 && (
                    <Link to={`/Solutions/${_id}`}  >
                        <button className="contest-card__button contest-card__button--register">

                            View Solutions
                        </button>

                    </Link>
                )}
            </div>
        </div >
    );
};

const ContestListing = () => {
    const dispatch = useDispatch()
    const [currentContests, setCurrentContests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const Page = useSelector((state) => state.contests.Page);
    const DarkMode = useSelector((state) => state.contests.DarkMode)
    const [searchParams, setSearchParams] = useSearchParams();
    const getContests = async () => {
        setIsLoading(true);
        try {
            const queryParams = new URLSearchParams();

            if (searchParams.has("Page")) queryParams.append('Page', searchParams.get("Page"));
            if (searchParams.has("Solutions")) queryParams.append('Solutions', searchParams.get("Solutions"));
            if (searchParams.has("Status")) queryParams.append('Status', searchParams.get("Status"));
            if (searchParams.has("Platform")) queryParams.append('Platform', searchParams.get("Platform"));
            if (searchParams.has("ContestPeriod")) queryParams.append('ContestPeriod', searchParams.get("ContestPeriod"));
            if (searchParams.has("duration")) queryParams.append('duration', searchParams.get("duration"));
            if (searchParams.has("Latest")) queryParams.append('Latest', searchParams.get("Latest"));
            if (searchParams.has("Active")) queryParams.append('Active', searchParams.get("Active"));

            const url = `http://localhost:5000/api/get-contests/?${queryParams.toString()}`;

            let response = await fetch(url);
            let data = await response.json();
            if (response.ok) {
                setCurrentContests(data.contests);
                dispatch(contestActions.setTotalPages(data.maxPaginatedPages))
                if (data.maxPaginatedPages > 0 && Page > data.maxPaginatedPages) {
                    dispatch(contestActions.setPage(1));
                    const newParams = new URLSearchParams(searchParams);
                    newParams.set("Page", 1);

                    setSearchParams(newParams)

                }
                dispatch(contestActions.setTotalContestsMatched(data.totalCount))
            }
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        getContests();
    }, [searchParams])

    return (
        <div className={`contest-listing ${DarkMode ? 'dark-mode' : ''}`}>
            <div className="contest-listing__container">
                {!isLoading && currentContests.length > 0 && currentContests.map((contest, index) => (
                    <div className="contest-card-wrapper" key={index}>
                        <ContestCard contest={contest} />
                    </div>
                ))}
                {

                    isLoading && < >

                        {[...Array(6)].map((_, index) => (
                            <ContestCardLoader key={index} />
                        ))}
                    </>

                }
            </div>
        </div>
    );
};

export default ContestListing;