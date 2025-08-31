async function searchWord() {
    const word = document.getElementById("wordInput").value.trim();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    if (!word) {
    resultDiv.innerHTML = `<p class="error">Please enter a word.</p>`;
    return;
    }

    try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!res.ok) throw new Error();
    const data = await res.json();

    const definition = data[0].meanings[0].definitions[0].definition;
    const phonetic = data[0].phonetic || "";
    const audio = data[0].phonetics.find(p => p.audio)?.audio;

    resultDiv.innerHTML = `
        <p class="word">${data[0].word}</p>
        <p class="phonetic">${phonetic}</p>
        <p class="meaning">${definition}</p>
        ${audio ? `<audio controls src="${audio}"></audio>` : ""}
    `;
    } catch {
    resultDiv.innerHTML = `<p class="error">Word not found.</p>`;
    }
}