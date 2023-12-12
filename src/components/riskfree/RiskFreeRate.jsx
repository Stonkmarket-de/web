import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Tooltip
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import endpoints from "../../data/endpoints.json";



export default function Newsfeed() {
    const [rates, setRates] = useState([]);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(endpoints.riskfreerate.all_rates);
            setRates(response.data.results.map(item => (item.rate)).reverse());
            setDates(response.data.results.map(item => (item.date)).reverse());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const chartConfig = {
        type: "line",
        height: 240,
        series: [
            {
                name: "Rates",
                data: rates,
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: "",
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#020617"],
            stroke: {
                lineCap: "round",
                curve: "smooth",
            },
            markers: {
                size: 0,
            },
            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                categories: dates,
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",
            },
        },
    };

    return (
        <Card className="md:w-6/12 lg:w-4/12 m-2">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
                <div>
                    <Typography variant="h6" color="blue-gray">
                        Current risk free rate {rates[rates.length - 1]} %
                    </Typography>
                    <Tooltip
                        animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                        }}
                        className="border border-blue-gray-50 bg-white dark:bg-black px-4 py-3 shadow-xl shadow-black/10" content={
                            <div className="w-80">
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="max-w-sm font-normal mt-2"
                                >
                                    &quot;The risk-free rate of return, usually shortened to the risk-free rate, is the rate of return of a hypothetical investment with scheduled payments over a fixed period of time that is assumed to meet all payment obligations.&quot;
                                    <p>- Source: <a href="https://en.wikipedia.org/wiki/Risk-free_rate">Wikpedia</a></p>
                                </Typography>
                            </div>
                        } placement="bottom">
                        <Typography
                            variant="small"
                            color="gray"
                            className="max-w-sm font-normal"
                        >
                            We use the U.S. 10 Year Treasury yield as risk free rate.

                        </Typography>
                    </Tooltip>
                </div>
            </CardHeader>
            <CardBody className="pt-2 px-2 pb-0">
                <Chart {...chartConfig} />
            </CardBody>
        </Card>
    );
}