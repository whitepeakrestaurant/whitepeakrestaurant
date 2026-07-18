// White Peak Restaurant JavaScript


// Page loading message

window.addEventListener("load", function(){

    console.log("White Peak Restaurant Website Loaded 🍽️");

});





// Smooth scrolling effect

document.querySelectorAll("a").forEach(link => {


    link.addEventListener("click", function(e){


        let page = this.getAttribute("href");


        // Only smooth scroll for same page links

        if(page.startsWith("#")){


            e.preventDefault();


            let section = document.querySelector(page);


            if(section){

                section.scrollIntoView({
                    behavior:"smooth"
                });

            }

        }


    });


});







// Animation on scroll


const animatedItems = document.querySelectorAll(
".feature-card, .dish, .review"
);



animatedItems.forEach(item => {

    item.style.opacity="0";
    item.style.transform="translateY(40px)";
    item.style.transition="0.7s ease";

});




function revealItems(){


animatedItems.forEach(item => {


let position = item.getBoundingClientRect().top;

let windowHeight = window.innerHeight;



if(position < windowHeight - 80){


item.style.opacity="1";

item.style.transform="translateY(0)";


}



});


}



window.addEventListener(
"scroll",
revealItems
);


revealItems();






// Button click effects


const buttons = document.querySelectorAll(".btn");


buttons.forEach(button => {


button.addEventListener("click",()=>{


console.log("Thank you for visiting White Peak Restaurant");


});


});
