import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, updateInput] = useState({ limit: 5, start: 0 });
  const [coins, updateCoins] = useState([]);

  function updateInputValue(type, value) {
    updateInput({ ...input, [type]: value });
  }

  async function fetchCoins() {
    const { limit, start } = input;
    const data = await API.get(
      "cryptoapi",
      `/coins?limit=${limit}&start=${start}`
    );
    updateCoins(data.coins);
  }

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="App">
      <div>
        <input
          onChange={(e) => updateInputValue("limit", e.target.value)}
          placeholder="limit"
        />
      </div>
      <div>
        <input
          onChange={(e) => updateInputValue("start", e.target.value)}
          placeholder="start"
        />
      </div>
      <div>
        <button onClick={fetchCoins}>Fetch Coins</button>
      </div>

      {coins.map((coin, index) => (
        <div key={index}>
          <h1>
            {coin.name} - {coin.symbol}
          </h1>
          <h5>${coin.price_usd}</h5>
        </div>
      ))}
    </div>
  );
}

export default App;
