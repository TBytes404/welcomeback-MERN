import React, { useState } from 'react';
import './GuestsSelection.css';

function GuestsSelection() {
    const [adults, setAdults] = useState(1);   // Default 1 adult
    const [children, setChildren] = useState(0); // Default 0 children

    const incrementAdults = () => setAdults(adults + 1);
    const decrementAdults = () => adults > 1 && setAdults(adults - 1); // Minimum 1 adult
    const incrementChildren = () => setChildren(children + 1);
    const decrementChildren = () => children > 0 && setChildren(children - 1); // Minimum 0 children

    return (
        <div className="guests-container">
            <div className="guest-selection">
                <h4 className="guest-label">Adults</h4>
                <div className="guest-buttons">
                    <button className="guest-btn" onClick={decrementAdults}>-</button>
                    <span className="guest-count">{adults}</span>
                    <button className="guest-btn" onClick={incrementAdults}>+</button>
                </div>
            </div>

            <div className="guest-selection">
                <h4 className="guest-label">Children</h4>
                <div className="guest-buttons">
                    <button className="guest-btn" onClick={decrementChildren}>-</button>
                    <span className="guest-count">{children}</span>
                    <button className="guest-btn" onClick={incrementChildren}>+</button>
                </div>
            </div>
        </div>
    );
}

export default GuestsSelection;
