const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.querySelector(".result");
const sound = document.querySelector(".sound");
const btn = document.querySelector(".search-btn");

const clr = localStorage.getItem("color");
document.documentElement.style.setProperty('--accent-color', clr);


btn.addEventListener('click', () => {
    let inputWord = document.querySelector(".input-word").value;

    //fetch
    fetch(`${url}${inputWord}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        result.innerHTML = `
        <div class="word">
                <h3>${inputWord}</h3>
                <button class="sound-btn">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetic || ""}</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-apply">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>`;

            // sound
            sound.setAttribute("src", `${data[0].phonetics[1].audio || data[0].phonetics[0].audio}`);
            const soundBtn = document.querySelector(".sound-btn");
            soundBtn.addEventListener('click', () => {
                sound.play();
            })
    })
    .catch( () => {
        result.innerHTML = `
            <h3 class="error">Couldn't find the word</h3>
            <img src="https://cdn-icons-png.flaticon.com/128/725/725099.png"></img>
        `;
    });
});

// Simple example, see optional options for more configuration.
const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic', // or 'monolith', or 'nano'
    default: '#fff',

    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {
        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            input: true,
        }
    }
});

pickr.on('change', (color, source, instance) => {
    const clr = color.toRGBA().toString();
    document.documentElement.style.setProperty('--accent-color', clr);
    localStorage.setItem("color", clr);
})