class LoadingSpinner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          text-align: center;
          padding: 20px;
        }
        .spinner {
          width: 36px;
          height: 36px;
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: var(--primary, #2d4263);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      </style>
      <div class="spinner"></div>
    `;
  }
}

customElements.define('loading-spinner', LoadingSpinner);
