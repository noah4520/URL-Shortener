import axios from 'axios'

export interface FetchReurlUrlParams {
    url: String,
    utm_source: String
}

const headers = {
    'Content-Type': 'application/json',
    'reurl-api-key': '4070ff49d794e13d18543b663c974755ecd1b537909804df8a38b58d65165567c4f5d6'
};
const API_URL: string = 'https://api.reurl.cc/shorten';

export const fetchReurlUrl = async(params: FetchReurlUrlParams) => {
    const response = await axios.post(API_URL, params, { headers });
    return response.data;
}