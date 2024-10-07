import React from 'react';
import '../Styles//HorizontalScrollList.css'; 

import { FaUmbrellaBeach, FaTree, FaStar, FaMoneyBillAlt, FaUsers, FaDog, FaCoffee, FaHome, FaMountain, FaHeart, FaSwimmer, FaFire, FaSkiing, FaHiking, FaPlane } from 'react-icons/fa';

const categories = [
    { name: 'All', category: '', icon: <FaHome className="categorytext" /> },
    { name: 'Beachfront', category: 'Beachfront', icon: <FaUmbrellaBeach className='categorytext' /> },
    { name: 'Cabins', category: 'Cabins', icon: <FaTree className='categorytext' /> },
    { name: 'Trending', category: 'Trending', icon: <FaStar className='categorytext' /> },
    { name: 'Luxury', category: 'Luxury', icon: <FaMoneyBillAlt className='categorytext' /> },
    { name: 'Budget', category: 'Budget', icon: <FaMoneyBillAlt className='categorytext' /> },
    { name: 'Family', category: 'Family-Friendly', icon: <FaUsers className='categorytext' /> },
    { name: 'Farms', category: 'Pet-Friendly', icon: <FaDog className='categorytext' /> },
    { name: 'Unique', category: 'Unique Stays', icon: <FaCoffee className='categorytext' /> },
    { name: 'Romantic', category: 'Romantic Getaways', icon: <FaHeart className='categorytext' /> },
    { name: 'Adventure', category: 'Adventure', icon: <FaMountain className='categorytext' /> },
    { name: 'Swimming', category: 'Swimming', icon: <FaSwimmer className='categorytext' /> },
    { name: 'Camping', category: 'Camping', icon: <FaFire className="categorytext" /> },
    { name: 'Skiing', category: 'Skiing', icon: <FaSkiing className="categorytext" /> },
    { name: 'Hiking', category: 'Hiking', icon: <FaHiking className="categorytext" /> },
    { name: 'Flights', category: 'Flights', icon: <FaPlane className="categorytext" /> },
];
const HorizontalScrollList = ({ setCategory }) => {
    return (
        <div className="horizontal-scroll-list no-scrollbar">
            {categories.map((category, index) => (
                <button
                    key={index}
                    onClick={() => setCategory(category.category)}
                    className="horizontal-scroll-item"
                >
                    {category.icon}
                    <p>{category.name}</p>
                </button>
            ))}
        </div>
    );
};


export default HorizontalScrollList;
