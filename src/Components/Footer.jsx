import React from 'react';
import '../Styles/footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-flex">
                    <div className="footer-column">
                        <h5 className="footer-heading">Airbnb</h5>
                        <ul className="footer-link-list">
                            <li><a href="#!" className="footer-link">About Us</a></li>
                            <li><a href="#!" className="footer-link">Careers</a></li>
                            <li><a href="#!" className="footer-link">Privacy</a></li>
                            <li><a href="#!" className="footer-link">Terms</a></li>
                            <li><a href="#!" className="footer-link">Help</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h5 className="footer-heading">Hosting</h5>
                        <ul className="footer-link-list">
                            <li><a href="#!" className="footer-link">Become a Host</a></li>
                            <li><a href="#!" className="footer-link">Host your home</a></li>
                            <li><a href="#!" className="footer-link">Host an Online Experience</a></li>
                            <li><a href="#!" className="footer-link">Resource Center</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h5 className="footer-heading">Support</h5>
                        <ul className="footer-link-list">
                            <li><a href="#!" className="footer-link">Help Center</a></li>
                            <li><a href="#!" className="footer-link">Cancellation Options</a></li>
                            <li><a href="#!" className="footer-link">Trust & Safety</a></li>
                            <li><a href="#!" className="footer-link">Accessibility</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h5 className="footer-heading">Community</h5>
                        <ul className="footer-link-list">
                            <li><a href="#!" className="footer-link">Diversity & Belonging</a></li>
                            <li><a href="#!" className="footer-link">Airbnb.org</a></li>
                            <li><a href="#!" className="footer-link">Community Center</a></li>
                            <li><a href="#!" className="footer-link">Neighborhood Support</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copyright">
                        <p>&copy; {new Date().getFullYear()} Airbnb, Inc. All rights reserved.</p>
                    </div>
                    <div className="footer-socials">
                        <a href="#!" className="footer-social-icon"><FaFacebookF /></a>
                        <a href="#!" className="footer-social-icon"><FaTwitter /></a>
                        <a href="#!" className="footer-social-icon"><FaInstagram /></a>
                        <a href="#!" className="footer-social-icon"><FaPinterestP /></a>
                        <a href="#!" className="footer-social-icon"><FaLinkedinIn /></a>
                    </div>
                    <div>
                        <select className="footer-select">
                            <option value="en">English (US)</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                        </select>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
