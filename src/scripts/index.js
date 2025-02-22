import { createNote } from './api.js';
import { validateInput } from './utils.js';
import Swal from 'sweetalert2';
import './components/app-bar.js';
import './components/note-form.js';
import './components/note-item.js';
import './components/note-list.js';
import './components/loading-spinner.js';
import './components/archive-list.js';
import '../styles/main.css';

class NotesApp {
  constructor() {
    this.showSpinner();
    this.setupEventListeners();

    setTimeout(() => this.hideSpinner(), 1000);
  }

  showSpinner() {
    const spinner = document.querySelector('loading-spinner');
    if (spinner) {
      spinner.style.display = 'block';
    }
  }

  hideSpinner() {
    const spinner = document.querySelector('loading-spinner');
    if (spinner) {
      spinner.style.display = 'none';
    }
  }

  setupEventListeners() {
    document
      .querySelector('note-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const { title, body } = e.detail;

        const validationError = validateInput(title, body);
        if (validationError) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: validationError,
          });
          return;
        }

        try {
          this.showSpinner();
          await createNote(title, body);

          document.querySelector('notes-list').render();
          document.querySelector('archive-list').render();

          Swal.fire('Berhasil!', 'Catatan berhasil ditambahkan.', 'success');
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Gagal menambahkan catatan: ${error.message}`,
          });
        } finally {
          this.hideSpinner();
        }
      });
  }
}

new NotesApp();
