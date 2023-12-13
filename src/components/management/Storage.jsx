import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from "react-apexcharts";
import {
    Typography
} from "@material-tailwind/react";

import endpoints from "../../data/endpoints.json";

export default function Storage() {
    const [storage, setStorage] = useState({});
    const [loadingState, setLoadingState] = useState(false);

    useEffect(() => {
        fetchData();
        // Fetch data every 10 seconds
        const intervalId = setInterval(() => {
            fetchData();
        }, 10000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);

    const fetchData = async () => {
        try {
            setLoadingState(true);
            const response = await axios.get(endpoints.settings.storage);
            setStorage(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoadingState(false);
        }
    };

    const ramChart = {
        height: 250,
        type: "radialBar",
        series: [((storage.ram_used / storage.ram_total) * 100).toFixed(2)],
        options: {
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '70%',
                    }
                },
            },
            colors: ['#39539E'],
            labels: ['RAM'],
        },
    };

    const chartConfig = {
        height: 250,
        type: "radialBar",
        series: [storage.storage_used_pct],
        options: {

            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '70%',
                    }
                },
            },
            colors: ['#39539E'],
            labels: ['Storage'],
        },
    };
    return (
        <>
            <div className='flex'>


                <div>
                    <Chart {...chartConfig} />
                    <Typography className='text-center'>
                        {storage.storage_total} GB / {storage.storage_free} GB
                    </Typography>
                </div>

                <div className=''>
                    <Chart {...ramChart} />
                    <Typography className='text-center'>
                        {storage.ram_used} GB / {storage.ram_total} GB
                    </Typography>
                </div>

            </div >
        </>
    );
}
