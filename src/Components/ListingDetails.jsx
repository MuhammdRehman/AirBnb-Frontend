import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Styles/ListingsDetail.css';
import { useAuthStore } from '../store/useAuthStore';
import Navbar from './Navbar';

const ListingDetails = () => {
    const { id } = useParams();
    const { user } = useAuthStore();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            role: user.username,
        }
    };
    useEffect(() => {
        const handleListingDetail = async (id) => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:3001/api/listings/${id}`, config);
                if (res.status === 200) {
                    setListing(res.data);
                } else {
                    setError("Error fetching listing data");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        handleListingDetail(id);
    }, [id]);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % listing.images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex - 1 + listing.images.length) % listing.images.length
        );
    };

    if (loading) {
        return <p>Loading listing details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!listing) {
        return <p>Property not found.</p>;
    }

    return (
        <>

            <div className="listing-details">
                <header className="listing-details-header">
                    <h1>{listing.name}</h1>
                    <div className="listing-details-images">
                        {listing.images.length > 0 ? (

                            <div className="image-container">
                                <img
                                    src={`http://localhost:3001${listing.images[currentImageIndex]}`}
                                    alt={listing.name || 'Listing'}
                                    className="listing-card-img"
                                />
                                <div className="image-actions">
                                    <button className="button" onClick={handlePrevImage}>Prev</button>
                                    <button className="button" onClick={handleNextImage}>Next</button>
                                </div>
                            </div>

                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                </header>
                <div className="listing-details-info">
                    <p>Category: {listing.property_type}</p>
                    <p>Property Contains: {listing.bedrooms} Bedroom(s), {listing.bathrooms} Bathroom(s)</p>
                    <p>Price: ${listing.price} / night</p>
                    {listing.rating && listing.feedbackbypeople ? (
                        <p>Rating: {listing.rating} (Based on {listing.feedbackbypeople} reviews)</p>
                    ) : (
                        <p>Rating: Not Available</p>
                    )}
                    <p>{`Description: ${listing.summary || 'No description available.'}`}</p>

                    {listing.amenities && (
                        <div className="listing-details-amenities">
                            <h3>Available Amenities:</h3>
                            <ul>
                                {listing.amenities.map((amenity, index) => (
                                    <li key={index}>{amenity}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {listing.address && (
                        <div className="listing-details-address">
                            <h3>Address:</h3>
                            <p>{`${listing.address.street}, ${listing.address.city}, ${listing.address.country}`}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ListingDetails;
