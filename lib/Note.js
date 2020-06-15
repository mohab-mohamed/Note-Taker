class Note {
  constructor(title, text) {
    if (typeof title !== "string" || !title.trim().length) {
      throw new Error("empty string");
    }
    if (typeof text !== "string" || !text.trim().length) {
      throw new Error("empty string");
    }
    this.title = title;
    this.text = text;
  }
}

module.exports = Note;
