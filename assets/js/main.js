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
function searchFunction(destinationValue, adultValue, childrenValue, checkinValue, checkoutValue){

}
