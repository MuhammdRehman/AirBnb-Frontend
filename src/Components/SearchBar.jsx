import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import '../Styles/Searchbar.css'; // Assuming your styles are saved here

const SearchBar = () => {
    const [location, setLocation] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [scrollY, setScrollY] = useState(0);

    const handleSearch = () => {
        console.log({
            location,
            checkIn,
            checkOut,
            guests,
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (scrollY > 50) {
        return null;
    }

    return (
        <div className="search-bar">
            <div className="search-bar-container">
                <div className="search-bar-input-container">
                    <label className="search-bar-label">Where</label>
                    <input
                        type="text"
                        placeholder="Where are you going?"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="search-bar-input"
                    />
                </div>

                <div className="search-bar-input-container">
                    <label className="search-bar-label">Check-In</label>
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="search-bar-date"
                    />
                </div>

                <div className="search-bar-input-container">
                    <label className="search-bar-label">Check-Out</label>
                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="search-bar-date"
                    />
                </div>

                <div className="search-bar-input-container">
                    <label className="search-bar-label">Guests</label>
                    <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="search-bar-select"
                    >
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                                {num} guest{num > 1 ? 's' : ''}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleSearch}
                    className="search-bar-button"
                >
                    <AiOutlineSearch />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
