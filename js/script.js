// // ------------------------
// // Configuration & Libraries
// // ------------------------
// const menuToggle = document.querySelector(".menu-toggle");
// const navLinks = document.querySelector(".nav-links");

// menuToggle.addEventListener("click", () => {
//     navLinks.classList.toggle("open");
// });

// // ----------------------------
// // 1. Configuration & Asset Libraries
// // ----------------------------
// const fontLibrary = [
//     { heading: "'Playfair Display', serif", body: "'Montserrat', sans-serif" },
//     { heading: "'Merriweather', serif", body: "'Work Sans', sans-serif" },
//     { heading: "'Lora', serif", body: "'Inter', sans-serif" },
//     { heading: "'Cinzel', serif", body: "'Lato', sans-serif" },
//     { heading: "'Libre Baskerville', serif", body: "'Open Sans', sans-serif" }
// ];

// const premiumColors = [
//     { bg: "#1a2a6c", accent: "#FAD390" }, // Deep Blue & Gold
//     { bg: "#2d3436", accent: "#00cec9" }, // Charcoal & Teal
//     { bg: "#4834d4", accent: "#be2edd" }, // Royal Purple
//     { bg: "#2c3e50", accent: "#e67e22" }, // Midnight & Orange
//     { bg: "#5f0f40", accent: "#fb8b24" }, // Wine & Sunset
//     { bg: "#264653", accent: "#2a9d8f" }, // Ocean & Mint
//     { bg: "#000000", accent: "#ffd700" }  // Pitch Black & Luxury Gold
// ];

// // ----------------------------
// // 2. The 5 Unique Design Architectures
// // ----------------------------
// const architecture = {
//     // 1. MODERN SPLIT: High-contrast sidebar design
//     modernSplit: (ctx, d, s) => {
//         const side = Math.random() > 0.5 ? 0 : 400;
//         ctx.fillStyle = "rgba(255,255,255,0.05)";
//         ctx.fillRect(side, 0, 200, 600);
        
//         const textX = side === 0 ? 240 : 60;
//         ctx.textAlign = "left";
//         drawText(ctx, d.event, textX, 150, 300, 20, s.font.body, "white", "5px");
//         drawText(ctx, d.name, textX, 230, 320, 60, s.font.heading, s.color.accent);
//         drawWrappedText(ctx, d.message, textX, 300, 300, s.font.body, "left");
//         drawBadge(ctx, d.amount, textX, 450, s.color.bg, s.font, false);
//     },

//     // 2. THE BADGE: Central focus inside a geometric shape
//     theBadge: (ctx, d, s) => {
//         ctx.save();
//         ctx.translate(300, 260);
//         ctx.rotate(Math.PI / 4);
//         ctx.strokeStyle = s.color.accent;
//         ctx.lineWidth = 2;
//         ctx.strokeRect(-180, -180, 360, 360);
//         ctx.restore();

//         ctx.textAlign = "center";
//         drawText(ctx, d.event, 300, 140, 400, 22, s.font.body, "white", "3px");
//         drawText(ctx, d.name, 300, 270, 340, 55, s.font.heading, "white");
//         drawBadge(ctx, d.amount, 300, 360, s.color.accent, s.font, true);
//         drawWrappedText(ctx, d.message, 300, 480, 450, s.font.body, "center");
//     },

//     // 3. FULL TYPOGRAPHY: Focus on large, bold text
//     boldImpact: (ctx, d, s) => {
//         ctx.textAlign = "center";
//         ctx.globalAlpha = 0.1;
//         drawText(ctx, "DARDEWADI", 300, 320, 580, 100, s.font.heading, "white");
//         ctx.globalAlpha = 1.0;

//         drawText(ctx, d.event.split('').join(' '), 300, 150, 500, 18, s.font.body, s.color.accent);
//         drawText(ctx, d.name, 300, 260, 550, 85, s.font.heading, "white");
//         drawWrappedText(ctx, d.message, 300, 360, 450, s.font.body, "center");
//         drawBadge(ctx, d.amount, 300, 450, s.color.bg, s.font, true);
//     },

//     // 4. THE FRAME: Elegant border-based design
//     elegantFrame: (ctx, d, s) => {
//         ctx.strokeStyle = s.color.accent;
//         ctx.lineWidth = 10;
//         ctx.strokeRect(30, 30, 540, 540);
        
