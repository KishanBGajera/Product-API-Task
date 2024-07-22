import React from 'react';
import Header from './components/HeaderComponent';
import FilterComponent from './components/FilterComponent';
import ProductDisplay from './components/ProductsDisplay';
import { useState } from 'react';
// import dotenv from "dotenv";

// dotenv.config({
//     path: '../../.env'
// });

// const BASE_URL='https://3cceys-5173.ocws.app/api'

const App = () => {
    const [filters, setFilters] = useState({
        company: "All",
        category: "All",
        topNProducts: 10,
        availability: "yes",
        min: 0,
        max: 100000
    });

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-4">
                {/* {console.log(process.envBASE_URL)} */}
                <FilterComponent filters={filters} setFilters={setFilters} />
            </div>
            <div className="container mx-auto p-4">
                <ProductDisplay filters={filters} />
            </div>
        </div>
    );
};

export default App;
