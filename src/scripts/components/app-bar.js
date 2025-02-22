class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            background-color: #2d4263;
            color: white;
            padding: 1rem;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          h1 {
            margin: 0;
            font-size: 1.5rem;
          }
        </style>
        <h1>Notes App</h1>
      `;
  }
}

customElements.define('app-bar', AppBar);
