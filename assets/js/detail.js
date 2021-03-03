const urlParams = new URLSearchParams(window.location.search);

const data = urlParams.get("hotelImage");
var hImage;
var hotel;

const img = document.getElementById("image")
const nameHotel = document.getElementById("hotel-name");
const address1 = document.getElementById("address");
const free = document.getElementById("free");
const hood = document.getElementById("hood");
const room = document.getElementById("room");

document.addEventListener("DOMContentLoaded",()=>{
    hotel = JSON.parse(data)
    console.log(hotel);
    hImage = hotel.hotelImage
    display_detail();
    display_hotel_images();
    

})



function display_hotel_images(){
    let output = '';
    if(hImage.length > 4){
        for (let index = 0; index < 8; index++) {
            const element = hImage[index];
            output += `
                <div class="four wide column">
                        <div class="item">
                            <div class="images">
                             
                                    <img src="${element}" alt="image" width="300" height="300">
                                   
                            </div>
                        </div>
                </div>`
        }
    }
    else{
        for (let index = 0; index < hImage.length; index++) {
            const element = hImage[index];
            output += `
                <div class="four wide column">
                        <div class="item">
                            <div class="images">
                              
                                    <img src="${element}" alt="image" width="400" height="400">
                                
                            </div>
                        </div>
                </div>`
        }
    }
       
 
    container1.innerHTML += output;
}


