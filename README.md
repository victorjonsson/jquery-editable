# jquery.editable

This plugin makes it possible to edit the content of an element simply by double clicking on it. 

## How does it work?

Dobule click on an element and it turns into a textarea. The content of the element is now displayed in the textarea. 
When you're done editing all you have to do is to click some where outside the textarea and the content will
be added to the DOM. You can toggle the size of the font by pressing the keys cmd + &uarr; or cmd + &darr; while editing the content 
(ctrl-key instead of cmd if you're on windows).


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

// Binding an event listener that's triggered when the
// element gets edited
$('#some-element').on('edit', function(event, $textArea) { }); 
```

## The callback function

The first argument passed along to the callback function is an object containing the following properties:

- **text** — Either false or the new text if the text was changed (this text may contain HTML)
- **fontSize** — Either false or the new font size, if changed.
- **$el** - Reference to the element (jQuery) that was edited


#### Code example

```js
$('.editable-area').editable(function(data) {
  if( data.text ) {
    $('input[name="' +$(this).attr('data-input')+'_text"]').val(data.text);
  }
  if( data.fontSize ) {
      $('input[name="' +$(this).attr('data-input')+'_fontsize"]').val(data.fontSize);
  } 
});
```

## Roadmap

1. Add more options
2. Make the styling of the textarea look better on none-webkit browsers
3. Integrate with a wysiwyg-editor
