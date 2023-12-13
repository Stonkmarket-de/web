import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from "react-apexcharts";

import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Tooltip
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
            response.data.storage_total = parseFloat(response.data.storage_total.toFixed(2))
            response.data.storage_free = parseFloat(response.data.storage_free.toFixed(2))
            response.data.ram_used = parseFloat(response.data.ram_used.toFixed(2))
            response.data.ram_total = parseFloat(response.data.ram_total.toFixed(2))
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
            colors: ['#000000'],
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
            colors: ['#000000'],
            labels: ['Storage'],
        },
    };
    return (
        <>
            <div className='flex'>
                <Card className="md:w-6/12 lg:w-4/12 m-2">
                    <CardBody className="pt-2 px-2 pb-0">
                        <Chart {...chartConfig} />
                        <Typography className='text-center'>
                            {storage.storage_total} GB / {storage.storage_free} GB
                        </Typography>
                    </CardBody>
                </Card>
                <Card className="md:w-6/12 lg:w-4/12 m-2">
                    <CardBody className="pt-2 px-2 pb-0">
                        <Chart {...ramChart} />
                        <Typography className='text-center'>
                            {storage.ram_used} GB / {storage.ram_total} GB
                        </Typography>
                    </CardBody>
                </Card>
            </div >
        </>
    );
}
