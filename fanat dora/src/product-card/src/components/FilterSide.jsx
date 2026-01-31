import React, { useState } from 'react';

const FilterSide = ({ onFilterChange }) => {
    const types = ["Running", "Casual", "Soccer", "Tennis", "Basketball"];
    const colors = ["White", "Black", "Blue", "Red", "Green", "Yellow"];
    const sizes = ["7", "8", "9", "10", "11", "12"];
    const genders = ["Men", "Women", "Kids"];
    const others = ["New Arrivals", "Best Sellers", "Discounted", "Seasonal", "Limited Edition"];

    const [filters, setFilters] = useState({
        types: [],
        colors: [],
        sizes: [],
        gender: [],
        others: []
    });

    function handleCheckboxChange(category, value, checked) {
        setFilters(prev => {
            const prevValues = prev[category] || [];
            const newValues = checked ? [...prevValues, value] : prevValues.filter((item) => item !== value);
            const next = {
                ...prev,
                [category]: newValues
            };
            if (typeof onFilterChange === 'function') onFilterChange(next);
            return next;
        });
    }

    return (
        <div className="filters">
            <div className="filter-side">
                <h2>Types</h2>
                <ul>
                    {types.map((type, index) => {
                        const checked = filters.types.includes(type);
                        return (
                            <li key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={type}
                                        checked={checked}
                                        onChange={(e) => handleCheckboxChange('types', type, e.target.checked)}
                                    /> {type}
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="filter-side">
                <h2>Colors</h2>
                <ul>
                    {colors.map((color, index) => {
                        const checked = filters.colors.includes(color);
                        return (
                            <li key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={color}
                                        checked={checked}
                                        onChange={(e) => handleCheckboxChange('colors', color, e.target.checked)}
                                    /> {color}
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="filter-side">
                <h2>Sizes</h2>
                <ul>
                    {sizes.map((size, index) => {
                        const checked = filters.sizes.includes(size);
                        return (
                            <li key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={size}
                                        checked={checked}
                                        onChange={(e) => handleCheckboxChange('sizes', size, e.target.checked)}
                                    /> {size}
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>

        <div className="filter-side">
            <h2>Gender</h2>
            <ul>
                {["Men", "Women", "Kids"].map((gender, index) => {
                    const checked = filters.gender.includes(gender);
                    return (
                        <li key={index}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={gender}
                                    checked={checked}
                                    onChange={(e) =>
                                        handxChange('gender', gender, e.target.checked)
                                    }
                                /> {gender}
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>


        <div className="filter-side">
            <h2>Others</h2>
            <ul>
                {["New Arrivals", "Best Sellers", "Discounted", "Seasonal", "Limited Edition"].map((tag, index) => {
                    const checked = filters.others.includes(tag);
                    return (
                        <li key={index}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={tag}
                                    checked={checked}
                                    onChange={(e) =>
                                        handleCheckboxChange('others', tag, e.target.checked)
                                    }
                                /> {tag}
                            </label>
                        </li>
                    );
                })}
            </ul>
            </div>

            <div className="filter-side">
                <h2>Colors</h2>
                <ul>
                    {colors.map((color, index) => {
                        const checked = filters.colors.includes(color);
                        return (
                            <li key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={color}
                                        checked={checked}
                                        onChange={(e) => handleCheckboxChange('colors', color, e.target.checked)}
                                    /> {color}
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="filter-side">
                <h2>Sizes</h2>
                <ul>
                    {sizes.map((size, index) => {
                        const checked = filters.sizes.includes(size);
                        return (
                            <li key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={size}
                                        checked={checked}
                                        onChange={(e) => handleCheckboxChange('sizes', size, e.target.checked)}
                                    /> {size}
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="filter-side">
                <h2>Gender</h2>
                <ul>
                    {genders.map((gender, index) => {
                        const checked = filters.gender.includes(gender);
                        return (
                            <li key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={gender}
                                        checked={checked}
                                        onChange={(e) => handleCheckboxChange('gender', gender, e.target.checked)}
                                    /> {gender}
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* OTHERS */}
            <div className="filter-side">
                <h2>Others</h2>
                <ul>
                    {others.map((tag, index) => {
                        const checked = filters.others.includes(tag);
                        return (
                            <li key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={tag}
                                        checked={checked}
                                        onChange={(e) => handleCheckboxChange('others', tag, e.target.checked)}
                                    /> {tag}
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );leCheckbo
}

export default FilterSide;