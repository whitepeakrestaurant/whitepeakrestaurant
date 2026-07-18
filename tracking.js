// White Peak Restaurant Application Tracking


// Google Apps Script Web App URL
const sheetURL = "YOUR_GOOGLE_SCRIPT_URL";





async function checkStatus(){


let id = document.getElementById("applicationID").value;

let email = document.getElementById("email").value;



if(id === "" || email === ""){

alert("Please enter Application ID and Email");

return;

}




try{


let response = await fetch(sheetURL);


let data = await response.json();





let applicant = data.find(function(item){


return (

item.ApplicationID === id &&

item.Email.toLowerCase() === email.toLowerCase()


);


});






if(applicant){



// Show Result


document.getElementById("result").style.display="block";




// Applicant Details


document.getElementById("name").innerHTML =
applicant.Name;



document.getElementById("showEmail").innerHTML =
applicant.Email;



document.getElementById("position").innerHTML =
applicant.Position;



document.getElementById("appID").innerHTML =
applicant.ApplicationID;



document.getElementById("date").innerHTML =
applicant.DateApplied;



// Admin Message


document.getElementById("adminMessage").innerHTML =
applicant.Message;





// Document


document.getElementById("documentLink").href =
applicant.Document;





// Status Progress


updateStatus(applicant.Status);





}

else{


alert(
"Application not found. Please check your Application ID and Email."
);


}



}

catch(error){


console.log(error);


alert(
"Server connection error."
);


}



}









function updateStatus(status){



let steps = document.querySelectorAll(".step");



steps.forEach(function(step){

step.classList.remove("active");

});





let statusNumber = 0;



if(status==="Submitted" || status==="Applied"){

statusNumber=1;

}


else if(status==="Under Review" || status==="In Progress"){

statusNumber=2;

}


else if(status==="Shortlisted"){

statusNumber=3;

}


else if(status==="Interview Scheduled"){

statusNumber=4;

}


else if(status==="Offered" || status==="Offer Letter Sent"){

statusNumber=5;

}





for(let i=0;i<statusNumber;i++){

steps[i].classList.add("active");

}



}
