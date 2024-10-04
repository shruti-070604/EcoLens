// src/App.js
import React, { useState } from 'react';
import BarcodeInput from './components/BarcodeInput';
import ScanBarcode from './components/scanBarcode';
import ProductDetails from './components/ProductDetails';
import "./App.css"

function App() {
    const [productData, setProductData] = useState(null);

    return (
        <div className="App">
            <h1>EcoScan</h1>
            <ScanBarcode setProductData={setProductData} />
            <BarcodeInput setProductData={setProductData} />
            <ProductDetails productData={productData} />
        </div>
    );
}

export default App;


