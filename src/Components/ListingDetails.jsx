import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ListingDetails = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/api/listings/${id}`)
            .then(response => {
                setListing(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('API Error:', err);
                setError('Failed to load listing details. Please try again later.');
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Loading listing details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!listing) {
        return <p>Listing not found.</p>;
    }

    return (
        <div className="listing-details">
            <h1>{listing.title}</h1>
            <img
                src={listing.image || 'fallback-image-url.jpg'}
                alt={listing.title || 'Listing'}
                className="listing-details-img"
            />
            <p>Category: {listing.category}</p>
            <p>Guests: {listing.guests}</p>
            <p>Price: ${listing.price} / night</p>
            <p>Rating: {listing.rating}</p>
            <p>{listing.description || 'No description available.'}</p>
        </div>
    );
};

export default ListingDetails;
