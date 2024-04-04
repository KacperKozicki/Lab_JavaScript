const title = document.querySelector('#title');
const content = document.querySelector('#desc');
// const date = document.querySelector('#date');
const color = document.querySelector('#color');
const pinned = document.querySelector('#pin');

const remindDate = document.querySelector('#remind').value;

const createNoteBtn = document.querySelector('#create');

const notes = document.querySelector('.notes');
const pinnedNotes = document.querySelector('.pinned-notes');


function createNote (id,title, content, date,remind, color, pinned) {
    const remindDate = document.querySelector('#remind').value;

    return {
        id,
        title,
        content,
        date,
        remindDate,
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
        remindDate,
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
    reminder();

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

    const remindDivs = document.createElement('div');
    remindDivs.classList.add('remindDivs');
        const remind = document.createElement('input');
        const remindIcon = document.createElement('i');


    remindIcon.classList.add('fa-regular', 'fa-bell');
    remind.classList.add('remindTime');
    remind.type = 'datetime-local';
    remind.value = note.remindDate ? new Date(note.remindDate + 'Z').toISOString().slice(0, 16) : '';

    remind.id = `remind${note.id}`;
    remind.addEventListener('change', function() {
        note.remindDate = this.value;
        localStorage.setItem(`note${note.id}`, JSON.stringify(note));
        reminder();
    });
    


    deleteNote.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
    deleteNote.classList.add('delete');
    const pinIcon = document.createElement('i');
    pinIcon.classList.add('fa-solid', 'fa-thumbtack', 'pin');

    pinIcon.classList.add(note.pinned ? 'pinned' : 'unpinned');

    newNote.classList.add('note');
    newNote.id = `note${note.id}`;
    newNote.style.backgroundColor = note.color;
    newNote.style.border = "2px solid "+note.color;
    flexNote.classList.add('flexNote');

    const noteDate = new Date(note.date);
    const t = noteDate.toLocaleDateString();

    // newNote.innerHTML += `
    //     <h3>${note.title}</h3>
    //     <p>${note.content}</p>
    //     <p class="date"><i class="fa-regular fa-calendar"></i> ${t}</p>
    // `;   

    const titleElement = document.createElement('h3');
    titleElement.textContent = note.title;

    const contentElement = document.createElement('p');
    contentElement.textContent = note.content;

    titleElement.addEventListener('dblclick', function() {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = titleElement.textContent;
        input.style.width = "100%"; 
    
        const finishEdit = () => {
            titleElement.textContent = input.value;
            note.title = input.value;
            localStorage.setItem(`note${note.id}`, JSON.stringify(note));
            input.replaceWith(titleElement);
        };
    
        input.addEventListener('keydown', function(e) {
            if (e.key === "Enter") {
                finishEdit();
            }
        });
    
        titleElement.replaceWith(input);
        input.focus();
    });

    contentElement.addEventListener('dblclick', function() {
        const input = document.createElement('textarea');
        input.type = 'text';
        input.value = contentElement.textContent;
        input.style.width = "100%"; 
    
        const finishEdit = () => {
            contentElement.textContent = input.value;
            note.content = input.value;
            localStorage.setItem(`note${note.id}`, JSON.stringify(note));
            input.replaceWith(contentElement);
        };
    
        input.addEventListener('keydown', function(e) {
            if (e.key === "Enter") {
                finishEdit();
            }
        });
    
        contentElement.replaceWith(input);
        input.focus();
    });
    
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
    newNote.appendChild(titleElement);
    newNote.appendChild(contentElement);
    flexNote.appendChild(pinIcon);

    flexNote.appendChild(deleteNote);
    newNote.insertBefore(flexNote, newNote.firstChild);
    remindDivs.appendChild(remindIcon);

    remindDivs.appendChild(remind);
    newNote.appendChild(remindDivs);


    if (note.pinned) {
        pinnedNotes.appendChild(newNote);
    } else {
        notes.appendChild(newNote);
    }
}
function reminder() {
    setInterval(()=> {
    console.log('reminder');
    const allNotes = [...document.querySelectorAll('.note')];
    let remindersCount = 0;

    allNotes.forEach(note => {
        const noteID = note.id;
        const storedNote = JSON.parse(localStorage.getItem(noteID));
        if (!storedNote) return; 

        const remindDate = new Date(storedNote.remindDate);
        const currentDate = new Date();

        if (remindDate <= currentDate && storedNote.remindDate) {
            remindersCount++;
            document.title = `Powiadomienie (${remindersCount})`;
            alert(`Reminder for note "${storedNote.title}"`);
            storedNote.remindDate = null; 
            remindersCount = 0;
            document.title = 'Notes';
            localStorage.setItem(noteID, JSON.stringify(storedNote));
        }
    });

   
    }, 1000);
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
