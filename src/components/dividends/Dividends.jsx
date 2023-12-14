import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import endpoints from "../../data/endpoints.json";
import {
    Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'


export default function Dividends() {
    const [dividends, setDividends] = useState([]);
    const [loadingDividends, setLoadingDividends] = useState(false);
    const [loadingError, setLoadingError] = useState(false);
    const [currentDividendsPage, setCurrentDividendsPage] = useState(2);
    const loadMoreButtonRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!loadingDividends) {
            loadMoreButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [loadingDividends]);

    const handleMoreDividends = async () => {
        setLoadingDividends(true)
        const url = endpoints.dividends.url + "?page=" + currentDividendsPage
        try {
            const response = await axios({
                method: "get",
                url: url,
                timeout: 15000
            });
            const uniqueResults = response.data.results.filter(newResult => (
                !dividends.some(existingResult => existingResult.symbol === newResult.symbol)
            ));
            setDividends(prevAlphaDividends => [...prevAlphaDividends, ...uniqueResults]);
            setLoadingError(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoadingDividends(false);
            setLoadingError(true)
        } finally {
            setCurrentDividendsPage(currentDividendsPage + 1)
            setLoadingDividends(false);
        }
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(endpoints.dividends.url);
            const uniqueArray = response.data.results.filter((obj, index, array) => {
                return array.findIndex((item) => item.symbol === obj.symbol) === index;
            });
            setDividends(uniqueArray);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <>
            <div className='mx-2'>
                <Typography className="mb-3" variant="h2">Dividends</Typography>

                <div className="grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-3 grid-cols-1 md:grid-rows-3 md:gap-2 gap-0">
                    {dividends.map((dividend) => (
                        < div key={dividend.id + "_" + dividend.symbol} className="p-4 border rounded-md max-w-sm" >
                            <Typography variant="h5">{dividend.company_name} ({dividend.symbol})</Typography>
                            <Typography className="flex sm:block" variant="paragraph">
                                {dividend.payment_date}
                                <Typography className="self-center ml-1 sm:ml-0" variant="small">(ex
                                    {" "}{dividend.ex_dividend_date})
                                </Typography>
                            </Typography>

                            <span className='flex'>
                                Amount:
                                <Typography className="font-medium ml-1" variant="paragraph">
                                    ${dividend.rate !== null ? dividend.rate : 'N/A'} ({dividend.rate_pct !== null ? dividend.rate_pct : 'N/A'}%)
                                </Typography>
                            </span>
                        </div >
                    ))
                    }
                </div >
            </div >
            <div className='flex justify-center'>

                <button
                    ref={loadMoreButtonRef}
                    disable={loadingDividends ? "true" : undefined}
                    onClick={handleMoreDividends}
                    className="mt-2 flex select-none items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button">

                    {!loadingError ?
                        <>
                            <FontAwesomeIcon className={loadingDividends ? 'animate-spin' : ''} icon={faArrowsRotate} />
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

