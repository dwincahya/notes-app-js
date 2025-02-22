import { getNotes, deleteNote, archiveNote, unarchiveNote } from '../api.js';
import { showError, validateInput } from '../utils.js';
import Swal from 'sweetalert2';
import { animate } from '@motionone/dom';

class NotesList extends HTMLElement {
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
      </style>
      <div class="header"><h2>Catatan Aktif</h2></div>
      <div id="notesContainer" class="notes-grid"></div>
    `;
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const container = this.shadowRoot.querySelector('#notesContainer');
    container.innerHTML = '';
    try {
      const notes = await getNotes();
      const activeNotes = notes.filter((note) => !note.archived);
      if (activeNotes.length === 0) {
        container.innerHTML = '<p>Tidak ada catatan aktif.</p>';
        return;
      }
      activeNotes.forEach((note) => {
        const noteElement = document.createElement('note-item');
        noteElement.setAttribute('note', JSON.stringify(note));

        noteElement.addEventListener('delete', async (e) => {
          try {
            await deleteNote(e.detail);
            Swal.fire('Berhasil!', 'Catatan berhasil dihapus.', 'success');
            this.render();
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Gagal menghapus catatan: ${error.message}`,
            });
          }
        });

        noteElement.addEventListener('archive', async (e) => {
          try {
            if (note.archived) {
              await unarchiveNote(e.detail);
              Swal.fire(
                'Berhasil!',
                'Catatan berhasil dibatalkan arsip.',
                'success'
              );
            } else {
              await archiveNote(e.detail);
              Swal.fire('Berhasil!', 'Catatan berhasil diarsipkan.', 'success');
            }
            this.render();
            document.querySelector('archive-list').render();
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Gagal mengarsipkan catatan: ${error.message}`,
            });
          }
        });

        container.appendChild(noteElement);
      });
      animate(container, { opacity: [0, 1], y: [20, 0] }, { duration: 0.5 });
    } catch (error) {
      container.innerHTML = `<p style="color: red;">Gagal memuat catatan: ${error.message}</p>`;
    }
  }
}

customElements.define('notes-list', NotesList);
