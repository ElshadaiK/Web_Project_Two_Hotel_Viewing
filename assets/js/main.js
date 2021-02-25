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
    searchFunction(destinationValue, adultValue, childrenValue, checkinValue, checkoutValue)
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
		let hotel = await get_details(destinationId);
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