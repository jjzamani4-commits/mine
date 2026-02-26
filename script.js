const lamp = document.getElementById('lamp');
const login = document.getElementById('login');
const sky = document.getElementById('sky');
const moon = document.getElementById('moon');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const main = document.getElementById('main');
const complimentsWrap = document.getElementById('compliments');
const continueWrap = document.getElementById('continueWrap');
const continueBtn = document.getElementById('continueBtn');
const letterSection = document.getElementById('letter');
const letterContent = document.getElementById('letterContent');

let is0n = false;
let loggedIn = false;
let complimentsInterval = null;

// Generate the Aesthetic Background
function createAtmosphere() {
    sky.innerHTML = '';
    // Create raining stars
    for (let i = 0; i < 100; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        const size = Math.random() * 3 + 'px';
        s.style.width = size;
        s.style.height = size;
        s.style.left = Math.random() * 100 + 'vw';
        s.style.top = -10 + 'vh';
        s.style.backgroundColor = i % 2 === 0 ? "gold" : "white";
        s.style.animation = `fall ${5 + Math.random() * 5}s linear ${Math.random() * -10}s infinite`;
        sky.appendChild(s);
    }
    // Create twinkling background sparkles
    for (let j = 0; j < 50; j++) {
        const sp = document.createElement('div');
        sp.className = 'sparkle-bg';
        sp.style.left = Math.random() * 100 + 'vw';
        sp.style.top = Math.random() * 100 + 'vh';
        sp.style.animationDelay = Math.random() * 5 + 's';
        sky.appendChild(sp);
    }
}

function setLamp(on) {
    is0n = !!on;
    lamp.classList.toggle('on', is0n);
    document.body.classList.toggle('lit', is0n);
    
    if (is0n) {
        sky.classList.remove('hidden');
        moon.classList.remove('hidden');
        createAtmosphere();
        document.body.style.background = "radial-gradient(circle at 80% 20%, #1a1a1a, #000)";
        
        if (!loggedIn) {
            login.classList.remove('hidden');
        } else if (!main.classList.contains('hidden') && !complimentsInterval) {
            startCompliments();
        }
    } else {
        [sky, moon, login, main, letterSection].forEach(el => el.classList.add('hidden'));
        document.body.style.background = "black";
        if (complimentsInterval) clearInterval(complimentsInterval);
    }
}

lamp.addEventListener('click', () => setLamp(!is0n));

loginButton.addEventListener('click', () => {
    if (usernameInput.value.trim() === 'i love you' && passwordInput.value.trim() === 'for_life') {
        loggedIn = true;
        login.classList.add('hidden');
        main.classList.remove('hidden');
        startCompliments();
    } else {
        login.animate([{transform:'translateX(-10px)'},{transform:'translateX(10px)'},{transform:'translateX(0)'}], {duration:200, iterations:2});
    }
});

const complimentsList = [
    "Hey babe, I want to use this opportunity to tell you that you light up my world ✨.",
    "🌅 Your smile is my favorite sunrise.",
    "💝 I'm grateful for your gentle heart.",
    "🌟 You make ordinary days extraordinary.",
    "😍 I adore everything about you.",
    "💫 Your eyes hold endless stars.",
    "🌙 You are my sweetest dream.",
    "💕 Loving you is the easiest thing I do."
];

function startCompliments() {
    complimentsWrap.innerHTML = '';
    let currentIndex = 0;
    const showNext = () => {
        if (currentIndex < complimentsList.length) {
            const el = document.createElement('div');
            el.className = 'compliment';
            el.textContent = complimentsList[currentIndex++];
            complimentsWrap.appendChild(el);
            complimentsWrap.scrollTo({ top: complimentsWrap.scrollHeight, behavior: 'smooth' });
        } else {
            clearInterval(complimentsInterval);
            continueWrap.classList.remove('hidden');
        }
    };
    showNext();
    complimentsInterval = setInterval(showNext, 3000);
}

continueBtn.addEventListener('click', () => {
    main.classList.add('hidden');
    letterSection.classList.remove('hidden');
    startTypingLetter();
});

function startTypingLetter() {
    const letterText = `Hey mama,\n\nEvery time I think of you, my heart hums the sweetest tune. You're my morning light and my midnight star 💫.\n\nIn the quiet when the world slows down and everything fades into silence, you are the thought that stays.\n\nI didn't plan to feel this way until you arrived gently and somehow became everything.\n\nYour smile feels like light after a long night.\n\nEven on days when words fail me, my heart still speaks your name.\n\nIf love is patience, I'm learning it with you.\n\nIf love is kindness, I see it in you.\n\nIf love is home... then that's where you are.\n\nNo matter where life takes us, I choose you, in both calm and stormy days.\n\nForever yours,\nYour adoring partner ❤️😘`;
    
    letterContent.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
        letterContent.textContent += letterText.charAt(i++);
        letterContent.scrollTo({ top: letterContent.scrollHeight });
        if (i >= letterText.length) {
            clearInterval(timer);
            createEndSparkles(100); 
        }
    }, 50);
}

function createEndSparkles(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const s = document.createElement('div');
            s.className = 'sparkle-bg'; // Using the twinkling style
            s.style.position = 'fixed';
            s.style.left = Math.random() * 100 + 'vw';
            s.style.top = Math.random() * 100 + 'vh';
            s.style.zIndex = '1000';
            s.style.width = '4px';
            s.style.height = '4px';
            document.body.appendChild(s);
            setTimeout(() => s.remove(), 2000);
        }, i * 30);
    }
}

setLamp(false);
