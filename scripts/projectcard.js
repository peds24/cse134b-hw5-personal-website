class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('title') || 'Project Title';
        const defaultImage = this.getAttribute('imageLarge') || '';
        const altImage = this.getAttribute('imageSmall') || '';
        const languages = this.getAttribute('languages') || 'coding language';
        const description = this.getAttribute('description') || 'Short description of the project.';
        const link = this.getAttribute('link') || '';
        const linkText = this.getAttribute('linkText')
        this.shadowRoot.innerHTML = `
        <style>
        .card-elem {
            display: flex;
            width: fit-content;
            height: auto;
            border: var(--primary-color) solid;
            border-radius: 25px;
            align-items: center;
            justify-self: center;
            gap: 1rem;
        }
        .card-elem picture {
            position: relative;
            width: 250px;
            height: 250px;
            border-radius: 25px;
            display: flex;
            align-items: center;
            background-color: color-mix(in srgb, var(--primary-color), transparent 80%);
            border: solid var(--primary-color);
            margin: 1rem 0 1rem 1rem
        }
        .card-elem img {
            width: 100%;
            height: auto;
        }
        .card-elem .text {
            display: flex;
            flex-direction: column;
            width: 612px;
            height: auto;
            align-self: center;
            gap: 1rem;
        }

        .card-elem .title {
            margin: 0;
            font-size: 2rem;
            padding: 0 1rem;
        }
        .card-elem .languages {
            margin: 0;
            font-style: italic;
            color: var(--primary-color);
            font-size: 1.5 rem;
            padding: 0 1rem;
        }
        .card-elem .description{
            margin: 0;
            font-size: 1rem;
            padding: 0 1rem;
        }
        
        a {
            color: var(--primary-color);
            transition: color var(--transition-duration) var(--transition-ease);
            padding: 0 1rem 1rem 1rem;
        }

        a:visited {
            color: var(--primary-color);
        }

        a:hover {
            filter: invert();
        }

        a[href="private"] {
            color: var(--primary-color);
            pointer-events: none;
            cursor: default;
        }

        @media (max-width: 767px) {
            .card-elem{
                display: flex;
                flex-direction: column;
                width:100%;
                height: auto;
            }
            .card-elem picture {
                width: 150px;
                height: 150px;
                border-radius: 25px;
                display: flex;
                align-items: center;
            }
            
            .card-elem .title{
                font-size: 1.5rem;
            
            }
            .card-elem .description{
                font-size: 0.9rem;

            }
            .card-elem .text{
                width: 100%;
            }

            a {
                align-self: center;
                font-size: 0.9rem;
            }
        }

        @media (max-width: 1195px) and (min-width: 768px) {
            .card-elem{
                display: flex;
                flex-direction: row;
                width:100%;
                height: auto;
            }

            .card-elem picture {
                width: 200px;
                height: 200px;
                border-radius: 25px;
                display: flex;
            }
        }

    </style>

    <div class="card-elem">
        <picture>
            <source srcset="${altImage}" media="(max-width: 600px)">
            <img src="${defaultImage}" alt="Image of ${title}">
        </picture>
        <div class="text">
            <h2 class="title">${title}</h2>
            <h4 class="languages"><em>${languages}</em></h4>
            <p class="description">${description}</p>
            <a href="${link}">${linkText}</a>
        </div>
    </div>
    `
    }
}

customElements.define('project-card', ProjectCard);

// document.addEventListener("DOMContentLoaded", () => {
//     const cardContainer = document.getElementById("card-container");
//     const loadLocalButton = document.getElementById("load-local");
//     const loadRemoteButton = document.getElementById("load-remote");
//     const clearStorageButton = document.getElementById("clear-storage");

//     // Create and display a dummy card
//     const dummyProject = {
//         title: "Sample Project",
//         imageLarge: "https://placehold.co/250",
//         imageSmall: "https://placehold.co/150",
//         description: "This is a sample project card. Click the load buttons to fetch real projects.",
//         languages: "HTML, CSS, JavaScript",
//         link: "https://example.com",
//     };
    
