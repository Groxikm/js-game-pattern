function loadScripts(scripts, callback) {
    const promises = scripts.map(script => {
        return new Promise((resolve, reject) => {
            const scriptElement = document.createElement('script');
            scriptElement.src = script;
            scriptElement.onload = () => resolve(script);
            scriptElement.onerror = () => reject(new Error(`Failed to load script ${script}`));
            document.head.appendChild(scriptElement);
        });
    });

    Promise.all(promises)
        .then(() => {
            console.log('All scripts loaded successfully.');
            if (callback) callback();
        })
        .catch(error => console.error('Error loading scripts:', error));
}
const scriptsToLoad = [

    //'scripts-loader.js',
    './classes/player.js',
    './classes/actor-classes/enemy.js',
    './classes/decor-classes/platform.js',
    'controller.js'
    //'./classes/event-classes/ ',
    //'interfaces/
];

loadScripts(scriptsToLoad, () => {
    console.log('Executing callback after scripts are loaded.');

});


//canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gameWidth = canvas.width;
const gameHeight = canvas.height;


function clearCanvas() {
    ctx.clearRect(0, 0, gameWidth, gameHeight);
}

// game loop
function update() {
    if (isRunning) {
        clearCanvas();

        requestAnimationFrame(update);
    }
}

