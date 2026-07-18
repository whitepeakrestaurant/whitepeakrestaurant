
// White Peak Restaurant Menu Filter


function openCategory(category){


let dishes = document.querySelectorAll(".food-box");



dishes.forEach(function(item){


if(item.classList.contains(category)){


item.style.display = "flex";


}


else{


item.style.display = "none";


}


});


}



// Show all dishes when page loads

window.onload = function(){


let dishes = document.querySelectorAll(".food-box");


dishes.forEach(function(item){

item.style.display="flex";

});


}
