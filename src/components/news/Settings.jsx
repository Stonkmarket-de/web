import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, List, ListItem, Card, Checkbox } from "@material-tailwind/react";

import endpoints from "../../data/endpoints.json";

export default function Settings() {
    const [sites, setSites] = useState([]);

    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {

            try {
                const response = await axios.get(endpoints.news.sources);
                setSites(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="container m-6">
                <h2 className="text-2xl font-bold mb-4">Sources</h2>
                <Card className="">
                    <List>
                        {sites.map((site) => (
                            <ListItem key={site.id}>
                                <Checkbox defaultChecked
                                    label={site.inactive && "Inactive"}
                                />
                                <Input label={site.title} defaultValue={site.url} />
                            </ListItem>
                        ))}
                    </List>
                </Card>
            </div>
        </>

    );
};
