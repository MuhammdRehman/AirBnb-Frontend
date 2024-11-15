import React, { useState, useEffect } from 'react';
import '../Styles/Listingcards.css';
import axios from 'axios';

const ListingCard = ({ listing }) => (
    <div className="listing-card">
        <img
            src={listing.image ? listing.image : 'fallback-image-url.jpg'}
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

    useEffect(() => {
        axios.get('http://localhost:5000/api/listings')
            .then(response => {
                console.log('API Response:', response.data);
                setListings(response.data);
            })
            .catch(err => {
                console.error('API Error:', err);
                setListings([]); // Ensure empty state is handled
            });
    }, []);

    const filteredListings = category
        ? listings.filter(listing => listing.category === category)
        : listings;

    console.log('Category:', category);
    console.log('Filtered Listings:', filteredListings);

    return (
        <div className="listings-grid">
            {filteredListings.length > 0 ? (
                filteredListings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                ))
            ) : (
                <p>No listings available.</p>
            )}
        </div>
    );
};

export default ListingsGrid;
