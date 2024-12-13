import React from 'react';
const ListingCard = ({ listing, onClick, onBookNow, onDelete, admin }) => {
    return (
        <div className="listing-card" onClick={() => onClick(listing._id)}>
            <div className="listing-images">
                {listing.images && listing.images.length > 0 ? (
                    <img
                        src={`http://localhost:3001${listing.images[0]}`}
                        alt={listing.name || 'Listing'}
                        className="listing-card-img"
                    />
                ) : (
                    <img
                        src="fallback-image-url.jpg"
                        alt={listing.name || 'Listing'}
                        className="listing-card-img"
                    />
                )}
            </div>

            <div className="listing-card-content">
                <h2 className="listing-card-title">{listing.name || 'No Title'}</h2>
                <p className="listing-card-type">{listing.property_type || 'N/A'}</p>
                <p className="listing-card-guests">Guests: {listing.guests || 'N/A'}</p>
                <p className="listing-card-price">${listing.price || 0} / night</p>
                <p className="listing-card-rating">Rating: {listing.rating || 'N/A'}</p>
                <div className="btns">
                    {admin && (
                        <button className="book-now-btn" onClick={(e) => { e.stopPropagation(); onDelete(listing._id); }}>
                            Remove Listing
                        </button>
                    )
                    }
                    <button className="book-now-btn" onClick={(e) => { e.stopPropagation(); onBookNow(listing._id); }}>
                        Book Now
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ListingCard;
