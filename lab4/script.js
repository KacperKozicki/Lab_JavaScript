const title = document.querySelector('#title');
const content = document.querySelector('#desc');
const date = document.querySelector('#date');
const color = document.querySelector('#color');
const pinned = document.querySelector('#pin');
const createNoteBtn = document.querySelector('#create');

const notes = document.querySelector('.notes');
const pinnedNotes = document.querySelector('.pinned-notes');

function createNote (id,title, content, date, color, pinned) {
    return {
        id,
        title,
        content,
        date,
        color,
        pinned
    }
}
createNoteBtn.addEventListener('click', ()=> {
    let index = Math.floor(Math.random() * 1000);
    const note = createNote(
        index,
        title.value,
        content.value,
        Date.now(),
        color.value,
        pinned.checked
    );
    console.log(note);
    const noteID = `note${index}`;
    localStorage.setItem(noteID, JSON.stringify(note));
    addNoteToDOM(JSON.parse(localStorage.getItem(noteID)));
});

addEventListener('DOMContentLoaded', () => {
    renderAllNotes();
});
function renderAllNotes() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('note')) {
            const note = JSON.parse(localStorage.getItem(key));
            addNoteToDOM(note);
        }
    }
}

function addNoteToDOM(note) {
    const newNote = document.createElement('div');
    const deleteNote = document.createElement('button');
    deleteNote.innerHTML = 'Delete';
    deleteNote.classList.add('delete');
    deleteNote.id = `note${note.id}`;
    
    newNote.classList.add('note');
    newNote.id = `note${note.id}`;
    newNote.style.backgroundColor = note.color;
    newNote.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <p>${note.date}</p>
    `;
    deleteNote.addEventListener('click', (e) => {
        const parentNote = e.target.parentElement;
        localStorage.removeItem(parentNote.id);
        parentNote.remove();
    });
    newNote.appendChild(deleteNote);

    if (note.pinned) {
        pinnedNotes.appendChild(newNote);
    } else {
        notes.appendChild(newNote);
    }
}