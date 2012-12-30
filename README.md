# jquery.editable

This plugin makes it possible to edit the content of an element simply by double clicking on it. 

#### How does it work

Dobule click on an element and it turns into a textarea. The content of the element is now displayed in the textarea. 
When your'e done with your editing all you have to do is to click some where outside the textarea and the content will
be added to the DOM. If you press the keys cmd + &uarr;



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
