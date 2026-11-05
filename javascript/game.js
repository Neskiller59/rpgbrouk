let quizScore = 0;
let quizQuestion = 0;
let quizQuestions = [];
let endingFailures = 0;
let eggHatchAttempted = false;

// SUIVI DU COMBAT CONTRE SKELEBROUK
let skeletonVictories = 0;
let skeletonBoneObtained = false;
let eggRecovered = false;
// CONDITIONS DE LA FIN SECRÈTE
let richebroukRefusals = 0;
let richebroukDeal = false;
let cigalebroukSong = false;
let postSkeletonRichebroukSeen = false;

// AFFICHER UN DIALOGUE
function showDialogue(text, buttons) {
    document.getElementById("dialogue-text").textContent = text;

    const choices = document.getElementById("choices");
    choices.innerHTML = "";

    buttons.forEach(button => {
        const element = document.createElement("button");
        element.textContent = button.text;
        element.onclick = button.action;
        choices.appendChild(element);
    });
}

// CHANGER DE DÉCOR ET DE PERSONNAGE
function changeScene(background, character, name) {
    document.getElementById("background").src = background;
    document.getElementById("character").src = character;
    document.getElementById("character-name").textContent = name;
}

// PREMIERS CHOIX DU JOUEUR
function chooseOption(choice) {
    let response = "";

    if (choice === 0) {
        response = "Vous êtes dans une forêt, évidemment. Ça se voit pas ?";
    }
    else if (choice === 1) {
        response = "Je suis Batbrouk. Et pourquoi tu me regardes avec ta tête d'âne ?";
    }
    else if (choice === 2) {
        response = "Retourner en cours ? Quel cours ? Tu veux courir ? Concentre-toi.";
    }

    showDialogue(response, [
        { text: "Continuer", action: revealQuest }
    ]);
}

// RÉVÉLATION DE LA QUÊTE
function revealQuest() {
    showDialogue(
        "Bon, assez discuté. Le terrible Gobelinbrouk a volé l'Œufbrouk ! Sans cet œuf, notre royaume court à sa perte. Tu vas m'aider à le retrouver.",
        [
            { text: "D'accord, je vais vous aider.", action: acceptQuestDirect },
            { text: "Débrouillez-vous, ce n'est pas mon problème.", action: refuseQuest }
        ]
    );
}

// ACCEPTATION IMMÉDIATE
function acceptQuestDirect() {
    showDialogue(
        "Enfin une décision intelligente ! Le Gobelinbrouk a été aperçu près de la forêt. Nous devons nous mettre en route immédiatement.",
        [
            { text: "Partir à l'aventure", action: startAdventure }
        ]
    );
}

// PREMIER REFUS
function refuseQuest() {
    showDialogue(
        "Pardon ? Tu crois vraiment avoir le choix ? Très bien, reste donc ici à attendre que le Gobelinbrouk vienne te voler tes affaires aussi !",
        [
            { text: "Bon... d'accord, je viens.", action: acceptQuestAfterRefusal },
            { text: "Je préfère rester ici.", action: refuseAgain }
        ]
    );
}

// DEUXIÈME REFUS
function refuseAgain() {
    showDialogue(
        "Incroyable. Je n'ai jamais vu quelqu'un d'aussi inutile. Bon, si tu refuses, je vais devoir te défoncer la gueule.",
        [
            { text: "Finalement ! Je vais vous aider monsieur Batbrouk.", action: acceptQuestAfterRefusal }
        ]
    );
}

// ACCEPTATION APRÈS REFUS
function acceptQuestAfterRefusal() {
    showDialogue(
        "Ok, je vois que t'as besoin de gifles pour te motiver ! Ramène l'Œufbrouk ou je vais te motiver moi-même !",
        [
            { text: "Partir à l'aventure", action: startAdventure }
        ]
    );
}

// DÉBUT DE L'AVENTURE
function startAdventure() {
    changeScene(
        "images/fond/foretbrouk.jpg",
        "images/personnages/gobelinbrouk.webp",
        "Gobelinbrouk"
    );

    showDialogue(
        "Après quelques minutes de marche, vous apercevez une silhouette étrange. Un gobelin se tient au milieu du chemin. Il vous observe avec méfiance.",
        [
            { text: "Lui demander s'il a volé l'Œufbrouk.", action: meetGobelin }
        ]
    );
}

// RENCONTRE AVEC GOBELINBROUK
function meetGobelin() {
    showDialogue(
        "Alors comme ça, vous cherchez l'Œufbrouk ? Je pourrais peut-être vous aider... Mais avant, prouvons que vous êtes digne de discuter avec moi. Trois petites questions d'économie !",
        [
            { text: "Très bien, je relève le défi.", action: startQuiz }
        ]
    );
}

