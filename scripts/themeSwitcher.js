document.addEventListener("DOMContentLoaded", function () {
     // Check if the theme container is present and display it as a flex container (js enabled check)
     if (document.getElementById('themeContainer')) {
        document.getElementById('themeContainer').style.display = 'flex';
    }

    const themeSwitch = document.getElementById("theme-switch");
    const switchStatus = document.getElementById("switch-status");
    const color_picker = document.getElementById('color-picker');
    const resetButton = document.getElementById('reset');


    // Apply settinsg from local storage
    const background = localStorage.getItem('background');
    const textColor = localStorage.getItem('text-color')
    if (localStorage.getItem("darkmode") === "true") {
        if(themeSwitch){
            switchStatus.checked = true;
        }
        document.documentElement.style.setProperty('--bg-color', background);
        document.documentElement.style.setProperty('--text-color', textColor);
    } else {
        if(themeSwitch){
            switchStatus.checked = false;
        }
        document.documentElement.style.setProperty('--bg-color', background);
        document.documentElement.style.setProperty('--text-color', textColor);
    }

    const customColor = localStorage.getItem('custom-color');
    const accentColor = localStorage.getItem('accent-color');
    if (customColor){
        document.documentElement.style.setProperty('--primary-color', customColor);
    } else{
        document.documentElement.style.setProperty('--primary-color', accentColor);
    }


    // Update local storage and body class on switch change
    if(themeSwitch){
        themeSwitch.addEventListener("change", function () {
            if (switchStatus.checked) {
                localStorage.setItem("darkmode", "true");
                applyTheme("#000", "green", "#FFF");
    
            } else {
                localStorage.setItem("darkmode", "false");
                applyTheme("#BDBDBD", "green", "#000");
            }
        });
    }

    const applyTheme = (background, accentColor, textColor) => {
        document.documentElement.style.setProperty('--bg-color', background);
        document.documentElement.style.setProperty('--text-color', textColor);

        if (localStorage.getItem('custom-color') != null) {
            accentColor = localStorage.getItem('custom-color');
            document.documentElement.style.setProperty('--primary-color', accentColor);
        } else {
            document.documentElement.style.setProperty('--primary-color', accentColor);
        }

        applyTransition();
        localStorage.setItem('background', background);
        localStorage.setItem('text-color', textColor);
        localStorage.setItem('accent-color', accentColor);
    }

    if (color_picker){
        color_picker.addEventListener('click', () => {
            const customColor = prompt('Enter a color for the accent color (e.g., #ff0000 or red):');
            if (customColor) {
                localStorage.setItem('custom-color', customColor);
                document.documentElement.style.setProperty('--primary-color', customColor);
            }
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

    if(resetButton){
        resetButton.addEventListener('click', () =>{
            localStorage.removeItem('custom-color');
            if (switchStatus.checked) {
                localStorage.setItem("darkmode", "true");
                applyTheme("#000", "green", "#FFF");
    
            } else {
                localStorage.setItem("darkmode", "false");
                applyTheme("#CCC", "green", "#000");
            }
        });
    }
});