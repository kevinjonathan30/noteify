class NoteifyCard extends HTMLElement {
    static observedAttributes = ['title', 'body'];

    constructor() {
        super();

        this._title = this.getAttribute('title');
        this._body = this.getAttribute('body');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${this._title}</h5>
                <p class="card-text">${this._body}</p>
            </div>
        </div>
      `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} changed.`);
        console.log(`Old value was ${oldValue}`);
        console.log(`New value is ${newValue}`);

        this[`_${name}`] = newValue;

        this.render();
    }
}

customElements.define('noteify-card', NoteifyCard);