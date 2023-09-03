import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import axios from 'axios';

const API_KEY = 'AIzaSyDKycMU1ahS4yX8Sopht57DMG6bQ91RcTg';

const NearbyPlacesScreen = () => {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  useEffect(() => {
    // Fetch nearby places using the Google Places API
    const userLocation = {latitude: 37.7749, longitude: -122.4194}; // Replace with actual user's location
    const radius = 10000; // Radius in meters

    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLocation.latitude},${userLocation.longitude}&radius=${radius}&types=hotel|amusement_park&key=${API_KEY}`;

    axios
      .get(apiUrl)
      .then(response => {
        if (response.data.status === 'OK') {
          console.log(response.data.results.length);
          setNearbyPlaces(response.data.results);
        } else {
          console.error('Error fetching nearby places:', response.data.status);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <View>
      {nearbyPlaces && nearbyPlaces.length > 0 ? (
        <View>
          {nearbyPlaces.map(place => (
            <View key={place.place_id}>
              <Text style={{color: 'black'}}>Name: {place.name}</Text>
              <Text style={{color: 'black'}}>Address: {place.vicinity}</Text>
              <Text style={{color: 'black'}}>
                Type: {place.types.join(', ')}
              </Text>
              <Text style={{color: 'black'}}>Rating: {place.rating}</Text>

              {place.photos && place.photos.length > 0 && (
                <Image
                  source={{
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}`,
                  }}
                  style={{width: 400, height: 300}}
                />
              )}
              {/* Add more details as needed */}
            </View>
          ))}
        </View>
      ) : (
        <Text>Loading nearby places...</Text>
      )}
    </View>
  );
};

export default NearbyPlacesScreen;
