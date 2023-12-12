import React, { useState, useEffect } from 'react';
import axios from 'axios';
import endpoints from "../../data/endpoints.json";

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
        <div className="container m-6">
            <h2 className="text-2xl font-bold mb-4">Latest News</h2>

            <ul className="grid grid-cols-1 gap-4">
                {articles.map((article) => (
                    <li key={article.id} className="p-4 border rounded-md w-96 text-clip overflow-hidden">
                        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                        {article.summary && article.summary.includes('<') ? (
                            <div dangerouslySetInnerHTML={{ __html: article.summary }} />
                        ) : (
                            <p className="text-gray-600">{article.summary}</p>
                        )}
                        <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2">
                            Read more
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

