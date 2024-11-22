import React, { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
// import { fetchRestaurants } from './path/to/RestaurantService'; // Adjust the path to your actual service
import './RestaurantList.css';

// Define the restaurant data locally
const restaurantsData = {
  Hyderabad: [
    { id: 1, name: 'Bawarchi', image: 'https://tse4.mm.bing.net/th?id=OIP.573mKKetKpPydvG96qnOuAAAAA&pid=Api&P=0&h=180', description: 'Famous Biryani Spot', rating: 4.5 },
    { id: 2, name: 'Paradise', image: 'https://tse3.mm.bing.net/th?id=OIP.Rj1WYe28mESqtFfAnNbSLgHaEu&pid=Api&P=0&h=180', description: 'Best Hyderabadi Biryani', rating: 4.7 },
    { id: 3, name: 'Shadab', image: 'https://tse4.mm.bing.net/th?id=OIP.W_WW28oJwffRAejlU6-R2gAAAA&pid=Api&P=0&h=180', description: 'Authentic Hyderabadi Food', rating: 4.4 },
    { id: 4, name: 'Cafe Bahar', image: 'https://tse4.mm.bing.net/th?id=OIP.JiZK8dSE_8PC1xsy39KGbQHaDr&pid=Api&P=0&h=180', description: 'Popular Biryani Joint', rating: 4.2 },
    { id: 5, name: 'Ohri’s', image: 'https://tse4.mm.bing.net/th?id=OIP.f_oenXgDg8QwGbkDhbHCUAHaEK&pid=Api&P=0&h=180', description: 'Fine Dining Experience', rating: 4.3 },
    { id: 6, name: 'Chutneys', image: 'https://tse2.mm.bing.net/th?id=OIP.Afe9rDOOwYyRhbRWRvn3FwAAAA&pid=Api&P=0&h=180', description: 'South Indian Delicacies', rating: 4.6 },
    { id: 7, name: 'Minerva', image: 'https://b.zmtcdn.com/data/pictures/9/90369/d6566fb24aa8472479598fd575e1c710.jpg?fit=around%7C200:200&crop=200:200%3B*%2C*', description: 'Vegetarian South Indian Food', rating: 4.1 },
    { id: 8, name: 'Mehfil', image: 'https://tse1.mm.bing.net/th?id=OIP.rcCqQ6UMniyS0Y7_pKYyZQHaFc&pid=Api&P=0&h=180', description: 'Affordable Multi-cuisine', rating: 4.2 },
    { id: 9, name: 'Hotel Shree Venkateshwara', image: 'https://imgcld.yatra.com/ytimages/image/upload/t_hotel_yatra_details_desktop/v1503471650/Hotel/Hyderabad/00016847/about_2_X99uE3.jpg', description: 'Budget Hotel & Restaurant', rating: 4.0 },
    { id: 10, name: 'Hotel Rajdhani', image: 'https://tse4.mm.bing.net/th?id=OIP.aUnWXK5sAgMNYwTCNI9tXQHaE8&pid=Api&P=0&h=180', description: 'Rajasthani Thali', rating: 4.4 },
  ],
  Vizag: [
    { id: 11, name: 'Venkatadri Vantillu', image: 'https://tse1.mm.bing.net/th?id=OIP.Ap3g85C9RKK9p5uZRoLlngHaFj&pid=Api&P=0&h=180', description: 'Veg Delicacies', rating: 4.2 },
    { id: 12, name: 'Dolphin', image: 'https://tse3.mm.bing.net/th?id=OIP.eSuc6k4LkHvT1vKl6sA1PQHaE8&pid=Api&P=0&h=180', description: 'Multi-cuisine Restaurant', rating: 4.3 },
    { id: 13, name: 'Sagar Durbar', image: 'https://tse3.mm.bing.net/th?id=OIP.22uMckLVwN2j_s9brs_ANgHaFW&pid=Api&P=0&h=180', description: 'Seafood Speciality', rating: 4.4 },
    { id: 14, name: 'Dakshin', image: 'https://tse3.mm.bing.net/th?id=OIP.TuQ_8MXvxwPPTrMLnJwA_AHaHO&pid=Api&P=0&h=180', description: 'Authentic South Indian', rating: 4.5 },
    { id: 15, name: 'Tycoon', image: 'https://tse4.mm.bing.net/th?id=OIP.uVku9UwXuBD9jSBYJ1L-PAHaF3&pid=Api&P=0&h=180', description: 'Fine Dining Experience', rating: 4.6 },
    { id: 16, name: 'The Shack', image: 'https://tse4.mm.bing.net/th?id=OIP.aCUMCt4NGFkh8fTdk-JAdQHaFe&pid=Api&P=0&h=180', description: 'Beachfront Cafe', rating: 4.7 },
    { id: 17, name: 'Novotel', image: 'https://tse4.mm.bing.net/th?id=OIP.BZNFEAEUmokaVXp7-x2APQHaD2&pid=Api&P=0&h=180', description: 'Luxury Dining', rating: 4.8 },
    { id: 18, name: 'Sai Ram Parlour', image: 'https://tse1.mm.bing.net/th?id=OIP.O2_rQEnaIDZnQ-deS1kUAgHaFj&pid=Api&P=0&h=180', description: 'Veg Meals', rating: 4.1 },
    { id: 19, name: 'Flying Spaghetti Monster', image: 'https://tse3.mm.bing.net/th?id=OIP.C9_8YHypVFNL8nl0_XzucQHaFj&pid=Api&P=0&h=180', description: 'Italian Restaurant', rating: 4.2 },
    { id: 20, name: 'Ming Garden', image: 'https://tse2.mm.bing.net/th?id=OIP.GaN0h0J6Wr1FxdZ581lblQAAAA&pid=Api&P=0&h=180', description: 'Chinese Cuisine', rating: 4.3 },
  ],
};

const RestaurantList = () => {
  // Initialize selectedLocation to 'Hyderabad'
  const [selectedLocation, setSelectedLocation] = useState('Hyderabad');
  const [restaurants, setRestaurants] = useState([]);

  // Load restaurants based on location when the component mounts or location changes
  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        // You can modify this to fetch from a server based on the selected location
        const fetchedRestaurants = restaurantsData[selectedLocation] || [];
        setRestaurants(fetchedRestaurants);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    loadRestaurants();
  }, [selectedLocation]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <div className="restaurant-list">
      <h2>Top Restaurants in {selectedLocation}</h2>
      <select onChange={handleLocationChange} value={selectedLocation}>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Vizag">Vizag</option>
        {/* Add more options as needed */}
      </select>
      <div className="restaurant-cards-container">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant} // Pass the restaurant object to the RestaurantCard component
            />
          ))
        ) : (
          <p>No restaurants found for this location.</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
