import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Styles/ListingsDetail.css';
import { SiTruenas } from 'react-icons/si';

const ListingDetails = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleListingDetail = async (id) => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:3001/api/listings/${id}`);
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
        <div className="listing-details">
            <header className="listing-details-header">
                <h1>{listing.name}</h1>
                <img
                    src={listing.images.picture_url || 'fallback-image-url.jpg'}
                    alt={listing.name || 'Listing'}
                    className="listing-details-img"
                />
            </header>
            <div className="listing-details-info">
                <p>Category: {listing.property_type}</p>
                <p>Property Contains: {listing.bedrooms} BedRooms, {listing.bathrooms} BathRooms</p>
                <p>Price: ${listing.price} / night</p>
                {listing.rating && <p>Rating: {listing.rating}</p>}
                <p>{`Description: ${listing.summary || 'No description available.'}`}</p>

                {listing.amenities && (
                    <div className="listing-details-amenities">
                        <h3>You will get Following Facilities</h3>
                        <ul>
                            {listing.amenities.map((amenity) => (
                                <li key={amenity}>{amenity}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {
                    listing.address && (
                        <div className="listing-details-address">
                            <h3>{`Address: ${listing.address.street}, ${listing.address.suburb}, ${listing.address.country}`}</h3>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ListingDetails;