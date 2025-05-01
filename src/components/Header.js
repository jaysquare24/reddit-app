import React from 'react';
import { SearchForm } from './SearchForm';

export const Header = () => {    
    return (

        <header className="header">

            <div className="reddit-logo">    
                <img src="https://img.icons8.com/?size=100&id=lIDbCMF329KK&format=png&color=228BE6" alt=" Reddit Logo" className=" logo" />
                <p className="title">Reddit<span>Minimal</span></p>
            </div>
            <SearchForm />

        </header>

    );
 }

