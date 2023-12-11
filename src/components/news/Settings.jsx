import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, List, ListItem, Card } from "@material-tailwind/react";


export default function Settings() {
    const [sites, setSites] = useState([]);

    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.stonkmarket.de/api/v1/news/sites/');
                setSites(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (

        <Card className="w-96">
            <List>
                {sites.map((site) => (
                    <ListItem key={site.id}><Input label={site.title} defaultValue={site.url} /></ListItem>
                ))}
            </List>
        </Card>


    );
};
