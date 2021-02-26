const search = document.querySelector('#search');
const collections = document.querySelector('#collections');
const destination = document.querySelector('#destination');
const adult = document.querySelector('#adult');
const children = document.querySelector('#children');
const checkin = document.querySelector('#checkin');
const checkout = document.querySelector('#checkout');
const results = document.querySelector("#results")
search.addEventListener('click', getValues)

function getValues(e){
    const destinationValue = destination.value
    const adultValue = adult.value 
    const childrenValue = children.value
    const checkinValue = checkin.value
    const checkoutValue = checkout.value
    if(destinationValue == null){
        //code
        return
    }
    else if(adultValue == null){
        //code
        return
    }
    else if(checkinValue == null){
        //code
        return
    }
    else if(checkoutValue == null){
        //code
        return
    }
    else{
        searchFunction(destinationValue, adultValue, childrenValue, checkinValue, checkoutValue);
    }
}
async function searchFunction(destinationValue, adultValue, childrenValue, checkinValue, checkoutValue){
    let hotelName = '';
	let destinationId = '';
	let hotelList = [];

	const query = `locations/search?query=${destinationValue}`;
	let result = await getData(query);
	let hotels = result["suggestions"][1]['entities'];

	
	for (let i = 0; i < hotels.length; i++) {
		const element = hotels[i];
		destinationId = element['destinationId']

		hotelName = element['name']
		let hotel = await get_details(destinationId,adultValue,checkinValue,checkoutValue);
		hotel.name = hotelName;

		hotelList.push(hotel);
		
	}

	
	
	console.log(hotelList);
}

async function getData(query){

	let response =  await fetch(`https://hotels4.p.rapidapi.com/${query}`, {
		"method": "GET",
		"headers":  {
			"x-rapidapi-key": "7fcd0ac249mshb557fe351c75ec4p1ffb75jsnc7d2a4272236",
			"x-rapidapi-host": "hotels4.p.rapidapi.com"
		}
	})
	
	let data = await response.json()
	return data
	
}

async function get_details(destinationId, adultValue, checkinValue, checkoutValue){
	const query = `/properties/get-details?id=${destinationId}&locale=en_US&currency=USD&checkOut=${checkoutValue}&adults1=${adultValue}&checkIn=${checkinValue}`
	let result = await getData(query);
	let data = result.data.body
    let price= '$';
	//get hotel attributes
	let guestReview = data.guestReviews.brands;
	let freeService = data.propertyDescription.freebies[0];
	let address = data.propertyDescription.address;
	let hotelStar = data.propertyDescription.starRating 
	let neighbourhood = result.neighborhood.neighborhoodName;
    try {
        price = data.propertyDescription.featuredPrice.currentPrice.formatted;
    } catch (error) {
        price = '$';
    }
	
	let transport = result.transportation.transportLocations[0].locations[0];
	let roomType = data.propertyDescription.roomTypeNames

	//-----------hotel object creation-----------------------------------

	// let hotel = Object.create(Hotel)
	let hotel = new Hotel();
	hotel.address = address;
	hotel.hotelStar = hotelStar;
	hotel.neighbourhood = neighbourhood;
	hotel.price = price;
	hotel.transportation = transport;
	hotel.guestReviews = guestReview;
	hotel.freeService = freeService
	hotel.room = roomType;

    
    let images = await get_hotel_photos(destinationId)
    hotel.hotelImage = images.hotelImages
    hotel.roomImage = images.roomImages

	return hotel;
	
}

async function get_hotel_photos(id){
	const query = `properties/get-hotel-photos?id=${id}`
	let result = await getData(query);

	let imgUrl;
	let hotelImage = result.hotelImages;
	let roomImage = result.roomImages;
	let images = new Images();
	hotelImage.forEach(element => {
		imgUrl = element.baseUrl;
		imgUrl = `${imgUrl.slice(0,imgUrl.length-11)}.jpg`
		images.hotelImages.push(imgUrl);
	});
	
	roomImage.forEach(element => {
		element.images.forEach(image => {
			imgUrl = image.baseUrl;
			imgUrl = `${imgUrl.slice(0,imgUrl.length-11)}.jpg`
			images.roomImages.push(imgUrl);
		});
	});
	return images;
}