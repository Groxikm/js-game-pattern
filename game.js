//loading separated scripts
//this is the shitty way I'm able to use to make files separation
/*document.addEventListener('DOMContentLoaded', () => {
    const loaderScript = document.createElement('script');
    loaderScript.src = 'scripts-loader-and-load-settings.js';
    loaderScript.onload = () => {
        console.log('scripts-loader.js loaded successfully.');
        // Assuming the loadScripts call inside scripts-loader.js handles loading
        // and invoking the necessary callbacks
    };
    loaderScript.onerror = () => {
        console.error('Failed to load scripts-loader.js');
    };
    document.head.appendChild(loaderScript);
});*/
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
    // Any additional initialization code can go here
});


//canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gameWidth = canvas.width;
const gameHeight = canvas.height;


function clearCanvas() {
    ctx.clearRect(0, 0, gameWidth, gameHeight);
}

// Update game loop
function update() {
    if (isRunning) {
        clearCanvas();
        movePlayer();
        drawPlayer();
        drawPlatforms();
        requestAnimationFrame(update);
    }
}

// Initial draw
drawPlayer();
drawPlatforms();