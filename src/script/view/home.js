import Utils from '../utils.js';
import Notes from '../data/notes.js';

const home = () => {
    const searchFormElement = document.querySelector('search-bar');
    const noteListContainerElement = document.querySelector(".card-list");
    const noteModalElement = document.querySelector('note-modal');

    const showCard = (query) => {
        const result = Notes.searchNote(query);
        displayResult(result);
    };

    const onSearchHandler = (event) => {
        event.preventDefault();
        const { query } = event.detail;
        showCard(query);
    };

    const displayResult = (notes) => {
        Utils.emptyElement(noteListContainerElement);
        notes.forEach((note) => {
            const noteItemElement = document.createElement('noteify-card');
            noteItemElement.setAttribute('title', note.title);
            noteItemElement.setAttribute('body', note.body);
            noteListContainerElement.appendChild(noteItemElement);
        });
    };

    const onNoteAdded = (event) => {
        const { title, body } = event.detail;

        const newNote = {
            title: title,
            body: body,
        };

        Notes.insertNote(newNote);

        showCard("");
    };

    searchFormElement.addEventListener('submit', onSearchHandler);
    noteModalElement.addEventListener('note-added', onNoteAdded);
    showCard("");
};

export default home;
