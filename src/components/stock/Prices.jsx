import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import endpoints from "../../data/endpoints.json";
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    Typography
} from "@material-tailwind/react";

const Prices = (props) => {
    const [chartColor, setChartColor] = useState("#121212")
    const [series, setSeries] = useState([{ data: [] }]);
    const [selection, setSelection] = useState('1m');
    const [options, setOptions] = useState({
        chart: {
            id: 'area-datetime',
            type: 'area',
            height: 350,
            zoom: {
                autoScaleYaxis: true,
            },
        },
        stroke: {
            curve: 'straight'
        },
        annotations: {

        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 0,
            style: 'hollow',
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return `$${val.toFixed(2)}`;
                },
            },
        },
        xaxis: {
            type: 'datetime',
            tickAmount: 6,
            labels: {
                formatter: function (value) {
                    return new Date(value).toLocaleDateString();
                },
            },
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100],
            },
        },
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(endpoints.prices.per_symbol + props.symbol);
            const stockPrices = response.data.results;

            if (stockPrices[0].close < stockPrices[stockPrices.length - 1].close) {
                // red
                setChartColor("#F44336")
            } else if (stockPrices[0].close > stockPrices[stockPrices.length - 1].close) {
                // green 
                setChartColor("#1DDE7D")
            } else {
                // black
                setChartColor("#121212")
            }

            const dataPoints = stockPrices.map(item => ({
                x: new Date(item.date_of).getTime(),
                y: item.close,
            })).reverse();

            setSeries([
                {
                    name: "Close",
                    data: dataPoints,
                },
            ]);

            setOptions({
                ...options,
                colors: [chartColor],
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const updateData = async (timeline) => {
        setSelection(timeline);
        try {
            const response = await axios.get(endpoints.prices.per_symbol + props.symbol);
            let dataPoints;
            const stockPrices = response.data.results;

            if (stockPrices[0].close < stockPrices[stockPrices.length - 1].close) {
                // red
                setChartColor("#F44336")
            } else if (stockPrices[0].close > stockPrices[stockPrices.length - 1].close) {
                // green 
                setChartColor("#1DDE7D")
            } else {
                // black
                setChartColor("#121212")
            }

            switch (timeline) {
                case '1m':
                    dataPoints = stockPrices
                        .slice(-30)
                        .map(item => ({
                            x: new Date(item.date_of).getTime(),
                            y: item.close,
                        }));

                    setOptions({
                        ...options,
                        colors: [chartColor],
                    });

                    break;
                case '6m':
                    // Update dataPoints based on your logic for six months
                    break;
                case '1y':
                    // Update dataPoints based on your logic for one year
                    break;
                case 'ytd':
                    // Update dataPoints based on your logic for YTD
                    break;
                case 'all':
                    // Update dataPoints based on your logic for all
                    break;
                default:

            }

            setSeries([
                {
                    name: "Close",
                    data: dataPoints,
                },
            ]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <Card className="m-2">
            <CardBody className="pt-2 px-2 pb-0">
                <div className="toolbar ml-2">
                    <Typography className="mb-3" variant="h4">
                        {props.symbol} Chart
                    </Typography>
                    <ButtonGroup
                        size="sm"
                        variant="outlined"
                    >
                        <Button
                            id="one_month"
                            className={selection === '1m' ? 'bg-gray-800 text-white' : ''}
                            onClick={() => updateData('1m')}>
                            1M
                        </Button>
                        <Button
                            id="six_months"
                            className={selection === '6m' ? 'bg-gray-800 text-white' : ''}
                            onClick={() => updateData('6m')}>
                            6M
                        </Button>
                        <Button
                            id="one_year"
                            className={selection === '1y' ? 'bg-gray-800 text-white' : ''}
                            onClick={() => updateData('1y')}>
                            1Y
                        </Button>
                        <Button
                            id="ytd"
                            className={selection === 'ytd' ? 'bg-gray-800 text-white' : ''}
                            onClick={() => updateData('ytd')}>
                            YTD
                        </Button>
                        <Button
                            id="all"
                            className={selection === 'all' ? 'bg-gray-800 text-white' : ''}
                            onClick={() => updateData('all')}>
                            ALL
                        </Button>
                    </ButtonGroup>
                </div>

                <div id="chart-timeline">
                    <Chart options={options} series={series} type="area" height={350} />
                </div>
            </CardBody>
        </Card>


    );
};

export default Prices;
