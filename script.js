// White Peak Restaurant - Home Page Script

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// Feature cards animation on scroll
const cards = document.querySelectorAll(".feature-card");

const showCards = () => {
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (cardTop < screenHeight - 100) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
};


// Initial card style
cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "0.6s ease";
});


window.addEventListener("scroll", showCards);

showCards();


// Welcome message
window.addEventListener("load", () => {
    console.log("Welcome to White Peak Restaurant 🍽️");
});