// QUESTIONS D'ÉCONOMIE
const quizQuestionsPool = [
    {
        question: "Qu'est-ce que l'inflation ?",
        answers: [
            { text: "Une augmentation générale des prix", correct: true },
            { text: "Une baisse générale des prix", correct: false },
            { text: "Une augmentation des impôts uniquement", correct: false }
        ]
    },
    {
        question: "Que signifie le sigle PIB ?",
        answers: [
            { text: "Produit Intérieur Brut", correct: true },
            { text: "Prix International des Banques", correct: false },
            { text: "Production Industrielle Belge", correct: false }
        ]
    },
    {
        question: "Que désigne le chômage ?",
        answers: [
            { text: "Une situation où une personne sans emploi en recherche un", correct: true },
            { text: "Une période de vacances obligatoire", correct: false },
            { text: "Une baisse du prix des produits", correct: false }
        ]
    },
    {
        question: "Qu'est-ce qu'un monopole ?",
        answers: [
            { text: "Un marché avec un seul vendeur", correct: true },
            { text: "Un marché avec beaucoup de concurrents", correct: false },
            { text: "Une entreprise qui ne vend rien", correct: false }
        ]
    },
    {
        question: "À quoi sert une banque ?",
        answers: [
            { text: "À gérer l'argent et proposer des services financiers", correct: true },
            { text: "À fabriquer des billets de banque", correct: false },
            { text: "À fixer le prix de tous les produits", correct: false }
        ]
    },
    {
        question: "Qu'est-ce qu'un salaire ?",
        answers: [
            { text: "Une rémunération pour un travail effectué", correct: true },
            { text: "Une taxe payée par les consommateurs", correct: false },
            { text: "Une somme prêtée par l'État", correct: false }
        ]
    },
    {
        question: "Que signifie épargner ?",
        answers: [
            { text: "Mettre de l'argent de côté", correct: true },
            { text: "Dépenser tout son argent", correct: false },
            { text: "Emprunter de l'argent à une banque", correct: false }
        ]
    },
    {
        question: "Qu'est-ce qu'un budget ?",
        answers: [
            { text: "Une prévision des recettes et des dépenses", correct: true },
            { text: "Une liste des entreprises d'un pays", correct: false },
            { text: "Une monnaie utilisée à l'étranger", correct: false }
        ]
    },
    {
        question: "Que se passe-t-il si la demande augmente alors que l'offre reste identique ?",
        answers: [
            { text: "Les prix ont tendance à augmenter", correct: true },
            { text: "Les prix deviennent automatiquement gratuits", correct: false },
            { text: "Les produits disparaissent du marché", correct: false }
        ]
    },
    {
        question: "Qu'est-ce qu'une dette ?",
        answers: [
            { text: "Une somme d'argent que l'on doit rembourser", correct: true },
            { text: "Une somme d'argent gagnée à la loterie", correct: false },
            { text: "Un impôt que l'on ne paie jamais", correct: false }
        ]
    },
    {
        question: "Quel est le rôle des impôts ?",
        answers: [
            { text: "Financer les dépenses et services publics", correct: true },
            { text: "Enrichir directement les commerçants", correct: false },
            { text: "Remplacer les salaires", correct: false }
        ]
    },
    {
        question: "Qu'est-ce que le bénéfice d'une entreprise ?",
        answers: [
            { text: "Ce qui reste après avoir déduit les coûts des recettes", correct: true },
            { text: "Le montant total de ses dettes", correct: false },
            { text: "Le salaire de tous ses employés réunis", correct: false }
        ]
    }
];