//         ctx.textAlign = "center";
//         ctx.fillStyle = "white";
//         drawText(ctx, d.event, 300, 100, 400, 25, s.font.heading, "white");
//         ctx.fillRect(200, 120, 200, 2);
//         drawText(ctx, d.name, 300, 220, 480, 65, s.font.heading, s.color.accent);
//         drawWrappedText(ctx, d.message, 300, 320, 400, s.font.body, "center");
//         drawBadge(ctx, d.amount, 300, 440, s.color.accent, s.font, true);
//     },

//     // 5. THE SPOTLIGHT: Circular gradient focus
//     spotlight: (ctx, d, s) => {
//         let spot = ctx.createRadialGradient(300, 200, 50, 300, 200, 300);
//         spot.addColorStop(0, "rgba(255,255,255,0.15)");
//         spot.addColorStop(1, "transparent");
//         ctx.fillStyle = spot;
//         ctx.beginPath(); ctx.arc(300, 200, 300, 0, Math.PI*2); ctx.fill();

//         ctx.textAlign = "center";
//         drawText(ctx, d.name, 300, 210, 500, 75, s.font.heading, "white");
//         drawText(ctx, d.event, 300, 120, 400, 20, s.font.body, s.color.accent, "8px");
//         drawWrappedText(ctx, d.message, 300, 330, 400, s.font.body, "center");
//         drawBadge(ctx, d.amount, 300, 440, s.color.bg, s.font, true);
//     }
// };

// // ----------------------------
// // 3. Core Generation Engine
// // ----------------------------
// function generatePoster() {
//     const canvas = document.getElementById("posterCanvas");
//     const ctx = canvas.getContext("2d");
    
//     const data = {
//         name: document.getElementById("poster-name").value.trim().toUpperCase(),
//         event: (document.getElementById("poster-event").value.trim() || "Happy Birthday").toUpperCase(),
//         amount: document.getElementById("poster-amount").value || "100",
//         message: document.getElementById("poster-message").value.trim() || "Together we build a better village",
//         date: document.getElementById("poster-date").value
//     };

//     if (!data.name) return alert("Please enter a name");

//     // Randomize Environment
//     const s = {
//         font: fontLibrary[Math.floor(Math.random() * fontLibrary.length)],
//         color: premiumColors[Math.floor(Math.random() * premiumColors.length)],
//         archKey: Object.keys(architecture)[Math.floor(Math.random() * Object.keys(architecture).length)]
//     };

//     // Draw Background
//     drawBaseBackground(ctx, s.color.bg);

//     // Execute Architecture
//     architecture[s.archKey](ctx, data, s);

//     // Footer Branding
//     drawBranding(ctx, data.date, s.font);
// }

// // ----------------------------
// // 4. Component Helpers
// // ----------------------------
// function drawBaseBackground(ctx, color) {
//     let g = ctx.createLinearGradient(0, 0, 600, 600);
//     g.addColorStop(0, color);
//     g.addColorStop(1, "#050505");
//     ctx.fillStyle = g;
//     ctx.fillRect(0, 0, 600, 600);
    
//     // Random "Texture" (dots or lines)
//     ctx.globalAlpha = 0.05;
//     ctx.fillStyle = "white";
//     for(let i=0; i<100; i++) {
//         ctx.beginPath();
//         ctx.arc(Math.random()*600, Math.random()*600, 1, 0, Math.PI*2);
//         ctx.fill();
//     }
//     ctx.globalAlpha = 1.0;
// }

// function drawText(ctx, text, x, y, maxW, size, font, color, spacing = "0px") {
//     ctx.save();
//     ctx.fillStyle = color;
//     ctx.letterSpacing = spacing;
//     let currentSize = size;
//     ctx.font = `${currentSize}px ${font}`;
//     while (ctx.measureText(text).width > maxW && currentSize > 10) {
//         currentSize--;
//         ctx.font = `${currentSize}px ${font}`;
//     }
//     ctx.fillText(text, x, y);
//     ctx.restore();
// }

// function drawWrappedText(ctx, text, x, y, maxW, font, align) {
//     ctx.font = `300 19px ${font}`;
//     ctx.fillStyle = "rgba(255,255,255,0.8)";
//     ctx.textAlign = align;
//     const words = text.split(' ');
//     let line = '', testY = y;
//     for(let n=0; n<words.length; n++) {
//         let testLine = line + words[n] + ' ';
//         if (ctx.measureText(testLine).width > maxW && n > 0) {
//             ctx.fillText(line, x, testY);
//             line = words[n] + ' ';
//             testY += 26;
//         } else { line = testLine; }
//     }
//     ctx.fillText(line, x, testY);
// }

