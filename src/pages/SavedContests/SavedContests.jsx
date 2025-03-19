import React, { useState, useEffect } from 'react';
import "./SavedContests.css";
import { Link, useSearchParams } from 'react-router-dom';
import ContestCardLoader from '@/components/Loaders/ContestCardLoader';
import BookMark from '@/components/ContestListing/Bookmark/BookMark';
import { useSelector } from 'react-redux';

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
        <div className={`contest-card `}>
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

                            <button disabled={Status === "Upcoming"} className="contest-card__button contest-card__button--register">
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
                    <a href={`/Solutions/${_id}`} target="_blank" rel="noopener noreferrer" >
                        <button className="contest-card__button contest-card__button--register">

                            View Solutions
                        </button>

                    </a>
                )}
            </div>
        </div >
    );
};

const SavedContests = () => {
    const [currentContests, setCurrentContests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const DarkMode = useSelector((state) => state.contests.DarkMode);


    const getContests = async () => {
        setIsLoading(true);
        try {
            let savedContests = [];
            if (localStorage.getItem("savedContests")) {
                savedContests = JSON.parse(localStorage.getItem("savedContests"));
            }
            if (savedContests.length === 0) {
                return;
            }
            const response = await fetch('http://localhost:5000/get-savedcontests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contestIds: savedContests, // Array of contest ID strings
                }),
            });
            let data = await response.json();
            if (response.ok) {
                setCurrentContests(data.data);

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
    }, [])

    return (
        <div className={`contest_wrapper ${DarkMode ? "dark-mode" : ""}`}>
            <h2>Saved Contests</h2>

            <div className="contest-listing">
                <div className="contest-listing__container">
                    {!isLoading && currentContests.length > 0 && currentContests.map((contest, index) => (
                        <div className="contest-card-wrapper" key={index}>
                            <ContestCard contest={contest} />
                        </div>
                    ))}
                    {

                        isLoading && < >

                            {[...Array(4)].map((_, index) => (
                                <ContestCardLoader key={index} />
                            ))}
                        </>

                    }
                </div>
            </div>
        </div>
    );
};

export default SavedContests;