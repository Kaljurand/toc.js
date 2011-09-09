/**
* This script does two things to the HTML-file to which it is applied:
* 1. numbers the sections (i.e. puts a number in front of the content of the elements h1, h2, ..., h6)
* 2. generates a table of contents into an element with an ID "toc"
*
* Execute it by e.g.: <body onload="toc(1, 1)">
*
* Tested only in Google Chrome and Firefox on Linux.
*
* @author Kaarel Kaljurand
* @version 2011-09-09
*
* Changelog:
*
* 2011-09-09: Some cleanup
* 2009-09-30: Some bug fixes
* 2008-03-12: TOC now contains links to section headings
* 2007-01-17: Minor fixes and comments changed into English
* 2006-07-07: TOC support added
* 2002-07-09: First version
*/

function toc(firstNumber, makeToc) {
	var levels = new Array("H2", "H3", "H4", "H5", "H6");
	var number_parts = new Array(levels.length);

	number_parts[0] = firstNumber - 1;
	number_parts[1] = number_parts[2] = number_parts[3] = number_parts[4] = 0;

	levels["H2"] = 0;
	levels["H3"] = 1;
	levels["H4"] = 2;
	levels["H5"] = 3;
	levels["H6"] = 4;

	// We start the search from "body"
	var somebody = document.getElementsByTagName("body").item(0);
	if (somebody == null) {
		alert("ERROR: body-element not found");
		exit;
	}

	if (makeToc) {
		var tocHolder = document.getElementById("toc");

		// If there is no element with id "toc" then create
		// one before the first h2-element.
		if (tocHolder == null) {
			tocHolder = document.createElement("pre");
			tocHolder.setAttribute("id", "toc");
			var position = somebody.getElementsByTagName("h2").item(0);
			if (position == null) {
				position = somebody.firstChild;
			}
			somebody.insertBefore(tocHolder, position);
		}
	}

	var tocContent = "";
	// We only consider the direct children of "body"
	for (var i = 0; i < somebody.childNodes.length; i++) {

		//this doesn't work in Mozilla???: var t = somebody.childNodes[i].tagName;
		var t = somebody.childNodes[i].nodeName;

		// BUG: just in case browsers differ (at least they used to in 2002)
		var s = t.toUpperCase();

		if (s == "H2" || s == "H3" || s == "H4" || s == "H5" || s == "H6") {
			var levelNum = levels[s];
			number_parts[levelNum]++; // increase the counter

			// Set all the next levels to zero
			for (j = levelNum + 1; j < number_parts.length; j++) {
				number_parts[j] = 0;
			}

			// Create a string
			var number = number_parts[0];

			for (j = 1; (number_parts[j] != 0) && (j < number_parts.length); j++) {
				number += "." + number_parts[j];
			}

			// We use "\r\n" to make IE happy.
			if (makeToc) {
				var tocEntry = somebody.childNodes[i].innerHTML;
				tocContent += number + "  " + "<a href='#" + number + "'>" + tocEntry + "</a>\r\n";
			}

			var title = somebody.childNodes[i].innerHTML;
			somebody.childNodes[i].innerHTML = number + " <a name='" + number + "'>" + title + "</a>";
		}
	}

	if (makeToc) {
		tocHolder.innerHTML += tocContent;
	}
}
