// src/components/Content.js
import React from 'react';
import './Content.css';

const Content = ({ children }) => {
    return (
        <main className="content">
            {children}
        </main>
    );
};

export default Content;
