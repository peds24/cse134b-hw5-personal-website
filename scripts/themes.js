// TODO: Refactor repeated code into reusable functions
// TODO: Add ability to reset only current the to default theme while keeping the other mode visible

document.addEventListener("DOMContentLoaded", function() {
    // Check if the theme container is present and display it as a flex container (js enabled check)
    if (document.getElementById('themeContainer')) {
        document.getElementById('themeContainer').style.display = 'flex';
    }

    // Retrieve interactable items from DOM
    const sun = document.getElementById('sun');
    const moon = document.getElementById('moon');
    const color_picker = document.getElementById('color-picker');
    const resetButton = document.getElementById('reset');

    // Retrieve and apply previous themes accent from local storage
    const savedTheme = localStorage.getItem('theme');
    const light_accent = localStorage.getItem('light-accent');
    const dark_accent = localStorage.getItem('dark-accent')

    if (savedTheme){
        document.documentElement.style.setProperty('--bg-color', savedTheme);
        if (savedTheme == '#CCCCCC') {
            localStorage.setItem('light-accent',light_accent);
            document.documentElement.style.setProperty('--primary-color', light_accent);
        } else {
            localStorage.setItem('dark-accent',dark_accent);
            document.documentElement.style.setProperty('--primary-color', dark_accent);
        }
    }

    const textColor = localStorage.getItem('text-color');
    if (textColor) {
        document.documentElement.style.setProperty('--text-color', textColor);
    }

    // Change to Light Theme
    if(sun){
        sun.addEventListener('click', () => {
            const light_bg = '#CCCCCC';
            let light_accent = 'blue';
            const light_text = '#000';
    
            document.documentElement.style.setProperty('--bg-color', light_bg);
            document.documentElement.style.setProperty('--text-color', light_text);
    
           if (localStorage.getItem('custom-color') != null){
                light_accent = localStorage.getItem('custom-color');
                document.documentElement.style.setProperty('--primary-color', light_accent);
            } else {
                document.documentElement.style.setProperty('--primary-color', light_accent);
            }
    
            applyTransition();
    
            localStorage.setItem('theme', light_bg);
            localStorage.setItem('text-color', light_text);
            localStorage.setItem('light-accent', light_accent);
        });
    }

    //Change to dark theme
    if(moon){
        moon.addEventListener('click', () => {
            const dark_bg = '#000';
            let dark_accent = 'orange';
            const dark_text = '#FFF';
    
            document.documentElement.style.setProperty('--bg-color', dark_bg);
            document.documentElement.style.setProperty('--text-color', dark_text);
    
            if (localStorage.getItem('custom-color') != null){
                dark_accent = localStorage.getItem('custom-color');
                document.documentElement.style.setProperty('--primary-color', dark_accent);
            } else {
                document.documentElement.style.setProperty('--primary-color', dark_accent);
            }
    
            applyTransition();
    
            localStorage.setItem('theme', dark_bg);
            localStorage.setItem('text-color', dark_text);
            localStorage.setItem('dark-accent', dark_accent);
        });
    }


    if (color_picker){
        color_picker.addEventListener('click', () => {
            const customColor = prompt('Enter a color for the accent color (e.g., #ff0000 or red):');
            if (customColor) {
                const currentTheme = localStorage.getItem('theme');

                if (currentTheme == '#000'){
                    localStorage.setItem('custom-color', customColor);
                    localStorage.setItem('dark-accent', customColor);
                    document.documentElement.style.setProperty('--primary-color', customColor);
                } else {
                    localStorage.setItem('custom-color', customColor);
                    localStorage.setItem('light-accent', customColor);
                    document.documentElement.style.setProperty('--primary-color', customColor);
                }
            }
        });
    }


    // Resets both themes to default
    if(resetButton){
        resetButton.addEventListener('click', () =>{
            const currentTheme = localStorage.getItem('theme');

            //future proof this by making a function... this is repeated code for now
            if(currentTheme == '#000'){
                const dark_bg = '#000';
                let dark_accent = 'orange';
                const dark_text = '#FFF';
                
                document.documentElement.style.setProperty('--bg-color', dark_bg);
                document.documentElement.style.setProperty('--text-color', dark_text);
                document.documentElement.style.setProperty('--primary-color', dark_accent);

                localStorage.setItem('theme', dark_bg);
                localStorage.setItem('text-color', dark_text);
                localStorage.setItem('dark-accent', dark_accent);
            }
            else {
                const light_bg = '#CCCCCC';
                let light_accent = 'blue';
                const light_text = '#000';
                
                document.documentElement.style.setProperty('--bg-color', light_bg);
                document.documentElement.style.setProperty('--text-color', light_text);
                document.documentElement.style.setProperty('--primary-color', light_accent);

                localStorage.setItem('theme', light_bg);
                localStorage.setItem('text-color', light_text);
                localStorage.setItem('light-accent', light_accent);
            }
            localStorage.removeItem('custom-color')
        });
    }

    //Apply transitions to page
    const applyTransition = () => {
        const transition = 'background-color 2s ease'
        const preArr = document.querySelectorAll('#preComp pre');
        if (!preArr[0].hidden) {
            preArr[0].style.transition = transition;
        }
        if (!preArr[1].hidden) {
            preArr[1].style.transition = transition;
        }
        if (!preArr[2].hidden) {
            preArr[2].style.transition = transition;
        }

        document.body.style.transition = transition;
    };

});