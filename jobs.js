/* ==========================================
 WHITE PEAK RESTAURANT
 JOB APPLICATION SYSTEM
 JOBS.JS PART 1

 Multi Step + Required Validation
========================================== */


const steps = document.querySelectorAll(".form-step");

const nextButtons = document.querySelectorAll(".next-btn");

const previousButtons = document.querySelectorAll(".prev-btn");


const progress = document.getElementById("progress");

const currentStepText = document.getElementById("currentStep");



let currentStep = 0;




/* SHOW STEP */

function showStep(index){


steps.forEach(step=>{

step.classList.remove("active");

});



steps[index].classList.add("active");



let percent =
(index / (steps.length - 1)) * 100;



progress.style.width =
percent + "%";



if(currentStepText){

currentStepText.innerText =
index + 1;

}


}





/* REQUIRED FIELD CHECK */


function validateStep(){



let fields =
steps[currentStep].querySelectorAll(
"input[required], select[required], textarea[required]"
);



for(let field of fields){



if(field.type === "checkbox"){



if(!field.checked){


alert(
"Please accept declaration before continuing."
);


return false;


}



}

else if(field.value.trim()===""){



alert(
"Please complete all required fields."
);


field.focus();


return false;


}



}



return true;


}





/* NEXT BUTTON */


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







/* PREVIOUS BUTTON */


previousButtons.forEach(button=>{


button.addEventListener("click",()=>{


if(currentStep > 0){


currentStep--;


showStep(currentStep);


}


});


});






/* START */


showStep(0);
/* ==========================================
   CLOUDINARY UPLOAD SYSTEM
   JOBS.JS PART 2
========================================== */


const cloudName = "ppfy06ix";

const uploadPreset = "white peak restaurant";


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




const response =
await fetch(url,{

method:"POST",

body:formData

});



const data =
await response.json();



return data.secure_url;



}







async function uploadFile(inputId,fileName){



const input =
document.getElementById(inputId);



if(!input || !input.files[0]){


return "";


}



const file =
input.files[0];




/* 2MB CHECK */


if(file.size > 2 * 1024 * 1024){


alert(
file.name + " must be less than 2MB"
);


throw new Error("File size limit");


}






const url =
await uploadToCloudinary(file);



uploadedFiles[fileName] = url;



return url;



}







async function uploadAllDocuments(){



await uploadFile(
"education_document",
"Education Document"
);



await uploadFile(
"passport_document",
"Passport Document"
);



await uploadFile(
"cv_resume",
"CV Resume"
);



await uploadFile(
"passport_photo",
"Passport Photo"
);



await uploadFile(
"experience_certificate",
"Experience Certificate"
);



}
/* ==========================================
   FORMSPREE SUBMIT SYSTEM
   JOBS.JS PART 3
========================================== */



const jobForm =
document.getElementById("jobForm");





jobForm.addEventListener(
"submit",
async function(e){



e.preventDefault();



try{



/* Upload Documents First */


await uploadAllDocuments();





/* Generate Application ID */


const applicationID =

"WP" +

Math.floor(
100000 + Math.random()*900000
);






/* Collect Form Data */


const formData =
new FormData(jobForm);





/* Add Application ID */


formData.append(
"Application ID",
applicationID
);






/* Add Cloudinary Links */


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






/* Send To Formspree */


const response =

await fetch(

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



jobForm.innerHTML = `


<div class="success-message">


<h2>
Application Submitted Successfully 🎉
</h2>


<p>
Your Application ID:
</p>


<h3>
${applicationID}
</h3>


<p>
Please save this ID for tracking your application.
</p>


</div>



`;



}

else{


alert(
"Submission failed. Please try again."
);



}





}

catch(error){



console.log(error);



alert(
"Something went wrong. Please check your files."
);



}




});
