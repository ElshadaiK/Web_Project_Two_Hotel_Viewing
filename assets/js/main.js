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

	results.innerHTML = "";
	const query = `locations/search?query=${destinationValue}`;
	let result = await getData(query);
	
	try{
		// console.log("try-catch inside");
		let hotels = result["suggestions"][1]['entities'];
		for (let i = 0; i < hotels.length; i++) {
			const element = hotels[i];
			destinationId = element['destinationId']

			hotelName = element['name']
			let hotel = await get_details(destinationId,adultValue,checkinValue,checkoutValue);
			hotel.name = hotelName;
			hotel.id = destinationId; 
			display_serach(hotel)
		}
		
		
	}
	catch(err){
		console.log("Error loading the data",err)
	}
}
function display_serach(hotel){
	let output = horizontal_card(hotel);
	results.innerHTML += output;
}



async function getData(query){

	let response =  await fetch(`https://hotels4.p.rapidapi.com/${query}`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "58cca75488msh34acc7bddef96f8p176275jsn0f6ec88c7799",
			"x-rapidapi-host": "hotels4.p.rapidapi.com"
		}
	})
	
	let data = await response.json()
	return data
	
}

async function get_details(destinationId, adultValue, checkinValue, checkoutValue){
	console.log(destinationId);
	const query = `/properties/get-details?id=${destinationId}&locale=en_US&currency=USD&checkOut=${checkoutValue}&adults1=${adultValue}&checkIn=${checkinValue}`
	let result = await getData(query);
	let data = result.data.body
    let price= '$';
	//get hotel attributes
	let guestReview ="";
	let freeService = data.propertyDescription.freebies[0];
	let address = data.propertyDescription.address;
	let hotelStar = data.propertyDescription.starRating 
	let neighbourhood = result.neighborhood.neighborhoodName;
    try {
        price = data.propertyDescription.featuredPrice.currentPrice.formatted;
		guestReview = data.guestReviews.brands;
    } catch (error) {
        price = '$';
		guestReview = null;
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
	
	if(guestReview){
		hotel.guestReviews = guestReview
		
	}
	else{
		hotel.guestReviews.badgeText = "No review"
	}
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

function horizontal_card(hotel){
	
	let card = `
			
				<div class="card mb-2 ml-5">
					<div class="row">
						<img class="col-4" src=${hotel.hotelImage[0]} alt="Card image" >
						<div class="card-body col-7">
							<h4 class="card-title">${hotel.name}<span> -${hotel.hotelStar} Star</span></h4>
							
							<h6 mb-2>${hotel.address.fullAddress}</h6>
							<h5>${hotel.neighbourhood}</h5>
	
							<p class="card-text mb-2">${hotel.transportation.distanceInTime} to ${hotel.transportation.name}</p>
							<h5 mb-3>${hotel.guestReviews.formattedRating}  ${hotel.guestReviews.badgeText}</h5>
							<a href="../../detail.html" class="btn btn-primary">Detail</a>
						</div>
						<div class="col-1">
							<h3>${hotel.price}</h3>
						</div>
					</div>
				</div>`;
	return card;
}