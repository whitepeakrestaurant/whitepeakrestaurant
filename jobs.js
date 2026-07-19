/* ==================================
 WHITE PEAK RESTAURANT
 JOBS.JS
 MULTI STEP FORM
================================== */


document.addEventListener("DOMContentLoaded", function(){


const steps = document.querySelectorAll(".form-step");

const nextButtons = document.querySelectorAll(".next-btn");

const prevButtons = document.querySelectorAll(".prev-btn");

const progress = document.getElementById("progress");

const currentStepText = document.getElementById("currentStep");


let currentStep = 0;



function showStep(index){


steps.forEach(function(step){

step.classList.remove("active");

});


steps[index].classList.add("active");



let progressValue =
((index) / (steps.length - 1)) * 100;



if(progress){

progress.style.width = progressValue + "%";

}



if(currentStepText){

currentStepText.innerHTML = index + 1;

}



}





function checkRequired(){


let fields =
steps[currentStep].querySelectorAll("[required]");



for(let field of fields){


if(field.type === "checkbox"){


if(!field.checked){

alert("Please accept the declaration.");

return false;

}


}


else if(field.value.trim() === ""){


alert("Please fill all required fields.");

field.focus();

return false;


}


}



return true;


}






nextButtons.forEach(function(button){


button.addEventListener("click", function(){



if(checkRequired()){


if(currentStep < steps.length - 1){


currentStep++;


showStep(currentStep);


}


}



});



});






prevButtons.forEach(function(button){


button.addEventListener("click", function(){



if(currentStep > 0){


currentStep--;


showStep(currentStep);


}



});


});





// Start

showStep(0);



});
