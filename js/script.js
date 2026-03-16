function downloadPoster() {
    const canvas = document.getElementById("posterCanvas");
    const link = document.createElement("a");
    link.download = "birthday_poster.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

function shareWhatsapp() {
    const canvas = document.getElementById("posterCanvas");
    // Convert canvas to data URL
    canvas.toBlob(function(blob) {
        const reader = new FileReader();
        reader.onload = function() {
            const dataUrl = reader.result;
            // WhatsApp Web can't send images via URL directly, so we share a link
            const encodedMessage = encodeURIComponent(
                "Check out my birthday contribution poster for village development! 🎉"
            );
            const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
            window.open(whatsappUrl, "_blank");
        };
        reader.readAsDataURL(blob);
    });
}

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
]

const backgrounds = [
"#2d6a4f","#3a5a40","#344e41","#588157","#bc6c25",
"#6a4c93","#457b9d","#1d3557","#e07a5f","#6d597a",
"#4d908e","#264653","#b56576","#6b705c","#f4a261"
]

function generatePoster(){

const name = document.getElementById("poster-name").value.trim()
const date = document.getElementById("poster-date").value

if(!name){
alert("Please enter your name")
return
}

const canvas = document.getElementById("posterCanvas")
const ctx = canvas.getContext("2d")

canvas.width = 600
canvas.height = 600

ctx.clearRect(0,0,600,600)

ctx.textAlign = "center"
ctx.textBaseline = "middle"

const centerX = 300
const titleY = 120
const nameY = 220
const messageY = 340
const footer1 = 460
const footer2 = 500
const footer3 = 540

const bg = backgrounds[Math.floor(Math.random()*backgrounds.length)]
const message = messages[Math.floor(Math.random()*messages.length)]
const style = Math.floor(Math.random()*15)

switch(style){

case 0:
ctx.fillStyle = bg
ctx.fillRect(0,0,600,600)
ctx.fillStyle="white"
ctx.font="bold 42px Merriweather"
ctx.fillText("Happy Birthday",centerX,titleY)
ctx.font="bold 36px Work Sans"
ctx.fillText(name,centerX,nameY,500)
ctx.font="22px Work Sans"
ctx.fillText(message,centerX,messageY,500)
break

case 1:
ctx.fillStyle=bg
ctx.fillRect(0,0,600,600)
ctx.fillStyle="white"
ctx.beginPath()
ctx.arc(centerX,200,120,0,Math.PI*2)
ctx.fill()
ctx.fillStyle=bg
ctx.font="bold 32px Work Sans"
ctx.fillText(name,centerX,200,450)
ctx.fillStyle="white"
ctx.font="30px Merriweather"
ctx.fillText("Happy Birthday",centerX,360)
break

case 2:
ctx.fillStyle=bg
ctx.fillRect(0,0,600,600)
ctx.fillStyle="white"
ctx.fillRect(60,60,480,480)
ctx.fillStyle=bg
ctx.font="bold 40px Merriweather"
ctx.fillText("Happy Birthday",centerX,180)
ctx.font="bold 34px Work Sans"
ctx.fillText(name,centerX,260,450)
ctx.font="20px Work Sans"
ctx.fillText(message,centerX,340,450)
break

case 3:
ctx.fillStyle=bg
ctx.fillRect(0,0,600,600)
ctx.fillStyle="white"
for(let i=0;i<20;i++){
ctx.fillRect(Math.random()*600,Math.random()*600,6,6)
}
ctx.font="bold 40px Merriweather"
ctx.fillText("Happy Birthday",centerX,200)
ctx.font="bold 36px Work Sans"
ctx.fillText(name,centerX,300,500)
break

case 4:
ctx.fillStyle=bg
ctx.fillRect(0,0,600,600)
ctx.strokeStyle="white"
ctx.lineWidth=8
ctx.strokeRect(40,40,520,520)
ctx.fillStyle="white"
ctx.font="bold 40px Merriweather"
ctx.fillText("Happy Birthday",centerX,180)
ctx.font="bold 36px Work Sans"
ctx.fillText(name,centerX,260,450)
break

case 5:
ctx.fillStyle=bg
ctx.fillRect(0,0,600,600)
ctx.fillStyle="white"
ctx.font="bold 50px Merriweather"
ctx.fillText("🎉",centerX,140)
ctx.font="bold 36px Work Sans"
ctx.fillText(name,centerX,260,500)
ctx.font="24px Work Sans"
ctx.fillText("Happy Birthday",centerX,320)
break

case 6:
ctx.fillStyle=bg
ctx.fillRect(0,0,600,600)
ctx.fillStyle="white"
ctx.fillRect(0,260,600,80)
ctx.fillStyle=bg
ctx.font="bold 36px Work Sans"
ctx.fillText(name,centerX,300,500)
ctx.fillStyle="white"
ctx.font="32px Merriweather"
ctx.fillText("Happy Birthday",centerX,180)
break

case 7:
ctx.fillStyle=bg
ctx.fillRect(0,0,600,600)
ctx.strokeStyle="white"
ctx.lineWidth=6
ctx.beginPath()
ctx.arc(centerX,300,200,0,Math.PI*2)
ctx.stroke()
ctx.fillStyle="white"
ctx.font="bold 36px Work Sans"
ctx.fillText(name,centerX,300,500)
ctx.font="26px Merriweather"
ctx.fillText("Happy Birthday",centerX,220)
break

case 8:
ctx.fillStyle=bg
ctx.fillRect(0,0,600,600)
ctx.fillStyle="white"
ctx.font="bold 60px Merriweather"
ctx.fillText("HBD",centerX,200)
ctx.font="bold 34px Work Sans"
ctx.fillText(name,centerX,300,500)
break

case 9:
ctx.fillStyle=bg
ctx.fillRect(0,0,600,600)
ctx.fillStyle="white"
ctx.fillRect(0,0,600,120)
ctx.fillStyle=bg
ctx.font="bold 36px Merriweather"
ctx.fillText("Happy Birthday",centerX,60)
ctx.fillStyle="white"
ctx.font="bold 36px Work Sans"
ctx.fillText(name,centerX,260,500)
break

default:
ctx.fillStyle=bg
ctx.fillRect(0,0,600,600)
ctx.fillStyle="white"
ctx.font="bold 40px Merriweather"
ctx.fillText("Happy Birthday",centerX,200)
ctx.font="bold 36px Work Sans"
ctx.fillText(name,centerX,280,500)
ctx.font="22px Work Sans"
ctx.fillText(message,centerX,360,500)

}

ctx.font="20px Work Sans"
ctx.fillText("₹100 contribution",centerX,footer1)

ctx.font="22px Merriweather"
ctx.fillText("Maza Gav Maza Abhiman",centerX,footer2)

if(date){
ctx.font="18px Work Sans"
ctx.fillText(date,centerX,footer3)
}

}