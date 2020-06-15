const util = require("util");
const fs = require("fs");
const { v4: uuid4 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsyc = util.promisify(fs.writeFile);

class DbFunctions {
  async getNotes() {
    try {
      const notes = await readFileAsync("db/db.json", "utf8");
      return JSON.parse(notes);
    } catch (err) {
      throw err;
    }
  }

  async writeNotes(notes) {
    try {
      const updateNotes = await writeFileAsyc(
        "db/db.json",
        JSON.stringify(notes)
      );
      return updateNotes;
    } catch {
      throw new Error("No notes");
    }
  }

  async addNote(note) {
    try {
      const notes = await this.getNotes();
      const { title, text } = note;
      if (!title || !text) {
        throw new Error("Missing fields!");
      }
      const newNote = { title, text, id: uuid4() };
      notes.push(newNote);
      this.writeNotes(notes);
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteNote(id) {
    try {
      const notes = await this.getNotes();
      const newNotes = notes.filter((note) => note.id !== id);
      await this.writeNotes(newNotes);
      const updatedNotes = await this.getNotes();
      return updatedNotes;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = DbFunctions;
