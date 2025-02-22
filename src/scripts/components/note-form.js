class NotesForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            max-width: 500px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
  
          form {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
          }
  
          input, textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 1rem;
            background: #f9f9f9;
            color: #333;
          }
  
          textarea {
            height: 120px;
            resize: vertical;
          }
  
          button {
            background: #333;
            color: white;
            border: none;
            padding: 12px;
            font-size: 1rem;
            border-radius: 6px;
            cursor: pointer;
            transition: background 0.3s;
            width: 100%;
          }
  
          button:hover {
            background: #555;
          }
  
          #message {
            font-size: 0.9rem;
            color: #d9534f;
            margin-top: 8px;
          }
        </style>
        <form id="noteForm">
          <input type="text" id="title" placeholder="Judul Catatan" required />
          <textarea id="body" placeholder="Isi Catatan" required></textarea>
          <button type="submit">Tambah Catatan</button>
        </form>
        <p id="message"></p>
      `;
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector('#noteForm')
      .addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();
    const title = this.shadowRoot.querySelector('#title').value.trim();
    const body = this.shadowRoot.querySelector('#body').value.trim();
    const messageEl = this.shadowRoot.querySelector('#message');

    if (!title || !body) {
      messageEl.textContent = 'Judul dan isi tidak boleh kosong!';
      return;
    }

    this.dispatchEvent(
      new CustomEvent('submit', {
        detail: { title, body },
        bubbles: true,
        composed: true,
      })
    );

    this.shadowRoot.querySelector('#noteForm').reset();
  }
}

customElements.define('note-form', NotesForm);
