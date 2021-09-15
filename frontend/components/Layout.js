import React from 'react';
import Header from './Header'
import ReactDOM from 'react-dom';


export const Layout = ({ children }) => {

    return (
        <React.Fragment>
            <Header/>
            {children}
        </React.Fragment>
    );
};

