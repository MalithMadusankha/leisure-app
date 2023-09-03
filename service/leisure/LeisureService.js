import api from "./api";
import axios from "axios";

const API_KEY = "AIzaSyCmbM6cGKVeJ6wA8IoddQDgz2u1ZB9rOKE";
// This function is used to get the places from the backend
async function getPlaces(location_map) {
  try {
    console.log("location_map", location_map);
    console.log("ee", `/places/${location_map}`);
    let res = await api.get(`/places/${location_map}`);
    return res;
    // Process the response data
  } catch (error) {
    if (error.isAxiosError && !error.response) {
      // This is a network error, handle it here
      console.error("Network Error:", error.message);
    } else {
      // Handle other types of errors (e.g., server errors)
      console.error("Request Error:", error.message);
    }
    throw error; // Rethrow the error after handling
  }
}

export const getLoacationPlaces = async (query, location_map) => {
  try {
    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${location_map}&radius=10000&key=${API_KEY}`;
    let res = await axios.get(url);
    return res.data.results;
    // Process the response data
  } catch (error) {
    if (error.isAxiosError && !error.response) {
      // This is a network error, handle it here
      console.error("Network Error:", error.message);
    } else {
      // Handle other types of errors (e.g., server errors)
      console.error("Request Error:", error.message);
    }
    throw error; // Rethrow the error after handling
  }
};

export const saveFavorite = async (place) => {
  try {
    // createing photo_reference array
    let photo_reference = [];
    place.photos.forEach((element) => {
      photo_reference.push(element.photo_reference);
    });

    let insertObj = {
      place_id: place.place_id,
      name: place.name,
      address: place.formatted_address,
      rating: place.rating,
      photo_ref: photo_reference,
      lat: place.geometry.location.lat.toString(),
      lng: place.geometry.location.lng.toString(),
      type: place.types,
      leisure_type: "adveture",
    };

    let res = await api.post("/favourite", insertObj);
    return res;
  } catch (error) {
    if (error.isAxiosError && !error.response) {
      // This is a network error, handle it here
      console.error("Network Error:", error.message);
    } else {
      // Handle other types of errors (e.g., server errors)
      console.error("Request Error:", error.message);
    }
    throw error; // Rethrow the error after handling
  }
};

export const getFavorite = async () => {
  try {
    let res = await api.get("/favourites");
    // console.log("res", res.data);
    return res;
  } catch (error) {
    if (error.isAxiosError && !error.response) {
      // This is a network error, handle it here
      console.error("Network Error:", error.message);
    } else {
      // Handle other types of errors (e.g., server errors)
      console.error("Request Error:", error.message);
    }
    throw error; // Rethrow the error after handling
  }
};

export const getPlaceDetails = async (place_id) => {
  console.log("call ===>> place_id", place_id);
  let fields =
    "name,formatted_address,type,photo,review,user_ratings_total,geometry";
  try {
    url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}=${fields}&key=${API_KEY}`;
    let res = await axios.get(url);
    // console.log("res g :", res.data.reuslt);
    return res;
    // Process the response data
  } catch (error) {
    if (error.isAxiosError && !error.response) {
      // This is a network error, handle it here
      console.error("Network Error:", error.message);
    } else {
      // Handle other types of errors (e.g., server errors)
      console.error("Request Error:", error.message);
    }
    throw error; // Rethrow the error after handling
  }
};

export const createActivity = async (activity) => {
  try {
    let res = await api.post("/activity", activity);
    // console.log("res", res);
    return res;
  } catch (error) {
    if (error.isAxiosError && !error.response) {
      // This is a network error, handle it here
      console.error("Network Error:", error.message);
    } else {
      // Handle other types of errors (e.g., server errors)
      console.error("Request Error:", error.message);
    }
    throw error; // Rethrow the error after handling
  }
};

export const getActivityAll = async () => {
  try {
    let res = await api.get("/activity");
    return res.data;
  } catch (error) {
    if (error.isAxiosError && !error.response) {
      // This is a network error, handle it here
      console.error("Network Error:", error.message);
    } else {
      // Handle other types of errors (e.g., server errors)
      console.error("Request Error:", error.message);
    }
    throw error; // Rethrow the error after handling
  }
};

export const updateActivity = async (id, activity) => {
  try {
    let res = await api.put(`/activity/${id}`, activity);
    // console.log("res", res);
    return res;
  } catch (error) {
    if (error.isAxiosError && !error.response) {
      // This is a network error, handle it here
      console.error("Network Error:", error.message);
    } else {
      // Handle other types of errors (e.g., server errors)
      console.error("Request Error:", error.message);
    }
    throw error; // Rethrow the error after handling
  }
};

export const sendMessages = async (chat) => {
  try {
    console.log("call ==> chat", chat);
    let res = await api.post("/chatbot", chat);

    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getChats = async () => {
  try {
    let res = await api.get("/chatbot");
    data = res.data;

    return data;
  } catch (error) {
    if (error.isAxiosError && !error.response) {
      // This is a network error, handle it here
      console.error("Network Error:", error.message);
    } else {
      // Handle other types of errors (e.g., server errors)
      console.error("Request Error:", error.message);
    }
    throw error; // Rethrow the error after handling
  }
};

export const getRecormmend = async (location_map, gqery) => {
  try {
    let res = await api.get(`/recommend/${location_map}?query=${gqery}`);
    data = res.data;
    // console.log("data", data);
    return data;
  } catch (error) {
    if (error.isAxiosError && !error.response) {
      // This is a network error, handle it here
      console.error("Network Error:", error.message);
    } else {
      // Handle other types of errors (e.g., server errors)
      console.error("Request Error:", error.message);
    }
    throw error; // Rethrow the error after handling
  }
};

export default getPlaces;
