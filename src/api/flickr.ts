import axios from 'axios';

// API Key from environment variables
const API_KEY = import.meta.env.VITE_FLICKR_API_KEY as string;
const BASE_URL = 'https://api.flickr.com/services/rest/';

export interface Photo {
    id: string;
    secret: string;
    server: string;
    farm: number;
    title: string;
    owner: string;
    tags: string[];  
    width: number;  
    height: number;  
  }
  
  interface FlickrResponse {
    photos: {
      page: number;
      pages: number;
      perpage: number;
      total: number;
      photo: Photo[];
    };
  }
  
// Function to get recent images
export const getRecentImages = async (page = 1): Promise<FlickrResponse> => {
  const response = await axios.get(BASE_URL, {
    params: {
      method: 'flickr.photos.getRecent',
      api_key: API_KEY,
      page: page,
      per_page: 10,
      format: 'json',
      nojsoncallback: 1,
    },
  });
  return response.data;
};

// Function to search for images
export const searchImages = async (page = 1, query: string = ''): Promise<FlickrResponse> => {
  const response = await axios.get(BASE_URL, {
    params: {
      method: 'flickr.photos.search',
      api_key: API_KEY,
      text: query,
      page: page,
      per_page: 10,
      format: 'json',
      nojsoncallback: 1,
    },
  });
  return response.data;
};

// Function to get image URL
export const getImageUrl = (photo: Photo): string => {
  return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`;
};
