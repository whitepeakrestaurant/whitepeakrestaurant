/* ==========================================
   WHITE PEAK RESTAURANT
   JOB APPLICATION SYSTEM
   JOBS.JS PART 1
========================================== */


/* MULTI STEP FORM */

const steps = document.querySelectorAll(".form-step");

const nextButtons = document.querySelectorAll(".next-btn");

const prevButtons = document.querySelectorAll(".prev-btn");

const progress = document.getElementById("progress");

const currentStepText = document.getElementById("currentStep");


let currentStep = 0;



function showStep(index){

steps.forEach((step)=>{

step.classList.remove("active");

});


steps[index].classList.add("active");



let percent = ((index)/(steps.length-1))*100;


progress.style.width = percent + "%";


currentStepText.innerText = index + 1;


}



nextButtons.forEach(button=>{


button.addEventListener("click",()=>{


if(currentStep < steps.length-1){

currentStep++;

showStep(currentStep);

}


});


});




prevButtons.forEach(button=>{


button.addEventListener("click",()=>{


if(currentStep > 0){

currentStep--;

showStep(currentStep);

}


});


});



showStep(currentStep);





/* =====================================
   CLOUDINARY SETTINGS
===================================== */


const cloudName = "ppfy06ix";

const uploadPreset = "restaurant";



let uploadedFiles = {};



async function uploadToCloudinary(file){


const url =
`https://api.cloudinary.com/v1_1/${cloudName}/upload`;



const formData = new FormData();


formData.append(
"file",
file
);


formData.append(
"upload_preset",
uploadPreset
);



const response = await fetch(url,{

method:"POST",

body:formData

});



const data = await response.json();



return data.secure_url;


}
/* =====================================
   CLOUDINARY FILE UPLOAD SYSTEM
   PART 2
===================================== */


const fileInputs = {

    resume: "resume",
    photo: "photo",
    education: "educationDocument",
    passport: "passportFile",
    experience: "experienceCertificate"

};



async function handleUpload(inputId, key){


const input = document.getElementById(inputId);


if(!input || !input.files[0]){

return "";

}


const file = input.files[0];



/* 2 MB CHECK */

if(file.size > 2 * 1024 * 1024){

alert(
file.name + " size must be less than 2MB"
);

input.value="";

return "";

}



/* Upload Progress */

const progressBar =
document.getElementById("uploadProgress");



try{


progressBar.style.width="30%";



const url =
await uploadToCloudinary(file);



uploadedFiles[key] = url;



progressBar.style.width="100%";



console.log(
key,
url
);



return url;



}catch(error){


console.log(error);


alert(
"Upload failed: " + file.name
);


return "";

}


}




/* UPLOAD ALL DOCUMENTS */


async function uploadAllFiles(){



await handleUpload(
"resume",
"CV"
);



await handleUpload(
"photo",
"PassportPhoto"
);



await handleUpload(
"educationDocument",
"Education"
);



await handleUpload(
"passportFile",
"Passport"
);



await handleUpload(
"experienceCertificate",
"ExperienceCertificate"
);



return uploadedFiles;



}
/* =====================================
   FORMSPREE SUBMIT SYSTEM
   PART 3
===================================== */


const jobForm = document.getElementById("jobForm");


jobForm.addEventListener("submit", async function(e){


e.preventDefault();



/* Upload Files First */

await uploadAllFiles();



/* Create Application ID */

const applicationID =
"WP" + Math.floor(100000 + Math.random()*900000);



/* Collect Form Data */

const formData = new FormData(jobForm);



formData.append(
"Application ID",
applicationID
);



/* Add Cloudinary Links */


formData.append(
"CV Link",
uploadedFiles.CV || ""
);


formData.append(
"Passport Photo Link",
uploadedFiles.PassportPhoto || ""
);


formData.append(
"Education Document Link",
uploadedFiles.Education || ""
);


formData.append(
"Passport Document Link",
uploadedFiles.Passport || ""
);


formData.append(
"Experience Certificate Link",
uploadedFiles.ExperienceCertificate || ""
);



try{


const response = await fetch(

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



jobForm.style.display="none";



document.querySelector(".form-container").innerHTML += `

<div class="success-message" style="display:block">

<h2>Application Submitted Successfully 🎉</h2>

<p>Your Application ID:</p>

<h3>${applicationID}</h3>

<p>
Please save this ID to track your application status.
</p>

</div>

`;



}else{


alert(
"Submission failed. Please try again."
);


}



}catch(error){


console.log(error);


alert(
"Something went wrong."
);


}



});
/* =====================================
   FINAL FORM IMPROVEMENTS
   PART 4
===================================== */


/* SUBMIT BUTTON LOADING */

const submitButton =
document.querySelector(".submit-btn");


if(submitButton){

submitButton.addEventListener("click",function(){

this.innerHTML =
"Submitting... Please wait";

this.disabled = true;

});

}



/* FILE TYPE CHECK */

function checkFileType(file){

const allowed = [

"application/pdf",

"image/jpeg",

"image/png",

"application/msword",

"application/vnd.openxmlformats-officedocument.wordprocessingml.document"

];


return allowed.includes(file.type);

}




/* VALIDATE ALL FILES */


function validateFiles(){


const inputs = [

"resume",

"photo",

"educationDocument",

"passportFile",

"experienceCertificate"

];


for(let id of inputs){


const input =
document.getElementById(id);



if(input && input.files.length){


const file =
input.files[0];



if(!checkFileType(file)){


alert(
"Invalid file type: " + file.name
);


return false;

}



if(file.size > 2 * 1024 * 1024){


alert(
file.name + " must be less than 2MB"
);


return false;

}


}


}


return true;

  }
