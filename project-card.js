class ProjectCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        const title = this.getAttribute('title');
        const imgUrl = this.getAttribute('image-url');
        const description = this.getAttribute('description');
        const hyperlink = this.getAttribute('hyperlink');
        const linkText = this.getAttribute('link-text');

        const h2 = document.createElement("h2");
        const picture = document.createElement("picture");
        const img = document.createElement("img");
        const p = document.createElement("p");
        const a = document.createElement("a");
        const style = document.createElement("style");

        style.textContent = `
        :host {
            display: block;
            border: 1px solid var(--card-border, #d3d3d3);
            border-radius: 8px; 
            padding: 16px;
            margin: 10px;
            background-color: var(--card-bg-color, #ffffff);
            }

        h2 {
            color: black;
            margin: 0 0 8px;
            font-size: 1.5em;
            }

        picture img {
            width: 100%;
            border-radius: 4px;
            }

        p {
            margin: 8px 0;
            color: black;
            }

        a {
            display: inline-block;
            margin-top: 6px;
            color: var(--card-link-color,rgb(0, 81, 255));
            text-decoration: none;
            }
        `;

        h2.textContent = title;
        img.src = imgUrl;
        img.alt = title;
        p.textContent = description;
        a.href = hyperlink;
        a.textContent = linkText;
        picture.appendChild(img);
        shadow.append(h2,picture,p,a,style);

    }

}

customElements.define("project-card", ProjectCard);

document.addEventListener("DOMContentLoaded", (event) => {
    const projectCards = document.querySelector(".project-cards");
    const localButton = document.getElementById("localbutton");
    const remoteButton = document.getElementById("remotebutton");

    function populateCards(projects) {
        projectCards.innerHTML = "";
        projects.forEach((project) => {
            const card = document.createElement("project-card");
            card.setAttribute("title", project.title);
            card.setAttribute("image-url", project.imgUrl);
            card.setAttribute("description", project.description);
            card.setAttribute("hyperlink", project.hyperlink);
            card.setAttribute("link-text", project.linkText);
            projectCards.appendChild(card);
        });
    }

    localButton.addEventListener("click", (event) => {
        const cachedData = localStorage.getItem("projectData");
        if (cachedData) {
            const projects = JSON.parse(cachedData);
            populateCards(projects);
        } else {
            alert("No local data found, load remote data first");
        }
    });

    remoteButton.addEventListener("click", (event) => {
        fetch("https://raw.githubusercontent.com/stevenngo3/cse134-hw5/main/projects.json")
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("projectData", JSON.stringify(data));
            populateCards(data);
        }) 
        .catch((error) => {
            console.error("Error fetching project data:", error);
            alert("Failed to load remote data");
        });
    });

});