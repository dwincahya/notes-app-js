import { getArchivedNotes, unarchiveNote } from '../api.js';
import { showError } from '../utils.js';
import Swal from 'sweetalert2';
import { animate } from '@motionone/dom';

class ArchiveList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          max-width: 800px;
          margin: 20px auto;
        }
        .header {
          text-align: center;
          margin-bottom: 10px;
        }
        .header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: var(--primary);
        }
        .notes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .note-item {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }
        .note-item:hover {
          transform: translateY(-2px);
        }
        button {
          margin-top: 10px;
          background: var(--secondary);
          color: white;
          border: none;
          padding: 8px 12px;
          font-size: 0.9rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s;
        }
        button:hover {
          background: #a33b29;
        }
      </style>
      <div class="header"><h2>Arsip Catatan</h2></div>
      <div class="notes-grid" id="archiveContainer"></div>
    `;
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const archiveContainer = this.shadowRoot.querySelector('#archiveContainer');
    archiveContainer.innerHTML = '';

    try {
      const archivedNotes = await getArchivedNotes();

      if (archivedNotes.length === 0) {
        archiveContainer.innerHTML =
          '<p>Tidak ada catatan yang diarsipkan.</p>';
        return;
      }

      archivedNotes.forEach((note) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note-item');
        noteElement.innerHTML = `
          <div class="note-title">${note.title}</div>
          <div class="note-body">${note.body}</div>
          <button data-id="${note.id}">Batalkan Arsip</button>
        `;

        noteElement
          .querySelector('button')
          .addEventListener('click', async (e) => {
            const noteId = e.target.getAttribute('data-id');
            try {
              await unarchiveNote(noteId);
              Swal.fire(
                'Berhasil!',
                'Catatan berhasil dibatalkan arsip.',
                'success'
              );
              this.render();
              document.querySelector('notes-list').render();
            } catch (error) {
              showError('Gagal membatalkan arsip: ' + error.message);
            }
          });

        archiveContainer.appendChild(noteElement);
      });

      animate(
        archiveContainer,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.5 }
      );
    } catch (error) {
      archiveContainer.innerHTML = `<p style="color: red;">Gagal memuat catatan arsip: ${error.message}</p>`;
    }
  }
}

customElements.define('archive-list', ArchiveList);
