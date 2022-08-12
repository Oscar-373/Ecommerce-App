import React from 'react';
import '../styles/footer.css'

const Footer = () => {
    return (
        <footer>
            <div className='text'>
                <h4>© Academlo 2022</h4>
            </div>
            <div className='social'>
                    <a href="https://www.instagram.com/academlohq/">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://www.linkedin.com/company/academlo/">
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                    <a href="https://www.youtube.com/c/academlo">
                        <i className="fa-brands fa-youtube"></i>
                    </a>
            </div>
        </footer>
    );
};

export default Footer;