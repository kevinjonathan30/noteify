class NoteifyCard extends HTMLElement {
  static observedAttributes = ["title", "body", "data-id"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._title = this.getAttribute("title");
    this._body = this.getAttribute("body");
    this._id = this.getAttribute("data-id");

    this.handleDelete = this.handleDelete.bind(this);
    this.render();
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#deleteButton")
      .addEventListener("click", this.handleDelete);
  }

  disconnectedCallback() {
    this.shadowRoot
      .querySelector("#deleteButton")
      .removeEventListener("click", this.handleDelete);
  }

  getRandomColor() {
    const getRandomValue = () => Math.floor(Math.random() * 196);

    const r = getRandomValue().toString(16).padStart(2, "0");
    const g = getRandomValue().toString(16).padStart(2, "0");
    const b = getRandomValue().toString(16).padStart(2, "0");

    return `#${r}${g}${b}`;
  }

  render() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <div class="card" style="border: 1px solid ${this.getRandomColor()};">
            <div class="card-body">
                <h5 class="card-title">${this._title || ""}</h5>
                <p class="card-text">${this._body || ""}</p>
            </div>
            <div class="card-footer">
                <button class="btn btn-danger" id="deleteButton">Delete</button>
            </div>
        </div>
      `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[`_${name.replace("data-", "")}`] = newValue;
      this.render();
    }
  }

  handleDelete() {
    const deleteEvent = new CustomEvent("note-delete", {
      detail: {
        id: this._id,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(deleteEvent);
  }
}

customElements.define("noteify-card", NoteifyCard);
