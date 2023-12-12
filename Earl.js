// Constants
const kidsMeal = 5000;
const extraBed = 8000;

// Variables
let cost; // Renamed from roomCost to avoid conflicts

// Room Prices (Variables)
let SingleRoom;
let DoubleRoom;
let TripleRoom;

SingleRoom = 25000;
DoubleRoom = 35000;
TripleRoom = 40000;

// Getting references to interactive elements
// Booking Details
const fName = document.getElementById("firstName");
const lName = document.getElementById("lastName");
const conNumber = document.getElementById("contact");
const mail = document.getElementById("email");

// Check-in & check-out date
const checkIn = document.getElementById("checkin");
const checkOut = document.getElementById("checkout");

// Rooms
const RoomType = document.getElementById("roomType");
const singleRoom = document.getElementById("single");
const doubleRoom = document.getElementById("double");
const tripleRoom = document.getElementById("triple");

// Current Booking
const cBooking = document.getElementById("currentBooking");
const form = document.getElementById("booking_form");
const formInputs = form.querySelectorAll("input, select");

// Extra Bed
const extrabed = document.getElementById("beds");

// Kids above age 5
const kids5 = document.getElementById("kids");

// Const
const txtCost = document.getElementById("cost");

// Extra Requirements
const extraRequirements = document.getElementById("extra-requirements-checkboxes");

// Promo Code
const promoCode = document.getElementById("promo");

// Book Now button
const btnSub = document.getElementById("bookrooms");

// Display Output in a table
const tblOutput = document.getElementById("bookingoutput");

// An empty array to store details
const response = [];

// Display overall booking btn
const overallTblOutput = document.getElementById("bookAdventure");

//text overall booking output
const txtOutput=document.getElementById("overallbookingoutput");

// Submit button onclick listener
window.addEventListener("load", init);
btnSub.addEventListener("click", addtoStorage);
btnSub.addEventListener("click", overallbookingoutput);
tblOutput.addEventListener("click", addtoStorage);


// Init function for defaults
function init() {
    cost = SingleRoom; // Initial cost based on Single Room
    txtCost.innerText = `$${cost.toFixed(2)}`;
}

// Function to check the room type
function calculateRoomCost() {
    // Calculate the cost based on user inputs
    const noOfSingleRooms = parseInt(singleRoom.value) * SingleRoom;
    const noOfDoubleRooms = parseInt(doubleRoom.value) * DoubleRoom;
    const noOfTripleRooms = parseInt(tripleRoom.value) * TripleRoom;
    const noOfChildrenCost = parseInt(kids5.value) * kidsMeal;
    const noOfExtraBed = parseInt(extrabed.value) * extraBed;
    const duration = Math.round(Math.abs((new Date(checkOut.value) - new Date(checkIn.value)) / (24 * 60 * 60 * 1000)));

    cost = (noOfSingleRooms + noOfDoubleRooms + noOfTripleRooms + noOfChildrenCost + noOfExtraBed)*duration;
}

formInputs.forEach(input => input.addEventListener('input', currentBooking));

function currentBooking() {
    calculateRoomCost();
    // Display the current booking dynamically
    cBooking.innerHTML = `
        <p>Single Rooms: ${singleRoom.value}</p>
        <p>Double Rooms: ${doubleRoom.value}</p>
        <p>Triple Rooms: ${tripleRoom.value}</p>
        <p>Extra Beds: ${extrabed.value}</p>
        <p>Kids: ${kids5.value}</p>
        <p>Total Cost: LKR ${cost.toFixed(2)}</p>
    `;
}

