// create the map and set the starting location
const map = L.map("map").setView([42.57509, -71.99813], 12);
// tells leaflet to create a map and where to put it (inside map div)
// setView tells the map where to look, latitude, longitude, zoom level

// adds map imagery
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { // where to get the map tiles
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// add a bathroom marker to the app
const bathroom = L.marker([42.551506, -71.994757]).addTo(map);

// add information to the marker
bathroom.bindPopup("Walmart Supercenter");

// find the rating dropdowns
const cleanliness = document.getElementById("cleanliness");
const stocked = document.getElementById("stocked");
const condition = document.getElementById("condition");
const accessibility = document.getElementById("accessibility");

// find the place to display the overall rating
const overallRating = document.getElementById("overall-rating");

// calculate the overall rating each time a rating changes
function calculateOverallRating() {

    // get input from the user
    const cleanlinessRating = Number(cleanliness.value);
    const stockedRating = Number(stocked.value);
    const conditionRating = Number(condition.value);
    const accessibleRating = Number(accessibility.value);

    // make sure all ratings have been selected
    if (cleanlinessRating && stockedRating && conditionRating && accessibleRating) {

        // calculate the average
        const average =
            (cleanlinessRating + stockedRating + conditionRating + accessibleRating) / 4;

        // display the result
        overallRating.textContent =
            "Overall Rating: " + average.toFixed(1) + " / 5";
    }
}

// run the function whenever one of the ratings is changed
cleanliness.addEventListener("change", calculateOverallRating);
stocked.addEventListener("change", calculateOverallRating);
condition.addEventListener("change", calculateOverallRating);
accessibility.addEventListener("change", calculateOverallRating);

// temporary list of establishments, to be replaced with real database later
const establishments = [
    {
        name: "Walmart Supercenter",
        type: "store",
        address: "677 Timpany Boulevard, Gardner, MA"
    },
    {
        name: "Gardner Cinemas",
        type: "store",
        address: "336 Timpany Boulevard, Gardner, MA"
    }
];

// find the address input
const addressInput = document.getElementById("address");

// find check address button
const checkAddressButton = document.getElementById("check-address");

// find place where result will be displayed
const addressResult = document.getElementById("address-result");

const existingEstablishment = document.getElementById("existing-establishment");

const newEstablishmentFields = document.getElementById("new-establishment-fields");

// check if address already exists in database
checkAddressButton.addEventListener("click", function() {

    // get address entered by user
    const enteredAddress = addressInput.value.trim();

    // search through existing establishments for matching address
    const establishment = establishments.find(function(place) {
        return place.address === enteredAddress;
    });

    // check whether an establishment was found
    if (establishment) {

        addressResult.textContent =
            "Establishment found!"

        existingEstablishment.textContent =
            establishment.name + " - " + establishment.address;

        newEstablishmentFields.style.display = "none"; // dont display those fields

    } else {

        addressResult.textContent =
            "Establishment not found. Please add the information.";

        existingEstablishment.textContent = "";

        newEstablishmentFields.style.display = "block"; // bring the fields back when the address isn't found
    }
});