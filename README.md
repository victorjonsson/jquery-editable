# jquery.editable

This plugin makes it possible edit the text/html of an element with a single click.

```js
$('#some-element').editable(); // Makes it editable on double click

$('#some-element').editable(function(data) {}); // Add callback with info about potentially changed text and font size

$('#some-element').editable(function(data) { }, 'click'); // Changes the event trigger from double click to ordinary click

$('#some-element').editable( 'destroy' ); // Removes the text editor

$('#some-element').on('edit', function(event, $textArea) { }); // Listen to when a elements gets edited
```
