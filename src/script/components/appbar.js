class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <nav class="navbar bg-body-tertiary">
          <div class="container">
            <span class="navbar-brand mb-0 h1">Noteify</span>
          </div>
        </nav>
      `;
  }
}

customElements.define('noteify-appbar', AppBar);

