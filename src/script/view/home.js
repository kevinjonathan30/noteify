import Utils from '../utils.js';
import Notes from '../data/notes.js';

const home = () => {
    const searchFormElement = document.querySelector('search-bar');
    const noteListContainerElement = document.querySelector(".card-list");

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
        const noteItemElements = notes.map((note) => {
            const noteItemElement = document.createElement('noteify-card');
            noteItemElement.setAttribute('title', note.title);
            noteItemElement.setAttribute('body', note.body);

            return noteItemElement;
        });

        Utils.emptyElement(noteListContainerElement);
        noteListContainerElement.append(...noteItemElements);
    };

    searchFormElement.addEventListener('submit', onSearchHandler);
    showCard("");
};

export default home;
