class Hotel{
    id = ''
    name = ""
    hotelStar=""
    neighbourhood=""
    price=""
    transportation={
        distance:"",
        distanceInTime:"",
        name:""
    }
    guestReviews={
        badgeText:"",
        formattedRating:"",
    }
    freeService=""
    address={
        addressLine1: "",
        addressLine2: "",
        cityName: "",
        countryCode: "",
        countryName: "",
        fullAddress: "",
        pattern: "",
        postalCode: "",
        provinceName:""
    }
    room=[]
    hotelImage = []
    roomImage = []

    constructor(){
        
    }
    
}


class Images{
    hotelImages = []
    roomImages = []

    constructor(){}
}