// function drawBadge(ctx, amt, x, y, color, font, centered) {
//     const txt = `₹${amt} CONTRIBUTION`;
//     ctx.font = `bold 15px ${font.body}`;
//     const w = ctx.measureText(txt).width + 30;
//     const rx = centered ? x - (w/2) : x;
//     ctx.fillStyle = color;
//     ctx.beginPath();
//     ctx.roundRect(rx, y-20, w, 40, 5);
//     ctx.fill();
//     ctx.fillStyle = "white";
//     ctx.textAlign = "center";
//     ctx.fillText(txt, rx + (w/2), y+5);
// }

// function drawBranding(ctx, date, font) {
//     ctx.textAlign = "center";
//     ctx.fillStyle = "rgba(255,255,255,0.3)";
//     ctx.font = `10px ${font.body}`;
//     ctx.fillText("MAZA GAV MAZA ABHIMAN", 300, 530);
//     ctx.fillStyle = "white";
//     ctx.font = `bold 20px ${font.heading}`;
//     ctx.fillText("DARDEWADI", 300, 555);
//     if(date) {
//         ctx.font = "11px sans-serif";
//         ctx.fillText(date, 300, 580);
//     }
// }

// // ------------------------
// // Utilities
// // ------------------------
// function downloadPoster() {
//     const canvas = document.getElementById("posterCanvas");
//     const link = document.createElement("a");
//     link.download = `Dardewadi_Poster_${Date.now()}.png`;
//     link.href = canvas.toDataURL("image/png");
//     link.click();
// }

// function shareWhatsapp() {
//     const msg = encodeURIComponent("I'm proud to contribute to Dardewadi village development! 🚩");
//     window.open(`https://wa.me/?text=${msg}`, "_blank");
// }

// ----------------------------
// 1. Asset Libraries
// ----------------------------
const fontLibrary = [
    { heading: "'Playfair Display', serif", body: "'Montserrat', sans-serif" },
    { heading: "'Merriweather', serif", body: "'Work Sans', sans-serif" },
    { heading: "'Lora', serif", body: "'Inter', sans-serif" },
    { heading: "'Cinzel', serif", body: "'Lato', sans-serif" },
    { heading: "'Libre Baskerville', serif", body: "'Open Sans', sans-serif" }
];

const premiumPalettes = [
    { bg: "#1a2a6c", accent: "#FAD390" }, // Royal Blue & Gold
    { bg: "#2d3436", accent: "#00cec9" }, // Charcoal & Teal
    { bg: "#4834d4", accent: "#be2edd" }, // Purple & Violet
    { bg: "#2c3e50", accent: "#e67e22" }, // Navy & Orange
    { bg: "#5f0f40", accent: "#fb8b24" }, // Wine & Sunset
    { bg: "#264653", accent: "#2a9d8f" }, // Deep Green & Mint
    { bg: "#000000", accent: "#ffd700" }, // Pitch Black & Luxury Gold
    { bg: "#212121", accent: "#8e44ad" }, // Anthracite & Amethyst
    { bg: "#273c75", accent: "#fbc531" }, // Marine & Yellow
    { bg: "#2f3640", accent: "#4cd137" }, // Slate & Neon Green
    { bg: "#0c2461", accent: "#6a89cc" }, // Midnight & Sky
    { bg: "#b71540", accent: "#ffc048" }  // Crimson & Amber
];

