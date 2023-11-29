let markers = [];
//variable to store the Google Maps object.
let map;
//variable for the Google Maps Places Service.
let service;
//info window used to display information about a place.
let infowindow;
//geocoder object for converting coordinates to addresses.
let geocoder;

//Selects DOM elements with the class name "options."
const option = document.getElementsByClassName("options");

// function to generate star ratings based on an average rating value.
const getStars = (average) => {
  const starsLi = document.createElement("span");
  const full = Math.round(average);
  for (let k = 0; k < average; k++) {
    const starItem = document.createElement("i");
    starItem.innerHTML = '<i class="fas fa-star"></i>';
    starsLi.appendChild(starItem);
  }

  const starI = starsLi.lastChild;
  starI.className = "last";

  const half = full - average;
  if (half === 0 || half < 0.3) {
    starI.innerHTML = '<i class="fas fa-star"></i>';
  } else {
    starI.innerHTML = '<i class="fas fa-star-half-alt"></i>';
  }
  return starsLi;
};

// function to filter and display markers based on rating values.
const filterMarkers = (min, max, markers) => {
  min = parseInt(min);
  max = parseInt(max);

  markers.forEach((marker) => {
    listItemId = document.getElementById(marker.id);

    if (marker.average >= min && marker.average <= max) {
      marker.setVisible(true);
      // console.log(marker.title)
      if (listItemId) {
        listItemId.style.display = "block";
      }
    } else {
      marker.setVisible(false);
      if (listItemId) {
        listItemId.style.display = "none";
      }
    }
  });
};

// funcion to toggle the visibility of an HTML element with the id "form1."
const show = () => {
  $("#form1").toggle("remove");
};

/* used to reinitialize the visibility of a Google Maps marker and a corresponding HTML list item.
 It ensures that both the map marker and the associated list item are visible to the user. */
const reinit = (marker) => {
  marker.setVisible(true);
  listItemId = document.getElementById(`${marker.id}`);
  listItemId.style.display = "block";
};

// an HTML element (content) and appends a restaurant's name and image to it.
const appendContent = (content, name, img, longLat) => {
  const imgSrc = `${img}`;
  const titleRestaurant = document.createElement("h1");
  const picture = document.createElement("IMG");

  titleRestaurant.innerHTML = `${name}`;
  content.appendChild(titleRestaurant);
  picture.setAttribute("id", "images");
  picture.setAttribute("src", imgSrc);
  content.appendChild(picture);
};

//It creates a structured display of ratings and comments within the content area, with each rating including stars and a comment.
const pushContent = (rate, content, address) => {
  const individualUl = document.createElement("ul");
  const restaurantRating = document.createElement("div");
  const h3Title = document.createElement("h3");

  restaurantRating.setAttribute("id", "restaurantRatingId");
  content.appendChild(restaurantRating);
  h3Title.innerHTML = `${address}`;
  restaurantRating.appendChild(h3Title);

  for (let v = 0; v < rate.length; v++) {
    const comment = rate[v].comment || rate[v].text;
    const stars = rate[v].stars || rate[v].rating;
    const miniRate = document.createElement("h4");
    const Li1stItem = document.createElement("li");
    const paragraph = document.createElement("p");

    for (let b = 0; b < stars; b++) {
      const starItem = document.createElement("i");
      starItem.innerHTML = '<i class="fas fa-star"></i>';
      miniRate.appendChild(starItem);
    }

    paragraph.innerHTML = `${comment}`;
    Li1stItem.appendChild(miniRate);
    Li1stItem.appendChild(paragraph);
    individualUl.appendChild(Li1stItem);
    restaurantRating.appendChild(individualUl);
  }
};

// function to let a user give a review
const pushUserFeedback = (rating, comment, restaurant) => {
  const individualUl = document.createElement("ul");
  const miniRate = document.createElement("h4");
  const Li1stItem = document.createElement("li");
  const paragraph = document.createElement("p");

  for (let c = 0; c < rating; c++) {
    const starItem = document.createElement("i");
    starItem.innerHTML = '<i class="fas fa-star"></i>';
    miniRate.appendChild(starItem);
  }

  paragraph.innerHTML = `${comment}`;
  Li1stItem.appendChild(miniRate);
  Li1stItem.appendChild(paragraph);
  individualUl.appendChild(Li1stItem);
  restaurant.appendChild(individualUl);
};

