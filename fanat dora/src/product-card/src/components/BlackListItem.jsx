import React from 'react';

const BlacklistItem = ({ src, title, price, reason, onRemove }) => {
    return (
        <div className="blacklist-card">

            <img src={src} alt={title} className="blacklist-image" />

            <div className="blacklist-info">
                <h2>{title}</h2>
                <p>Price: ${price}</p>
                {reason && <p>Reason: {reason}</p>}
            </div>

            <button onClick={onRemove} className="blacklist-remove-btn">
                Remove
            </button>
        </div>
    );
};

export default BlacklistItem;
