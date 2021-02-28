const urlParams = new URLSearchParams(window.location.search);

const hImage = urlParams.get("hotelImage").split(",");

const container1 = document.getElementById("container1");


document.addEventListener("DOMContentLoaded",()=>{
    console.log(hImage);
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


