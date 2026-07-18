// White Peak Restaurant Menu Filter


function showMenu(category){


let dishes = document.querySelectorAll(".dish-card");



dishes.forEach(function(dish){


if(category === "all"){

dish.style.display = "block";

}


else if(dish.classList.contains(category)){


dish.style.display = "block";


}

else{


dish.style.display = "none";


}



});


}




// Add To Order Function


function orderDish(dishName){


window.location.href = 
"order.html?dish=" + encodeURIComponent(dishName);



}
