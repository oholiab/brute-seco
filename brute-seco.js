const seco = require('seco-file');
const fs = require('fs');

function decrypt(data, phrase) {
	try {
		seco.decryptData(data, phrase);
		return(phrase);
	} catch (ex) {
		return("");
	}
}

function decryptFile(filename, wordlist) {
	var data = fs.readFileSync(filename);
	var phrase;
	console.log("start");
	fs.readFileSync(wordlist).toString().split("\n").forEach(function(line, index, arr) {
  		if (index === arr.length - 1 && line === "") { return; }
		phrase = decrypt(data, line);
		if (phrase != "") {
			console.log("PASSWORD IS: " + phrase);
		}
  		console.log(index + " " + line);
	});
	console.log("end");
}

decryptFile(process.argv[2], process.argv[3]);
