// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
//read json
const fs = require('fs');
const readline = require('readline');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




async function processLineByLine() {
  const fileStream = fs.createReadStream('../db/db.json');
  var allObjects = [];
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    // console.log(`Line from file: ${line}`);
    // console.log(JSON.parse(line)[0]);
    if(line.replace(/(\r\n|\n|\r)/gm, "") != "") {
        allObjects.push(JSON.parse(line)[0]);
    }
  }
  return allObjects;
}


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Displays all characters
app.get("/api/notes", function(req, res) {
  processLineByLine().then(result => {
    return res.json(result);
  });
  
});

// delete note
app.delete("/api/notes/:routeTitle", function(req, res) {
  var chosen = req.params.routeTitle;
  var index = null;
  processLineByLine().then(objArray => {
    for(let i = 0 ; i < objArray.length; i++) {
        if(objArray[i].routeTitle === chosen) {
            index = i;
            console.log("entered: " +index);
            break;
        }
    }
    if(index != null) {
        fs.readFile('../db/db.json', 'utf8', function(err, data)
        {
                if (err){
            // check and handle err
            }
            // data is the file contents as a single unified string
            // .split('\n') splits it at each new-line character and all splits are aggregated into an array (i.e. turns it into an array of lines)
            // .slice(1) returns a view into that array starting at the second entry from the front (i.e. the first element, but slice is zero-indexed so the "first" is really the "second")
            // .join() takes that array and re-concatenates it into a string
            
            var splitArr = data.split("\r\n");
            // console.log("original: " + splitArr);
            splitArr[index] = "";
            // console.log("split: " + splitArr);
            var finalStr = "";
            
            for(let j = 0; j < splitArr.length; j++) {
                if(splitArr[j] != "") {
                    console.log(splitArr[j]);
                    finalStr += splitArr[j] + "\r\n"
                }
            }
            // console.log("finalStr: " + finalStr);
            
            fs.writeFile('../db/db.json', finalStr, function(err, data)
            {
                if(err) {
                    console.log(err);
                }
            });
        });
    }
    return;
  });
  console.log(chosen);

//   for (var i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

  return res.json(false);
});

//  add note
app.post("/api/notes/", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newNote = req.body;


  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newNote.routeTitle = newNote.title.replace(/\s+/g, "").toLowerCase();

  const CreateFiles = fs.createWriteStream('../db/db.json', {
    flags: 'a' //flags: 'a' preserved old data
    })
  CreateFiles.write("[" + JSON.stringify(newNote) + "]" +'\r\n') //'\r\n at the end of each value

  res.json(newNote);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
