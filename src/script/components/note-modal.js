class NoteModal extends HTMLElement {
  _shadowRoot = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });

    this.render();
  }

  connectedCallback() {
    this.modal = new bootstrap.Modal(
      this._shadowRoot.getElementById("noteModal"),
    );

    this._shadowRoot
      .querySelector("#openModalBtn")
      .addEventListener("click", () => {
        this.modal.show();
      });

    this._shadowRoot
      .querySelector("#noteForm")
      .addEventListener("submit", this._onSubmit.bind(this));

    const titleInput = this._shadowRoot.getElementById("noteTitle");
    const bodyInput = this._shadowRoot.getElementById("noteBody");

    titleInput.addEventListener(
      "input",
      this._validateInput.bind(this, titleInput),
    );
    bodyInput.addEventListener(
      "input",
      this._validateInput.bind(this, bodyInput),
    );
  }

  disconnectedCallback() {
    this._shadowRoot
      .querySelector("#openModalBtn")
      .removeEventListener("click", () => {
        this.modal.show();
      });
    this._shadowRoot
      .querySelector("#noteForm")
      .removeEventListener("submit", this._onSubmit.bind(this));
  }

  _onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get("title");
    const body = formData.get("body");

    this.dispatchEvent(
      new CustomEvent("note-added", {
        detail: { title, body },
        bubbles: true,
        composed: true,
      }),
    );

    event.target.reset();
    this.modal.hide();
  }

  _validateInput(inputElement) {
    const value = inputElement.value.trim();
    const errorElement = inputElement.nextElementSibling;

    if (value === "") {
      errorElement.textContent = "This field is required.";
    } else {
      errorElement.textContent = "";
    }
  }

  render() {
    this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <button type="button" class="btn btn-primary mb-3" id="openModalBtn">Add Note</button>
            <div class="modal fade" id="noteModal" tabindex="-1" aria-labelledby="noteModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="noteModalLabel">Add Note</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="noteForm">
                                <div class="mb-3">
                                    <label for="noteTitle" class="form-label">Title</label>
                                    <input type="text" class="form-control" id="noteTitle" name="title" required>
                                    <div class="text-danger"></div>
                                </div>
                                <div class="mb-3">
                                    <label for="noteBody" class="form-label">Body</label>
                                    <textarea class="form-control" id="noteBody" name="body" rows="4" required></textarea>
                                    <div class="text-danger"></div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Add Note</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }
}

customElements.define("note-modal", NoteModal);
