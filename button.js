var cps;
var cpm;
var accuracy;

var game = {
    clicks:0,
    misses:0,
    illegalClicks: 0,
    fullTime:30,
    isActive:false
}

var time = game['fullTime'];

const target = document.getElementById("target");
const gameContainer = document.getElementById("gameContainer");
const timeContainer = document.getElementById("finalScore")

const hitAudio = new Audio(`audio/hit.wav`);
const missAudio = new Audio(`audio/miss.wav`)

gameContainer.style.width = window.innerWidth + 10 + 'px';
gameContainer.style.height = window.innerHeight + 10 + 'px';

$("#timer").html(`PRESS THE TARGET TO BEGIN!`);

var gameTimer = setInterval(() => {

    if (game['isActive']) {
        $("#timer").html(`${time-- - 1} SECONDS REMAINING`);
    }

    if (time == 0) { 
        clearInterval(gameTimer);
        game['isActive'] = false; game['clicks']--;
        handleClick(); // Hacky shit way to do this
    }

}, 1000);

target.style.width = '150px'
target.style.height = '150px'

let width = parseInt(target.style.width.slice(0, 3))
let height = parseInt(target.style.height.slice(0, 3))

gameContainer.addEventListener("click", handleMiss); // I can probably do this in the target hit function but fuck it
target.addEventListener("click", antiCheat);

function _0x2550() { const _0x240367 = ['6357815wmGgPL', '9270726ltyGWs', '8689270GanqHT', 'fullTime', '1125976HEzKcz', 'Impossible\x20CPS\x20of\x20', 'NumberFormat', '5090985deisKJ', 'clicks', 'reload', 'isTrusted', 'illegalClicks', '20558AdNfwi', 'en-US', '4EbeDYx', '5976096sNrVxu', '108MSgHNw', '\x20detected.', 'format', '9RMfswH']; _0x2550 = function () { return _0x240367; }; return _0x2550(); } function _0x37cd(_0x559092, _0x1a2bf8) { const _0x2550a7 = _0x2550(); return _0x37cd = function (_0x37cdec, _0x20f1f7) { _0x37cdec = _0x37cdec - 0x1e9; let _0x3f2c6f = _0x2550a7[_0x37cdec]; return _0x3f2c6f; }, _0x37cd(_0x559092, _0x1a2bf8); } (function (_0x583c4b, _0x2eb6cf) { const _0x3c2e29 = _0x37cd, _0x48dfef = _0x583c4b(); while (!![]) { try { const _0x456224 = parseInt(_0x3c2e29(0x1e9)) / 0x1 * (-parseInt(_0x3c2e29(0x1f6)) / 0x2) + -parseInt(_0x3c2e29(0x1f1)) / 0x3 + parseInt(_0x3c2e29(0x1f8)) / 0x4 * (parseInt(_0x3c2e29(0x1ea)) / 0x5) + parseInt(_0x3c2e29(0x1eb)) / 0x6 + -parseInt(_0x3c2e29(0x1f9)) / 0x7 + parseInt(_0x3c2e29(0x1ee)) / 0x8 * (parseInt(_0x3c2e29(0x1fa)) / 0x9) + -parseInt(_0x3c2e29(0x1ec)) / 0xa; if (_0x456224 === _0x2eb6cf) break; else _0x48dfef['push'](_0x48dfef['shift']()); } catch (_0x35e954) { _0x48dfef['push'](_0x48dfef['shift']()); } } }(_0x2550, 0xf28cf)); function antiCheat(_0x48b747) { const _0x5da99d = _0x37cd; let _0x2d5592 = new Intl[(_0x5da99d(0x1f0))](_0x5da99d(0x1f7), { 'maximumSignificantDigits': 0x4 })[_0x5da99d(0x1fc)](game[_0x5da99d(0x1f2)] / game[_0x5da99d(0x1ed)]); _0x2d5592 > 7.5 && (console['warn'](_0x5da99d(0x1ef) + _0x2d5592 + _0x5da99d(0x1fb)), game[_0x5da99d(0x1f2)] = 0x0), !_0x48b747[_0x5da99d(0x1f4)] ? game[_0x5da99d(0x1f5)]++ : handleClick(), game['illegalClicks'] > 0xa && setTimeout(function () { const _0x113204 = _0x5da99d; location[_0x113204(0x1f3)](); }, 0x0); }

function handleMiss() {
    if (game['isActive']) {
        game['misses'] += 1;
        missAudio.play();
    }
}

let timerElement = document.getElementById("timer")

function handleClick() {
    if (!game['isActive'] && time > 0) {
        game['isActive'] = true

        
        timerElement.classList.remove("object")
        timerElement.innerText = '30 SECONDS REMAINING'
    }

    game['clicks']++;
    

    if (time == 0) {

        cps = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 4 }).format(game['clicks'] / game['fullTime'])
        cpm = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 4 }).format(game['clicks'] / game['fullTime'] * 60)
        accuracy = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(game['clicks'] / (game['misses'] + game['clicks']) * 100)

        target.removeEventListener("click", handleClick);
        target.style.display = 'none'

        timeContainer.innerText = `
        You missed ${game['misses']} times.

        That gives you an accuracy rating of ${accuracy}%

        as well as ${cps} CPS or ~${cpm} CPM!`

        var shareElement = document.createElement("button");
        var textBreaker = document.createElement("br");
        shareElement.textContent = "Share your score";

        shareElement.addEventListener("click", function () {

        let clipboardData = `
        **━━━━━━━━━━━━━━━━━━━━━━━━━━**\nI scored __${parseInt(game['clicks'])}__ clicks in *${game['fullTime']}* seconds.\nI missed the target **${game['misses']}** times.\nThat gives me an accuracy rating of **${accuracy}**%\nas well as ~**${cps}** CPS or ~**${(parseInt(cps * 60))}** CPM!\nTry for yourself at:\nhttps://north-dev.github.io/aim-tester/\n**━━━━━━━━━━━━━━━━━━━━━━━━━━**`

            navigator.clipboard.writeText(clipboardData)
                .then(function () {
                    alert('Score copied to clipboard!');
                })
                .catch(function (error) {
                    console.error(error);
                    console.error('Failed to copy score to clipboard! :/');
                });
        });

        timeContainer.appendChild(textBreaker);
        timeContainer.appendChild(shareElement);

        target.style.width = '800px';
        target.style.height = '400px';
        target.style.left = '10%'
        target.style.top = '50%'
        target.style.borderRadius = '0px'
        target.style.backgroundColor = '#17BEBB';

        $("#timer").text(`Time's Up!`);
    }

    else {
        target.style.width = `${width}px`
        target.style.height = `${height}px`

        $("#clicks").text(`Your score is ${game['clicks']}.`);
    }
    if (game['isActive']) {
        hitAudio.play();
    }

    target.style.left = `${Math.random(1, window.innerWidth) * 75}%`
    target.style.top = `${Math.random(1, window.innerHeight) * 75}%`

    if (width && height > 100) {
        width--;
        height--;
    }


}