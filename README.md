# jquery.editable

This plugin makes it possible to edit the content of an element simply by double clicking on it. 

[Live example can be viewed here](http://victorjonsson.se/168/jquery-editable/?from=github)

## How does it work?

Double click on an element and it turns into a textarea. The content of the element is now displayed in the textarea.
When you're done editing all you have to do is to click some where outside the textarea and the content will
be added to the DOM. You can toggle the size of the font by pressing the keys cmd + &uarr; or cmd + &darr; while editing the content 
(ctrl-key instead of cmd if you're on windows).


#### Code examples

```js
// Make the element editable by double clicking on it
$('#some-element').editable(); 

// There are some options you can configure when initiating
// the editable feature as well as a callback function that
// will be called when textarea gets blurred.
$('#some-element').editable({
    touch : true, // Whether or not to support touch (default true)
    lineBreaks : true, // Whether or not to convert \n to <br /> (default true)
    toggleFontSize : true, // Whether or not it should be possible to change font size (default true),
    closeOnEnter : false, // Whether or not pressing the enter key should close the editor (default false)
    event : 'click', // The event that triggers the editor (default dblclick)
    callback : function( data ) {
        // Callback that will be called once the editor is blurred
        if( data.content ) {
            // Content has changed...
        }
        if( data.fontSize ) {
            // the font size is changed
        }

        // data.$el gives you a reference to the element that was edited
        data.$el.effect('blink');
    }
});


// You can use $.is() to tell whether or not an element is editable or at
// the moment being edited
var $elem = $('#some-element');
if( $elem.is(':editing') ) {
    // It's being edited right now, lets do stuff...
}
if( $elem.is(':editable') ) {
    // It's editable, lets do stuff...
}

// Call "open" to programatically turn an editable element into an editor
$('#some-element').editable('open');

// Call "close" to programatically close the editor for an element 
// that's currently being edited
$('#some-element').editable('close');

// Call "destroy" to remove the possibility to edit an element
$('#some-element').editable('destroy');


// Binding an event listener that's triggered when the
// element gets edited
$('#some-element').on('edit', function(event, $textArea) { }); 
```

## The callback function

The first argument of the callback function is an object containing the following properties:

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
