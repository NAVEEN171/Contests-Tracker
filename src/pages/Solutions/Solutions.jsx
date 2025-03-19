import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Solutions.css';
import { useSelector } from 'react-redux';

const Solutions = () => {
    const { id } = useParams();
    const [videoSolutions, setVideoSolutions] = useState([]);
    const [contestTitle, setContestTitle] = useState('');
    const DarkMode = useSelector((state) => state.contests.DarkMode)

    const getYoutubeSolutions = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/get-solutions/${id}`);
            let data = await response.json();
            if (response.ok) {
                setVideoSolutions(data.Solutions || []);
                setContestTitle(data?.Platform + " " + data?.ContestName);
            }
        } catch (error) {
            console.log("Error fetching solutions:", error);
        }
    }

    useEffect(() => {
        if (!id) {
            return;
        }
        getYoutubeSolutions();
    }, [id]);

    // Find the most viewed video
    const mostViewedVideo = videoSolutions.length > 0
        ? videoSolutions.reduce((prev, current) => (prev.views > current.views) ? prev : current)
        : null;

    return (
        <div className={`solutions-container ${DarkMode ? 'dark-mode' : ''}`}>
            <h1 className="solutions-title">{contestTitle}</h1>

            <div className="video-cards-wrapper">
                {videoSolutions.length > 0 ? (
                    videoSolutions.map((video, index) => (
                        <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="video-card"
                            key={index}
                        >
                            <div className="thumbnail-container">
                                <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                            </div>

                            <div className="video-info">
                                <h3 className="video-title">{video.title}</h3>
                                <p className="video-channel">{video.channel}</p>
                                <p className="video-views">{video.views.toLocaleString()} views</p>
                            </div>

                            {mostViewedVideo && mostViewedVideo.url === video.url && (
                                <div className="most-watched-badge">Most Watched</div>
                            )}
                        </a>
                    ))
                ) : (
                    <p className="no-solutions">No video solutions available for this contest.</p>
                )}
            </div>
        </div>
    );
}

export default Solutions;