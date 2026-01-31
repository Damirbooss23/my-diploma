import React, { useEffect, useState } from 'react';
import BlacklistItem from '../components/BlackListitem.jsx';

const Blacklist = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("blacklist")) || [];
        setItems(saved);
    }, []);

    const removeItem = (index) => {
        const updated = items.filter((_, i) => i !== index);
        setItems(updated);
        localStorage.setItem("blacklist", JSON.stringify(updated));
    };

    return (
        <div className="blacklist-page">
            <h1>Blacklist</h1>

            {items.length === 0 ? (
                <p>No blacklisted items.</p>
            ) : (
                items.map((item, i) => (
                    <BlacklistItem 
                        key={i}
                        src={item.src}
                        title={item.title}
                        price={item.price}
                        reason={item.reason}
                        onRemove={() => removeItem(i)}
                    />
                ))
            )}
        </div>
    );
};

export default Blacklist;
