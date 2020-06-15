class Notes {
  constructor() {
    this.noteList = [];
  }

  addNote(note) {
    this.noteList.push(note);
  }

  getNotes() {
    this.noteList.map((note) => {
      return note;
    });
  }
}

module.exports = Notes;
