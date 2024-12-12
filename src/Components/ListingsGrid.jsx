import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ListingsCard from './ListingsCard';

const ListingsGrid = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        handleGet();
    }, []);
    const handleGet = async () => {
        setLoading(true);
        try {
          const res = await axios.get('http://localhost:3001/api/listings');
          console.log(res.data);
      
          if (res.status === 200) {
            setListings([...res.data.data]);
          } else {
            setError('Failed to fetch listings: ' + res.statusText);
          }
        } catch (error) {
          console.error('Error fetching listings:', error);
          setError('Failed to load listings. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

    const handleCardClick = (id) => {
        navigate(`/listings/${id}`);
    };

    const handleBookNowClick = (id) => {
        navigate(`/bookings/${id}`);
    };

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
                    <ListingsCard
                        key={listing.id}
                        listing={listing}
                        onClick={handleCardClick}
                        onBookNow={handleBookNowClick}
                        fromBooking={false}
                    />
                ))
            ) : (
                <p>No listings available.</p>
            )}
        </div>
    );
};

export default ListingsGrid;
