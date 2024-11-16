import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListingCard = ({ listing }) => (
    <div className="listing-card">
        <img
            src={listing.image || 'fallback-image-url.jpg'}
            alt={listing.title || 'Listing'}
            className="listing-card-img"
        />
        <div className="listing-card-content">
            <h2 className="listing-card-title">{listing.title || 'No Title'}</h2>
            <p className="listing-card-type">{listing.type || 'N/A'}</p>
            <p className="listing-card-guests">Guests: {listing.guests || 'N/A'}</p>
            <p className="listing-card-price">${listing.price || 0} / night</p>
            <p className="listing-card-rating">Rating: {listing.rating || 'N/A'}</p>
        </div>
    </div>
);

const ListingsGrid = ({ category = null }) => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/api/listings')
            .then(response => {
                console.log('API Response:', response.data);
                setListings(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('API Error:', err);
                setError('Failed to load listings. Please try again later.');
                setLoading(false);
            });
    }, []);

    // Log to debug
    console.log('Listings:', listings);

    if (loading) {
        return <p>Loading listings...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="listings-grid">
            {listings.length > 0 ? (
                listings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                ))
            ) : (
                <p>No listings available.</p>
            )}
        </div>
    );
};

export default ListingsGrid;
