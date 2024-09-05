import Listings from "./views/Listings";
import axios from "axios";
import { useEffect, useState } from "react";
import URL from "../env"

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchListingData = async () => {
            try {
                
                const response = await axios.get(`${URL}/listings`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching listing data:", error);
            }
        };

        // Call the async function
        fetchListingData();
    }, []);
    return (
        <>
            <Listings Data={data} />
        </>
    );
}
