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
            gap: 10px;
            padding: 14px 14px;
            width: fit-content;
            height: fit-content;

            border: var(--primary-color) solid;
            border-radius: 25px;
            align-items: center;
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
            font-size: 32px;
            letter-spacing: 0;
            line-height: normal;
        }
        .project-card .langauges {
            margin: 0;
            font-weight: 700;
            font-style: italic;
            color: var(--primary-color);
            font-size: 16px;
            letter-spacing: 0;
            line-height: normal;
            white-space: nowrap;
        }
        .project-card .description{
            margin: 0;
            font-weight: 400;
            font-size: 13px;
            letter-spacing: 0;
            line-height: normal;
        }

        @media (max-width: 834px) {
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
            <img src="/images/graphProj.png" alt="">
        </picture>
        <div class="text">
            <h2 class="title">Project Name</h2>
            <h4 class="langauges"><em>langauges used</em></h4>
            <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse tristique leo sit amet enim venenatis, non lobortis sem euismod.
                Vivamus dignissim lectus quis purus pharetra, eget cursus nulla lacinia.
                Maecenas sed leo lacinia, condimentum ante ac, congue sem.
                Donec vehicula diam ac purus imperdiet, quis ornare est porttitor.
                Nam fringilla nunc auctor iaculis finibus.
                Pellentesque suscipit massa in nisl aliquet, id vulputate ligula consectetur.
                Mauris imperdiet massa nec nunc porta, id convallis sem tincidunt.
                Morbi at risus sed ante scelerisque fermentum ac ut lacus.
                Aliquam quis purus scelerisque, consequat dolor quis, feugiat tortor.
            </p>
            <a href="">link</a>
        </div>
    </div>
    `
    }
    set data({ title, image, languages, description, link }) {
        this.shadowRoot.querySelector(".title").textContent = title;
        const img = this.shadowRoot.querySelector("img");
        img.src = image;
        img.alt = `Image for ${title}`;
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
        
      }
}

customElements.define('project-card', ProjectCard);

