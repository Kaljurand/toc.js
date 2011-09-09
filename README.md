toc.js
======

The main purpose of publishing and working on this old project is to try out GitHub.

Usage
-----

The script `toc.js` does two things to the HTML-file to which it is applied:

1. numbers the sections (i.e. puts a number in front of the content of the elements h1, h2, ..., h6)
2. generates a table of contents into an element with an ID "toc"

Execute it by e.g.

    <body onload="toc(1, 1)">


Notes
-----

* Tested only on Linux and only with Google Chrome and Firefox


Contributing
------------

1. Fork it.
2. Create a branch (`git checkout -b b`)
3. Commit your changes (`git commit -am "Added something"`)
4. Push to the branch (`git push origin b`)
5. Create an [Issue][1] with a link to your branch


[1]: https://github.com/Kaljurand/toc.js/issues
