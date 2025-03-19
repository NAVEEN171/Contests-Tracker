import React, { useState, useEffect } from "react";
import "./BookMark.css";
import { useSelector } from "react-redux";

const BookMark = ({ contestId }) => {
    const [bookmark, setBookmark] = useState(false);
    const [saved, setSaved] = useState(false);
    const DarkMode = useSelector((state) => state.contests.DarkMode);

    useEffect(() => {
        let SavedContests = localStorage.getItem("savedContests") || "[]";
        const parsedContests = JSON.parse(SavedContests);
        if (parsedContests.includes(contestId)) {
            setSaved(true);
        }
    }, [contestId]);

    const bookmarkHandler = (e) => {
        e.stopPropagation();

        setBookmark(true);
        if (saved) {
            if (localStorage.getItem("savedContests")) {
                let SavedContests = JSON.parse(localStorage.getItem("savedContests"));
                if (SavedContests.length > 0) {
                    SavedContests = SavedContests.filter((contest) => contest !== contestId);
                    localStorage.setItem("savedContests", JSON.stringify(SavedContests));
                }
            }
        }
        else {
            let SavedContests = JSON.parse(localStorage.getItem("savedContests") || "[]");

            if (SavedContests) {
                SavedContests.push(contestId);
                localStorage.setItem("savedContests", JSON.stringify(SavedContests))
            }
            else {
                localStorage.setItem("savedContests", JSON.stringify([contestId]))
            }
        }
        setSaved(!saved);

        setTimeout(() => {
            setBookmark(false);
        }, 1000);
    };

    return (
        <div
            onClick={bookmarkHandler}
            style={{ zIndex: "10" }}
            className={`book-mark-container ${bookmark ? "loader" : ""} ${DarkMode ? "dark-mode" : ""}`}
        >
            <div className={`book-mark ${bookmark ? "not-loading" : ""}`}>
                <div className="bookmark-icon">
                    <div className={`bookmark-top ${saved ? "saved" : ""}`}></div>
                    <div className="bookmark-bottom">
                        <div className={`bookmark-left ${saved ? "saved" : ""}`}></div>
                        <div className={`bookmark-right ${saved ? "saved" : ""}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookMark;