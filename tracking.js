// White Peak Restaurant Application Tracking


// یہاں بعد میں Google Apps Script URL لگائیں گے
const sheetURL = "https://script.google.com/macros/s/AKfycbz9rbuH43UzeuvWy40ec0ac8wkvLnQyRWgcXDRbcike7oxiUejgig1DRMG1XOgzjRPABw/exec";



async function checkStatus(){


let applicationID =
document.getElementById("applicationID").value.trim();


let email =
document.getElementById("email").value.trim();



if(applicationID === "" || email === ""){


alert("Please enter Application ID and Email");

return;

}





try{


let response = await fetch(sheetURL);


let data = await response.json();





let applicant = data.find(function(row){


return (

row.ApplicationID === applicationID &&

row.Email.toLowerCase() === email.toLowerCase()

);


});





if(applicant){



// Show Result

document.getElementById("result").style.display="block";




// Applicant Information


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





// Document PDF/Image


document.getElementById("documentLink").href =
applicant.Document;





// Update Status


updateProgress(applicant.Status);



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
"Unable to connect with server."
);


}



}








function updateProgress(status){


let steps =
document.querySelectorAll(".step");



steps.forEach(function(step){

step.classList.remove("active");

});




let current = 0;



if(status=="Submitted" || status=="Applied"){

current=1;

}


else if(status=="Under Review" || status=="In Progress"){

current=2;

}



else if(status=="Shortlisted"){

current=3;

}



else if(status=="Interview Scheduled"){

current=4;

}



else if(status=="Offered" || status=="Offer Letter Sent"){

current=5;

}




for(let i=0;i<current;i++){

steps[i].classList.add("active");

}



}
