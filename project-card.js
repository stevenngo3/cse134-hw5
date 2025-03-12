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
            margin: 0 0 8px;
            font-size: 1.5em;
            }

        picture img {
            width: 100%;
            border-radius: 4px;
            }

        p {
            margin: 8px 0;
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
