# jquery.editable

This plugin makes it possible edit the text/html of an element with a single click.

```js
// Makes element editable by double clicking on it
$('#some-element').editable(); 

// Add callback with info about potentially changed text and font size
$('#some-element').editable(function(data) {}); 

// Changes the event trigger from double click to ordinary click
$('#some-element').editable(function(data) { }, 'click'); 

// Removes the text editor
$('#some-element').editable( 'destroy' ); 

// Listen to when a elements gets edited
$('#some-element').on('edit', function(event, $textArea) { }); 
```
