import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ListingsCard from './ListingsCard';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import Navbar from './Navbar';
const ListingsGrid = () => {
    const { user } = useAuthStore();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        handleGet();
    }, []);
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            role: user.role,
        }
    };

    const handleDelete = async (id) => {
        try {
            const url = user.role === "admin"
                ? 'http://localhost:3001/api/admin/listings'
                : `http://localhost:3001/api/host/listings`;
            const res = await axios.delete(`${url}/${id}`, config);
            if (res.status === 200) {
                toast.success("Listing Successfully Deleted");
                setListings(prev => prev.filter(listing => listing._id !== id));
            } else {
                toast.error("Listing is unable to delete");
            }
        } catch {
            toast.error("Unable to delete Property List");
        }
    };

    const handleGet = async () => {
        setLoading(true);
        try {
            const url = user.role === "admin"
                ? 'http://localhost:3001/api/admin/listings'
                : (user.role === "host"
                    ? `http://localhost:3001/api/host/listings/${user._id}`
                    : 'http://localhost:3001/api/listings');
            const res = await axios.get(url, config);
            if (res.status === 200) {
                setListings(res.data);
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
        <>
            <Navbar />
            <div className="listings-grid">
                {listings.length > 0 ? (
                    listings.map(listing => (
                        <ListingsCard
                            key={listing._id}
                            listing={listing}
                            onClick={handleCardClick}
                            onBookNow={handleBookNowClick}
                            onDelete={handleDelete}
                            admin={user.role === "admin" || user.role === "host"}
                        />
                    ))
                ) : (
                    <p>No listings available.</p>
                )}
            </div>
        </>
    );
};

export default ListingsGrid;
