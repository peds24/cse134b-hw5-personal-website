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
        .project-card {
            display: flex;
            gap: 1rem;
            padding: 14px 14px;
            width: fit-content;
            height: fit-content;

            border: var(--primary-color) solid;
            border-radius: 25px;
            align-items: center;
            margin-top: 1rem; /* Remove this when adding manually */
        }
        .project-card picture {
            position: relative;
            width: 250px;
            height: 250px;
            border-radius: 25px;
            display: flex;
            align-items: center;
            background-color: color-mix(in srgb, var(--primary-color), transparent 80%);
            border: solid var(--primary-color);
        }
        .project-card img {
            width: 100%;
            height: auto;
        }
        .project-card .text {
            display: flex;
            flex-direction: column;
            width: 612px;
            height: auto;
            align-self: flex-start;
            gap: 5px;
        }
        .project-card .title {
            margin: 0;
            font-weight: 700;
            font-size: 2rem;
            line-height: normal;
        }
        .project-card .languages {
            margin: 0;
            font-weight: 700;
            font-style: italic;
            color: var(--primary-color);
            font-size: 1rem;
            letter-spacing: 0;
            line-height: normal;
            white-space: nowrap;
        }
        .project-card .description{
            margin: 0;
            font-weight: 400;
            font-size: 1rem;
            letter-spacing: 0;
            line-height: normal;
        }
        
        a {
            color: var(--primary-color);
             transition: color var(--transition-duration) var(--transition-ease);
        }

        a:visited {
            color: var(--primary-color);
        }

        a:hover {
            color: var(--hover-color);
        }

        a[href=""] {
            color: var(--primary-color);
            pointer-events: none;
            cursor: default;
        }

        @media (max-width: 834px) {
            header nav {
                flex-direction: column;
                font-size: 0.75rem;
                gap: 1rem;
            }

            h1{
                font-size: 2rem;
            }

            .project-card{
                display: flex;
                flex-direction: column;
            }
            .project-card picture {
                position: relative;
                width: 200px;
                height: 200px;
                border-radius: 25px;
                display: flex;
                align-items: center;
            }

            .project-card .text {
                display: flex;
                flex-direction: column;
                width: 389px;
                gap: 5px;
            }

            a {
                align-self: center;
            }
        }

        @media (max-width: 1195px) and (min-width: 835px) {
            .project-card picture {
                width: 200px;
                height: 200px;
                border-radius: 25px;
                display: flex;
            }

            .project-card .text {
                display: flex;
                flex-direction: column;
                width: 538px;
                height: auto;
            }
        }

    </style>

    <div class="project-card">
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

    async function fetchAndSaveProjects() {
        try {
            const response = await fetch("./data/projects.json"); // Replace with the path to your JSON file
            const projects = await response.json();
            localStorage.setItem("projects", JSON.stringify(projects));
            console.log("Projects saved to localStorage.");
        } catch (error) {
            console.error("Failed to fetch and save projects:", error);
        }

        const localProjects = JSON.parse(localStorage.getItem('projects'));
        localProjects.forEach(project => {
            const card = document.createElement('project-card');
            card.setAttribute('title', project.title);
            card.setAttribute('imageLarge', project.imageLarge);
            card.setAttribute('imageSmall', project.imageSmall);

            card.setAttribute('description', project.description);
            card.setAttribute('languages', project.languages);
            card.setAttribute('link', project.link)
            
            if (project.link == "private"){
                card.setAttribute('linkText', "Repo is private, but can be shared upon request.")
            } else if (project.link == ""){
                card.setAttribute('linkText', "")
            } else{
                card.setAttribute('linkText', "Project repo linked here.")
            }
            
        
            cardContainer.appendChild(card);
        });
    }


    // Add event listener for the button
    loadLocalButton.addEventListener("click", fetchAndSaveProjects);

    const clearStorageButton = document.getElementById("clear-storage");

    clearStorageButton.addEventListener("click", () => {
        localStorage.removeItem('projects');
        console.log("Local storage cleared.");
        cardContainer.innerHTML = ''; // Clear the displayed cards
    });
});