// MÉLANGER UNE LISTE
function shuffleArray(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

// DÉBUT DU QUIZ
function startQuiz() {
    quizScore = 0;
    quizQuestion = 0;

    quizQuestions = shuffleArray(quizQuestionsPool)
        .slice(0, 3)
        .map(question => ({
            question: question.question,
            answers: shuffleArray(question.answers)
        }));

    askQuizQuestion();
}

// AFFICHER UNE QUESTION
function askQuizQuestion() {
    const current = quizQuestions[quizQuestion];

    showDialogue(
        "Question " + (quizQuestion + 1) + " sur 3 : " + current.question,
        current.answers.map((answer, index) => ({
            text: answer.text,
            action: () => answerQuiz(index)
        }))
    );
}
// VÉRIFIER LA RÉPONSE
function answerQuiz(answerIndex) {
    const current = quizQuestions[quizQuestion];
    const correct = current.answers[answerIndex].correct;

    if (correct) {
        quizScore++;

        let reaction = "";

        if (quizQuestion === 0) {
            reaction = "Hihi ! Pas mal ! Tu as eu un petit coup de chance, avoue !";
        }
        else if (quizQuestion === 1) {
            reaction = "Hihi ! Encore une bonne réponse ?! Tu commences à m'inquiéter, là !";
        }
        else {
            reaction = "Hihi ! Trois questions et tu arrives encore à réfléchir ?! Quel dommage !";
        }

        showDialogue(
            reaction,
            [
                { text: "Question suivante", action: nextQuizQuestion }
            ]
        );
    }
    else {
        showDialogue(
            "Hihi ! Espèce de nul ! Hihi ! Tu connais rien ! Ressaye !",
            [
                { text: "Continuer", action: nextQuizQuestion }
            ]
        );
    }
}

// QUESTION SUIVANTE
function nextQuizQuestion() {
    quizQuestion++;

    if (quizQuestion < quizQuestions.length) {
        askQuizQuestion();
    }
    else {
        finishQuiz();
    }
}

// FIN DU QUIZ
function finishQuiz() {
    if (quizScore >= 2) {
        showDialogue(
            "Hihi ! Bon... tu as réussi à répondre correctement à " +
            quizScore + " questions sur 3. Je n'ai jamais eu l'Œufbrouk ! " +
            "Mais je connais quelqu'un qui pourrait vous renseigner : " +
            "Tortubrouk. Il se trouve près de la Cascade à Vin.",
            [
                {
                    text: "Batbrouk, vous pouvez m'accompagner ?",
                    action: batbroukDeparture
                }
            ]
        );
    }
    else {
        // Un échec au quiz de Gobelinbrouk compte pour la fin.
        endingFailures++;

        showDialogue(
            "Hihi ! Tu peux toujours rêver ! T'auras jamais ton bac ! " +
            "Je te dirai rien ! Va crever !",
            [
                {
                    text: "Appeler Batbrouk",
                    action: gobelinFailure
                }
            ]
        );
    }
}

// ÉCHEC TOTAL : BATBROUK ENVOIE LE JOUEUR VERS RICHEBROUK
function gobelinFailure() {
    changeScene(
        "images/fond/foretbrouk.jpg",
        "images/personnages/batbrouk.webp",
        "Batbrouk"
    );

    showDialogue(
        "Quoi ?! Tu as encore réussi à te faire insulter par un gobelin ?! " +
        "Bon, puisque tu es manifestement incapable de te débrouiller seul, " +
        "va voir Richebrouk. Il saura peut-être faire quelque chose de toi.",
        [
            {
                text: "Aller voir Richebrouk",
                action: goToRichebrouk
            }
        ]
    );
}

// RENCONTRE AVEC RICHEBROUK
function goToRichebrouk() {
    changeScene(
        "images/fond/foretbrouk.jpg",
        "images/personnages/richebrouk.webp",
        "Richebrouk"
    );

    showDialogue(
        "Ah ! Un nouvel aventurier ! Batbrouk m'a parlé de vous. " +
        "Je sais où trouver Tortubrouk, mais cette information a un prix. " +
        "En échange, vous devrez me remettre l'Œufbrouk une fois que vous l'aurez récupéré. " +
        "Alors, avez-vous conclu un marché ?",
        [
            {
                text: "Accepter le marché",
                action: () => {
                    richebroukDeal = true;

                    showDialogue(
                        "Excellent ! Vous savez prendre les bonnes décisions financières ! " +
                        "Tortubrouk se trouve près de la Cascade à Vin. " +
                        "N'oubliez pas notre accord : l'Œufbrouk sera à moi !",
                        [
                            {
                                text: "Partir à la Cascade à Vin",
                                action: goToWaterfall
                            }
                        ]
                    );
                }
            },
            {
                text: "Refuser le marché",
                action: refuseRichebroukDeal
            }
        ]
    );
}

// REFUSER LE MARCHÉ DE RICHEBROUK
function refuseRichebroukDeal() {
    richebroukRefusals++;

    if (richebroukRefusals === 1) {
        showDialogue(
            "« Tu n'as pas le choix, en fait ! Tu es nul en économie et moche en plus ! » " +
            "Richebrouk vous regarde en attendant une réponse.",
            [
                {
                    text: "Bon... J'accepte.",
                    action: () => {
                        richebroukDeal = true;

                        showDialogue(
                            "« Enfin une décision financière raisonnable ! " +
                            "Tortubrouk se trouve près de la Cascade à Vin. " +
                            "Et n'oubliez pas : l'Œufbrouk sera à moi ! »",
                            [
                                {
                                    text: "Partir à la Cascade à Vin",
                                    action: goToWaterfall
                                }
                            ]
                        );
                    }
                },
                {
                    text: "Je refuse toujours !",
                    action: refuseRichebroukDeal
                }
            ]
        );
    } else {
        showDialogue(
            "« Bah recommence ! Il est fou, lui ! »",
            [
                {
                    text: "Recommencer",
                    action: () => location.reload()
                }
            ]
        );
    }
}
// BATBROUK REFUSE D'ACCOMPAGNER LE JOUEUR
function batbroukDeparture() {
    changeScene(
        "images/fond/foretbrouk.jpg",
        "images/personnages/batbrouk.webp",
        "Batbrouk"
    );

    showDialogue(
        "T'accompagner ? Certainement pas ! J'ai autre chose à faire, il est fou lui !",
        [
            {
                text: "Quoi ? Comment ça ?",
                action: batbroukManifestation
            }
        ]
    );
}

// EXPLICATION DE LA MANIFESTATION
function batbroukManifestation() {
    showDialogue(
        "Pour défendre les chauves-souris ! C'est scandaleux de les appeler chauves alors que j'ai moi-même de magnifiques cheveux longs ! Il est temps que les choses changent !",
        [
            {
                text: "Bon... bonne manifestation.",
                action: goToWaterfall
            }
        ]
    );
}

// BATBROUK S'EN VA, LE JOUEUR CONTINUE SEUL
function goToWaterfall() {
    changeScene(
        "images/fond/cascadeVin.jpg",
        "images/personnages/tortubrouk.webp",
        "Tortubrouk"
    );

    showDialogue(
        "Batbrouk s'éloigne déjà en direction de la manifestation. Vous voilà désormais seul. Après une longue marche, vous arrivez devant une immense cascade. Une étrange odeur de vin flotte dans l'air. Un individu à l'allure de tortue se tient tranquillement à proximité.",
        [
            {
                text: "Bonjour, êtes-vous Tortubrouk ?",
                action: meetTortu
            }
        ]
    );
}

// RENCONTRE AVEC TORTUBROUK
function meetTortu() {
    showDialogue(
        "Hum... non abrutis, je suis Licornebrouk ! Tu veux quoi ?",
        [
            {
                text: "Je cherche l'Œufbrouk.",
                action: () => showDialogue(
                    "L'Œufbrouk ? Encore cette histoire ? Vous êtes tous obsédés par cet œuf ! Bon, expliquez-moi ce qui s'est passé.",
                    [
                        {
                            text: "Il a été volé par Gobelinbrouk.",
                            action: () => showDialogue(
                                "Gobelinbrouk ? Bah retourne avec ce marxiste ! Je ne veux rien avoir à faire avec lui !",
                                [
                                    {
                                        text: "Mais je vous assure que je cherche seulement l'œuf !",
                                        action: talkToTortu
                                    }
                                ]
                            )
                        }
                    ]
                )
            },
            {
                text: "Je viens de la part de Gobelinbrouk.",
                action: () => showDialogue(
                    "Gobelinbrouk ?! ce marxiste ! Je ne veux rien avoir à faire avec lui !",
                    [
                        {
                            text: "Je cherche l'Œufbrouk.",
                            action: talkToTortu
                        },
                        {
                            text: "Je vais vous laisser tranquille.",
                            action: () => showDialogue(
                                "C'est sa rentre chez toi ! avec ta tête d'asticot !",
                                [
                                    {
                                        text: "attendez ! je suis désolé reprenons depuis le début !",
                                        action: meetTortu
                                    }
                                ]
                            )
                        }
                    ]
                )
            },
            {
                text: "Pardon, je me suis trompé.",
                action: () => showDialogue(
                    " Il est débile en plus d'être laid ! Et oui, c'est moi Tortubrouk, je suis une tortue ! Maintenant, qu'est-ce que vous me voulez ?",
                    [
                        {
                            text: "Vous êtes bien Tortubrouk ?",
                            action: () => showDialogue(
                                "Oui, je suis une tortue ! TORTU-BROUK ! Il faut vraiment tout vous expliquer ?",
                                [
                                    {
                                        text: "Je cherche l'Œufbrouk.",
                                        action: talkToTortu
                                    }
                                ]
                            )
                        }
                    ]
                )
            }
        ]
    );
}

// CONVERSATION AVEC TORTUBROUK
function talkToTortu() {
    showDialogue(
        "L'Œufbrouk, dites-vous ? Voilà une histoire bien intéressante... Tout a commencé en 2008 par la plus grande crise économique qui ait jamais existé.",
        [
            {
                text: "Et quel rapport avec l'Œufbrouk ?",
                action: startTortuChallenge
            }
        ]
    );
}

// LANCER L'ÉPREUVE DE TORTUBROUK
function startTortuChallenge() {
    showDialogue(
        "Avant de vous aider, je vais vérifier vos connaissances économiques. Trouvez le mot que j'ai en tête. Vous avez six erreurs autorisées. Ne me décevez pas !",
        [
            {
                text: "Je suis prêt !",
                action: startPendu
            }
        ]
    );
}

// RÉSULTAT DE L'ÉPREUVE DE TORTUBROUK
function finishTortuChallenge(success) {
    if (success) {
        tortuSuccess();
    }
    else {
        // L'échec au pendu compte également pour la fin.
        endingFailures++;
        tortuFailure();
    }
}

// ROUTE DE RÉUSSITE
function tortuSuccess() {
    showDialogue(
        "Pas mal du tout ! Je reconnais que vous possédez quelques connaissances. Vous méritez mon aide. J'ai aperçu une étrange créature transporter quelque chose ressemblant à l'Œufbrouk vers les anciennes ruines.",
        [
            {
                text: "Où se trouvent ces ruines ?",
                action: successRuinsScene
            }
        ]
    );
}


// SCÈNE APRÈS RÉUSSITE : TORTUBROUK INDIQUE LE PASSAGE
function successRuinsScene() {
    showDialogue(
        "Derrière la cascade, vous découvrez un passage étroit qui semble mener vers d'anciennes ruines. " +
        "Tortubrouk vous avait prévenu : quelque chose rôde dans cet endroit.",
        [
            {
                text: "S'engager dans le passage",
                action: enterRuins
            }
        ]
    );
}

// ROUTE D'ÉCHEC : TORTUBROUK IMPOSE UN COURS D'ÉCONOMIE
function tortuFailure() {
    showDialogue(
        "Ah... Quelle déception. Vous ne connaissez donc rien à l'économie ? " +
        "Très bien. Installez-vous. Je vais vous expliquer la crise des subprimes. " +
        "Cela vous fera peut-être du bien.",
        [
            { text: "Attendez...", action: subprimeLesson1 },
            { text: "Je comprends rien... monsieur.", action: subprimeLesson1 },
            { text: "Zzz", action: subprimeLesson1 }
        ]
    );
}

function subprimeLesson1() {
    showDialogue(
        "La crise des subprimes est une crise financière qui a débuté aux États-Unis en 2007. " +
        "Elle concerne des prêts immobiliers à risque accordés à des personnes ayant une situation financière fragile.",
        [
            { text: "Attendez...", action: subprimeLesson2 },
            { text: "Je comprends rien... monsieur.", action: subprimeLesson2 },
            { text: "Zzz", action: subprimeLesson2 }
        ]
    );
}

function subprimeLesson2() {
    showDialogue(
        "À partir de 2005, la Réserve fédérale américaine augmente ses taux directeurs. " +
        "Les emprunteurs ayant des crédits à taux variables voient alors leurs mensualités augmenter. " +
        "Beaucoup ne peuvent plus rembourser leurs prêts.",
        [
            { text: "Attendez...", action: subprimeLesson3 },
            { text: "Je comprends rien... monsieur.", action: subprimeLesson3 },
            { text: "Zzz", action: subprimeLesson3 }
        ]
    );
}

function subprimeLesson3() {
    showDialogue(
        "Dans le même temps, les prix de l'immobilier commencent à baisser. " +
        "Les organismes de crédit ne peuvent plus récupérer suffisamment d'argent en revendant les maisons des emprunteurs défaillants. " +
        "De nombreuses sociétés font faillite.",
        [
            { text: "Attendez...", action: subprimeLesson4 },
            { text: "Je comprends rien... monsieur.", action: subprimeLesson4 },
            { text: "Zzz", action: subprimeLesson4 }
        ]
    );
}

function subprimeLesson4() {
    showDialogue(
        "Mais ce n'est pas tout ! Les banques avaient regroupé ces prêts dans des produits financiers complexes appelés produits titrisés. " +
        "Ces produits ont été vendus à de nombreux investisseurs. Le risque s'est donc propagé bien au-delà des États-Unis.",
        [
            { text: "Attendez...", action: subprimeLesson5 },
            { text: "Je comprends rien... monsieur.", action: subprimeLesson5 },
            { text: "Zzz", action: subprimeLesson5 }
        ]
    );
}

function subprimeLesson5() {
    showDialogue(
        "Finalement, les banques perdent confiance les unes envers les autres. " +
        "Elles hésitent à se prêter de l'argent, ce qui provoque une crise bancaire et financière majeure en 2008. " +
        "Vous voyez ? C'est pourtant simple !",
        [
            { text: "Attendez...", action: subprimeLesson6 },
            { text: "Je comprends rien... monsieur.", action: subprimeLesson6 },
            { text: "Zzz", action: subprimeLesson6 }
        ]
    );
}

function subprimeLesson6() {
    showDialogue(
        "Et pour terminer, retenez bien ceci : la crise des subprimes a révélé les dangers des crédits trop risqués, " +
        "de la titrisation mal maîtrisée et du manque de contrôle des institutions financières. " +
        "Avez-vous bien compris ?",
        [
            { text: "Attendez...", action: playerFallsAsleep },
            { text: "Je comprends rien... monsieur.", action: playerFallsAsleep },
            { text: "Zzz", action: playerFallsAsleep }
        ]
    );
}

// LE JOUEUR S'ENDORT APRÈS LE COURS
function playerFallsAsleep() {
    showDialogue(
        "Votre regard se trouble. Les paroles de Tortubrouk deviennent de plus en plus lointaines... " +
        "Les subprimes... les taux directeurs... la titrisation... Zzzzzzz...",
        [
            { text: "Se réveiller...", action: wakeUpWithCigale }
        ]
    );
}

// RÉVEIL PAR CIGALEBROUK
function wakeUpWithCigale() {
    changeScene(
        "images/fond/cascadeVin.jpg",
        "images/personnages/cigalebrouk.webp",
        "Cigalebrouk"
    );

    showDialogue(
        "Eh oh ! Réveille-toi ! Ça fait des heures que tu dors ! " +
        "Tu viens de subir le cours de Tortubrouk ? Hahaha ! Il est complètement fou avec son économie !",
        [
            { text: "Qu'est-ce qui s'est passé ?", action: cigaleExplanation }
        ]
    );
}

// CIGALEBROUK RÉVÈLE LE SECRET DE TORTUBROUK
function cigaleExplanation() {
    showDialogue(
        "Tu ne savais pas ? Tortubrouk boit du vin pour fluidifier son sang. " +
        "Il prétend que ça lui permet de rester éternellement jeune et de devenir immortel ! " +
        "Il en boit tellement qu'il a fini par croire que c'était une véritable science !",
        [
            { text: "Et l'Œufbrouk dans tout ça ?", action: cigaleEggClue }
        ]
    );
}

// NOUVELLE PISTE VERS LES RUINES
function cigaleEggClue() {
    showDialogue(
        "L'Œufbrouk ? Ah oui ! J'ai entendu dire qu'une étrange créature était passée près de la cascade avec un objet très précieux. " +
        "Si tu veux mon avis, tu devrais suivre les traces qui partent derrière les rochers.",
        [
            { text: "Remercier Cigalebrouk", action: cigaleSongChoice }
        ]
    );
}

// PROPOSITION DE CHANTER POUR CIGALEBROUK
function cigaleSongChoice() {
    showDialogue(
        "Attends une seconde ! Avant de partir, tu ne connaîtrais pas une petite chanson sur l'économie ? " +
        "J'adore la musique !",
        [
            {
                text: "Chanter : Abrouk ! Abrouk ! La passion du PIB !",
                action: () => {
                    cigalebroukSong = true;

                    showDialogue(
                        "« ABROUK ! ABROUK ! LA PASSION DU PIB ! » " +
                        "Cigalebrouk se met à danser frénétiquement. " +
                        "« MAGNIFIQUE ! Quel talent ! Je n'ai absolument rien compris, mais j'adore ! »",
                        [
                            { text: "Prendre congé", action: cigaleDeparture }
                        ]
                    );
                }
            },
            {
                text: "Non merci, je préfère partir.",
                action: cigaleDeparture
            }
        ]
    );
}

function cigaleDeparture() {
    showDialogue(
        "Vous remerciez Cigalebrouk. Après cette sieste forcée et ce cours interminable, " +
        "vous décidez de suivre les traces derrière les rochers.",
        [
            { text: "Emprunter le sentier", action: failureRuinsScene }
        ]
    );
}


 // SCÈNE APRÈS ÉCHEC : LE JOUEUR TROUVE UN SENTIER
function failureRuinsScene() {
    showDialogue(
        "En fouillant les alentours de la cascade, vous remarquez un vieux sentier presque dissimulé par la végétation. " +
        "Les traces semblent s'enfoncer derrière les rochers.",
        [
            {
                text: "Emprunter le sentier",
                action: enterRuins
            }
        ]
    );
}

// ARRIVÉE AUX RUINES
function enterRuins() {
    changeScene(
        "images/fond/ruinebrouk.jpg",
        "images/personnages/skelebrouk.webp",
        "Skelebrouk"
    );

    showDialogue(
        "Au bout du sentier, vous découvrez les vestiges d'une ancienne cité. " +
        "Les pierres sont couvertes de mousse et d'étranges symboles ornent les murs. " +
        "Au milieu des ruines, une silhouette squelettique semble attendre votre arrivée.",
        [
            {
                text: "S'approcher de la silhouette",
                action: meetSkelebrouk
            }
        ]
    );
}

// RENCONTRE AVEC SKELEBROUK
function meetSkelebrouk() {
    showDialogue(
        "Oh... Un visiteur ! Cela faisait bien longtemps que je n'avais pas eu de compagnie. " +
        "Dites-moi, qu'est-ce qui vous amène dans ces humbles ruines ?",
        [
            {
                text: "Je cherche l'Œufbrouk.",
                action: () => showDialogue(
                    "L'Œufbrouk ?! Hahaha ! Vous arrivez un peu tard, mon cher. " +
                    "Cet objet est désormais à moi ! Et je compte bien le garder !",
                    [
                        {
                            text: "Rendez-le-moi !",
                            action: skeletonThreat
                        },
                        {
                            text: "Pourquoi le gardez-vous ?",
                            action: skeletonExplanation
                        }
                    ]
                )
            },
            {
                text: "Qui êtes-vous ?",
                action: () => showDialogue(
                    "Je suis Skelebrouk, gardien de ces ruines. " +
                    "Enfin... gardien est un grand mot. Disons que je passe le temps.",
                    [
                        {
                            text: "Je cherche l'Œufbrouk.",
                            action: meetSkelebrouk
                        }
                    ]
                )
            }
        ]
    );
}


 // EXPLICATION DE SKELEBROUK
function skeletonExplanation() {
    showDialogue(
        "Pourquoi ? Parce que cet œuf vaut une fortune ! " +
        "Et dans ce monde, tout a un prix. Je vais investir et devenir riche !",
        [
            {
                text: "Je dois le récupérer.",
                action: () => skeletonThreat()
            }
        ]
    );
}


// MENACE DE SKELEBROUK
function skeletonThreat() {
    showDialogue(
        "Le récupérer ? Il va falloir me passer sur le corps ! " +
        "Prépare-toi... tu vas pas faire de vieux os !",
        [
            {
                text: "Se préparer au combat",
                action: startSpaceShooter
            }
        ]
    );
}
// FIN DU COMBAT CONTRE SKELEBROUK
function finishSpaceShooter(success) {
    if (success) {
        skeletonVictories++;

        showDialogue(
            "Skelebrouk recule après votre attaque !",
            [
                {
                    text: "Continuer",
                    action: afterSkeletonVictory
                }
            ]
        );
    } else {
        endingFailures++;

        showDialogue(
            "Votre vaisseau est détruit ! Alors que Skelebrouk s'apprête à vous achever, " +
            "Batbrouk surgit et vous emporte loin du combat. " +
            "« Incroyable... tu es nul ! je dois tout faire ? va chercher l'Œufbrouk ! »",
            [
                {
                    text: "Continuer",
                    action: afterSkeletonDefeat
                }
            ]
        );
    }
}
// APRÈS UNE VICTOIRE CONTRE SKELEBROUK
function afterSkeletonVictory() {

    if (skeletonVictories === 1) {
        showDialogue(
            "Skelebrouk se relève péniblement. Il semble furieux.",
            [
                {
                    text: "Le combattre à nouveau",
                    action: startSpaceShooter
                },
                {
                    text: "Récupérer l'Œufbrouk",
                    action: postSkeletonRichebrouk
                }
            ]
        );

    } else if (skeletonVictories === 2) {
        showDialogue(
            "Skelebrouk se relève encore une fois. " +
            "« C'est bon ta gagné avance ! tu es bête ou sadique ? »",
            [
                {
                    text: "Le combattre une troisième fois",
                    action: startSpaceShooter
                },
                {
                    text: "Récupérer l'Œufbrouk",
                    action: postSkeletonRichebrouk
                }
            ]
        );

    } else {
        skeletonBoneObtained = true;

        showDialogue(
            "Votre troisième victoire est fatale. Skelebrouk s'effondre et disparaît. " +
            "À sa place, vous trouvez un os étrange... il ressemble étonnamment à un œuf.",
            [
                {
                    text: "Récupérer l'Œufbrouk",
                    action: postSkeletonRichebrouk
                }
            ]
        );
    }
}
// APRÈS UNE DÉFAITE CONTRE SKELEBROUK
function afterSkeletonDefeat() {

    changeScene(
        "images/fond/ruinebrouk.jpg",
        "images/personnages/batbrouk.webp",
        "Batbrouk"
    );

    showDialogue(
        "Batbrouk vous rejoint à l'entrée des ruines. " +
        "« Bon... visiblement, vous n'êtes pas vraiment à la hauteur. " +
        "Ne bougez pas, je vais m'occuper de ce squelette moi-même ! » " +
        "Batbrouk s'avance vers Skelebrouk et dégaine son arme. " +
        "Après un combat aussi impressionnant que bref, il revient vers vous. " +
        "« Voilà, problème réglé ! Maintenant, allez récupérer cet Œufbrouk. " +
        "Et essayez de ne pas le casser, pour une fois ! »",
        [
            {
                text: "Aller récupérer l'Œufbrouk",
                action: postSkeletonRichebrouk
            }
        ]
    );
}
// RÉCUPÉRER L'ŒUFBROUK
function recoverEgg() {
    eggRecovered = true;

    showDialogue(
        "Vous vous approchez du piédestal et récupérez délicatement l'Œufbrouk. " +
        "Il est enfin entre vos mains !",
        [
            {
                text: "Continuer",
                action: checkEnding
            }
        ]
    );
}
// ÉCHANGER L'OS DE SKELEBROUK CONTRE LE VÉRITABLE ŒUFBROUK
function secretRichebroukBoneTrade() {

    changeScene(
        "images/fond/ruinebrouk.jpg",
        "images/personnages/richebrouk.webp",
        "Richebrouk"
    );

    showDialogue(
        "Vous tendez discrètement l'os de Skelebrouk à Richebrouk. " +
        "Il l'examine attentivement avant de sourire. " +
        "« Magnifique ! Voilà un Œufbrouk digne de ce nom ! » " +
        "Il repart avec son précieux trophée, sans se douter de la supercherie. " +
        "Vous conservez le véritable Œufbrouk !",
        [
            {
                text: "Tenter de couver l'Œufbrouk",
                action: attemptGoldenPhoenix
            },
            {
                text: "Ne pas tenter de le couver",
                action: recoverEgg
            }
        ]
    );
}
/// RETOUR DE RICHEBROUK APRÈS SKELEBROUK
function postSkeletonRichebrouk() {

    if (!richebroukDeal) {
        recoverEgg();
        return;
    }

    changeScene(
        "images/fond/ruinebrouk.jpg",
        "images/personnages/richebrouk.webp",
        "Richebrouk"
    );

    let choices = [
        {
            text: "Lui donner le véritable Œufbrouk",
            action: () => {
                showDialogue(
                    "Vous remettez le véritable Œufbrouk à Richebrouk. " +
                    "Il s'en empare avec un sourire satisfait. " +
                    "« Une excellente affaire ! »",
                    [
                        {
                            text: "Découvrir les conséquences",
                            action: richebroukBadEnding
                        }
                    ]
                );
            }
        },
        {
            text: "Refuser",
            action: refuseRichebrouk
        }
    ];

    if (skeletonBoneObtained) {
        choices.splice(1, 0, {
            text: "Lui donner l'os de Skelebrouk",
            action: secretRichebroukBoneTrade
        });
    }

    showDialogue(
        "Ah ! Vous voilà enfin ! " +
        "Je viens récupérer mon Œufbrouk, comme convenu ! " +
        "Notre contrat est notre contrat !",
        choices
    );
}

// REFUSER LE MARCHÉ DE RICHEBROUK
function refuseRichebrouk() {
    showDialogue(
        "« Tu crois que les promesses, c'est pour les chiens ? " +
        "Donne-moi l'œuf ou je te défonce ! »",
        [
            {
                text: "Ok... me frapper pas monsieur Abrouk.",
                action: richebroukBadEnding
            }
        ]
    );
}

// TENTATIVE DE TRANSFORMATION EN PHÉNIX D'OR
function attemptGoldenPhoenix() {

    if (
        richebroukDeal &&
        cigalebroukSong &&
        skeletonBoneObtained 
    ) {

        showDialogue(
            "Vous prenez délicatement l'Œufbrouk dans vos mains. " +
            "Vous commencez à le couver tout en chantant : " +
            "« Abrouk ! Abrouk ! La passion du PIB ! » " +
            "Soudain, l'œuf se met à briller intensément ! " +
            "Une lumière dorée envahit les ruines...",
            [
                {
                    text: "Découvrir le résultat",
                    action: goldenPhoenixEnding
                }
            ]
        );

    } else {

        showDialogue(
            "Vous essayez de couver l'Œufbrouk en chantant, mais rien ne se passe. " +
            "Après plusieurs minutes, vous réalisez que vous êtes simplement en train de tenir un œuf sur vos genoux. " +
            "Richebrouk vous regarde avec désespoir. " +
            "« Quelle catastrophe financière... »",
            [
                {
                    text: "Récupérer l'Œufbrouk",
                    action: recoverEgg
                }
            ]
        );
    }
}

// VÉRIFICATION DE L'ÉTAT DE L'ŒUFBROUK
function checkEnding() {

    // PRIORITÉ À LA FIN SECRÈTE
    if (
        richebroukDeal &&
        cigalebroukSong &&
        skeletonBoneObtained
    ) {
        showDialogue(
            "Vous contemplez l'Œufbrouk. " +
            "Malgré les épreuves traversées, vous avez réuni tous les éléments nécessaires à son incroyable transformation...",
            [
                {
                    text: "Tenter de faire naître le Phénix d'or",
                    action: attemptGoldenPhoenix
                }
            ]
        );

        return;
    }

    // MAUVAISE FIN CLASSIQUE
    if (endingFailures >= 3) {
        showDialogue(
            "En observant l'Œufbrouk, vous découvrez qu'il est complètement brisé. " +
            "Il ne reste plus aucun espoir...",
            [
                {
                    text: "Continuer",
                    action: badEnding
                }
            ]
        );

    } else {

        // BONNE FIN CLASSIQUE
        let eggCondition = "";

        if (endingFailures === 0) {
            eggCondition = "L'Œufbrouk est parfaitement intact.";
        } else if (endingFailures === 1) {
            eggCondition = "Une petite fissure apparaît sur la coquille de l'Œufbrouk.";
        } else {
            eggCondition = "L'Œufbrouk est couvert de nombreuses fissures. Il semble sur le point de se briser.";
        }

        showDialogue(
            eggCondition,
            [
                {
                    text: "Continuer",
                    action: goodEnding
                }
            ]
        );
    }
}

// MAUVAISE FIN
function badEnding() {
    changeScene(
        "images/fond/citybroukdetruit.jpg",
        "images/personnages/batbrouk.webp",
        "Batbrouk"
    );

    showDialogue(
        "La coquille de l'Œufbrouk se brise entre vos mains. " +
        "Une lumière aveuglante envahit les ruines. " +
        "Au loin, la ville entière disparaît dans un terrible cataclysme. " +
        "Batbrouk vous regarde, dépité. " +
        "« Félicitations... tu viens de détruire toute notre économie. " +
        "La prochaine fois révise tes cours. Car tu es un nul ! T'auras pas ton bac ! »",
        [
            {
                text: "Découvrir le sort de Richebrouk",
                action: () => {
                    changeScene(
                        "images/fond/citybroukdetruit.png",
                        "images/personnages/richebrouk.webp",
                        "Richebrouk"
                    );

                    showDialogue(
                        "Tout est détruit, sauf Richebrouk qui devient encore plus riche ! " +
                        "Vive le CAPITALISME !",
                        [
                            {
                                text: "Fin de l'aventure",
                                action: () => showDialogue(
                                    "BAD END — L'ŒUFBROUK EST BRISÉ. " +
                                    "Votre professeur serait très déçu."
                                )
                            }
                        ]
                    );
                }
            }
        ]
    );
}
// MAUVAISE FIN : RICHEBROUK EMPORTE L'ŒUFBROUK
function richebroukBadEnding() {

    changeScene(
        "images/fond/citybroukdetruit.jpg",
        "images/personnages/richebrouk.webp",
        "Richebrouk"
    );

    showDialogue(
        "Richebrouk serre l'Œufbrouk contre lui avec un sourire satisfait. " +
        "« Ah ! Quelle merveilleuse transaction ! " +
        "Je vous remercie pour votre coopération ! » " +
        "Il quitte les ruines sans même regarder derrière lui. " +
        "Quelques instants plus tard, une terrible explosion ravage la ville. " +
        "Vous venez de vendre le dernier espoir de tout un peuple.",
        [
            {
                text: "Découvrir le sort de Richebrouk",
                action: () => {
                    showDialogue(
                        "Pendant que la ville disparaît dans le chaos, " +
                        "Richebrouk contemple son nouvel investissement. " +
                        "Tout est détruit, sauf Richebrouk qui devient encore plus riche ! " +
                        "Vive le CAPITALISME !",
                        [
                            {
                                text: "Fin de l'aventure",
                                action: () => showDialogue(
                                    "BAD END — LA GRANDE TRANSACTION. " +
                                    "Vous avez vendu le destin du monde pour une mauvaise affaire."
                                )
                            }
                        ]
                    );
                }
            }
        ]
    );
}

// BONNE FIN : L'ŒUFBROUK EST ENCORE INTACT
function goodEnding() {

    let eggDialogue = "";

    if (endingFailures === 0) {
        eggDialogue =
            "« Incroyable ! Vous avez réussi à me ramener sans la moindre égratignure ! " +
            "Vous êtes peut-être moins stupide que vous en avez l'air. »";
    } else if (endingFailures === 1) {
        eggDialogue =
            "« Aïe... Une fissure ! Vous auriez pu faire attention. " +
            "Mais bon, je suis encore en état de parler. C'est déjà ça. »";
    } else {
        eggDialogue =
            "« PAR LES DIEUX DE L'ÉCONOMIE ! Regardez mon état ! " +
            "Je suis à deux doigts de m'effondrer ! Vous avez vraiment révisé vos cours ? »";
    }

    showDialogue(
        "L'Œufbrouk se met soudainement à trembler. Une petite voix s'élève de sa coquille... " +
        eggDialogue,
        [
            {
                text: "Continuer",
                action: goodEndingChoice
            }
        ]
    );
}

// CHOIX FINAL DU JOUEUR
function goodEndingChoice() {

    let choices = [
        {
            text: "Détruire l'Œufbrouk",
            action: destroyEggEnding
        },
        {
            text: "Ramener l'Œufbrouk en ville",
            action: bringEggEnding
        }
    ];

    if (!eggHatchAttempted) {
        choices.push({
            text: "Faire éclore l'Œufbrouk",
            action: hatchEggEnding
        });
    }

    showDialogue(
        "Vous avez enfin récupéré l'Œufbrouk. Mais que comptez-vous en faire ?",
        choices
    );
}

// FIN : DESTRUCTION DE L'ŒUFBROUK
function destroyEggEnding() {
    changeScene(
        "images/fond/citybroukdetruit.jpg",
        "images/personnages/batbrouk.webp",
        "Batbrouk"
    );

    showDialogue(
        "Vous décidez de détruire l'Œufbrouk. " +
        "À peine la coquille brisée, une immense explosion ravage la ville. " +
        "Les bâtiments s'effondrent, les rues disparaissent sous les flammes. " +
        "Batbrouk observe le désastre, complètement abasourdi. " +
        "« Enfaite ! t'a un soucis mental ? même une palourde , elle aurait compris que c'était pas une bonne idée ! »",
        [
            {
                text: "Fin de l'aventure",
                action: () => showDialogue(
                    "FIN — L'ÉCONOMIE DE LA DESTRUCTION. " +
                    "Vous venez de provoquer la pire crise immobilière de l'histoire."
                )
            }
        ]
    );
}

// FIN : RETOUR DE L'ŒUFBROUK EN VILLE
function bringEggEnding() {
    changeScene(
        "images/fond/citybrouk.png",
        "images/personnages/oeufbrouk.webp",
        "Œufbrouk"
    );

    showDialogue(
        "Vous ramenez l'Œufbrouk jusqu'à la ville. " +
        "À votre arrivée, les habitants se rassemblent autour de vous. " +
        "Des cris de joie retentissent dans toutes les rues ! " +
        "L'Œufbrouk est enfin de retour et la ville est sauvée ! " +
        "« Mes chers sujets ! Je suis de retour ! " +
        "Et grâce à cet aventurier... nous allons pouvoir reprendre notre croissance économique ! »",
        [
            {
                text: "Célébrer la victoire",
                action: () => showDialogue(
                    "Les festivités durent plusieurs jours. Vous êtes accueilli comme un héros. " +
                    "GOOD END — LA VILLE EST SAUVÉE !"
                )
            }
        ]
    );
}

// FIN : TENTER DE FAIRE ÉCLORE L'ŒUFBROUK
function hatchEggEnding() {
    eggHatchAttempted = true;
    showDialogue(
        "Vous cherchez un moyen de faire éclore l'Œufbrouk. " +
        "Vous essayez de le secouer, de le réchauffer et même de lui chanter une berceuse. " +
        "Après quelques minutes, une voix s'élève de la coquille : " +
        "« Vous êtes sérieux ? Je ne suis pas une poule ! " +
        "Vous êtes un vrai aventurier ! ou vous etes un fermier ?! »" +
        "Ramène moi en ville ! Je veux pas finir en omelette !",
        [
            {
                text: "Revenir au choix précédent",
                action: goodEndingChoice
            }
        ]
    );
}

// FIN SECRÈTE : NAISSANCE DU PHÉNIX D'OR
function goldenPhoenixEnding() {

    changeScene(
        "images/fond/phoenixbroukfond.jpg",
        "images/personnages/phoenixbrouk.jpg",
        "Phénix d'or"
    );

    showDialogue(
        "Une explosion de lumière dorée illumine les ruines ! " +
        "L'Œufbrouk se fissure lentement avant de laisser apparaître une créature majestueuse : " +
        "un magnifique Phénix d'or ! " +
        "Vous venez de découvrir une richesse inestimable !",
        [
            {
                text: "Admirer le Phénix",
                action: finalSecretEnding
            }
        ]
    );
}


// CONCLUSION DE LA FIN SECRÈTE
function finalSecretEnding() {

    changeScene(
        "images/fond/phoenixbroukfond.jpg",
        "images/personnages/phoenixbrouk.jpg",
        "Phénix d'or"
    );

    showDialogue(
        "Vous repartez avec le Phénixbrouk. " +
        "Richebrouk est reparti satisfait avec un simple os, et vous avez réussi à sauver le véritable trésor. " +
        "Vous vous réveillez : le cours est terminé ! " +
        "Votre vie devient étrange depuis ce réveil. Vos choix économiques deviennent évidents. " +
        "Vous créez 200 entreprises florissantes et ne payez jamais le moindre centime d'impôt. " +
        "Le jour de votre 99e anniversaire, vous rejoignez l'au-delà sur le dos d'un Phénix doré. " +
        "Félicitations ! Vous avez découvert la FIN SECRÈTE : LE PHÉNIX DU PIB !",
        []
    );
}