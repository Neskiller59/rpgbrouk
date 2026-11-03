
// ==========================================
// SPACE SHOOTER - COMBAT CONTRE SKELEBROUK
// ==========================================

let spaceCanvas;
let spaceCtx;
let spaceAnimation;
let spaceKeys = {};

let spacePlayer;
let spaceEnemy;
let spaceBullets = [];
let spaceEnemyBullets = [];

let spaceRunning = false;
let spaceReady = false;
let spaceResultSent = false;

const SPACE_PLAYER_LIVES = 3;
const SPACE_ENEMY_MAX_HP = 30;

// DÉMARRER LE MINI-JEU
function startSpaceShooter() {
    const choices = document.getElementById("choices");

    document.getElementById("dialogue-text").textContent =
        "Skelebrouk vous fixe de ses orbites vides. Il lève lentement son arme. Le combat est inévitable !";

    choices.innerHTML = "";

    spaceCanvas = document.createElement("canvas");
    spaceCanvas.id = "space-canvas";
    spaceCanvas.width = 800;
    spaceCanvas.height = 500;

    spaceCanvas.style.width = "100%";
    spaceCanvas.style.maxWidth = "800px";
    spaceCanvas.style.display = "block";
    spaceCanvas.style.margin = "15px auto";
    spaceCanvas.style.background = "#080b20";
    spaceCanvas.style.border = "3px solid #b18a48";

    choices.appendChild(spaceCanvas);

    spaceCtx = spaceCanvas.getContext("2d");

    spacePlayer = {
        x: 400,
        y: 440,
        width: 40,
        height: 40,
        speed: 5,
        lives: SPACE_PLAYER_LIVES,
        cooldown: 0
    };

    spaceEnemy = {
        x: 400,
        y: 75,
        width: 110,
        height: 110,
        hp: SPACE_ENEMY_MAX_HP,
        direction: 1,
        speed: 2,
        cooldown: 0
    };

    spaceBullets = [];
    spaceEnemyBullets = [];

    spaceRunning = false;
    spaceReady = true;
    spaceResultSent = false;

    spaceKeys = {};

    // CHARGER L'IMAGE DE SKELEBROUK
    spaceEnemy.image = new Image();
    spaceEnemy.image.src =
        "../images/personnages/skelebroukpixel.png";

    // ÉCOUTER LES TOUCHES DU CLAVIER
    document.addEventListener("keydown", spaceKeyDown);
    document.addEventListener("keyup", spaceKeyUp);

    // AFFICHER LES RÈGLES
    drawSpaceShooterIntro();
}

// ÉCRAN DE PRÉPARATION
function drawSpaceShooterIntro() {

    spaceCtx.clearRect(0, 0, 800, 500);

    spaceCtx.fillStyle = "#080b20";
    spaceCtx.fillRect(0, 0, 800, 500);

    spaceCtx.textAlign = "center";

    spaceCtx.fillStyle = "#e5bd69";
    spaceCtx.font = "bold 32px Arial";
    spaceCtx.fillText("COMBAT CONTRE SKELEBROUK", 400, 90);

    spaceCtx.fillStyle = "white";
    spaceCtx.font = "22px Arial";
    spaceCtx.fillText("RÈGLES DU COMBAT", 400, 160);

    spaceCtx.font = "18px Arial";
    spaceCtx.fillText("← et → : déplacer votre vaisseau", 400, 220);
    spaceCtx.fillText("ESPACE : tirer des dollars", 400, 260);
    spaceCtx.fillText("Évitez les projectiles rouges de Skelebrouk !", 400, 300);
    spaceCtx.fillText("Vous disposez de 3 vies.", 400, 340);

    spaceCtx.fillStyle = "#38e66b";
    spaceCtx.font = "bold 24px Arial";
    spaceCtx.fillText("APPUYEZ SUR ESPACE POUR COMMENCER", 400, 430);
}