// ----------------------------
// 2. The 8 Layout Architectures
// ----------------------------
const layouts = {
    // 1. The Modern Sidebar
    sidebar: (ctx, d, s) => {
        ctx.fillStyle = "rgba(255,255,255,0.05)";
        ctx.fillRect(0, 0, 220, 600);
        ctx.textAlign = "left";
        drawText(ctx, d.event, 260, 150, 300, 20, s.font.body, "white", "5px");
        drawText(ctx, d.name, 260, 230, 320, 65, s.font.heading, s.accent);
        drawWrappedText(ctx, d.message, 260, 300, 300, s.font.body, "left");
        drawBadge(ctx, d.amount, 260, 460, s.accent, s.font);
    },
    // 2. The Central Diamond
    diamond: (ctx, d, s) => {
        ctx.save(); ctx.translate(300, 260); ctx.rotate(Math.PI / 4);
        ctx.strokeStyle = s.accent; ctx.lineWidth = 2;
        ctx.strokeRect(-190, -190, 380, 380); ctx.restore();
        ctx.textAlign = "center";
        drawText(ctx, d.event, 300, 140, 400, 22, s.font.body, "white", "3px");
        drawText(ctx, d.name, 300, 270, 360, 55, s.font.heading, "white");
        drawBadge(ctx, d.amount, 300, 360, s.accent, s.font);
        drawWrappedText(ctx, d.message, 300, 480, 450, s.font.body, "center");
    },
    // 3. Typography Focus
    bigType: (ctx, d, s) => {
        ctx.textAlign = "center";
        ctx.globalAlpha = 0.1;
        drawText(ctx, "CONTRIBUTOR", 300, 320, 580, 95, s.font.heading, "white");
        ctx.globalAlpha = 1.0;
        drawText(ctx, d.name, 300, 260, 550, 85, s.font.heading, "white");
        drawText(ctx, d.event, 300, 180, 400, 25, s.font.body, s.accent);
        drawBadge(ctx, d.amount, 300, 460, s.accent, s.font);
    },
    // 4. Double Frame
    framed: (ctx, d, s) => {
        ctx.strokeStyle = s.accent; ctx.lineWidth = 2;
        ctx.strokeRect(45, 45, 510, 510); ctx.strokeRect(55, 55, 490, 490);
        ctx.textAlign = "center";
        drawText(ctx, d.event, 300, 120, 400, 25, s.font.heading, "white");
        drawText(ctx, d.name, 300, 230, 480, 70, s.font.heading, s.accent);
        drawWrappedText(ctx, d.message, 300, 330, 400, s.font.body, "center");
        drawBadge(ctx, d.amount, 300, 450, s.accent, s.font);
    },
    // 5. Minimalist Left
    minimal: (ctx, d, s) => {
        ctx.textAlign = "left";
        drawText(ctx, "COMMUNITY PRIDE", 60, 100, 400, 15, s.font.body, s.accent, "6px");
        drawText(ctx, d.name, 60, 190, 500, 85, s.font.heading, "white");
        drawText(ctx, d.event, 60, 240, 400, 30, s.font.body, "rgba(255,255,255,0.6)");
        drawWrappedText(ctx, d.message, 60, 310, 480, s.font.body, "left");
        drawText(ctx, "Contribution: ₹" + d.amount, 60, 470, 400, 24, s.font.heading, s.accent);
    },
    // 6. The Ribbon Bar
    ribbon: (ctx, d, s) => {
        ctx.fillStyle = s.accent; ctx.fillRect(0, 190, 600, 90);
        ctx.textAlign = "center";
        drawText(ctx, d.name, 300, 240, 550, 65, s.font.heading, "#1a1a1a");
        drawText(ctx, d.event, 300, 150, 400, 25, s.font.body, "white", "4px");
        drawWrappedText(ctx, d.message, 300, 350, 450, s.font.body, "center");
        drawBadge(ctx, d.amount, 300, 460, s.accent, s.font);
    },
    // 7. Diagonal Split
    diagonal: (ctx, d, s) => {
        ctx.fillStyle = "rgba(255,255,255,0.03)";
        ctx.beginPath(); ctx.moveTo(600,0); ctx.lineTo(600,600); ctx.lineTo(0,600); ctx.fill();
        ctx.textAlign = "right";
        drawText(ctx, d.name, 540, 230, 500, 75, s.font.heading, s.accent);
        drawText(ctx, d.event, 540, 150, 400, 20, s.font.body, "white", "5px");
        drawWrappedText(ctx, d.message, 540, 310, 420, s.font.body, "right");
        drawBadge(ctx, d.amount, 420, 470, s.accent, s.font);
    },
    // 8. Circular Focus
    circle: (ctx, d, s) => {
        ctx.beginPath(); ctx.arc(300, 240, 180, 0, Math.PI*2);
        ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 15; ctx.stroke();
        ctx.textAlign = "center";
        drawText(ctx, d.name, 300, 250, 340, 55, s.font.heading, "white");
        drawText(ctx, d.event, 300, 140, 400, 22, s.font.body, s.accent, "8px");
        drawWrappedText(ctx, d.message, 300, 480, 450, s.font.body, "center");
        drawBadge(ctx, d.amount, 300, 340, s.accent, s.font);
    }
};