// Storage implementation
function addtoStorage(evt) {
    evt.preventDefault();
    
    // JSON object to store details
    const jsondata = {
        "firstName": fName.value,
        "lastName": lName.value,
        "contact": conNumber.value,
        "email": mail.value,
        "checkin": checkIn.value,
        "checkout": checkOut.value,
        "single": singleRoom.value,
        "double": doubleRoom.value,
        "triple": tripleRoom.value,
        "beds": extrabed.value,
        "kids": kids5.value,
        "extra-requirements-checkboxes": extraRequirements.value
    };

    // JSON object to response array
    response.push(jsondata);

    // Response array to local storage
    localStorage.setItem('details', JSON.stringify(response));

    // Structure of the header row of the table
    let nameList = `<tr><th>First Name</th> <th>Last Name</th> <th>Contact No</th> <th>Email</th> <th>Check In</th> <th>Check Out</th> <th>Single Rooms</th> <th>Double Rooms</th> <th>Triple Rooms</th> <th>Extra Beds</th> <th>Kids</th> <th>Extra Req</th>`;

    
    // Go through the response array
    for (const entry of response) {
        nameList += `<tr class='entry'><td>${entry.firstName}</td><td>${entry.lastName}</td><td>${entry.contact}</td><td>${entry.email}</td><td>${entry.checkin}</td><td>${entry.checkout}</td><td>${entry.single}</td><td>${entry.double}</td><td>${entry.triple}</td><td>${entry.beds}</td><td>${entry.kids}</td><td>${entry.extraRequirements}</td></tr>`;
    }

    // Output of the table
    tblOutput.innerHTML = nameList;

    // Log localStorage to console
    console.log(localStorage);
}

 // Overall booking details and cost
 const overallBookingDetails = document.getElementById("overallbookingoutput");
 let overallBookingCost = 0;

 // Promo code
 const promoCodeInput = document.getElementById("promo");
 const promoCodeValue = "Promo123";



 // Book Now button click listener
 btnSub.addEventListener("click", bookNow);

 function bookNow(evt) {
   evt.preventDefault();
   calculateRoomCost(); // Existing function to calculate room cost

   // Check promo code
   const enteredPromoCode = promoCodeInput.value.trim();
   const promoDiscount = enteredPromoCode === promoCodeValue ? 0.05 : 0;

   // Calculate total cost
   const totalCost = cost - cost * promoDiscount;

   // Display overall booking details and cost
   overallBookingDetails.innerHTML = `
        <th>OVERALL BOOKING</th>

       <tr>
           <td>Name</td>
           <td>${fName.value} ${lName.value}</td>
       </tr>
       <tr>
           <td>Contact No</td>
           <td>${conNumber.value}</td>
       </tr>
       <tr>
           <td>No Single Rooms</td>
           <td>${singleRoom.value}</td>
       </tr>
       <tr>
           <td>No Double Room</td>
           <td>${doubleRoom.value}</td>
       </tr>
       <tr>
           <td>No Triple Room</td>
           <td>${tripleRoom.value}</td>
       </tr>
       <tr>
           <td>No of Extra Beds</td>
           <td>${extrabed.value}</td>
       </tr>
       <tr>
           <td>Kids Above Age 5</td>
           <td>${kids5.value}</td>
       </tr>
       <tr>
           <td>Total Cost</td>
           <td>LKR ${totalCost.toFixed(2)}</td>
       </tr>
   `;

   // Update overall booking cost
   overallBookingCost = totalCost;
 }

// Constants for Adventure Booking
const localAdultDivingCost = 5000;
const localKidDivingCost = 2000;
const foreignAdultDivingCost = 10000;
const foreignKidDivingCost = 5000;
const guideCostAdult = 1000;
const guideCostKid = 500;

// An array to store adventure bookings
const adventureBookings = [];

// Assuming you have a button with the id 'bookAdventure'
const adventureBookingButton = document.getElementById("bookAdventure");

// Adventure form elements
const countrySelection = document.getElementById('countryadult');
const countrySelection1 = document.getElementById('countrykid');
const hoursInput = document.getElementById("TmeHours");
const adultGuideCheckbox = document.getElementById("adult");
const kidsGuideCheckbox = document.getElementById("kidguide");

// Book Adventure button click listener
adventureBookingButton.addEventListener("click", bookAdventure);

