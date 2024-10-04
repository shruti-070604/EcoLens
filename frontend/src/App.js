// src/App.js
import React, { useState } from 'react';
import BarcodeInput from './components/BarcodeInput';
import ProductDetails from './components/ProductDetails';

function App() {
    const [productData, setProductData] = useState(null);

    return (
        <div className="App">
            <h1>EcoScan</h1>
            <BarcodeInput setProductData={setProductData} />
            <ProductDetails productData={productData} />
        </div>
    );
}

export default App;


