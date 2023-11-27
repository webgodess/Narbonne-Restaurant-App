# Restaurant Review Map

The Restaurant Review Map is a web application that allows users to explore and review restaurants on a map. It provides a user-friendly interface to discover new dining places, read and leave reviews, and filter restaurants based on their ratings.

## Features

### Interactive Map

- The map is powered by the Google Maps JavaScript API.
- Users can click on the map to add new restaurants.
- Markers represent restaurants on the map.

### Restaurant Listings

- Restaurants are listed on the left-hand side of the map.
- Each restaurant listing displays the restaurant's name, average rating, and a photo.
- Users can click on a restaurant listing to view more details about the restaurant.

### Filtering

- Users can filter restaurants by rating using a slider.
- The slider allows users to specify a minimum and maximum rating, and the map updates to display only the restaurants that fall within the selected rating range.

### Adding Reviews

- To add a new restaurant and review, users can click anywhere on the map.
- A prompt dialog asks for the restaurant's name, user rating (from 1 to 5 stars), and a review/comment.
- The new restaurant is added as a marker on the map.
- User reviews are displayed on the map and in the restaurant details.

### Viewing Restaurant Details

- Users can click on a restaurant marker on the map to view its details.
- Restaurant details include the name, average rating, and user reviews.
- Users can read existing reviews and add new reviews for the selected restaurant.

## Prerequisites

Before running this application, you need the following:

- A web browser with JavaScript enabled.
- A Google Maps API key.

## Getting Started

1. Clone this repository to your local machine.

2. Create a `config.js` file in the project directory with your Google Maps API key:

   ```javascript
   // config.js
   const config = {
     googleMapsApiKey: "YOUR_API_KEY_HERE",
   };

   module.exports = config;
   ```

## Usage

- **Exploring Restaurants:** Use the map to discover nearby restaurants.

- **Viewing Restaurant Details:** Click on a marker on the map to view restaurant details, including average rating and user reviews.

- **Filtering by Rating:** Adjust the rating slider to filter restaurants by minimum and maximum ratings.

- **Adding Reviews:** To add a new restaurant and review, click anywhere on the map. Follow the prompts to provide the restaurant's name, your rating, and a review/comment.

## Contributing

Contributions to this project are welcome. If you'd like to contribute, feel free to open issues and submit pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

**Note:** Add `config.js` to your project's `.gitignore` file to prevent it from being uploaded to version control.

To run the application, open `index.html` in your web browser.
# Narbonne-Restaurant-App
