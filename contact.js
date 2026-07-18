// White Peak Restaurant Contact Form


document.querySelector("form").addEventListener("submit", function(e){


e.preventDefault();



let name = document.querySelector(
'input[placeholder="Full Name"]'
).value;



let email = document.querySelector(
'input[placeholder="Email Address"]'
).value;



let message = document.querySelector(
"textarea"
).value;



if(name === "" || email === "" || message === ""){


alert("Please fill all required fields");


return;


}




alert(
"Thank you " + name +
"! Your message has been sent successfully. Our team will contact you soon."
);



this.reset();



});
