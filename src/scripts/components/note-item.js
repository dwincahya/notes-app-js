import { animate } from '@motionone/dom';

class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['note'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'note') {
      this.note = JSON.parse(newValue);
      this.render();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-bottom: 1rem;
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        :host(:hover) {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .note-content {
          margin-bottom: 1rem;
        }
        button {
          margin-right: 0.5rem;
          padding: 0.25rem 0.5rem;
          background-color: #2d4263;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #1a2a3f;
        }
      </style>
      <div class="note-content">
        <h3>${this.note.title}</h3>
        <p>${this.note.body}</p>
        <small>${new Date(this.note.createdAt).toLocaleDateString()}</small>
      </div>
      <button class="delete">Delete</button>
      <button class="archive">${this.note.archived ? 'Unarchive' : 'Archive'}</button>
    `;

    animate(this, { opacity: [0, 1], y: [20, 0] }, { duration: 0.5 });

    this.shadowRoot.querySelector('.delete').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('delete', { detail: this.note.id }));
    });

    this.shadowRoot.querySelector('.archive').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('archive', { detail: this.note.id }));
    });
  }
}

customElements.define('note-item', NoteItem);
