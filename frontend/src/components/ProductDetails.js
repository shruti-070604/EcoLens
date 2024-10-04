// src/components/ProductDetails.js

import React from 'react';
import SustainabilityDetails from './SustainabilityDetails';

const ProductDetails = ({ productData }) => {
    if (!productData) return null;

    return (
        <div className="product-details">
            <SustainabilityDetails productData={productData} />
        </div>
    );
};

export default ProductDetails;
