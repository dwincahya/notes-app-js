const BASE_URL = 'https://notes-api.dicoding.dev/v2';

export async function getNotes() {
  const response = await fetch(`${BASE_URL}/notes`);
  const data = await response.json();
  return data.data;
}

export async function getArchivedNotes() {
  const response = await fetch(`${BASE_URL}/notes/archived`);
  const data = await response.json();
  return data.data;
}

export async function getSingleNote(noteId) {
  const response = await fetch(`${BASE_URL}/notes/${noteId}`);
  const data = await response.json();
  return data;
}

export async function createNote(title, body) {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body }),
  });
  return response.json();
}

export async function deleteNote(id) {
  await fetch(`${BASE_URL}/notes/${id}`, { method: 'DELETE' });
}

export async function archiveNote(id) {
  const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
    method: 'POST',
  });
  const result = await response.json();
}

export async function unarchiveNote(id) {
  const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
    method: 'POST',
  });
  const result = await response.json();
}
