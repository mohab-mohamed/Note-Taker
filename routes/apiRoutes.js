const router = require("express").Router();
const dbMethods = require("../db/dbMethods");

const dbFunc = new dbMethods();

router.get("/notes", async (req, res) => {
  try {
    const notes = await dbFunc.getNotes();
    res.json(notes);
  } catch (err) {
    throw err;
  }
});

router.post("/notes", async (req, res) => {
  try {
    const newNote = req.body;
    await dbFunc.addNote(newNote);
    res.json(newNote);
  } catch (err) {
    throw err;
  }
});

router.delete("/notes/:id", (req, res) => {
  res.json(dbFunc.deleteNote(req.params.id));
});

module.exports = router;
