import React from 'react';
import { SeachForm } from './SearchForm';

export const Header = () => {    
    return (

        <header className="header">

            <div className="logo">
                
                <img src="https://img.icons8.com/?size=100&id=lIDbCMF329KK&format=png&color=228BE6" alt="Logo" className="logo" />
                <p className="title">Reddit<span>Minimal</span></p>
            </div>
            <SeachForm/>

        </header>

    );
 }

