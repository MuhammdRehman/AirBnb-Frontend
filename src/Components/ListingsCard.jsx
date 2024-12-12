import React from 'react';

const ListingCard = ({ listing, onClick, onBookNow, fromBooking }) => (
    <div className="listing-card" onClick={() => onClick(listing._id)}>
        <img
            src={listing.images.picture_url || 'fallback-image-url.jpg'}
            alt={listing.name || 'Listing'}
            className="listing-card-img"
        />
        <div className="listing-card-content">
            <h2 className="listing-card-title">{listing.name || 'No Title'}</h2>
            <p className="listing-card-type">{listing.property_type || 'N/A'}</p>
            <p className="listing-card-guests">Bedrooms: {listing.bedrooms || 'N/A'}</p>
            <p className="listing-card-price">${listing.price || 0} / night</p>
            <p className="listing-card-rating">Rating: {listing.rating || 'N/A'}</p>
            
            {!fromBooking && (
                <button 
                    className="book-now-btn" 
                    onClick={(e) => {
                        e.stopPropagation(); 
                        onBookNow(listing._id);
                    }}
                >
                    Book Now
                </button>
            )}
        </div>
    </div>
);

export default ListingCard;
