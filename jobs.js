/* ==========================================
 WHITE PEAK RESTAURANT
 JOB APPLICATION SYSTEM
 FINAL JOBS.JS
========================================== */


/* =========================
 MULTI STEP FORM
========================= */

const steps = document.querySelectorAll(".form-step");

const nextButtons = document.querySelectorAll(".next-btn");

const prevButtons = document.querySelectorAll(".prev-btn");

const progress = document.getElementById("progress");

const currentStepText = document.getElementById("currentStep");


let currentStep = 0;



function showStep(index){

    steps.forEach(step=>{
        step.classList.remove("active");
    });


    steps[index].classList.add("active");


    let percent =
    (index / (steps.length - 1)) * 100;


    progress.style.width = percent + "%";


    if(currentStepText){
        currentStepText.innerText = index + 1;
    }

}




function validateStep(){


    let fields =
    steps[currentStep].querySelectorAll(
    "input[required], select[required], textarea[required]"
    );


    for(let field of fields){


        if(field.type === "checkbox"){

            if(!field.checked){

                alert("Please accept declaration.");

                return false;

            }


        }else{


            if(field.value.trim() === ""){

                alert(
                "Please complete all required fields."
                );

                field.focus();

                return false;

            }

        }


    }


    return true;

}





nextButtons.forEach(btn=>{


btn.addEventListener("click",()=>{


    if(validateStep()){


        if(currentStep < steps.length - 1){

            currentStep++;

            showStep(currentStep);

        }


    }


});


});





prevButtons.forEach(btn=>{


btn.addEventListener("click",()=>{


    if(currentStep > 0){

        currentStep--;

        showStep(currentStep);

    }


});


});



showStep(0);






/* =========================
 CLOUDINARY SETTINGS
========================= */


const cloudName = "ppfy06ix";

const uploadPreset = "restaurant";


let uploadedFiles = {};





async function uploadCloudinary(file){


const url =
`https://api.cloudinary.com/v1_1/${cloudName}/upload`;



let data = new FormData();


data.append(
"file",
file
);


data.append(
"upload_preset",
uploadPreset
);



let response =
await fetch(url,{

method:"POST",

body:data

});


let result =
await response.json();



return result.secure_url;


}





async function uploadFile(id,name){


let input =
document.getElementById(id);



if(!input || !input.files[0]){

return "";

}



let file =
input.files[0];



if(file.size > 2 * 1024 * 1024){


alert(
file.name+" must be less than 2MB"
);


throw new Error("File too large");


}



let link =
await uploadCloudinary(file);



uploadedFiles[name]=link;



return link;


}






async function uploadDocuments(){


await uploadFile(
"resume",
"CV"
);


await uploadFile(
"photo",
"Passport Photo"
);


await uploadFile(
"educationDocument",
"Education"
);


await uploadFile(
"passportFile",
"Passport"
);


await uploadFile(
"experienceCertificate",
"Experience Certificate"
);


}







/* =========================
 FORMSPREE SUBMIT
========================= */


const form =
document.getElementById("jobForm");



form.addEventListener(
"submit",
async function(e){


e.preventDefault();



try{


await uploadDocuments();




let applicationID =
"WP" +
Math.floor(
100000 + Math.random()*900000
);




let formData =
new FormData(form);



formData.append(
"Application ID",
applicationID
);



formData.append(
"CV",
uploadedFiles["CV"] || ""
);


formData.append(
"Passport Photo",
uploadedFiles["Passport Photo"] || ""
);


formData.append(
"Education",
uploadedFiles["Education"] || ""
);


formData.append(
"Passport",
uploadedFiles["Passport"] || ""
);


formData.append(
"Experience Certificate",
uploadedFiles["Experience Certificate"] || ""
);






let response =
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


form.innerHTML = `

<div class="success-message" style="display:block">

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
Save this ID for application tracking.
</p>

</div>

`;


}else{


alert(
"Submission failed. Try again."
);


}



}catch(error){


console.log(error);


alert(
"Error submitting application."
);


}



});
