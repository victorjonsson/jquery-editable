# jquery.editable

This plugin makes it possible to edit the content of an element simply by double clicking on it. 

#### Features

- Lorem te ipsum
- Lorem te ipsum del tara
- Mia tendo del tara


#### Code examples

```js
// Make the element editable by double clicking on it
$('#some-element').editable(); 

// Here we have added a callback that will get info about 
// potentially changed text and font size when the textarea
// gets blurred
$('#some-element').editable(function(data) { }); 

// The second arguments is used to define which event that 
// should create the text editor (default is dblclick)
$('#some-element').editable(function(data) { }, 'click'); 

// Here's how to remove the event listener that creates 
// the text editor
$('#some-element').editable( 'destroy' ); 

// Here's how to listen to if an  elements gets edited
$('#some-element').on('edit', function(event, $textArea) { }); 
```

### The callback function

The first argument of the callback functino is an object containing the following properties:

```

```
