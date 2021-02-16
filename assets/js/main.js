const body = document.getElementById('body')
document.addEventListener('DOMContentLoaded',
    letUsTry)

function letUsTry() {
    fetch("https://hotels4.p.rapidapi.com/properties/list?destinationId=1506246&pageNumber=1&checkIn=2020-01-08&checkOut=2020-01-15&pageSize=25&adults1=1&currency=USD&locale=en_US&sortOrder=PRICE", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "289d62e124mshbe3bb313c950df5p109353jsnbf9a14816df1",
                "x-rapidapi-host": "hotels4.p.rapidapi.com"
            }
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.error(err);
        });
}