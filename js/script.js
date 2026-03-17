/**
 * --------------------------------------------------------
 * 1. NAVIGATION & UI LOGIC
 * --------------------------------------------------------
 */
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navLinks.classList.toggle("open");
        });

        // Close menu when clicking a link
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => navLinks.classList.remove("open"));
        });

        // Close menu when clicking anywhere else
        document.addEventListener("click", () => navLinks.classList.remove("open"));
    }
    const dateInput = document.getElementById("poster-date");
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        
        // Input type="date" requires yyyy-mm-dd format to display
        dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
});

/**
 * --------------------------------------------------------
 * 2. ASSET LIBRARIES
 * --------------------------------------------------------
 */
const fontLibrary = [
    { heading: "Playfair Display", body: "Montserrat" },
    { heading: "Merriweather", body: "Work Sans" },
    { heading: "Lora", body: "Inter" },
    { heading: "Cinzel", body: "Lato" },
    { heading: "Libre Baskerville", body: "Open Sans" }
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

/**
 * --------------------------------------------------------
 * 3. THE 8 LAYOUT ARCHITECTURES
 * --------------------------------------------------------
 */
const layouts = {
    sidebar: (ctx, d, s) => {
        ctx.fillStyle = "rgba(255,255,255,0.05)";
        ctx.fillRect(0, 0, 220, 600);
        ctx.textAlign = "left";
        drawText(ctx, d.event, 260, 150, 300, 20, s.font.body, "white", "5px");
        drawText(ctx, d.name, 260, 230, 320, 65, s.font.heading, s.accent);
        drawWrappedText(ctx, d.message, 260, 300, 300, s.font.body, "left");
        drawBadge(ctx, d.amount, 260, 460, s.accent, s.font, "left");
    },
    diamond: (ctx, d, s) => {
        ctx.save(); ctx.translate(300, 260); ctx.rotate(Math.PI / 4);
        ctx.strokeStyle = s.accent; ctx.lineWidth = 2;
        ctx.strokeRect(-190, -190, 380, 380); ctx.restore();
        ctx.textAlign = "center";
        drawText(ctx, d.event, 300, 140, 400, 22, s.font.body, "white", "3px");
        drawText(ctx, d.name, 300, 270, 360, 55, s.font.heading, "white");
        drawBadge(ctx, d.amount, 300, 360, s.accent, s.font, "center");
        drawWrappedText(ctx, d.message, 300, 480, 450, s.font.body, "center");
    },
    bigType: (ctx, d, s) => {
        ctx.textAlign = "center";
        ctx.globalAlpha = 0.1;
        drawText(ctx, "CONTRIBUTOR", 300, 320, 580, 95, s.font.heading, "white");
        ctx.globalAlpha = 1.0;
        drawText(ctx, d.name, 300, 260, 550, 85, s.font.heading, "white");
        drawText(ctx, d.event, 300, 180, 400, 25, s.font.body, s.accent);
        drawBadge(ctx, d.amount, 300, 460, s.accent, s.font, "center");
    },
    framed: (ctx, d, s) => {
        ctx.strokeStyle = s.accent; ctx.lineWidth = 2;
        ctx.strokeRect(45, 45, 510, 510); ctx.strokeRect(55, 55, 490, 490);
        ctx.textAlign = "center";
        drawText(ctx, d.event, 300, 120, 400, 25, s.font.heading, "white");
        drawText(ctx, d.name, 300, 230, 480, 70, s.font.heading, s.accent);
        drawWrappedText(ctx, d.message, 300, 330, 400, s.font.body, "center");
        drawBadge(ctx, d.amount, 300, 450, s.accent, s.font, "center");
    },
    minimal: (ctx, d, s) => {
        ctx.textAlign = "left";
        drawText(ctx, "COMMUNITY PRIDE", 60, 100, 400, 15, s.font.body, s.accent, "6px");
        drawText(ctx, d.name, 60, 190, 500, 85, s.font.heading, "white");
        drawText(ctx, d.event, 60, 240, 400, 30, s.font.body, "rgba(255,255,255,0.6)");
        drawWrappedText(ctx, d.message, 60, 310, 480, s.font.body, "left");
        drawBadge(ctx, d.amount, 60, 470, s.accent, s.font, "left");
    },
    ribbon: (ctx, d, s) => {
        ctx.fillStyle = s.accent; ctx.fillRect(0, 190, 600, 90);
        ctx.textAlign = "center";
        drawText(ctx, d.name, 300, 240, 550, 65, s.font.heading, "#1a1a1a");
        drawText(ctx, d.event, 300, 150, 400, 25, s.font.body, "white", "4px");
        drawWrappedText(ctx, d.message, 300, 350, 450, s.font.body, "center");
        drawBadge(ctx, d.amount, 300, 460, s.accent, s.font, "center");
    },
    diagonal: (ctx, d, s) => {
        ctx.fillStyle = "rgba(255,255,255,0.03)";
        ctx.beginPath(); ctx.moveTo(600,0); ctx.lineTo(600,600); ctx.lineTo(0,600); ctx.fill();
        ctx.textAlign = "right";
        drawText(ctx, d.name, 540, 230, 500, 75, s.font.heading, s.accent);
        drawText(ctx, d.event, 540, 150, 400, 20, s.font.body, "white", "5px");
        drawWrappedText(ctx, d.message, 540, 310, 420, s.font.body, "right");
        drawBadge(ctx, d.amount, 540, 470, s.accent, s.font, "right");
    },
    circle: (ctx, d, s) => {
        ctx.beginPath(); ctx.arc(300, 240, 180, 0, Math.PI*2);
        ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 15; ctx.stroke();
        ctx.textAlign = "center";
        drawText(ctx, d.name, 300, 250, 340, 55, s.font.heading, "white");
        drawText(ctx, d.event, 300, 140, 400, 22, s.font.body, s.accent, "8px");
        drawWrappedText(ctx, d.message, 300, 480, 450, s.font.body, "center");
        drawBadge(ctx, d.amount, 300, 340, s.accent, s.font, "center");
    }
};

/**
 * --------------------------------------------------------
 * 4. MAIN GENERATION ENGINE
 * --------------------------------------------------------
 */
function generatePoster() {
    const canvas = document.getElementById("posterCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    // --- Date Formatting Logic ---
    const rawDate = document.getElementById("poster-date").value;
    let formattedDate = "";
    
    if (rawDate) {
        // Splitting yyyy-mm-dd to rearrange
        const parts = rawDate.split("-");
        if(parts.length === 3) {
            formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`; // dd-mm-yyyy
        }
    } else {
        // Fallback to current date if input is cleared
        const now = new Date();
        const d = String(now.getDate()).padStart(2, '0');
        const m = String(now.getMonth() + 1).padStart(2, '0');
        formattedDate = `${d}-${m}-${now.getFullYear()}`;
    }

    const data = {
        name: document.getElementById("poster-name").value.trim().toUpperCase(),
        event: (document.getElementById("poster-event").value.trim() || "Happy Birthday").toUpperCase(),
        amount: document.getElementById("poster-amount").value || "100",
        message: document.getElementById("poster-message").value.trim() || "Together we build a better village",
        date: formattedDate 
    };

    if (!data.name) { alert("Please enter your name"); return; }

    const s = {
        font: fontLibrary[Math.floor(Math.random() * fontLibrary.length)],
        palette: premiumPalettes[Math.floor(Math.random() * premiumPalettes.length)],
        archKey: Object.keys(layouts)[Math.floor(Math.random() * Object.keys(layouts).length)]
    };
    s.bg = s.palette.bg;
    s.accent = s.palette.accent;

    ctx.clearRect(0, 0, 600, 600);
    
    // Draw Background (With the flowers/cakes icons)
    drawBackground(ctx, s.bg);
    
    try {
        layouts[s.archKey](ctx, data, s);
    } catch (e) {
        layouts['bigType'](ctx, data, s);
    }
    
    drawBranding(ctx, data.date, s.font);
}

/**
 * --------------------------------------------------------
 * 5. COMPONENT HELPERS
 * --------------------------------------------------------
 */
/**
 * ----------------------------
 * 4. Component Drawing Helpers
 * ----------------------------
 */
function drawBackground(ctx, color) {
    // Premium Radial Gradient
    let g = ctx.createRadialGradient(300, 300, 50, 300, 300, 600);
    g.addColorStop(0, color); 
    g.addColorStop(1, "#050505");
    ctx.fillStyle = g; 
    ctx.fillRect(0, 0, 600, 600);
    
    // Add Celebration Decorations (Flowers, Cakes, etc.)
    const decoIcons = ["🌸", "🌹", "🌺", "🎂", "🎁", "🎉", "✨", "🎈"];
    ctx.save();
    for (let i = 0; i < 25; i++) {
        const size = 15 + Math.random() * 15;
        ctx.font = `${size}px serif`;
        ctx.globalAlpha = 0.25; // Subtle transparency
        
        // Random placement across the canvas
        const x = Math.random() * 600;
        const y = Math.random() * 600;
        
        ctx.fillText(decoIcons[Math.floor(Math.random() * decoIcons.length)], x, y);
    }
    ctx.restore();

    // Subtle Overlay Texture (Grid or Particles)
    ctx.globalAlpha = 0.05; 
    ctx.strokeStyle = "white";
    if(Math.random() > 0.5) {
        for(let i=0; i<600; i+=50) { 
            ctx.strokeRect(i, 0, 1, 600); 
            ctx.strokeRect(0, i, 600, 1); 
        }
    } else {
        ctx.fillStyle = "white";
        for(let i=0; i<40; i++) { 
            ctx.beginPath(); 
            ctx.arc(Math.random()*600, Math.random()*600, 1.5, 0, Math.PI*2); 
            ctx.fill(); 
        }
    }
    ctx.globalAlpha = 1.0;
}

function drawText(ctx, text, x, y, maxW, size, font, color, spacing = "0px") {
    ctx.save(); 
    ctx.fillStyle = color; 
    ctx.letterSpacing = spacing;
    let currentSize = size; 
    ctx.font = `${currentSize}px ${font}`;
    while (ctx.measureText(text).width > maxW && currentSize > 10) {
        currentSize--; 
        ctx.font = `${currentSize}px ${font}`;
    }
    ctx.fillText(text, x, y); 
    ctx.restore();
}

function drawWrappedText(ctx, text, x, y, maxW, font, align) {
    ctx.font = `300 18px ${font}`; 
    ctx.fillStyle = "rgba(255,255,255,0.8)"; 
    ctx.textAlign = align;
    const words = text.split(' '); 
    let line = '', testY = y;
    for(let n=0; n<words.length; n++) {
        let testLine = line + words[n] + ' ';
        if (ctx.measureText(testLine).width > maxW && n > 0) {
            ctx.fillText(line.trim(), x, testY); 
            line = words[n] + ' '; 
            testY += 25;
        } else { line = testLine; }
    }
    ctx.fillText(line.trim(), x, testY);
}

function drawBadge(ctx, amt, x, y, color, font, align) {
    const txt = `₹${amt} CONTRIBUTION`;
    ctx.font = `bold 15px ${font.body}`;
    const w = ctx.measureText(txt).width + 40;
    let rx = (align === "center") ? x - (w/2) : (align === "right") ? x - w : x;
    
    ctx.fillStyle = color; 
    ctx.beginPath(); 
    if (ctx.roundRect) {
        ctx.roundRect(rx, y-22, w, 44, 8);
    } else {
        ctx.rect(rx, y-22, w, 44);
    }
    ctx.fill();
    
    ctx.fillStyle = "#1a1a1a"; 
    ctx.textAlign = "center";
    ctx.fillText(txt, rx + (w/2), y+6);
}

function drawBranding(ctx, date, font) {
    ctx.textAlign = "center"; 
    ctx.fillStyle = "rgb(247, 243, 243)";
    ctx.font = `14px ${font.body}`; 
    ctx.fillText("माझा गाव, माझा अभिमान", 300, 525);
    ctx.fillStyle = "white"; 
    ctx.font = `bold 22px ${font.heading}`;
    ctx.fillText("दर्डेवाडी", 300, 550);
    if(date) { 
        ctx.fillStyle = "rgb(232, 247, 15)";
        ctx.font = "13px sans-serif"; 
        ctx.fillText(date, 300, 585); 
    }
    ctx.restore();
}

/**
 * --------------------------------------------------------
 * 6. ACTION HANDLERS
 * --------------------------------------------------------
 */
function downloadPoster() {
    const canvas = document.getElementById("posterCanvas");
    const nameInput = document.getElementById("poster-name").value.trim();
    
    // Fallback to 'Contributor' if name is empty
    const fileName = nameInput ? nameInput.replace(/\s+/g, '_') : "Contributor";
    
    const link = document.createElement("a");
    // Filename will now be "Name_Date.png"
    link.download = `${fileName}_Dardewadi.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
}

