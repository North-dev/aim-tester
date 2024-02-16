const game = {
    time: 30,
    missed: 0,
    clicks: 0,
    timer: null,
    started: false,
    targetObj: {},
    audio: new Audio(`audio/click.mp3`),
    button: document.getElementById("target"),
    timeElement: document.getElementById("timer"),
    container: document.getElementById("gameContainer"),
    timeContainer: document.getElementById("finalScore"),

    init() {
        this.container.style.width = window.innerWidth + 10 + 'px';
        this.container.style.height = window.innerHeight + 10 + 'px';
        this.timeElement.innerText = `${this.time} seconds remaining..`;
        this.button.style.width = '250px';
        this.button.style.height = '250px';
        this.button.addEventListener("click", this.handleClick.bind(this));
        this.container.addEventListener("click", this.handleMiss.bind(this));
    },

    startTimer() {
        this.timer = setInterval(() => {
            this.time--;
            this.timeElement.innerText = `${this.time} seconds remaining..`;
            if (this.time <= 0) {
                clearInterval(this.timer);
                this.endGame();
            }
        }, 1000);
    },

    handleClick() {
        if (!this.started) {
            this.started = true;
            this.startTimer();
        }

        this.clicks++;

        if (this.time <= 1) {
            let cpsUnCap = parseFloat(this.clicks / this.time).toString();

            if (cpsUnCap.length > 3) {
                this.cps = cpsUnCap.slice(0, -13); // Floating point values
            } else {
                this.cps = parseInt(cpsUnCap);
            }

            this.button.removeEventListener("click", this.handleClick);
            this.button.style.display = 'none';

            this.accuracy = 100 - this.missed * 100 / 100;

            if (this.accuracy < 0) {
                this.accuracy = 0.01;
            }

            this.timeContainer.innerText = `
            You scored ${parseInt(this.clicks)} clicks in 30 seconds.
            You missed ${this.missed} times.
            That gives you an accuracy rating of ${this.accuracy}%.
            as well as ~${this.cps} CPS or ~${parseInt(this.cps * 60)} CPM!`;

            this.button.style.width = '800px';
            this.button.style.height = '400px';
            this.button.style.left = '10%';
            this.button.style.top = '50%';
            this.button.style.borderRadius = '0px';
            this.button.style.backgroundColor = '#17BEBB';

            this.timeElement.innerText = `Time's Up!`;

            clearInterval(this.timer);
        } else {
            this.button.style.width = `${parseInt(this.button.style.width) - 2.5}px`;
            this.button.style.height = `${parseInt(this.button.style.height) - 2.5}px`;
            this.button.innerText = `${this.clicks} Clicks`;
        }

        
        this.audio.play();

        this.button.style.left = `${Math.random() * 75}%`;
        this.button.style.top = `${Math.random() * 75}%`;
    },

    handleMiss() {
        this.missed += 1;
    },

    endGame() {
        // Logic to end the game and display final score...
    }
};

game.init();