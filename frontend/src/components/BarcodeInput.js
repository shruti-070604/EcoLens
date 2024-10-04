// src/components/BarcodeInput.js

import React, { useState } from 'react';
import axios from 'axios';

const BarcodeInput = ({ setProductData }) => {
    const [barcode, setBarcode] = useState(''); // State to hold the barcode input
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setBarcode(event.target.value); // Update barcode state on input change
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!barcode) return; // Ensure barcode is provided

        setLoading(true);
        try {
            // Sending barcode number in the request body
            const response = await axios.post('http://localhost:5000/process-barcode', {
                barcode: barcode,
            });
            setProductData(response.data); // Update the product data with the response
        } catch (error) {
            console.error('Error processing barcode:', error); // Log error in console
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <h2>Enter Product Barcode</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={barcode}
                    onChange={handleInputChange}
                    placeholder="Enter Barcode"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default BarcodeInput;




// // src/components/ImageUpload.js

// import React, { useState } from 'react';
// import axios from 'axios';
// import BarcodeScanner from './BarcodeScanner'; // Import the BarcodeScanner component

// const ImageUpload = ({ setProductData }) => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [barcode, setBarcode] = useState('');
//     const [isScanning, setIsScanning] = useState(false);

//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!selectedFile && !barcode) return;

//         const formData = new FormData();
//         if (selectedFile) {
//             formData.append('image', selectedFile);
//         }

//         setLoading(true);
//         try {
//             // Send barcode if available
//             const response = await axios.post('http://localhost:5000/upload-image', { barcode }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setProductData(response.data);
//         } catch (error) {
//             console.error('Error uploading image or barcode:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDetectedBarcode = (detectedBarcode) => {
//         setBarcode(detectedBarcode);
//         setIsScanning(false); // Stop scanning after successful scan
//     };

//     return (
//         <div>
//             <h2>Upload Product Image or Scan Barcode</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="file" onChange={handleFileChange} accept="image/*" required />
//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Uploading...' : 'Upload'}
//                 </button>
//                 <button type="button" onClick={() => setIsScanning(true)}>
//                     Scan Barcode
//                 </button>
//             </form>
//             {isScanning && (
//                 <div>
//                     <BarcodeScanner onDetected={handleDetectedBarcode} />
//                     <button onClick={() => setIsScanning(false)}>Stop Scanning</button>
//                 </div>
//             )}
//             {barcode && <p>Scanned Barcode: {barcode}</p>}
//         </div>
//     );
// };

// export default ImageUpload;
