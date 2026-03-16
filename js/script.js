// ------------------------
// Hamburger Menu Toggle
// ------------------------
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open"); // <--- change here
});

// ------------------------
// Birthday Poster Data
// ------------------------
const messages = [
    "Celebrating my birthday by giving back to my village",
    "Proud to support village development",
    "My birthday gift to my village",
    "Together we build a better village",
    "A small contribution for a big future",
    "Serving my village with pride",
    "Village first, always",
    "Building our future together",
    "One village, one dream",
    "Giving back to my roots"
];

const backgrounds = [
    "#2d6a4f","#3a5a40","#344e41","#588157","#bc6c25",
    "#6a4c93","#457b9d","#1d3557","#e07a5f","#6d597a",
    "#4d908e","#264653","#b56576","#6b705c","#f4a261"
];

// ------------------------
// Generate Poster
// ------------------------
function generatePoster() {
    const name = document.getElementById("poster-name").value.trim();
    const date = document.getElementById("poster-date").value;

    if(!name){
        alert("Please enter your name");
        return;
    }

    const canvas = document.getElementById("posterCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 600;
    canvas.height = 600;

    ctx.clearRect(0,0,600,600);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const centerX = 300;
    const titleY = 120;
    const nameY = 220;
    const messageY = 340;
    const footer1 = 460;
    const footer2 = 500;
    const footer3 = 540;

    const bg = backgrounds[Math.floor(Math.random()*backgrounds.length)];
    const message = messages[Math.floor(Math.random()*messages.length)];
    const style = Math.floor(Math.random()*10);

    ctx.fillStyle = bg;
    ctx.fillRect(0,0,600,600);

    ctx.fillStyle = "white";
    ctx.font = "bold 42px Merriweather";
    ctx.fillText("Happy Birthday", centerX, titleY);

    ctx.font = "bold 36px Work Sans";
    ctx.fillText(name, centerX, nameY, 500);

    ctx.font = "22px Work Sans";
    ctx.fillText(message, centerX, messageY, 500);

    ctx.font = "20px Work Sans";
    ctx.fillText("₹100 contribution", centerX, footer1);

    ctx.font = "22px Merriweather";
    ctx.fillText("Maza Gav Maza Abhiman", centerX, footer2);

    if(date){
        ctx.font = "18px Work Sans";
        ctx.fillText(date, centerX, footer3);
    }
}

// ------------------------
// Download Poster
// ------------------------
function downloadPoster() {
    const canvas = document.getElementById("posterCanvas");
    const link = document.createElement("a");
    link.download = "birthday_poster.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

// ------------------------
// Share on WhatsApp
// ------------------------
function shareWhatsapp() {
    const encodedMessage = encodeURIComponent(
        "Check out my birthday contribution poster for village development! 🎉"
    );
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
}