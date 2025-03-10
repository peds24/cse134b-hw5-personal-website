class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'})
    }

    connectedCallback(){
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
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
            <source srcset="/images/webLang.png" media="(max-width: 600px)">
            <img src="/images/webscribe.png" alt="Image of WebScribe Interface">
        </picture>
        <div class="text">
            <h2 class="title">WebScribe (WebApp developer Journal)</h2>
            <h4 class="languages"><em>HTML, CSS, JS</em></h4>
            <p class="description">
            A UI design project that evolved from ocean-themed wireframes to a modern, minimalist interface. The development process progressed from basic sketches to detailed Figma designs, including custom icons and animations. The final product features transparent rotating panes with a matte glass aesthetic, multiple color schemes, and interactive elements like volume control and sliding animations. The design approach notably uses background-only color tagging to achieve its distinctive look. The project drew inspiration from apps like Obsidian, Fantastical, and TickTick, and was documented through a demonstration video.
            </p>
            <a href="https://github.com/cse110-sp24-group17/cse110-sp24-group17">Link to GitHub Repo</a>
        </div>
    </div>
    `
    }
    /* set data({ title, image, languages, description, link }) {
        this.shadowRoot.querySelector(".title").textContent = title;
        const img = this.shadowRoot.querySelector("img");
        img.src = image;
        img.alt = `Image for ${title}`;s
        this.shadowRoot.querySelector(".languages").textContent = languages;
        this.shadowRoot.querySelector(".description").textContent = description;
        const repoLink = this.shadowRoot.querySelector("a");

        if (repoLink){
            repoLink.href = link;
            repoLink.textContent = "More information is here at the repo link";
        } else if (repoLink == "private"){
            repoLink.textContent = "Repo is private, but can be shared upon request.";
        } else {
            repoLink.textContent = "No repository link available.";
        }
        
      } */
}

customElements.define('project-card', ProjectCard);