const pushContentOfClicked = (rate, comment, content, address) => {
  const individualUl = document.createElement("ul");
  const restaurantRating = document.createElement("div");
  const h3Title = document.createElement("h3");

  restaurantRating.setAttribute("id", "restaurantRatingId");
  content.appendChild(restaurantRating);
  h3Title.innerHTML = `${address}`;
  restaurantRating.appendChild(h3Title);

  for (let v = 0; v < rate.length; v++) {
    const miniRate = document.createElement("h4");
    const Li1stItem = document.createElement("li");
    const paragraph = document.createElement("p");

    for (let b = 0; b < rate; b++) {
      const starItem = document.createElement("i");
      starItem.innerHTML = '<i class="fas fa-star"></i>';
      miniRate.appendChild(starItem);
    }
    paragraph.innerHTML = `${comment}`;
    Li1stItem.appendChild(miniRate);
    Li1stItem.appendChild(paragraph);
    individualUl.appendChild(Li1stItem);
    restaurantRating.appendChild(individualUl);
  }
};

// function to create restaurant list
const createRestaurantList = (id, avg, img, name) => {
  const restaurantList = document.getElementById("listRestaurant");
  const listItem = document.createElement("li");
  const listDiv = document.createElement("div");
  const mainContainer = document.createElement("div");
  const listName = document.createElement("h3");
  const listItemRating = document.createElement("ul");

  if (avg) {
    const starsList = getStars(avg);
    const picture = document.createElement("IMG");

    picture.setAttribute("src", `${img}`);
    picture.setAttribute("class", "listImg");
    picture.setAttribute("alt", "restaurant image");
    mainContainer.className = "restaurant-info";
    listItem.appendChild(mainContainer);
    mainContainer.appendChild(picture);
    listItemRating.appendChild(starsList);
    listName.innerHTML = name;
    listDiv.className = "containingDiv";
    listDiv.appendChild(listName);
    listDiv.appendChild(listItemRating);
    listItem.appendChild(listDiv);
  }

  restaurantList.appendChild(listItem);
  listItem.className = "individual-" + Date.now();
  listItem.id = `${id}`;
  listItem.style.display = "none";
};

// function to retrieve google information and make the restaurant list
const createGoogleRestaurantList = (id, avg, img, name) => {
  const restaurantList = document.getElementById("listRestaurant");
  const list = document.createElement("ul");
  const listItem = document.createElement("li");
  const listDiv = document.createElement("div");
  const mainContainer = document.createElement("div");
  const listName = document.createElement("h3");
  const listItemRating = document.createElement("ul");
  const starsList = getStars(avg);
  const picture = document.createElement("IMG");

  list.appendChild(listItem);
  listItem.className = "individual-" + Date.now();
  listItem.id = `${id}`;
  restaurantList.appendChild(list);
  picture.setAttribute(
    "src",
    `https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${img}&key=AIzaSyCjvG1YeQVLBlTTaTVzI8JvowQ8Ug3yLQE`,
    "class",
    "listImg"
  );
  picture.setAttribute("class", "listImg");
  mainContainer.className = "restaurant-info";
  listItem.appendChild(mainContainer);
  mainContainer.appendChild(picture);

  listItemRating.appendChild(starsList);
  listItem.style.padding = "10px";
  listName.innerHTML = name;
  listItem.appendChild(listName);
  listItem.appendChild(listItemRating);
};

// function to display name and rating of a restaurant list when a user hovers over a marker
const infos = (name, rate) => {
  const content = document.createElement("div");
  const title = document.createElement("h4");
  title.innerHTML = `${name}`;
  content.appendChild(title);
  const starRating = document.createElement("h4");
  const starNumber = document.createElement("span");
  starNumber.setAttribute("class", "span");
  starNumber.innerHTML = `${rate}`;
  const stars = getStars(rate);
  starRating.appendChild(starNumber);
  starRating.appendChild(stars);
  content.appendChild(starRating);
  return content;
};

const pop = document.getElementById("pop");
const infoBar = document.getElementById("popUp");

const min = document.getElementById("min");
const max = document.getElementById("max");

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Sets the map on all markers in the array
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

// function to store map-related data in localStorage
const storeMapDataInLocalStorage = () => {
  localStorage.setItem(
    "restaurantData",
    JSON.stringify(
      markers.map((marker) => ({
        title: marker.title,
        average: marker.average,
        img: marker.img,
        position: marker.position,
        address: marker.address,
        reviews: marker.reviews,
      }))
    )
  );
};

