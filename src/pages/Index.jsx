import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [stockData, setStockData] = useState([]);
  const [symbol, setSymbol] = useState("AAPL");

  useEffect(() => {
    fetchStockData(symbol);
  }, [symbol]);

  const fetchStockData = async (symbol) => {
    try {
      const response = await fetch(
        `https://api.example.com/stock/${symbol}/chart`
      );
      const data = await response.json();
      setStockData(data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const handleFetchData = () => {
    fetchStockData(symbol);
  };

  const chartData = {
    labels: stockData.map((data) => data.date),
    datasets: [
      {
        label: "Stock Price",
        data: stockData.map((data) => data.close),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-4">
      <Card className="w-3/4">
        <CardHeader>
          <CardTitle>Stock Technical Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              value={symbol}
              onChange={handleSymbolChange}
              placeholder="Enter stock symbol"
            />
            <Button onClick={handleFetchData}>Fetch Data</Button>
          </div>
          <Line data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;