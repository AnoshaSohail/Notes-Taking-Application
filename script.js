// Get references to DOM elements
const notesContainer = document.querySelector('.notes__container'); // Select the notes container (not in use)
const addBtn = document.getElementById('add__btn'); // Button to add new notes
const parentDiv = document.querySelector('.notes__wrapper'); // Parent element to hold notes

// Function to add new notes
function addNotes() {
    // Create a new notes container
    let notesDiv = document.createElement('div');
    notesDiv.classList.add('notes__container'); // Apply CSS class for styling
    notesDiv.innerHTML = `<div class="notes__menu"><i class="fa-solid fa-floppy-disk"></i> <i class="fa-solid fa-trash"></i></div><textarea></textarea>`;
    parentDiv.appendChild(notesDiv); // Add the new notes container to the parent

    // Get references to save, trash, and textarea elements within the new notes container
    let save = notesDiv.querySelector(".fa-floppy-disk");
    let trash = notesDiv.querySelector(".fa-trash");
    let textArea = notesDiv.querySelector("textarea");

    // Event listener for the trash icon to remove the note
    trash.addEventListener("click", function(e) {
        notesDiv.remove(); // Remove the notes container
        saveNotes(); // Save the updated notes list to local storage
    });

    // Event listener for the save icon to save the note
    save.addEventListener("click", saveNotes);

    // Event listener for the textarea input to save the note
    textArea.addEventListener("input", saveNotes);
}

// Function to save notes to local storage
function saveNotes() {
    const text = document.querySelectorAll('.notes__container textarea'); // Select all textareas within notes containers
    const data = Array.from(text).map(note => note.value); // Create an array of note values

    // Store the notes in local storage
    if (data.length === 0) {
        localStorage.removeItem("notes"); // If no notes, remove the "notes" key from local storage
    } else {
        localStorage.setItem("notes", JSON.stringify(data)); // Store notes array as JSON string in local storage
    }
}

// Function to display saved notes
function showNotes() {
    const noteList = JSON.parse(localStorage.getItem('notes')); // Retrieve notes array from local storage

    if (noteList !== null) {
        noteList.forEach(note => {
            addNotes(); // Add a new notes container
            const notes = document.querySelectorAll('.notes__container textarea');
            const lastNote = notes[notes.length - 1];
            lastNote.value = note; // Set the value of the textarea to the saved note
        });
    } else {
        addNotes(); // If no saved notes, add a new notes container
    }
}

// Call the showNotes function to display saved notes
showNotes();
