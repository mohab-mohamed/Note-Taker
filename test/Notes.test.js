const Notes = require("../lib/Notes");
const Note = require("../lib/Note");

describe("Notes", () => {
  describe("Initialization", () => {
    test("should create an object with 'notes' array", () => {
      const notes = new Notes();

      expect(notes).toEqual({ noteList: [] });
    });
  });

  describe("addNote", () => {
    test("should add a new 'note' object to the noteList array", () => {
      const note = new Note("Lecture 1", "Express");
      const notes = new Notes();
      notes.addNote(note);

      expect(notes.noteList.length).toEqual(1);
      expect(notes.noteList[0]).toBe(note);
    });
  });
});
