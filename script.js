const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.querySelector(".result");
const sound = document.querySelector(".sound");
const btn = document.querySelector(".search-btn");


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
})
