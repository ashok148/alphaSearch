import React from 'react';
import Header from './Header';

const MainLayout = ({ children, search, setSearch }) => {
    return (
        <>
            <Header search={search} setSearch={setSearch}/>
            {children}
        </>
    );
};

export default MainLayout;
