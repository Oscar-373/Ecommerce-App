import '../styles/loadingScreen.css'
import React from 'react';
import { Spinner } from 'react-bootstrap'

const LoadingScreen = () => {
    return (
        <div className='overlay'>
            <Spinner animation="grow" variant="info" />
        </div>
    );
};

export default LoadingScreen;