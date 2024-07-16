const notes = [];

class Notes {
    static getAll() {
        return notes;
    }

    static insertNote(id, title, body, createdAt, archived) {
        const newNote = {
            id: id,
            title: title,
            body: body,
            createdAt: createdAt,
            archived: archived,
        };

        notes.push(newNote);

        return newNote;
    }

    static deleteAll() {
        notes = [];
    }

    static searchNote(query) {
        return notes.filter((note) => {
            const loweredCaseNoteTitle = (note.title || '-').toLowerCase();
            const jammedNoteTitle = loweredCaseNoteTitle.replace(/\s/g, '');

            const loweredCaseQuery = query.toLowerCase();
            const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

            return jammedNoteTitle.indexOf(jammedQuery) !== -1;
        });
    }
}

export default Notes;