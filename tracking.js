/* ==========================================
   WHITE PEAK RESTAURANT
   APPLICATION TRACKING SYSTEM
   PART 1
========================================== */

const sheetURL =
"https://script.google.com/macros/s/AKfycbz9rbuH43UzeuvWy40ec0ac8wkvLnQyRWgcXDRbcike7oxiUejgig1DRMG1XOgzjRPABw/exec";


async function checkStatus(){


const applicationID =
document.getElementById("applicationID").value.trim();


const email =
document.getElementById("email").value.trim();



if(applicationID==="" || email===""){

alert("Please enter Application ID and Email.");

return;

}



try{


const response = await fetch(sheetURL);

const data = await response.json();



const applicant = data.find(function(item){

return (

item.ApplicationID === applicationID &&

item.Email.toLowerCase() === email.toLowerCase()

);

});



if(!applicant){

alert("Application not found.");

return;

}



/* SHOW RESULT */

document.getElementById("result").style.display="block";



/* BASIC DETAILS */

document.getElementById("name").textContent =
applicant.Name;


document.getElementById("showEmail").textContent =
applicant.Email;


document.getElementById("position").textContent =
applicant.Position;


document.getElementById("appID").textContent =
applicant.ApplicationID;


document.getElementById("date").textContent =
applicant.DateApplied;



/* HR MESSAGE */

document.getElementById("adminMessage").textContent =
applicant.Message || "No message available.";



/* DOCUMENT */

const documentBox =
document.querySelector(".document-box");

if(applicant.Document &&
applicant.Document.trim() !== ""){

documentBox.style.display="block";

document.getElementById("documentLink").href =
applicant.Document;

}else{

documentBox.style.display="none";

}



/* UPDATE STATUS */

updateProgress(applicant.Status);



}
catch(error){

console.error(error);

alert("Unable to connect to the server.");

}

}
/* ==========================================
   STATUS TIMELINE
========================================== */

function updateProgress(status){

const progress =
document.querySelector(".progress");

const steps =
document.querySelectorAll(".step");

const rejectedBox =
document.querySelector(".rejected");


/* Reset */

steps.forEach(function(step){

step.classList.remove("active");

});

progress.className="progress";

if(rejectedBox){

rejectedBox.style.display="none";

}


/* Status Number */

let current=1;


switch(status){

case "Submitted":
current=1;
break;

case "Applied":
current=2;
break;

case "Under Review":
current=3;
break;

case "In Progress":
current=4;
break;

case "Shortlisted":
current=5;
break;

case "Interview Scheduled":
current=6;
break;

case "Offer Letter Sent":
case "Offered":
current=7;
break;

case "Completed":
current=8;
break;


/* Rejected */

case "Rejected":

case "Not Selected":

if(rejectedBox){

rejectedBox.style.display="block";

rejectedBox.innerHTML=
"❌ Your application was not selected.";

}

current=3;

break;

default:

current=1;

}


/* Green Steps */

for(let i=0;i<current;i++){

if(steps[i]){

steps[i].classList.add("active");

}

}


/* Green Line */

progress.classList.add(

"status-"+current

);

}