// function to retrieve cached data from localStorage
const retrieveCachedMapData = () => {
  const cachedRestaurantData = localStorage.getItem("restaurantData");

  if (cachedRestaurantData) {
    const cachedMarkers = JSON.parse(cachedRestaurantData);

    cachedMarkers.forEach((cachedMarker) => {
      const marker = new google.maps.Marker({
        title: cachedMarker.title,
        map: map,
        position: cachedMarker.position,
        average: cachedMarker.average,
        img: cachedMarker.img,
        address: cachedMarker.address,
        reviews: cachedMarker.reviews,
      });

      markers.push(marker);
      createRestaurantList(
        cachedMarker.title,
        cachedMarker.average,
        cachedMarker.img,
        cachedMarker.position
      );
    });

    filterMarkers(min.value, max.value, markers);
  }
};

// function to initialise map
function initMap() {
  infowindow = new google.maps.InfoWindow({
    maxWidth: 600,
  });

  // map center
  const narbonne = { lat: 43.1837661, lng: 3.0042121 };

  // initialise map
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: narbonne,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_CENTER,
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER,
    },
    scaleControl: true,
    streetViewControl: false,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP,
    },
  });

  // Get cached map data if available
  retrieveCachedMapData();

  const service = new google.maps.places.PlacesService(map);
  service.nearbySearch(
    {
      location: narbonne,
      radius: 500,
      type: ["restaurant"],
    },
    callback
  );

  map.addListener("dragend", function () {
    pos = map.getCenter();
    service.nearbySearch(
      {
        location: pos,
        radius: 500,
        type: ["restaurant"],
      },
      callback
    );
  });

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (let j = 0; j < results.length; j++) {
        const place = results[j];
        const marker = markers.find((item) => item.place_id === place.place_id);

        if (!marker) {
          service.getDetails(
            {
              placeId: place.place_id,
              fields: [
                "name",
                "rating",
                "reviews",
                "geometry",
                "photos",
                "place_id",
                "formatted_address",
              ],
            },
            function (place, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                const contentDiv = document.createElement("div");
                const googleImg = `https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${place.formatted_address}&key=AIzaSyCjvG1YeQVLBlTTaTVzI8JvowQ8Ug3yLQE`;
                const marker = new google.maps.Marker({
                  title: place.name,
                  map: map,
                  position: place.geometry.location,
                  average: place.rating,
                  id: place.place_id,
                  img: googleImg,
                  address: place.formatted_address,
                  animation: google.maps.Animation.DROP,
                  reviews: place.reviews,
                });

                markers.push(marker);
                createRestaurantList(
                  place.place_id,
                  place.rating,
                  googleImg,
                  place.name
                );

                for (let a = 0; a < markers.length; a++) {
                  markers[a].addListener("click", function () {
                    const infoBar = document.getElementById("popUp");
                    const content = infos(this.title, this.average);

                    infowindow.close();
                    infowindow.setContent(content);
                    infowindow.open(map, this);
                    modalContent.className += " remove";
                    pop.style.display = "block";
                    pop.className += " show";
                    infoBar.innerHTML = "";
                    infoBar.className += " show";
                    appendContent(infoBar, this.title, this.img, this.position);
                    pushContent(this.reviews, infoBar, this.address);
                    document
                      .getElementById("addButton")
                      .removeAttribute("disabled");
                  });
                }

                filterMarkers(min.value, max.value, markers);
              }
            }
          );
        }
      }
    }
  }

  //get JSON data

  fetch("./assets/js/restaurantList.json")
    .then((data) => {
      return data.json();
    })
    .then((restaurants) => {
      for (let i = 0; i < restaurants.length; i++) {
        const location = { lat: restaurants[i].lat, lng: restaurants[i].long };
        const rate = restaurants[i].ratings;
        const img = restaurants[i].image;
        const name = restaurants[i].name;
        const address = restaurants[i].address;

        let starRatings1 = 0;
        for (let j = 0; j < rate.length; j++) {
          starRatings1 += restaurants[i].ratings[j].stars;
        }

        const avg = starRatings1 / 2;

        const marker = new google.maps.Marker({
          title: name,
          map: map,
          position: location,
          average: avg,
          id: restaurants[i].id,
          img: img,
          address: address,
          animation: google.maps.Animation.DROP,
          reviews: rate,
        });

        markers.push(marker);
        createRestaurantList(restaurants[i].id, avg, img, name);

        for (let a = 0; a < markers.length; a++) {
          markers[a].addListener("click", function () {
            infowindow.close();
            const infoBar = document.getElementById("popUp");
            const content = infos(this.title, this.average);
            infowindow.setContent(content);
            infowindow.open(map, this);
            modalContent.className += " remove";
            pop.style.display = "block";
            pop.className += " show";
            infoBar.innerHTML = "";
            infoBar.className += " show";
            appendContent(infoBar, this.title, this.img, this.position);
            pushContent(this.reviews, infoBar, this.address);
            document.getElementById("addButton").removeAttribute("disabled");
          });
        }
      }

      filterMarkers(min.value, max.value, markers);

      const userRating = document.getElementById("myRating");

      const userComment = document.getElementById("comment");

      const submit = document.getElementById("submit");

      submit.addEventListener("click", function (e) {
        const restRating = document.getElementById("restaurantRatingId");
        e.preventDefault();
        pushUserFeedback(userRating.value, userComment.value, restRating);
        userComment.value = "";
        show();
      });
    });

  function placeMarker(name, map, latLng, rating, rate) {
    const marker = new google.maps.Marker({
      title: name,
      map: map,
      position: latLng,
      average: rating,
      reviews: rate,
    });

    map.panTo(latLng);

    return marker;
  }

  map.addListener("click", function (e) {
    if (window.confirm("Do you want to add a restaurant?")) {
      const name = prompt("Restaurant name:");
      let rating;
      let review;

      while (true) {
        const userInput = prompt("How do you rate it?:");
        // Check if the user input is a valid number
        if (!isNaN(userInput) && userInput.trim() !== "") {
          rating = parseFloat(userInput);
          break; // Exit the loop if a valid number is provided
        } else {
          alert("Please enter a valid numeric rating.");
        }
      }

      // Validate and sanitize restaurant review
      while (true) {
        review = prompt("Your comment?:");
        if (/^[A-Za-z\s\d\.,!?]+$/.test(review.trim())) {
          break; // Exit the loop if the review is valid
        } else {
          alert(
            "Please enter a valid review (letters, spaces, numbers and punctuation only)."
          );
        }
      }

      const marker = placeMarker(name, map, e.latLng, rating, review);
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const imageUrl1 = `https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${lat},${lng}&key=AIzaSyCjvG1YeQVLBlTTaTVzI8JvowQ8Ug3yLQE`;
      geocoder = new google.maps.Geocoder();

      geocoder.geocode(
        {
          latLng: e.latLng,
        },
        function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              createRestaurantList(
                results[0].place_id,
                rating,
                imageUrl1,
                name
              );
              let currentItem = document.getElementById(
                `${results[0].place_id}`
              );
              currentItem.style.display = "block";
              marker.addListener("click", function () {
                infowindow.open(map, marker);
                const content = infos(marker.title, marker.average);
                infowindow.setContent(content);
                modalContent.className += " remove";
                pop.style.display = "block";
                pop.className += " show";
                infoBar.innerHTML = "";
                infoBar.className += " show";
                appendContent(infoBar, name, imageUrl1, e.latLng);
                pushContentOfClicked(
                  [rating],
                  review,
                  infoBar,
                  results[0].formatted_address
                );
                document
                  .getElementById("addButton")
                  .removeAttribute("disabled");
              });
            }
          }
        }
      );
    }
  });
}

// event listener for when minimum rating is changed
min.addEventListener("change", (e) => {
  console.log(e.target.value, max.value);
  $("#max").empty();

  for (i = 5; i > min.value; i--) {
    $("#max").append(`<option  value="${i}">${i}</option>`);
    max.value = 5;
  }
  console.log(e.target.value, max.value);
  filterMarkers(e.target.value, max.value, markers);
});

// event listener for when maximum rating is changed
max.addEventListener("change", (e) => {
  filterMarkers(min.value, e.target.value, markers);
});

// Add review button
document.getElementById("addButton").addEventListener("click", show);

// Get the modal
const modal = document.getElementById("modal-id");

// Get the <span> element that closes the modal
const close = document.getElementById("close");
const modalContent = document.getElementById("mdContent");

// event listener for when the close button is clicked
close.addEventListener("click", () => {
  pop.classList.toggle("remove");
  pop.classList.remove("show");
  infoBar.innerText = "";
  infoBar.classList.remove("show");
  pop.style.display = "none";
  modalContent.classList.toggle("remove");
  if ($("#form1").is(":visible")) {
    show(); // Call the show() function if #form1 is visible
  }
  console.log($("#form1").attr("class"));
  document.getElementById("addButton").setAttribute("disabled", true);
});
