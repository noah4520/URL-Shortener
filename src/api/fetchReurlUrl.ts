import axios from 'axios'

export interface FetchReurlUrlParams {
  url: String,
  utm_source: String
}

const headers = {
  'Content-Type': 'application/json',
  'reurl-api-key': import.meta.env.VITE_REURL_API_KEY
};
const API_URL: string = 'https://api.reurl.cc/shorten';

export const fetchReurlUrl = async(params: FetchReurlUrlParams) => {
  const response = await axios.post(API_URL, params, { headers });
  return response.data;
}