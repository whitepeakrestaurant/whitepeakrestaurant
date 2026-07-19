document.addEventListener("DOMContentLoaded", function(){


const steps = document.querySelectorAll(".form-step");

const nextButtons = document.querySelectorAll(".next-btn");

const prevButtons = document.querySelectorAll(".prev-btn");

const progress = document.getElementById("progress");

const stepNumber = document.getElementById("stepNumber");


let currentStep = 0;



// SHOW STEP

function showStep(index){


steps.forEach(step=>{

step.classList.remove("active");

});


steps[index].classList.add("active");



let percent =

((index)/(steps.length-1))*100;



progress.style.width = percent + "%";



stepNumber.innerHTML = index + 1;



}




// REQUIRED CHECK


function validateStep(){


let inputs =

steps[currentStep].querySelectorAll("[required]");



for(let input of inputs){


if(input.type === "checkbox"){


if(!input.checked){

alert("Please accept declaration.");

return false;

}


}



else if(input.value.trim()===""){


alert("Please complete all required fields.");

input.focus();

return false;


}



}



return true;


}





// NEXT BUTTON


nextButtons.forEach(button=>{


button.addEventListener("click",()=>{


if(validateStep()){


if(currentStep < steps.length-1){


currentStep++;


showStep(currentStep);


}



}



});


});






// PREVIOUS BUTTON


prevButtons.forEach(button=>{


button.addEventListener("click",()=>{


if(currentStep > 0){


currentStep--;


showStep(currentStep);


}



});


});






/* ===========================
CLOUDINARY SETTINGS
=========================== */


const cloudName = "ppfy06ix";

const uploadPreset = "white peak restaurant";



let uploadedFiles = {};





async function uploadFile(file){



let url =

`https://api.cloudinary.com/v1_1/${cloudName}/upload`;



let formData = new FormData();



formData.append("file",file);


formData.append(
"upload_preset",
uploadPreset
);



let response = await fetch(url,{

method:"POST",

body:formData

});



let data = await response.json();



return data.secure_url;



}






async function uploadDocuments(){



let files = [

["education_document","Education Document"],

["passport_document","Passport Document"],

["cv_resume","CV Resume"],

["passport_photo","Passport Photo"],

["experience_certificate","Experience Certificate"]

];




for(let item of files){



let input =
document.getElementById(item[0]);



if(input && input.files.length > 0){



let file = input.files[0];



if(file.size > 2*1024*1024){


alert(file.name+" size must be less than 2MB");

throw new Error("Large file");


}




let link =
await uploadFile(file);



uploadedFiles[item[1]]=link;



}



}



}








// FORMSPREE SUBMIT


const form = document.getElementById("jobForm");



form.addEventListener("submit", async function(e){



e.preventDefault();




try{



await uploadDocuments();




let formData = new FormData(form);




formData.append(

"Education Document",

uploadedFiles["Education Document"] || ""

);



formData.append(

"Passport Document",

uploadedFiles["Passport Document"] || ""

);



formData.append(

"CV Resume",

uploadedFiles["CV Resume"] || ""

);



formData.append(

"Passport Photo",

uploadedFiles["Passport Photo"] || ""

);



formData.append(

"Experience Certificate",

uploadedFiles["Experience Certificate"] || ""

);






let response = await fetch(

"https://formspree.io/f/xeeygoev",

{

method:"POST",

body:formData,

headers:{

"Accept":"application/json"

}

}

);





if(response.ok){


form.innerHTML = `


<h2 style="color:#d4af37;text-align:center">

Application Submitted Successfully 🎉

</h2>


<p style="text-align:center">

Thank you for applying at White Peak Restaurant.

</p>


`;



}

else{


alert("Form submission failed.");

}



}

catch(error){


console.log(error);


alert(
"Upload failed. Check Cloudinary settings."
);


}




});






// START

showStep(0);



});
