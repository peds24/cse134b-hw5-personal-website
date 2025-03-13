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
            color: var(--hover-color);
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

document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("card-container");
    const loadLocalButton = document.getElementById("load-local");

    function loadProjectsFromLocalStorage() {
        const localProjects = JSON.parse(localStorage.getItem('projects'));
        if (localProjects) {
            localProjects.forEach(project => {
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
            
                cardContainer.appendChild(card);
            });
        }
    }

    async function fetchAndSaveProjects() {
        try {
            const response = await fetch("./data/projects.json"); 
            const projects = await response.json();
            localStorage.setItem("projects", JSON.stringify(projects));
            console.log("Projects saved to localStorage.");
            loadProjectsFromLocalStorage(); 
        } catch (error) {
            console.error("Failed to fetch and save projects:", error);
        }
    }

    // Load projects from localStorage on page load
    loadProjectsFromLocalStorage();

    // Add event listener for the button
    loadLocalButton.addEventListener("click", fetchAndSaveProjects);

    const clearStorageButton = document.getElementById("clear-storage");

    clearStorageButton.addEventListener("click", () => {
        localStorage.removeItem('projects');
        console.log("Local storage cleared.");
        cardContainer.innerHTML = ''; // Clear the displayed cards
    });




    const addRemoteButton = document.getElementById("add-remote");

    addRemoteButton.addEventListener("click", async () => {
        try {
            const response = await fetch("https://my-json-server.typicode.com/peds24/cse134b-hw5-personal-website");
            const remoteProjects = await response.json();
            console.log("Remote projects fetched:", remoteProjects);
            localStorage.setItem("remoteProjects", JSON.stringify(remoteProjects));
        } catch (error) {
            console.error("Failed to fetch remote projects:", error);
        }
    });
});