const DbFunctions = require("../db/dbFunctions.js");

describe("DbFunctions", () => {
  describe("readNotes", () => {
    test("should call fs.readFileAsync on db.json", () => {
      const dbFunctions = new DbFunctions();
      const output = [{ title: "Test Title", text: "Test text" }];

      const data = dbFunctions.readNotes();

      return expect(data).resolves.toEqual(output);
    });
  });

  describe("getNotes", () => {
    test("should return notes", () => {
      const dbFunc = new DbFunctions();
      const output = [{ title: "Test Title", text: "Test text" }];

      const data = dbFunc.getNotes();
      return expect(data).resolves.toEqual(output);
    });
  });

  describe("writeNotes", () => {
    test("should write notes to existing data", () => {
      const dbFunc = new DbFunctions();
      const newData = { title: "TEST", text: "TEST" };

      const storedData = [{ title: "foo", text: "bar" }];
      storedData.push(newData);
      console.log(storedData);

      const update = dbFunc.writeNotes(storedData);
      console.log(update);
      return expect(update).resolves.toContainEqual(newData);
    });
  });

  describe("addNotes", () => {
    test("should add notes to existing data", () => {});
  });
});