// GESTION DU CLAVIER
function spaceKeyDown(event) {

    if (["ArrowLeft", "ArrowRight", "Space"].includes(event.code)) {
        event.preventDefault();
    }

    // DÉMARRER APRÈS LECTURE DES RÈGLES
    if (spaceReady && event.code === "Space") {
        spaceReady = false;
        spaceRunning = true;
        spaceKeys = {};
        spaceLoop();
        return;
    }

    if (spaceRunning) {
        spaceKeys[event.code] = true;
    }
}

function spaceKeyUp(event) {
    spaceKeys[event.code] = false;
}

// BOUCLE PRINCIPALE
function spaceLoop() {
    if (!spaceRunning) return;

    updateSpaceShooter();
    drawSpaceShooter();

    if (spaceRunning) {
        spaceAnimation = requestAnimationFrame(spaceLoop);
    }
}

// METTRE À JOUR LE JEU
function updateSpaceShooter() {

    // DÉPLACEMENT DU VAISSEAU
    if (spaceKeys["ArrowLeft"]) {
        spacePlayer.x -= spacePlayer.speed;
    }

    if (spaceKeys["ArrowRight"]) {
        spacePlayer.x += spacePlayer.speed;
    }

    spacePlayer.x = Math.max(
        20,
        Math.min(780, spacePlayer.x)
    );

    // TIR DU JOUEUR
    if (spacePlayer.cooldown > 0) {
        spacePlayer.cooldown--;
    }

    if (spaceKeys["Space"] && spacePlayer.cooldown <= 0) {
        spaceBullets.push({
            x: spacePlayer.x,
            y: spacePlayer.y - 20,
            speed: 8
        });

        spacePlayer.cooldown = 15;
    }

    // DÉPLACEMENT DES DOLLARS
    spaceBullets.forEach(bullet => {
        bullet.y -= bullet.speed;
    });

    spaceBullets = spaceBullets.filter(
        bullet => bullet.y > 0
    );

    // DÉPLACEMENT DE SKELEBROUK
    spaceEnemy.x += spaceEnemy.speed * spaceEnemy.direction;

    if (spaceEnemy.x > 720 || spaceEnemy.x < 80) {
        spaceEnemy.direction *= -1;
    }

    // TIR DE SKELEBROUK
    if (spaceEnemy.cooldown > 0) {
        spaceEnemy.cooldown--;
    }

    if (spaceEnemy.cooldown <= 0) {
        spaceEnemyBullets.push({
            x: spaceEnemy.x,
            y: spaceEnemy.y + 45,
            speed: 4
        });

        spaceEnemy.cooldown = 60;
    }

    // DÉPLACEMENT DES PROJECTILES ENNEMIS
    spaceEnemyBullets.forEach(bullet => {
        bullet.y += bullet.speed;
    });

    spaceEnemyBullets = spaceEnemyBullets.filter(
        bullet => bullet.y < 500
    );

    // COLLISION DES DOLLARS AVEC SKELEBROUK
    spaceBullets.forEach(bullet => {
        if (
            bullet.x > spaceEnemy.x - 50 &&
            bullet.x < spaceEnemy.x + 50 &&
            bullet.y > spaceEnemy.y - 50 &&
            bullet.y < spaceEnemy.y + 50
        ) {
            spaceEnemy.hp--;
            bullet.y = -100;
        }
    });

    spaceBullets = spaceBullets.filter(
        bullet => bullet.y > -50
    );

    // COLLISION DES PROJECTILES AVEC LE JOUEUR
    spaceEnemyBullets.forEach(bullet => {
        if (
            Math.abs(bullet.x - spacePlayer.x) < 25 &&
            Math.abs(bullet.y - spacePlayer.y) < 25
        ) {
            spacePlayer.lives--;
            bullet.y = 600;
        }
    });

    spaceEnemyBullets = spaceEnemyBullets.filter(
        bullet => bullet.y < 550
    );

    // VICTOIRE
    if (spaceEnemy.hp <= 0) {
        endSpaceShooter(true);
        return;
    }

    // DÉFAITE
    if (spacePlayer.lives <= 0) {
        endSpaceShooter(false);
        return;
    }
}

