
let penduWord = "";
let penduHint = "";
let guessedLetters = [];
let penduErrors = 0;

const MAX_PENDU_ERRORS = 6;

// DÉMARRER UNE NOUVELLE PARTIE
function startPendu() {
    const randomIndex = Math.floor(Math.random() * penduWords.length);
    const selectedWord = penduWords[randomIndex];

    penduWord = selectedWord.word;
    penduHint = selectedWord.hint;
    guessedLetters = [];
    penduErrors = 0;

    displayPendu();
}

// AFFICHER LE JEU
function displayPendu() {
    const displayWord = [...penduWord]
        .map(letter => guessedLetters.includes(letter) ? letter : "_")
        .join(" ");

    showDialogue(
        "Trouvez le mot : " + displayWord +
        "\nIndice : " + penduHint +
        "\nErreurs : " + penduErrors + " / " + MAX_PENDU_ERRORS,
        [
            {
                text: "Proposer une lettre",
                action: askPenduLetter
            }
        ]
    );
}

// DEMANDER UNE LETTRE
function askPenduLetter() {
    const letter = prompt("Proposez une lettre :");

    if (letter === null) {
        displayPendu();
        return;
    }

    const normalizedLetter = letter.trim().toUpperCase();

    if (!/^[A-Z]$/.test(normalizedLetter)) {
        alert("Veuillez entrer une seule lettre.");
        displayPendu();
        return;
    }

    if (guessedLetters.includes(normalizedLetter)) {
        alert("Vous avez déjà proposé cette lettre !");
        displayPendu();
        return;
    }

    guessedLetters.push(normalizedLetter);

    if (!penduWord.includes(normalizedLetter)) {
        penduErrors++;
    }

    checkPenduResult();
}

// VÉRIFIER SI LE JOUEUR A GAGNÉ OU PERDU
function checkPenduResult() {
    const won = [...penduWord].every(letter =>
        guessedLetters.includes(letter)
    );

    if (won) {
        penduVictory();
    }
    else if (penduErrors >= MAX_PENDU_ERRORS) {
        penduDefeat();
    }
    else {
        displayPendu();
    }
}

// VICTOIRE
function penduVictory() {
    showDialogue(
        "Incroyable ! Vous avez trouvé le mot " + penduWord +
        " ! Tortubrouk semble impressionné.",
        [
            {
                text: "Continuer",
                action: () => finishTortuChallenge(true)
            }
        ]
    );
}

// DÉFAITE
function penduDefeat() {
    showDialogue(
        "Perdu ! Le mot était " + penduWord +
        ". Tortubrouk soupire devant votre manque de connaissances.",
        [
            {
                text: "Continuer",
                action: () => finishTortuChallenge(false)
            }
        ]
    );
}
