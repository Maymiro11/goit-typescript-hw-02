import axios from "axios";

const accessKey = "1oFQYXO4_c0t5VKPs6QnPh6JnLV9CUwbmdii7fvR1zY";

axios.defaults.baseURL = "https://api.unsplash.com/";
axios.defaults.headers.common["Authorization"] = `Client-ID ${accessKey}`;
axios.defaults.headers.common["Accept-Version"] = `v1`;

async function fetchImages(searchingText, page = 1) {
    
    const response = await axios.get("/search/photos", {
        params: {
        query: searchingText,
        per_page: 9,
        page,
        order_by: "popular",
        orientation: "landscape",
        },
    });
    console.log(response);
    return response.data;
    
    }

export default fetchImages;

