# jquery.editable

This plugin makes it possible to edit the content of an element simply by double clicking on it. What sets this plugin
aside from other similar plugins is that the editable area **won't look like your plain old boring textarea** or 
input field. Instead, it will look as if you're editing the actually page.

[Live example can be viewed here](http://victorjonsson.se/168/jquery-editable/?from=github)

## How does it work?

Double click on an element and it turns into a textarea. The content of the element is now displayed in the textarea. 
But it will not look like a textarea, the text will have the same styling as it had before it was turned into an editor.
When you're done editing all you have to do is to click some where outside the textarea and the content will
be added to the DOM. You can toggle the size of the font by pressing the keys cmd + &uarr; or cmd + &darr; while editing the content 
(ctrl-key instead of cmd if you're on windows). If you don't want to use a textarea as editor you can [integrate jQuery editable
with tinyMCE](#integrate-plugin-with-tinymce).


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
    tinyMCE : false, // Integrate with tinyMCE by settings this option to true or an object containing your tinyMCE configuration
    emptyMessage : '<em>Please write something.</em>', // HTML that will be added to the editable element in case it gets empty (default false)
    callback : function( data ) {
        // Callback that will be called once the editor is blurred
        if( data.content ) {
            // Content has changed...
        }
        if( data.fontSize ) {
            // the font size has changed
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
$('#some-element').on('edit', function(event, $editor) { }); 
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

<h2 id="tinymce-integration">Integrate plugin with tinyMCE</h2>

Since version 1.3.1 it's possible to integrate this plugin with [tinyMCE](http://www.tinymce.com/).

```html
<div id="my-editable">
  <p>Lorem te ipsum...</p>
</div>
<script src="tinymce/jscript/tinymce.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="js/jquery.editable.min.js"></script>
<script>
  $('#my-ediable').editable({
    tinyMCE : {
        plugins : 'autolink,lists,spellchecker',
        skin : 'o2k7'
        // what ever tinyMCE configuration that you want
    },
    callback : function(data) {
        // ...
    }
  });
</script>
```
