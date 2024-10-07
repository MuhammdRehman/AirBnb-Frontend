import React from 'react'; 
import listingsData from '../cardData';
import '../Styles/Listingcards.css'; // Import the CSS file


const ListingCard = ({ listing }) => {
    return (
        <div className="listing-card">
            <img src={listing.image} alt={listing.title} className="listing-card-img" />
            <div className="listing-card-content">
                <h2 className="listing-card-title">{listing.title}</h2>
                <p className="listing-card-type">{listing.type}</p>
                <p className="listing-card-guests">Guests: {listing.guests}</p>
                <p className="listing-card-price">${listing.price} / night</p>
                <p className="listing-card-rating">Rating: {listing.rating} </p>
            </div>
        </div>
    );
};

const ListingsGrid = ({ category }) => {
    const filteredListings = category
        ? listingsData.filter(listing => listing.category === category)
        : listingsData;

    return (
        <div className="listings-grid">
            {filteredListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
            ))}
        </div>
    );
};

export default ListingsGrid;
