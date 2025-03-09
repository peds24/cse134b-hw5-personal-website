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
            align-items: center;
            gap: 10px;
            padding: 0px 0px 0px 14px;
            background-color: #ffffff;
            width: 1000px;
            height: 400px;

            border: #000000 solid;
            border-radius: 25px;
        }
        .project-card picture {
            position: relative;
            width: 350px;
            height: 350px;
            background-color: #3f2d2d;
            border-radius: 25px;
            display: flex;
            align-items: center;
        }
        .project-card img {
            width: 100%;
            height: auto;
        }
        .project-card .text {
            display: flex;
            flex-direction: column;
            width: 612px;
            height: 350px;
            align-items: flex-start;
            gap: 5px;
            background-color: #ffffff;
        }
        .project-card .title {
            margin: 0;
            font-family: "Inter-Bold", Helvetica;
            font-weight: 700;
            color: #000000;
            font-size: 32px;
            letter-spacing: 0;
            line-height: normal;
        }
        .project-card .langauges {
            margin: 0;
            font-family: "Inter-BoldItalic", Helvetica;
            font-weight: 700;
            font-style: italic;
            color: #000000;
            font-size: 16px;
            letter-spacing: 0;
            line-height: normal;
            white-space: nowrap;
        }
        .project-card .description{
            margin: 0;
            font-family: "Inter-Regular", Helvetica;
            font-weight: 400;
            color: #000000;
            font-size: 13px;
            letter-spacing: 0;
            line-height: normal;
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

