/*
* jQuery plugin that makes any element on your page editable
* 
* @author Victor Jonsson (http://victorjonsson.se/)
* @website https://github.com/victorjonsson/jquery-editable/
* @license Dual licensed under the MIT or GPL Version 2 licenses
* @version 1.0
* @donations http://victorjonsson.se/donations/
*/
(function($) {

    var $win = $(window), // Reference to window

    $textArea = false, // Reference to textarea

    /**
     * Event listener that largens font size
     */
    fontSizeToggler = function(e) {
        if(e.metaKey && (e.keyCode == 38 || e.keyCode == 40)) {
            var fontSize = parseInt($textArea.css('font-size'), 10);
            fontSize += e.keyCode == 40 ? -1 : 1;
            $textArea.css('font-size', fontSize+'px');
        }

        // Change height of textarea
        if( $textArea[0].scrollHeight !== parseInt($textArea.attr('data-scroll'), 10) ) {
            var $tmpArea = $textArea.clone(false);
            $tmpArea
                .val($textArea.val())
                .css({
                    position: 'absolute',
                    visibility : 'hidden',
                    top :0,
                    left : 0
                })
                .appendTo('body');

            $textArea.css('height', $tmpArea[0].scrollHeight +'px');
            $textArea.attr('data-scroll', $textArea[0].scrollHeight);
            $tmpArea.remove();
        }
    },

    /**
     * Function creating editor
     */
    elementEditor = function($el, callback) {

        if( $el.attr('data-is-editing') !== undefined)
            return;

        $el.attr('data-is-editing', '1');

        var defaultText = $.trim( $el.html() ).replace(/<br( |)(|\/)>/g, '\n'),
            defaultFontSize = $el.css('font-size'),
            elementHeight = $el.outerHeight(),
            textareaStyle = 'width: 96%; padding: 2%; margin:8px 0';

        $textArea = $('<textarea></textarea>');
        $el.text('');

        if( $.browser.webkit ) {
            textareaStyle = document.defaultView.getComputedStyle($el.get(0), "").cssText;
        }

        $win.bind('keydown', fontSizeToggler);

        $textArea
            .val(defaultText)
            .blur(function() {
                var newText = $.trim( $textArea.val() ).replace(new RegExp('\n','g'), '<br />'),
                    newFontSize = $textArea.css('font-size');

                $el.html( newText );
                $el.removeAttr('data-is-editing');
                $textArea.remove();
                $win.unbind('keydown', fontSizeToggler);

                if( typeof callback == 'function' ) {
                    callback({
                        text : newText == defaultText ? false : newText,
                        fontSize : newFontSize == defaultFontSize ? false : newFontSize,
                        $el : $el
                    });
                }
            })
            .attr('style', textareaStyle)
            .appendTo($el)
            .css('height', elementHeight +'px')
            .focus()
            .get(0).select();

            $el.trigger('edit', [$textArea]);
    },

    /**
     * Event listener
     */
    editEvent = function(event) {
        elementEditor($(this), event.data.callback);
        return false;
    };

    /**
     * Jquery plugin
     * @param {Function|String} [callback] Either callback function or the string 'destroy' if wanting to remove the editor event
     * @param {String} [evt] Defaults to 'dblclick'
     * @return {jQuery}
     */
    $.fn.editable = function(callback, evt) {
        if( !evt )
            evt = 'dblclick';

        evt += '.textEditor';

        if( callback === 'destroy' ) {
            return this.unbind(evt);
        }
        else {
            return this.bind(evt, {callback: callback}, editEvent);
        }
    };

})(jQuery);
