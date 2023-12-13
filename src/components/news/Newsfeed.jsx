import React, { useState, useEffect } from 'react';
import axios from 'axios';
import endpoints from "../../data/endpoints.json";
import {
    Switch, Typography, Card, CardHeader,
    CardBody,
    CardFooter,
    Button,
    Tooltip
} from "@material-tailwind/react";

export default function Newsfeed() {
    const [articles, setArticles] = useState([]);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
            try {
                const response = await axios.get(endpoints.news.feed);
                setArticles(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Function to update counter in state and local storage
        const updateCounter = () => {
            const newCounter = counter + 1;
            setCounter(newCounter);
            localStorage.setItem('newsCounter', newCounter);
        };
        // Fetch data initially
        fetchData();

        // Set up interval to fetch data every 30 seconds
        const intervalId = setInterval(() => {
            fetchData();
            updateCounter();
            console.log("Grabbing some new News.")
        }, 30000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [counter]);

    return (
        <>
            <div className='mx-2'>
                <Typography className="mb-3" variant="h2">Latest News</Typography>
                <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 grid-cols-1 md:grid-rows-3 md:gap-2 gap-0">
                    {articles.map((article) => (
                        <div key={article.id} className="p-4 border rounded-md max-w-sm">
                            <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                            {article.summary && article.summary.includes('<') ? (
                                <div dangerouslySetInnerHTML={{ __html: article.summary }} />
                            ) : (
                                <p className="text-gray-600">{article.summary}</p>
                            )}
                            <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2">
                                Read more
                            </a>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
};

