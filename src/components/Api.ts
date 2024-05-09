import axios, { AxiosResponse } from 'axios';

const accessKey = '1oFQYXO4_c0t5VKPs6QnPh6JnLV9CUwbmdii7fvR1zY';

axios.defaults.baseURL = 'https://api.unsplash.com/';
axios.defaults.headers.common['Authorization'] = `Client-ID ${accessKey}`;
axios.defaults.headers.common['Accept-Version'] = 'v1';

interface ImageData {
  id: string;
  alt_description: string;
  likes: number;
  user: {
    name: string;
    location: string | null;
    links: {
      html: string;
    };
  };
  urls: {
    small: string;
    regular: string;
  };
}

interface ResponseData {
  results: ImageData[];
  total: number;
}

async function fetchImages(searchingText: string, page = 1): Promise<ResponseData> {
  const response: AxiosResponse<ResponseData> = await axios.get('/search/photos', {
    params: {
      query: searchingText,
      per_page: 9,
      page,
      order_by: 'popular',
      orientation: 'landscape',
    },
  });
  return response.data;
}

export default fetchImages;
