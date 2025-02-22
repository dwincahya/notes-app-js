import Swal from 'sweetalert2';

export function showError(message) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
  });
}

export function validateInput(title, body) {
  if (!title || !body) {
    return 'Judul dan isi catatan tidak boleh kosong.';
  }
  if (title.length > 50) {
    return 'Judul catatan tidak boleh lebih dari 50 karakter.';
  }
  if (body.length > 1000) {
    return 'Isi catatan tidak boleh lebih dari 1000 karakter.';
  }
  return null;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
