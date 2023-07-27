import './styles.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fetchPrices = async (apiKey) => {
  const bitcoinEndpoint = 'https://rest.coinapi.io/v1/exchangerate/BTC/USD';
  const ethereumEndpoint = 'https://rest.coinapi.io/v1/exchangerate/ETH/USD';
  const solanaEndpoint = 'https://rest.coinapi.io/v1/exchangerate/SOL/USD';

  try {
    const headers = {
      'X-CoinAPI-Key': apiKey
    };

    // Use Promise.all() to fetch both Bitcoin and Ethereum prices simultaneously
    const [bitcoinResponse, ethereumResponse, solanaResponse] = await Promise.all([
      axios.get(bitcoinEndpoint, { headers }),
      axios.get(ethereumEndpoint, { headers }),
      axios.get(solanaEndpoint, { headers })
    ]);

    const bitcoinData = bitcoinResponse.data;
    const bitcoinPrice = bitcoinData.rate; // Adjust this based on the actual API response structure

    const ethereumData = ethereumResponse.data;
    const ethereumPrice = ethereumData.rate; // Adjust this based on the actual API response structure

    const solanaData = solanaResponse.data;
    const solanaPrice = solanaData.rate; // Adjust this based on the actual API response structure

    return { bitcoinPrice, ethereumPrice, solanaPrice };
  } catch (error) {
    console.error('Error fetching prices:', error);
    return null;
  }
};

const App = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [ethereumPrice, setEthereumPrice] = useState(null);
  const [solanaPrice, setSolanaPrice] = useState(null);

  useEffect(() => {
    const apiKey = '7CFA283B-3173-4255-ADF1-E0BDF5980FC5';

    const fetchData = async () => {
      const { bitcoinPrice, ethereumPrice, solanaPrice } = await fetchPrices(apiKey);
      setBitcoinPrice(bitcoinPrice);
      setEthereumPrice(ethereumPrice);
      setSolanaPrice(solanaPrice);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Bitcoin, Ethereum, and Solana Price Display</h1>
      <div className="price-card">
        {bitcoinPrice !== null ? <h2>Bitcoin Price</h2> : null}
        {bitcoinPrice !== null ? <p>${bitcoinPrice.toFixed(2)}</p> : <p>Loading...</p>}
      </div>
      <div className="price-card">
        {ethereumPrice !== null ? <h2>Ethereum Price</h2> : null}
        {ethereumPrice !== null ? <p>${ethereumPrice.toFixed(2)}</p> : <p>Loading...</p>}
      </div>
      <div className="price-card">
        {solanaPrice !== null ? <h2>Solana Price</h2> : null}
        {solanaPrice !== null ? <p>${solanaPrice.toFixed(2)}</p> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default App;