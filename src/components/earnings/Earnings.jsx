import React, { useState, useEffect } from 'react';
import axios from 'axios';
import endpoints from "../../data/endpoints.json";

export default function Newsfeed() {
    const [alphaEarnings, setAlphaEarnings] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(endpoints.earnings.alpha_url);
            setAlphaEarnings(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (

        <div className="grid gap-4">
            {alphaEarnings.map((earning) => (
                <div key={earning.id} className="p-4 border rounded-md max-w-sm">
                    <h3 className="text-xl font-bold mb-2">{earning.company_name} ({earning.symbol})</h3>
                    <p className="text-gray-600">{earning.report_date}</p>
                    <p className="text-gray-600">{earning.fiscal_ending}</p>
                    <p className="text-gray-600">{earning.eps_estimate}</p>
                </div >
            ))
            }
        </div >

    );
};