//     function createProjectCard(project) {
//         const card = document.createElement('project-card');
//         card.setAttribute('title', project.title);
//         card.setAttribute('imageLarge', project.imageLarge);
//         card.setAttribute('imageSmall', project.imageSmall);
//         card.setAttribute('description', project.description);
//         card.setAttribute('languages', project.languages);
//         card.setAttribute('link', project.link);

//         if (project.link === "private") {
//             card.setAttribute('linkText', "Repo is private, but can be shared upon request.");
//         } else if (project.link === "") {
//             card.setAttribute('linkText', "");
//         } else {
//             card.setAttribute('linkText', "Project repo linked here.");
//         }

//         return card;
//     }

//     // Display the dummy card initially
//     cardContainer.appendChild(createProjectCard(dummyProject));

//     async function loadProjects(url) {
//         try {
//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error(`Error: ${response.statusText}`);
//             }
//             const projects = await response.json();
            
//             // Clear existing cards
//             cardContainer.innerHTML = '';
            
//             // Create and append new cards
//             projects.forEach(project => {
//                 const card = createProjectCard(project);
//                 cardContainer.appendChild(card);
//             });
            
//             // Store in localStorage
//             const storageKey = url.includes('netlify') ? 'remote_projects' : 'local_projects';
//             localStorage.setItem(storageKey, JSON.stringify(projects));
//             console.log(`Projects loaded and saved to ${storageKey}.`);
//         } catch (error) {
//             console.error(`Failed to fetch and load projects: ${error.message}`);
//             // Restore dummy card if loading fails
//             cardContainer.innerHTML = '';
//             cardContainer.appendChild(createProjectCard(dummyProject));
//         }
//     }

//     // Add event listeners for the buttons
//     loadLocalButton.addEventListener("click", () => loadProjects("./data/projects.json"));
//     loadRemoteButton.addEventListener("click", () => loadProjects("https://pedro-serdio.netlify.app/public/db.json"));

//     clearStorageButton.addEventListener("click", () => {
//         localStorage.removeItem('local_projects');
//         localStorage.removeItem('remote_projects');
//         console.log("Local storage cleared.");
//         // Reset to dummy card
//         cardContainer.innerHTML = '';
//         cardContainer.appendChild(createProjectCard(dummyProject));
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("card-container");

    // Create and display a dummy card
    const dummyProject = {
        title: "Sample Project",
        imageLarge: "https://placehold.co/250",
        imageSmall: "https://placehold.co/150",
        description: "This is a sample project card. Projects will load automatically.",
        languages: "HTML, CSS, JavaScript",
        link: "https://example.com",
    };
    
    function createProjectCard(project) {
        const card = document.createElement('project-card');
        card.setAttribute('title', project.title);
        card.setAttribute('imageLarge', project.imageLarge);
        card.setAttribute('imageSmall', project.imageSmall);
        card.setAttribute('description', project.description);
        card.setAttribute('languages', project.languages);
        card.setAttribute('link', project.link);

        if (project.link === "private") {
            card.setAttribute('linkText', "Repo is private, but can be shared upon request.");
        } else if (project.link === "") {
            card.setAttribute('linkText', "");
        } else {
            card.setAttribute('linkText', "Project repo linked here.");
        }

        return card;
    }

    async function loadProjects(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const projects = await response.json();
            
            // Clear existing cards
            cardContainer.innerHTML = '';
            
            // Create and append new cards
            projects.forEach(project => {
                const card = createProjectCard(project);
                cardContainer.appendChild(card);
            });
            
            // Store in localStorage
            localStorage.setItem('projects', JSON.stringify(projects));
            console.log("Projects loaded and saved to local storage.");
        } catch (error) {
            console.error(`Failed to fetch and load projects: ${error.message}`);
            // Restore dummy card if loading fails
            cardContainer.innerHTML = '';
            cardContainer.appendChild(createProjectCard(dummyProject));
        }
    }

    // Automatically load projects from the remote URL when the page loads
    loadProjects("https://pedro-serdio.netlify.app/public/db.json");
});
