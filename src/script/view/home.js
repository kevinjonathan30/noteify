import Utils from "../utils.js";
import Notes from "../data/notes.js";

const home = () => {
  const baseUrl = "https://notes-api.dicoding.dev/v2/notes";
  const searchFormElement = document.querySelector("search-bar");
  const noteListContainerElement = document.querySelector(".card-list");
  const noteModalElement = document.querySelector("note-modal");

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
      const noteItemElement = document.createElement("noteify-card");
      noteItemElement.setAttribute("title", note.title);
      noteItemElement.setAttribute("body", note.body);
      noteItemElement.setAttribute("data-id", note.id);
      noteItemElement.addEventListener("note-delete", onNoteDelete);

      noteListContainerElement.appendChild(noteItemElement);
    });
  };

  const onNoteAdded = (event) => {
    const { title, body } = event.detail;

    let note = {
      title: title,
      body: body,
    };

    insertNote(note);
  };

  async function getNotes() {
    try {
      let response = await fetch(baseUrl);
      let responseJson = await response.json();
      let notes = responseJson.data;

      Notes.deleteAll();
      for (const note of notes) {
        Notes.insertNote(
          note.id,
          note.title,
          note.body,
          note.archived,
          note.createdAt,
        );
      }

      showCard("");
    } catch (error) {
      alert("Error: " + error);
    }
  }

  async function insertNote(note) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      };

      const response = await fetch(baseUrl, options);
      const responseJson = await response.json();
      console.log(responseJson.message);
      getNotes();
    } catch (error) {
      alert("Error: " + error);
    }
  }

  async function deleteNote(id) {
    try {
      const deleteUrl = `${baseUrl}/${id}`;

      const options = {
        method: "DELETE",
      };

      const response = await fetch(deleteUrl, options);
      const responseJson = await response.json();
      console.log(responseJson.message);
      getNotes();
    } catch (error) {
      alert("Error: " + error);
    }
  }

  const onNoteDelete = (event) => {
    const { id } = event.detail;
    deleteNote(id);
  };

  searchFormElement.addEventListener("submit", onSearchHandler);
  noteModalElement.addEventListener("note-added", onNoteAdded);
  getNotes();
};

export default home;
