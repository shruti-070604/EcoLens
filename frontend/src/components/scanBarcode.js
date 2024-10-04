import React, { useState } from 'react';
import axios from 'axios';

const ScanBarcode = ({ setProductData }) => {  // Change the name to start with an uppercase letter
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      try {
        const codeReader = new window.ZXing.BrowserBarcodeReader(); // Access the ZXing library through the window object
        const result = await codeReader.decodeFromImageUrl(imageUrl);
        setResult(result.text);
        setError('');

        // Proceed to submit the barcode to the backend
        await handleSubmit(result.text);
      } catch (err) {
        setError(`Error: ${err}`);
        setResult('');
      }
    }
  };

  const handleSubmit = async (barcode) => {
    if (!barcode) return; // Ensure barcode is provided

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/process-barcode', {
        barcode: barcode,
      });
      setProductData(response.data);// Update the result with the response data
    } catch (error) {
      console.error('Error processing barcode:', error);
      setError('Error processing barcode.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <h1>Upload a Barcode Image</h1>
    <input type="file" accept="image/*" onChange={handleFileChange} />
    {loading && <p>Loading...</p>}
    {result && <p>Decoded Barcode: {result}</p>} {/* Display the decoded result */}
    {error && <p style={{ color: 'red' }}>{error}</p>}
  </div>
  );
};

export default ScanBarcode;
