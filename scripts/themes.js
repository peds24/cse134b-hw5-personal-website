document.addEventListener("DOMContentLoaded", function() {
    // Check if the theme container is present and display it as a flex container (js enabled check)
    if(document.getElementById('themeContainer')){
        document.getElementById('themeContainer').style.display = 'flex';
    }

    // Grab necessary DOM elements (sun, moon, color picker)
    const sun = document.getElementById('sun');
    const moon = document.getElementById('moon');
    const color_picker = document.getElementById('color-picker');

    // Retrieve and apply previously saved theme settings from localStorage (if available)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.style.setProperty('--bg-color', savedTheme);
    }

    const savedPreBg = localStorage.getItem('pre-color-bg');
    if (savedPreBg) {
        document.documentElement.style.setProperty('--pre-background', savedPreBg);
    }

    const textColor = localStorage.getItem('text-color');
    if (textColor) {
        document.documentElement.style.setProperty('--text-color', textColor);
    }

    const savedPrimaryColor = localStorage.getItem('primary-color')
    if (savedPrimaryColor) {
        document.documentElement.style.setProperty('--primary-color', savedPrimaryColor);
    }

    // Function to apply transition effect on background color changes
    const applyTransition = () => {
        const preArr = document.querySelectorAll('#preComp pre');
        if (!preArr[0].hidden){
            preArr[0].style.transition = 'background-color 1s ease-in';
        }
        if(!preArr[1].hidden){
            preArr[1].style.transition = 'background-color 1s ease-in';
        } 
        if(!preArr[2].hidden){
            preArr[2].style.transition = 'background-color 1s ease-in';
        }
        
        document.body.style.transition = 'background-color 1s ease-in';      
    };

    // Add event listener to switch to light theme when the sun icon is clicked
    if (sun) {
        sun.addEventListener('click', () => {
            const lightTheme = '#CCCCCC';
            const textColor = 'black';
            const preColorLight = '#B1B1B1';
            document.documentElement.style.setProperty('--bg-color', lightTheme);
            document.documentElement.style.setProperty('--text-color', textColor);
            document.documentElement.style.setProperty('--pre-background', preColorLight)

            applyTransition();

            localStorage.setItem('theme', lightTheme);
            localStorage.setItem('text-color', textColor);
            localStorage.setItem('pre-color-bg', preColorLight);
        });
    }

    // Add event listener to switch to dark theme when the moon icon is clicked
    if (moon) {
        moon.addEventListener('click', () => {
            const darkTheme = 'black';
            const textColor = 'white';
            const preColorDark = 'black';
            document.documentElement.style.setProperty('--bg-color', darkTheme);
            document.documentElement.style.setProperty('--text-color', textColor);
            document.documentElement.style.setProperty('--pre-background', preColorDark)

            applyTransition();
            
            localStorage.setItem('theme', darkTheme);
            localStorage.setItem('text-color', textColor);
            localStorage.setItem('pre-color-bg', preColorDark);
        });
    }

    // Add event listener to allow the user to pick a custom accent color
    if (color_picker) {
        color_picker.addEventListener('click', () => {
            const accentColor = prompt('Enter a color for the accent color (e.g., #ff0000 or red):');
            if (accentColor) {
                document.documentElement.style.setProperty('--primary-color', accentColor);
                localStorage.setItem('primary-color', accentColor);
            }
        });
    }
});
