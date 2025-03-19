import React from 'react';
import './ContestCardLoader.css';
import { useSelector } from 'react-redux';

const ContestCardLoader = () => {
    const DarkMode = useSelector((state) => state.contests.DarkMode);

    return (
        <div className={`contest-card-loader ${DarkMode ? 'dark-mode' : ''}`}>
            <div className="contest-card-loader__header">
                <div className="contest-card-loader__icon"></div>
                <div className="contest-card-loader__title-group">
                    <div className="contest-card-loader__title"></div>
                    <div className="contest-card-loader__subtitle"></div>
                </div>
            </div>
            <div className="contest-card-loader__content">
                <div className="contest-card-loader__line"></div>
                <div className="contest-card-loader__line contest-card-loader__line--wide"></div>
                <div className="contest-card-loader__button"></div>
                <div className="contest-card-loader__button"></div>
            </div>
        </div>
    );
};

export default ContestCardLoader;