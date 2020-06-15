const Note = require("../lib/Note");

describe("Note", () => {
  describe("Initialization", () => {
    test("should create an object with a 'tite' property set to the 'tite' argument provided when called with the 'new' keyword", () => {
      const title = "Do homework";
      const text = "Unit 1";
      const note = new Note(title, text);

      expect(note.title).toEqual(title);
    });
  });
});
