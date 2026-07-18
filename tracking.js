const sheetURL = "https://script.google.com/macros/s/AKfycbz9rbuH43UzeuvWy40ec0ac8wkvLnQyRWgcXDRbcike7oxiUejgig1DRMG1XOgzjRPABw/exec";

async function checkStatus(){

const id=document.getElementById("applicationID").value.trim();
const email=document.getElementById("email").value.trim();

if(!id || !email){
alert("Please enter Application ID and Email.");
return;
}

try{

const response=await fetch(sheetURL);
const data=await response.json();

const applicant=data.find(item=>
item.ApplicationID===id &&
item.Email.toLowerCase()===email.toLowerCase()
);

if(!applicant){
alert("Application not found.");
return;
}

document.getElementById("result").style.display="block";

document.getElementById("name").textContent=applicant.Name;
document.getElementById("showEmail").textContent=applicant.Email;
document.getElementById("position").textContent=applicant.Position;
document.getElementById("appID").textContent=applicant.ApplicationID;
document.getElementById("date").textContent=applicant.DateApplied;

document.getElementById("adminMessage").textContent=
applicant.Message || "No message available.";

updateProgress(applicant.Status);

const box=document.querySelector(".document-box");

if(applicant.Document && applicant.Document.trim()!=""){

box.style.display="block";

document.getElementById("documentLink").href=applicant.Document;

}else{

box.style.display="none";

}

}catch(error){

console.log(error);

alert("Unable to connect with server.");

}

}

function updateProgress(status){

const steps=document.querySelectorAll(".step");

steps.forEach(step=>step.classList.remove("active"));

let current=0;

switch(status){

case "Submitted":
current=1;
break;

case "Applied":
case "Under Review":
current=2;
break;

case "In Progress":
current=3;
break;

case "Shortlisted":
current=4;
break;

case "Interview Scheduled":
current=5;
break;

case "Offer Letter Sent":
case "Offered":
current=6;
break;

case "Rejected":
case "Not Selected":
current=2;
break;

default:
current=1;

}

for(let i=0;i<current;i++){

if(steps[i]) steps[i].classList.add("active");

}

   }

function updateProgress(status){

const steps = document.querySelectorAll(".step");
const progress = document.querySelector(".progress");

steps.forEach(step => step.classList.remove("active"));

progress.className = "progress";

let current = 1;

switch(status){

case "Submitted":
current = 1;
break;

case "Under Review":
case "Applied":
current = 2;
break;

case "In Progress":
current = 3;
break;

case "Shortlisted":
current = 4;
break;

case "Interview Scheduled":
current = 5;
break;

case "Offer Letter Sent":
case "Offered":
current = 5;
break;

}

for(let i=0; i<current; i++){

steps[i].classList.add("active");

}

progress.classList.add("status-" + current);

}
