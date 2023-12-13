import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import endpoints from "../../data/endpoints.json";
import {
    Button,
    ButtonGroup,
} from "@material-tailwind/react";

const Prices = () => {
    useEffect(() => {
        fetchData(); // Call fetchData when the component mounts
    }, []);

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

    const [series, setSeries] = useState([
        {
            data: [
                // ... your data
            ],
        },
    ]);

    const fetchData = async () => {
        try {
            const response = await axios.get(endpoints.prices.per_symbol + "MSFT");
            const dataPoints = response.data.results.map(item => ({
                x: new Date(item.date_of).getTime(),
                y: item.close,
            })).reverse();

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

    const [selection, setSelection] = useState('one_month');

    const updateData = async (timeline) => {
        setSelection(timeline);

        try {
            const response = await axios.get(endpoints.prices.per_symbol + "MSFT");
            let dataPoints;

            switch (timeline) {
                case 'one_month':
                    dataPoints = response.data.results
                        .slice(-30)
                        .map(item => ({
                            x: new Date(item.date_of).getTime(),
                            y: item.close,
                        }));
                    setOptions({
                        ...options,
                        title: {
                            text: "MSFT",
                            align: 'left'
                        },
                    });
                    break;
                case 'six_months':
                    // Update dataPoints based on your logic for six months
                    break;
                case 'one_year':
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
        <div id="chart">
            <div className="toolbar">
                <ButtonGroup size="sm" variant="outlined">
                    <Button
                        id="one_month"
                        className={selection === 'one_month' ? 'active' : ''}
                        onClick={() => updateData('one_month')}>
                        1M
                    </Button>
                    <Button
                        id="six_months"
                        className={selection === 'six_months' ? 'active' : ''}
                        onClick={() => updateData('six_months')}>
                        6M
                    </Button>
                    <Button
                        id="one_year"
                        className={selection === 'one_year' ? 'active' : ''}
                        onClick={() => updateData('one_year')}>
                        1Y
                    </Button>
                    <Button
                        id="ytd"
                        className={selection === 'ytd' ? 'active' : ''}
                        onClick={() => updateData('ytd')}>
                        YTD
                    </Button>
                    <Button
                        id="all"
                        className={selection === 'all' ? 'active' : ''}
                        onClick={() => updateData('all')}>
                        YTD
                    </Button>
                </ButtonGroup>
            </div>

            <div id="chart-timeline">
                <Chart options={options} series={series} type="area" height={350} />
            </div>
        </div>
    );
};

export default Prices;
