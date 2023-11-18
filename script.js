const saveButton = document.getElementById('btnSave');
const title = document.getElementById('title');
const desc = document.getElementById('description');
const noteContainer = document.getElementById('notes_container');
const deleteButton = document.getElementById('btnDelete');

function clearForm() {
     title.value = '';
     desc.value = '';
     deleteButton.classList.add('hidden');
     saveButton.classList.remove('hidden');
}

function displayNotesInForm(note) {
     title.value = note.title,
     desc.value = note.description
     deleteButton.classList.remove('hidden');
     deleteButton.setAttribute('data-id', note.id);
     saveButton.setAttribute('data-id', note.id);
}

function deleteNote(id) {
     fetch(`https://localhost:7210/Note/${id}`, {
          method: 'DELETE',
          headers: {
               "content-type": "application/json"
          }
     })
     .then(response => {
          clearForm();
          getAllNote();
     });
}

function getNoteById(id) {
     fetch(`https://localhost:7210/Note/${id}`)
     .then(data => data.json())
     .then(res => displayNotesInForm(res));
}

function populateForm(id) {
     getNoteById(id);

}

function addNote(title, description) {

     const body = {
          title: title,
          description: description,
          isVisible: true,
     };

     fetch('https://localhost:7210/Note', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
               "content-type": "application/json"
          }
     })
     .then(data => data.json())
     .then(response => {
          clearForm();
          getAllNote();
     });

     
}

function displayNotes(notes) {

     let allNote = '';

    notes.forEach(note => {
     const noteElement = `
                         <div class="note" data-id="${note.id}">
                              <h3>${note.title}</h3>
                              <p>${note.description}</p>
                         </div>
                    `;
     allNote += noteElement;
    });
    noteContainer.innerHTML = allNote;

    document.querySelectorAll('.note').forEach(item => {
     item.addEventListener('click', function() {
           populateForm(item.dataset.id);
     })
    })

}

function getAllNote() {
     fetch('https://localhost:7210/Note')
     .then(data => data.json())
     .then(res => displayNotes(res));
}

getAllNote();

function updateNote(id,  title, description) {
     const body = {
          title: title,
          description: description,
          isVisible: true,
     };

     fetch(`https://localhost:7210/Note/${id}`, {
          method: 'PUT',
          body: JSON.stringify(body),
          headers: {
               "content-type": "application/json"
          }
     })
     .then(data => data.json())
     .then(response => {
          clearForm();
          getAllNote();
     });
}
saveButton.addEventListener('click', function() {
     const id = saveButton.dataset.id;
     if(id) {
          updateNote(id, title.value, desc.value);
     }  else {
          addNote(title.value, desc.value);
     }
})

deleteButton.addEventListener('click', function() {
     const  id = deleteButton.dataset.id;
     deleteNote(id);
})