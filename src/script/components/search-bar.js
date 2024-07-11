class SearchBar extends HTMLElement {
    _shadowRoot = null;

    _submitEvent = 'submit';
    _searchEvent = 'search';

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });

        this.render();
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    connectedCallback() {
        this._shadowRoot
            .querySelector('form')
            .addEventListener('submit', (event) => this._onFormSubmit(event, this));
        this.addEventListener(this._submitEvent, this._onSearchBarSubmit);
    }

    disconnectedCallback() {
        this._shadowRoot
            .querySelector('form')
            .removeEventListener('submit', (event) => this._onFormSubmit(event, this));
        this.removeEventListener(this._submitEvent, this._onSearchBarSubmit);
    }

    _onFormSubmit(event, searchBarInstance) {
        event.preventDefault();  

        const query = this._shadowRoot.querySelector('input#name').value;
        searchBarInstance.dispatchEvent(new CustomEvent('submit', { detail: { query }, bubbles: true }));
    }

    _onSearchBarSubmit() {
        const query = this._shadowRoot.querySelector('input#name').value;

        if (!query) return;

        this.dispatchEvent(
            new CustomEvent(this._searchEvent, {
                detail: { query },
                bubbles: true,
            }),
        );
    }

    render() {
        this._emptyContent();

        this._shadowRoot.innerHTML += `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <form id="searchForm" class="search-form">
            <div class="input-group mb-3">
                <input id="name" name="name" type="search" class="form-control" placeholder="Search..">
                <button class="btn btn-outline-secondary">Search</button>
            </div>
        </form>
      `;
    }
}

customElements.define('search-bar', SearchBar);
