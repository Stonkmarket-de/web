import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import endpoints from "../../data/endpoints.json";
import {
    Typography
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'


export default function Signals() {
    const [quickSignals, setQuickSignals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentQuickSignalPage, setCurrentQuickSignalPage] = useState(2);
    const [loadingError, setLoadingError] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);

    const handleMoreSignals = async () => {
        setLoading(true)
        try {
            const response = await axios({
                method: "get",
                url: endpoints.signals.quick + "?page=" + currentQuickSignalPage,
                timeout: 15000
            });

            /*
            leave the code for future filter table build 
            const uniqueResults = response.data.results.filter(newResult => (
                !quickSignals.some(existingResult => existingResult.id === newResult.id)
            ));
            */
            setQuickSignals(prevAlphaEarnings => [...prevAlphaEarnings, ...response.data.results]);
            setLoadingError(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoadingError(true)
        } finally {
            setCurrentQuickSignalPage(currentQuickSignalPage + 1)
            setLoading(false);
        }
    }

    const prettyTimestamp = (timestamp) => {
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    const fetchData = async () => {
        try {
            let baseUrl = endpoints.signals.quick
            let finalUrl = baseUrl + "?score=7"
            const response = await axios.get(finalUrl);
            setQuickSignals(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };
    return (
        <>
            <div className='mx-2'>
                <div className="grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-3 grid-cols-1 md:grid-rows-3 md:gap-2 gap-0">
                    {quickSignals.map((signal) => (
                        <div key={signal.id + "_" + signal.symbol} className="p-4 border rounded-md max-w-sm">
                            <Typography variant="h5">{signal.option}</Typography>
                            <Typography >{signal.score}/{signal.score_max}</Typography>
                            <Typography >{prettyTimestamp(signal.created_at)}</Typography>
                        </div >
                    ))
                    }
                </div >
            </div>
            <div className='flex justify-center'>
                <button
                    disable={loading ? "true" : undefined}
                    onClick={handleMoreSignals}
                    className="mt-2 flex select-none items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button">
                    {!loadingError ?
                        <>
                            <FontAwesomeIcon className={loading ? 'animate-spin' : ''} icon={faArrowsRotate} />
                            Load More
                        </> : <>
                            <FontAwesomeIcon icon={faTriangleExclamation} />
                            Error Loading
                        </>
                    }
                </button>
            </div>


        </>

    );
};

