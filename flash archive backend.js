document.addEventListener("DOMContentLoaded", () => {
    const gameList = [
        { name: "Papa's Bakeria", file: "papasbakeria.swf" },
        { name: "Papa's Burgeria", file: "papasburgeria.swf" },
        { name: "Papa's Cheeseria", file: "papascheeseria_102.swf" },
        { name: "Papa's Cupcakeria", file: "papascupcakeria.swf" },
        { name: "Papa's Donuteria", file: "papasdonuteria.swf" },
        { name: "Papa's Freezeria", file: "papasfreezeria.swf" },
        { name: "Papa's Hot Doggeria", file: "papashotdoggeria.swf" },
        { name: "Papa's Pancakeria", file: "papaspancakeria.swf" },
        { name: "Papa's Pastaria", file: "papaspastaria.swf" },
        { name: "Papa's Pizzeria", file: "papaspizzeria_v2.swf" },
        { name: "Papa's Scooperia", file: "papasscooperia_v102.swf" },
        { name: "Papa's Sushiria", file: "papassushiria.swf" },
        { name: "Papa's Taco Mia", file: "papastacomia.swf" },
        { name: "Papa's Wingeria", file: "papaswingeria.swf" }
    ];

    const buttonsContainer = document.querySelector('.buttons');
    const swfContainer = document.getElementById('swf-container');

    gameList.forEach(game => {
        const button = document.createElement('button');
        button.textContent = `${game.name}`;
        button.onclick = () => loadSWF(`/swfs/${game.file}`);
        buttonsContainer.appendChild(button);
    });

    document.getElementById('fullscreen-toggle').addEventListener('click', toggleFullscreen);
});

const swfContainer = document.getElementById('swf-container');

async function loadSWF(swfPath) {
    swfContainer.innerHTML = '';
    const ruffle = window.RufflePlayer.newest().createPlayer();
    ruffle.style.width = '100%';
    ruffle.style.height = '100%';
    swfContainer.appendChild(ruffle);
    await ruffle.load({ url: swfPath });
}

async function toggleFullscreen() {
    const elem = document.getElementById('swf-container');
    try {
        if (!document.fullscreenElement) {
            await elem.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    } catch (err) {
        console.error(`Fullscreen error: ${err.message}`);
    }
}