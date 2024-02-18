var cps;
var accuracy;
var cpsUnCap;

var time = 30;
var missed = 0;
var count = time;
var started = false;

const button = document.getElementById("target");
const timeElement = document.getElementById("timer");
const container = document.getElementById("gameContainer");
const timeContainer = document.getElementById("finalScore")

const audio = new Audio(`audio/click.mp3`);

container.style.width = window.innerWidth + 10 + 'px';
container.style.height = window.innerHeight + 10 + 'px';

timeElement.innerText = `${time} seconds remaining..`

var targetObj = {};
var targetProxy = new Proxy(targetObj, {
    set: function (target, key, value) {
        if (started) {
            timer = setInterval(function () {
                $("#timer").html(`${count-- - 1} seconds remaining..`);
                if (count == 0) clearInterval(timer);
            }, 1000);
        }
        target[key] = value;
        return true;
    }
});

targetProxy.started = 'true'

var clicks = 0

button.style.width = '150px'
button.style.height = '150px'

let width = parseInt(button.style.width.slice(0, 3))
let height = parseInt(button.style.height.slice(0, 3))

button.addEventListener("click", handleClick);
container.addEventListener("click", handleMiss);

function handleMiss() {
    missed += 1;
}

function handleClick() {
    if (!started) {
        started = true
        targetProxy.started = 'true'
    }

    clicks++;

    if (count <= 1) {
        cpsUnCap = parseFloat(clicks / time).toString()

        if (cpsUnCap.length > 3) {
            cps = cpsUnCap.slice(0, -13) // Fucking floating point values.. 
        } else {
            cps = parseInt(cpsUnCap)
        }

        button.removeEventListener("click", handleClick);
        button.style.display = 'none'

        accuracy = 100 - missed * 100 / 100;

        if (accuracy < 0) {
            accuracy = 0.01;
        }

        timeContainer.innerText = `
        You scored ${parseInt(clicks)} clicks in ${time} seconds.

        You missed ${missed} times.

        That gives you an accuracy rating of ${accuracy}%

        as well as ~${cps} CPS or ~${(parseInt(cps * 60))} CPM!`

        var shareElement = document.createElement("button");
        var textBreaker = document.createElement("br");
        shareElement.textContent = "Share your score";

        shareElement.addEventListener("click", function () {

        let clipboardData = `
        **━━━━━━━━━━━━━━━━━━━━━━━━━━**\nI scored __${parseInt(clicks)}__ clicks in *${time}* seconds.\nI missed the target **${missed}** times.\nThat gives me an accuracy rating of **${accuracy}**%\nas well as ~**${cps}** CPS or ~**${(parseInt(cps * 60))}** CPM!\nTry for yourself at:\nhttps://north-dev.github.io/aim-tester/\n**━━━━━━━━━━━━━━━━━━━━━━━━━━**`

            navigator.clipboard.writeText(clipboardData)
                .then(function () {
                    alert('Score copied to clipboard! (Formatted for discord)');
                })
                .catch(function (error) {
                    console.error(error);
                    alert('Failed to copy score to clipboard! :/');
                });
        });

        timeContainer.appendChild(textBreaker);
        timeContainer.appendChild(shareElement);

        button.style.width = '800px';
        button.style.height = '400px';
        button.style.left = '10%'
        button.style.top = '50%'
        button.style.borderRadius = '0px'
        button.style.backgroundColor = '#17BEBB';

        timeElement.innerText = `Time's Up!`

        clearInterval(timer);
    }

    else {
        button.style.width = `${width}px`
        button.style.height = `${height}px`
        button.innerText = `${clicks}`;
    }

    audio.play();

    button.style.left = `${Math.random(1, window.innerWidth) * 75}%`
    button.style.top = `${Math.random(1, window.innerHeight) * 75}%`

    if (width && height > 100) {
        width--;
        height--;
    }


}