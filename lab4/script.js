const title = document.querySelector('#title');
const content = document.querySelector('#desc');
// const date = document.querySelector('#date');
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
    const now = new Date();
    const note = createNote(
        index,
        title.value,
        content.value,
        now,
        color.value,
        pinned.checked,
        
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
    const flexNote = document.createElement('div');
    const deleteNote = document.createElement('button');
    deleteNote.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
    deleteNote.classList.add('delete');
    const pinIcon = document.createElement('i');
    pinIcon.classList.add('fa-solid', 'fa-thumbtack', 'pin');

    pinIcon.classList.add(note.pinned ? 'pinned' : 'unpinned');

    newNote.classList.add('note');
    newNote.id = `note${note.id}`;
    newNote.style.backgroundColor = note.color;
    newNote.style.border = "2px solid "+note.color+'ff';
    flexNote.classList.add('flexNote');

    const noteDate = new Date(note.date);
    const t = noteDate.toLocaleDateString();

    newNote.innerHTML += `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <p class="date"><i class="fa-regular fa-calendar"></i> ${t}</p>
    `;   
    
    deleteNote.addEventListener('click', (e) => {
        const noteDiv = e.currentTarget.closest('.note'); 
        if (noteDiv) {
            localStorage.removeItem(noteDiv.id);
            noteDiv.remove();
        }
    });

    pinIcon.addEventListener('click', () => {
        note.pinned = !note.pinned;
        localStorage.setItem(newNote.id, JSON.stringify(note));
        
        pinIcon.classList.toggle('pinned', note.pinned);
        pinIcon.classList.toggle('unpinned', !note.pinned);

        if (note.pinned) {
            pinnedNotes.appendChild(newNote);
        } else {
            notes.appendChild(newNote);
        }
    });

    flexNote.appendChild(pinIcon);
    flexNote.appendChild(deleteNote);
    newNote.insertBefore(flexNote, newNote.firstChild);

    if (note.pinned) {
        pinnedNotes.appendChild(newNote);
    } else {
        notes.appendChild(newNote);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const pinCheckbox = document.getElementById('pin');
    const pinLabel = document.querySelector('label[for="pin"] i');

    pinCheckbox.addEventListener('change', function() {
        if (this.checked) {
            pinLabel.classList.add('checked');
        } else {
            pinLabel.classList.remove('checked');
        }
    });
});
