import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chip, Typography } from "@material-tailwind/react";
import endpoints from "../../data/endpoints.json";

export default function Newsfeed() {
  const [rate, setRate] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoints.riskfreerate.url);
        setRate(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Function to update counter in state and local storage
    const updateCounter = () => {
      const newCounter = counter + 1;
      setCounter(newCounter);
      localStorage.setItem('riskFreeCounter', newCounter);
    };

    // Fetch data initially
    fetchData();

    // Set up interval to fetch data every 30 seconds
    const intervalId = setInterval(() => {
      fetchData();
      updateCounter();
      console.log("Grabbing some new Risk.")
    }, 300000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [counter]);

  return (
    <div className="container m-4 border p-4">
      <h2 className="text-2xl font-bold">Risk Free Rate: {rate.rate}{" "}%</h2>
      <Typography variant="small">(<a href={rate.source}>Source. We use the 10 Year US Treasury</a>)</Typography>
      <Chip className='w-40 p-2' color="blue" value={"Updated at: " + rate.date} />
    </div>
  );
};