// ----------------------------
// 3. Main Generation Function
// ----------------------------
function generatePoster() {
    const canvas = document.getElementById("posterCanvas");
    const ctx = canvas.getContext("2d");
    
    const data = {
        name: document.getElementById("poster-name").value.trim().toUpperCase(),
        event: (document.getElementById("poster-event").value.trim() || "Happy Birthday").toUpperCase(),
        amount: document.getElementById("poster-amount").value || "100",
        message: document.getElementById("poster-message").value.trim() || "Together we build a better village",
        date: document.getElementById("poster-date").value
    };

    if (!data.name) return alert("Please enter your name");

    // Randomize Style Parameters
    const s = {
        font: fontLibrary[Math.floor(Math.random() * fontLibrary.length)],
        palette: premiumPalettes[Math.floor(Math.random() * premiumPalettes.length)],
        archKey: Object.keys(layouts)[Math.floor(Math.random() * Object.keys(layouts).length)]
    };
    s.bg = s.palette.bg;
    s.accent = s.palette.accent;

    // 1. Draw Background & Texture
    drawBackground(ctx, s.bg);
    
    // 2. Apply Chosen Layout Architecture
    layouts[s.archKey](ctx, data, s);
    
    // 3. Persistent Footer Branding
    drawBranding(ctx, data.date, s.font);
}

// ----------------------------
// 4. Component Drawing Helpers
// ----------------------------
function drawBackground(ctx, color) {
    let g = ctx.createRadialGradient(300, 300, 50, 300, 300, 600);
    g.addColorStop(0, color); g.addColorStop(1, "#050505");
    ctx.fillStyle = g; ctx.fillRect(0, 0, 600, 600);
    
    // Random Overlay Texture
    ctx.globalAlpha = 0.05; ctx.strokeStyle = "white";
    const type = Math.random();
    if(type > 0.6) { // Grid
        for(let i=0; i<600; i+=50) { ctx.strokeRect(i, 0, 1, 600); ctx.strokeRect(0, i, 600, 1); }
    } else { // Particles
        for(let i=0; i<40; i++) { ctx.beginPath(); ctx.arc(Math.random()*600, Math.random()*600, 1.5, 0, Math.PI*2); ctx.fill(); }
    }
    ctx.globalAlpha = 1.0;
}

function drawText(ctx, text, x, y, maxW, size, font, color, spacing = "0px") {
    ctx.save(); ctx.fillStyle = color; ctx.letterSpacing = spacing;
    let currentSize = size; ctx.font = `${currentSize}px ${font}`;
    while (ctx.measureText(text).width > maxW && currentSize > 10) {
        currentSize--; ctx.font = `${currentSize}px ${font}`;
    }
    ctx.fillText(text, x, y); ctx.restore();
}

function drawWrappedText(ctx, text, x, y, maxW, font, align) {
    ctx.font = `300 20px ${font}`; ctx.fillStyle = "rgba(255,255,255,0.8)"; ctx.textAlign = align;
    const words = text.split(' '); let line = '', testY = y;
    for(let n=0; n<words.length; n++) {
        let testLine = line + words[n] + ' ';
        if (ctx.measureText(testLine).width > maxW && n > 0) {
            ctx.fillText(line, x, testY); line = words[n] + ' '; testY += 28;
        } else { line = testLine; }
    }
    ctx.fillText(line, x, testY);
}

function drawBadge(ctx, amt, x, y, color, font) {
    const txt = `₹${amt} CONTRIBUTION`;
    ctx.font = `bold 15px ${font.body}`;
    const w = ctx.measureText(txt).width + 40;
    const align = ctx.textAlign;
    let rx = (align === "center") ? x - (w/2) : (align === "right") ? x - w : x;
    
    ctx.fillStyle = color; ctx.beginPath(); ctx.roundRect(rx, y-22, w, 44, 8); ctx.fill();
    ctx.fillStyle = "#1a1a1a"; ctx.textAlign = "center";
    ctx.fillText(txt, rx + (w/2), y+5);
}

function drawBranding(ctx, date, font) {
    ctx.textAlign = "center"; ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = `11px ${font.body}`; ctx.fillText("MAZA GAV MAZA ABHIMAN", 300, 545);
    ctx.fillStyle = "white"; ctx.font = `bold 22px ${font.heading}`;
    ctx.fillText("DARDEWADI", 300, 570);
    if(date) { ctx.font = "11px sans-serif"; ctx.fillText(date, 300, 590); }
}

// ----------------------------
// 5. Action Handlers
// ----------------------------
function downloadPoster() {
    const canvas = document.getElementById("posterCanvas");
    const link = document.createElement("a");
    link.download = `Dardewadi_Contribution_${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
}

function shareWhatsapp() {
    const name = document.getElementById("poster-name").value || "A contributor";
    const msg = encodeURIComponent(`Check out ${name}'s contribution to Dardewadi village development! 🎉 🚩`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
}