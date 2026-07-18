// White Peak Restaurant Script


// Welcome message
window.addEventListener("load", function(){

    console.log("Welcome to White Peak Restaurant 🍽️");

});




// Smooth scrolling

document.querySelectorAll("a").forEach(function(link){

    link.addEventListener("click", function(e){

        let target = this.getAttribute("href");


        if(target.startsWith("#")){

            e.preventDefault();

            let section = document.querySelector(target);


            if(section){

                section.scrollIntoView({
                    behavior:"smooth"
                });

            }

        }

    });

});






// Card animation on scroll


const elements = document.querySelectorAll(
".card, .food, .review"
);



function showAnimation(){

elements.forEach(function(item){


let position = item.getBoundingClientRect().top;

let screen = window.innerHeight;



if(position < screen - 100){

item.style.opacity="1";
item.style.transform="translateY(0)";

}


});


}




// Starting style


elements.forEach(function(item){

item.style.opacity="0";
item.style.transform="translateY(50px)";
item.style.transition="0.6s ease";

});



window.addEventListener(
"scroll",
showAnimation
);


showAnimation();





// Button click message


document.querySelectorAll(".btn").forEach(function(button){


button.addEventListener("click",function(){


console.log(
"Thank you for choosing White Peak Restaurant"
);


});


});