function bookAdventure() {
    // Get values from the adventure form
    const country = countrySelection.value;
    const country1 = countrySelection1.value;
    const hours = hoursInput.value;
    const adultGuide = adultGuideCheckbox.checked;
    const kidsGuide = kidsGuideCheckbox.checked;

    // Calculate adventure cost
    let adventureCost = 0;

    if (country === "localadult") {
        adventureCost += localAdultDivingCost;
    }  else if (country === "foreignadult") {
        adventureCost += foreignAdultDivingCost;
    } 

    if (country1 === "localkid") {
        adventureCost += localKidDivingCost;
    }  else if (country1 === "foreignkid") {
        adventureCost += foreignKidDivingCost;
    }

    // Add guide cost if needed
    if (adultGuide) {
        adventureCost += guideCostAdult;
    }
    if (kidsGuide) {
        adventureCost += guideCostKid;
    }

    // Add adventure booking details to the array
    const adventureBookingDetails = {
        country: country,
        country1: country1,
        hours: hours,
        adultGuide: adultGuide,
        kidsGuide: kidsGuide,
        cost: adventureCost
    };

    adventureBookings.push(adventureBookingDetails);

    // Display adventure booking details in a popup message
    alert(`Adventure Booking Details:\nCountry Adult: ${country}\nCountry Kid: ${country1} \nHours: ${hours}\nAdult Guide: ${adultGuide ? 'Yes' : 'No'}\nKids Guide: ${kidsGuide ? 'Yes' : 'No'}\nTotal Cost: LKR ${adventureCost.toFixed(2)}`);

    // Reset adventure booking form
    resetAdventureForm();
}

// Function to reset the adventure booking form
function resetAdventureForm() {
    // Set default values and uncheck checkboxes
    countrySelection.value = 'localadult';
    hoursInput.value = '0';
    adultGuideCheckbox.checked = false;
    kidsGuideCheckbox.checked = false;
}

//Add to favourite button
//Const for favourite button

function addToFavorites() {
    // Get the booking details from the form
    const bookingDetails = {
        "firstName": fName.value,
        "lastName": lName.value,
        "contact": conNumber.value,
        "email": mail.value,
        "checkin": checkIn.value,
        "checkout": checkOut.value,
        "single": singleRoom.value,
        "double": doubleRoom.value,
        "triple": tripleRoom.value,
        "beds": extrabed.value,
        "kids": kids5.value,
    };

    // Get the adventure booking details
    const adventureBookingDetails = {
        "country": countrySelection.value,
        "country1": countrySelection1.value,
        "hours": hoursInput.value,
        "adultGuide": adultGuideCheckbox.checked,
        "kidsGuide": kidsGuideCheckbox.checked,
    };

    // Combine both details into a single object
    const favorites = {
        "bookingDetails": bookingDetails,
        "adventureBookingDetails": adventureBookingDetails,
    };

    // Save to local storage
    localStorage.setItem('favoriteBooking', JSON.stringify(favorites));

    // Notify the user
    function addToFavorites(){
    alert("Booking added to favorites!");
    }
}

// Check Loyalty button
const checkLoyaltyButton = document.getElementById("loyalty");
checkLoyaltyButton.addEventListener("click", checkLoyalty);

// Check Loyalty function
function checkLoyalty() {
    const loyaltyPoints = calculateLoyaltyPoints();
    alert(`Loyalty Points: ${loyaltyPoints}`);
}

// Function to calculate loyalty points
function calculateLoyaltyPoints() {
    const totalRooms = parseInt(singleRoom.value) + parseInt(doubleRoom.value) + parseInt(tripleRoom.value);

    if (totalRooms >= 3) {
        const loyaltyPoints = 20;
        // Store loyalty points in local storage
        localStorage.setItem('loyaltyPoints', loyaltyPoints);
        return loyaltyPoints;
    } else {
        return 0;
    }
}




