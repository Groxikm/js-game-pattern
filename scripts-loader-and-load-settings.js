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
