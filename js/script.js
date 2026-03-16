// ------------------------
// Hamburger Menu Toggle
// ------------------------
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

const fontLibrary = [
    { heading: "'Playfair Display', serif", body: "'Montserrat', sans-serif" },
    { heading: "'Merriweather', serif", body: "'Work Sans', sans-serif" },
    { heading: "'Lora', serif", body: "'Inter', sans-serif" },
    { heading: "'Libre Baskerville', serif", body: "'Open Sans', sans-serif" },
    { heading: "'Cinzel', serif", body: "'Lato', sans-serif" }
];

const premiumColors = [
    "#1a2a6c", "#2d3436", "#4834d4", "#2c3e50",
    "#6d597a", "#355070", "#b56576", "#5f0f40",
    "#264653", "#2a9d8f", "#7678ed", "#4361ee"
];

function drawScalableText(ctx, text, x, y, maxWidth, baseSize, fontFace) {
    let fontSize = baseSize;
    ctx.font = `${fontSize}px ${fontFace}`;
    while (ctx.measureText(text).width > maxWidth && fontSize > 12) {
        fontSize--;
        ctx.font = `${fontSize}px ${fontFace}`;
    }
    ctx.fillText(text, x, y);
}

function fillRoundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
}

// ------------------------
// Generate Poster
// ------------------------
function generatePoster() {
    const name = document.getElementById("poster-name").value.trim();
    const date = document.getElementById("poster-date").value;
    const eventText = document.getElementById("poster-event").value.trim() || "Happy Birthday";
    const amount = document.getElementById("poster-amount").value || "100";
    const message = document.getElementById("poster-message").value.trim() || "Together we build a better village";

    if (!name) { alert("Please enter your name"); return; }

    const canvas = document.getElementById("posterCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 600;
    
    // Pick random styles
    const stylePair = fontLibrary[Math.floor(Math.random() * fontLibrary.length)];
    const centerX = canvas.width / 2;
    const baseColor = premiumColors[Math.floor(Math.random() * premiumColors.length)];

    // 1. Background
    ctx.save();
    let bgGrad = ctx.createLinearGradient(0, 0, 600, 600);
    bgGrad.addColorStop(0, baseColor);
    bgGrad.addColorStop(1, "#0a0a0a");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 600, 600);
    ctx.restore();

    // 2. Glass Panel
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    fillRoundRect(ctx, 40, 40, 520, 520, 25);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 3. Text Setup
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 10;

    // Header
    ctx.fillStyle = "white";
    drawScalableText(ctx, eventText.toUpperCase(), centerX, 110, 380, 26, stylePair.heading);

    // Name
    ctx.fillStyle = "#E5D1B0";
    drawScalableText(ctx, name, centerX, 190, 460, 58, stylePair.heading);

    // Message
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = `italic 22px ${stylePair.body}`;
    const wrappedMsg = message.match(/.{1,38}(\s|$)/g);
    wrappedMsg.forEach((line, i) => {
        ctx.fillText(line.trim(), centerX, 290 + (i * 32));
    });

    // 4. Contribution Badge
    ctx.shadowBlur = 0;
    const badgeTxt = `₹${amount} CONTRIBUTION`;
    ctx.font = `bold 18px ${stylePair.body}`;
    const bWidth = ctx.measureText(badgeTxt).width + 46;
    ctx.save();
    ctx.translate(centerX, 415);
    ctx.fillStyle = "white";
    fillRoundRect(ctx, -(bWidth / 2), -22, bWidth, 44, 12);
    ctx.fillStyle = "#1a1a1a";
    ctx.fillText(badgeTxt, 0, 0);
    ctx.restore();

    // 5. CONSTANT FOOTER
    ctx.fillStyle = "white";
    drawScalableText(ctx, "MAZA GAV MAZA ABHIMAN", centerX, 485, 440, 22, stylePair.heading);

    ctx.font = `600 17px ${stylePair.body}`;
    ctx.letterSpacing = "5px";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillText("DARDEWADI", centerX, 515);
    ctx.letterSpacing = "0px";

    if (date) {
        ctx.font = `14px ${stylePair.body}`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillText(date, centerX, 545);
    }

    drawDecorations(ctx);
}

function drawDecorations(ctx) {
    const icons = ["🌸", "🌹", "🌺", "🎂", "🎁", "🎉", "✨", "🎈"];
    ctx.save();
    for (let i = 0; i < 35; i++) {
        const size = 18 + Math.random() * 12;
        ctx.font = `${size}px serif`;
        ctx.globalAlpha = 0.5;
        let x, y;
        const side = Math.floor(Math.random() * 4);
        if (side === 0) { x = Math.random() * 600; y = Math.random() * 80; }
        else if (side === 1) { x = Math.random() * 600; y = 520 + Math.random() * 80; }
        else if (side === 2) { x = Math.random() * 80; y = Math.random() * 600; }
        else { x = 520 + Math.random() * 80; y = Math.random() * 600; }
        ctx.fillText(icons[Math.floor(Math.random() * icons.length)], x, y);
    }
    ctx.restore();
}

function downloadPoster() {
    const canvas = document.getElementById("posterCanvas");
    const link = document.createElement("a");
    link.download = `Birthday_Poster_${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
}

function shareWhatsapp() {
    const msg = encodeURIComponent("I contributed to Dardewadi village development on my birthday! 🎉");
    window.open(`https://wa.me/?text=${msg}`, "_blank");
}