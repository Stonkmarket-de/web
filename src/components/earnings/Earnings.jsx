import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import endpoints from "../../data/endpoints.json";
import {
    Switch, Typography, Card, CardHeader,
    CardBody,
    CardFooter,
    Button,
    Tooltip
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'


export default function Earnings() {
    const [alphaEarnings, setAlphaEarnings] = useState([]);
    const [loadingEarnings, setLoadingEarnings] = useState(false);
    const [currentEarningsPage, setCurrentEarningsPage] = useState(2);
    const loadMoreButtonRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!loadingEarnings) {
            loadMoreButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [loadingEarnings]);

    const handleMoreEarnings = async () => {
        setLoadingEarnings(true)
        try {

            const response = await axios.get(endpoints.earnings.url + "?page=" + currentEarningsPage);
            const uniqueResults = response.data.results.filter(newResult => (
                !alphaEarnings.some(existingResult => existingResult.id === newResult.id)
            ));
            setAlphaEarnings(prevAlphaEarnings => [...prevAlphaEarnings, ...uniqueResults]);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {

            setCurrentEarningsPage(currentEarningsPage + 1)
            setLoadingEarnings(false);
        }
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(endpoints.earnings.url);
            setAlphaEarnings(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <>
            <div className='mx-2'>
                <Typography className="mb-3" variant="h2">Earnings Data</Typography>

                <div className="grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-3 grid-cols-1 md:grid-rows-3 md:gap-2 gap-0">
                    {alphaEarnings.map((earning) => (
                        <div key={earning.id + "_" + earning.symbol} className="p-4 border rounded-md max-w-sm">
                            <Typography variant="h5">{earning.company_name} ({earning.symbol})</Typography>
                            <Typography className="flex sm:block" variant="paragraph">
                                {earning.report_date}
                                <Typography className="self-center ml-1 sm:ml-0" variant="small">(for Q ending
                                    {" "}{earning.fiscal_ending})
                                </Typography>
                            </Typography>

                            <span className='flex'>
                                EPS estimate:
                                <Typography className="font-medium ml-1" variant="paragraph" color={earning.eps_estimate > 0 ? "green" : "red"}>
                                    {earning.eps_estimate !== null ? earning.eps_estimate : 'N/A'}
                                </Typography>
                            </span>
                        </div >
                    ))
                    }
                </div >
            </div>
            <div className='flex justify-center'>
                <button
                    ref={loadMoreButtonRef}
                    disable={loadingEarnings ? "true" : undefined}
                    onClick={handleMoreEarnings}
                    className="mt-2 flex select-none items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button">
                    <FontAwesomeIcon className={loadingEarnings ? 'animate-spin' : ''} icon={faArrowsRotate} />
                    Load More
                </button>
            </div>


        </>

    );
};

