import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Switch, Typography, Card, CardHeader,
    CardBody,
    CardFooter,
    Button,
    Tooltip
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

import endpoints from "../../data/endpoints.json";

export default function TradeableOptions() {
    const [tradeableOptions, setTradeableOptions] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [filterActiveSwitch, setFilterActiveSwitch] = useState("all");
    const [textSearch, setTextSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    useEffect(() => {
        setFilteredOptions(
            tradeableOptions.filter((option) => {

                let isActive = true;

                switch (filterActiveSwitch) {
                    case "active":
                        isActive = option.active;
                        break;
                    case "inactive":
                        isActive = !option.active;
                        break;
                    default:
                        isActive = true;
                        break;
                }

                const searchableText = option.name + " " + option.symbol
                const matchesTextSearch = textSearch ? searchableText.toLowerCase().includes(textSearch.toLowerCase()) : true;

                // Add more conditions for other filters here

                return isActive && matchesTextSearch;
            })
        );
    }, [filterActiveSwitch, tradeableOptions, textSearch]);

    const handelResetFilter = () => {
        setCurrentPage(1)
        setFilterActiveSwitch("all")
        setTextSearch("")
    }

    const fetchData = async (page) => {
        try {
            let response = {}
            if (page !== 0) {
                response = await axios.get(`${endpoints.plus500.url}?page=${page}`);
                setTotalPages(Math.ceil(response.data.count / response.data.results.length));
                setTradeableOptions(response.data.results);
                setFilteredOptions(response.data.results);
            } else {
                response = await axios.get(`${endpoints.plus500.all_current_url}`);
                setTradeableOptions(response.data);
                setFilteredOptions(response.data);
                setTotalPages(1);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleShowAllOptions = () => {
        setCurrentPage(0);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const onlyActiveFilter = (event) => {
        if (filterActiveSwitch != event.currentTarget.value) {
            setFilterActiveSwitch(event.currentTarget.value)
        }
    };

    const searchFieldHandler = (event) => {
        const value = event.target.value;
        setTextSearch(value);
    };


    const prettyMonth = (mon) => {
        const date = new Date(mon);
        const monthNumber = date.getMonth();
        const monthNames = [
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
        ];

        return monthNames[monthNumber];
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


    return (
        <>

            <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
                    <div className="flex items-center justify-between gap-8 mb-8">
                        <div>
                            <h5
                                className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                Tradeable Options
                            </h5>
                            <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                                See all tradeable options.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
                            <button
                                onClick={handleShowAllOptions}
                                className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                view all
                            </button>
                            <button
                                onClick={handelResetFilter}
                                className="flex select-none items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                <FontAwesomeIcon icon={faArrowsRotate} />
                                Reset
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="block w-full overflow-hidden md:w-max">
                            <nav>
                                <ul role="tablist" className="relative flex flex-row p-1 rounded-lg bg-blue-gray-50 bg-opacity-60">
                                    <li role="tab"
                                        className="relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
                                    >
                                        <button onClick={onlyActiveFilter} value="all" className="z-20 text-inherit">
                                            &nbsp;&nbsp;All&nbsp;&nbsp;
                                        </button>
                                        {filterActiveSwitch == "all" && <div className="absolute inset-0 z-10 h-full bg-white rounded-md shadow"></div>}
                                    </li>
                                    <li role="tab"
                                        className="relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
                                    >
                                        <button onClick={onlyActiveFilter} value="active" className="z-20 text-inherit">
                                            &nbsp;&nbsp;Active&nbsp;&nbsp;
                                        </button>
                                        {filterActiveSwitch == "active" && <div className="absolute inset-0 z-10 h-full bg-white rounded-md shadow"></div>}
                                    </li>
                                    <li role="tab"

                                        className="relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
                                    >
                                        <button onClick={onlyActiveFilter} value="inactive" className="z-20 text-inherit">
                                            &nbsp;&nbsp;Inactive&nbsp;&nbsp;
                                        </button>
                                        {filterActiveSwitch == "inactive" && <div className="absolute inset-0 z-10 h-full bg-white rounded-md shadow"></div>}
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="w-full md:w-72">
                            <div className="relative h-10 w-full min-w-[200px]">
                                <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                        stroke="currentColor" aria-hidden="true" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                                    </svg>
                                </div>
                                <input
                                    value={textSearch}
                                    onInput={searchFieldHandler}
                                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    placeholder=" " />
                                <label
                                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Search
                                </label>
                            </div>
                        </div>

                    </div>
                    <div className='mt-4 ml-4'>
                        <Tooltip className="border border-blue-gray-50 bg-white dark:bg-black px-4 py-3 shadow-xl shadow-black/10" content={
                            <div className="w-80">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal opacity-80 dark:text-white"
                                >
                                    Show only options if a signal is available.
                                </Typography>
                            </div>
                        } placement="right">
                            <Switch label="Show signal" />
                        </Tooltip>
                    </div>
                    <div className='mt-4'>
                        <p>Results {filteredOptions.length}</p>
                    </div>
                </div>
                <div className="p-6 px-0 overflow-scroll">
                    <table className="w-full mt-4 text-left table-auto min-w-max">
                        <thead>
                            <tr>
                                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Contract
                                    </p>
                                </th>
                                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Last Update
                                    </p>
                                </th>
                                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Status
                                    </p>
                                </th>
                                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Expiration Month
                                    </p>
                                </th>
                                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOptions.map((filteredOption) => (
                                <tr key={filteredOption.symbol}>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <div className="flex items-center gap-3">

                                            <div className="flex flex-col">
                                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {filteredOption.name}
                                                </p>
                                                <p
                                                    className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                                                    {filteredOption.symbol}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <div className="flex flex-col">
                                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                {prettyTimestamp(filteredOption.updated_at)}
                                            </p>
                                            <p
                                                className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                                                (Created: {prettyTimestamp(filteredOption.created_at)})
                                            </p>
                                        </div>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <div className="w-max">
                                            {filteredOption.active ?
                                                <div
                                                    className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                                                    <span className="">Active</span>
                                                </div> : <div
                                                    className="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
                                                    <span className="">Inactive</span>
                                                </div>}
                                        </div>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            {prettyMonth(filteredOption.month)}
                                        </p>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <button
                                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                <FontAwesomeIcon icon={faCircleInfo} />


                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
                {currentPage !== 0 && <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrevious}
                            className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>}

            </div >
        </>
    );
};