// DESSINER LE JEU
function drawSpaceShooter() {

    spaceCtx.clearRect(0, 0, 800, 500);

    // FOND
    spaceCtx.fillStyle = "#080b20";
    spaceCtx.fillRect(0, 0, 800, 500);

    // ÉTOILES
    spaceCtx.fillStyle = "white";

    for (let i = 0; i < 40; i++) {
        const x = (i * 137) % 800;
        const y = (i * 83) % 500;

        spaceCtx.fillRect(x, y, 2, 2);
    }

    // SKELEBROUK
    if (spaceEnemy.image.complete && spaceEnemy.image.naturalWidth > 0) {
        spaceCtx.drawImage(
            spaceEnemy.image,
            spaceEnemy.x - 55,
            spaceEnemy.y - 55,
            110,
            110
        );
    } else {
        spaceCtx.fillStyle = "#dddddd";
        spaceCtx.font = "25px Arial";
        spaceCtx.textAlign = "center";
        spaceCtx.fillText(
            "SKELEBROUK",
            spaceEnemy.x,
            spaceEnemy.y
        );
    }

    // VAISSEAU DU JOUEUR
    spaceCtx.fillStyle = "#45a7ff";

    spaceCtx.beginPath();
    spaceCtx.moveTo(spacePlayer.x, spacePlayer.y - 25);
    spaceCtx.lineTo(spacePlayer.x - 20, spacePlayer.y + 20);
    spaceCtx.lineTo(spacePlayer.x + 20, spacePlayer.y + 20);
    spaceCtx.closePath();
    spaceCtx.fill();

    // DOLLARS
    spaceCtx.fillStyle = "#38e66b";
    spaceCtx.font = "bold 20px Arial";
    spaceCtx.textAlign = "center";

    spaceBullets.forEach(bullet => {
        spaceCtx.fillText(
            "$",
            bullet.x,
            bullet.y
        );
    });

    // PROJECTILES ENNEMIS
    spaceCtx.fillStyle = "#ff4444";

    spaceEnemyBullets.forEach(bullet => {
        spaceCtx.beginPath();
        spaceCtx.arc(bullet.x, bullet.y, 6, 0, Math.PI * 2);
        spaceCtx.fill();
    });

    // BARRE DE VIE DE SKELEBROUK
    spaceCtx.fillStyle = "#444";
    spaceCtx.fillRect(250, 15, 300, 15);

    spaceCtx.fillStyle = "#e53935";
    spaceCtx.fillRect(
        250,
        15,
        300 * Math.max(0, spaceEnemy.hp) / SPACE_ENEMY_MAX_HP,
        15
    );

    // INFORMATIONS DU JOUEUR
    spaceCtx.fillStyle = "white";
    spaceCtx.font = "18px Arial";
    spaceCtx.textAlign = "left";

    spaceCtx.fillText(
        "Vies : " + spacePlayer.lives,
        20,
        30
    );

    spaceCtx.fillText(
        "Dollars tirés : " + (SPACE_ENEMY_MAX_HP - spaceEnemy.hp),
        20,
        55
    );

    spaceCtx.textAlign = "center";
    spaceCtx.fillText(
        "← → Déplacement     ESPACE : Tirer",
        400,
        485
    );
}

// TERMINER LE MINI-JEU
function endSpaceShooter(success) {

    if (spaceResultSent) return;

    spaceResultSent = true;
    spaceRunning = false;
    spaceReady = false;

    cancelAnimationFrame(spaceAnimation);

    document.removeEventListener("keydown", spaceKeyDown);
    document.removeEventListener("keyup", spaceKeyUp);

    if (typeof finishSpaceShooter === "function") {
        finishSpaceShooter(success);
    } else {
        showDialogue(
            success
                ? "Skelebrouk s'effondre ! Vous avez remporté le combat !"
                : "Votre vaisseau est détruit ! Vous avez perdu le combat.",
            [
                {
                    text: "Recommencer le combat",
                    action: startSpaceShooter
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
                    action: recoverEgg
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
                    action: recoverEgg
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
                    action: recoverEgg
                }
            ]
        );
    }
}