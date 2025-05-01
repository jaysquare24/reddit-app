import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { SubReddits } from "./SubReddits";

export const Root = () => {
    return (
        <div className="root-container">
            <Header />
            <main className="content-container">
                <Outlet/> {/* This will render the child routes */}

                <SubReddits />
            </main>
           
        </div>
    );
}