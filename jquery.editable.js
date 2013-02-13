/*
* jQuery plugin that makes elements editable
* 
* @author Victor Jonsson (http://victorjonsson.se/)
* @website https://github.com/victorjonsson/jquery-editable/
* @license GPLv2 http://www.gnu.org/licenses/gpl-2.0.html
* @version 1.2.3
* @donations http://victorjonsson.se/donations/
*/
(function($) {

    'use strict';

    var $win = $(window), // Reference to window

    // Reference to textarea
    $textArea = false,
    
    // Reference to currently edit element
    $currentlyEdited = false,

    // Some constants
    EVENT_ATTR = 'data-edit-event',
    IS_EDITING_ATTR = 'data-is-editing',
    DBL_TAP_EVENT = 'dbltap',
    SUPPORTS_TOUCH = 'ontouchend' in window,

    // reference to old is function
    oldjQueryIs = $.fn.is,

    /*
     * Function responsible of triggering double tap event
     */
    lastTap = 0,
    tapper = function() {
        var now = new Date().getTime();
        if( (now-lastTap) < 250 ) {
            $(this).trigger(DBL_TAP_EVENT);
        }
        lastTap = now;
    },

    /**
     * Event listener that largens font size
     */
    keyHandler = function(e) {
        if( e.keyCode == 13 && e.data.closeOnEnter ) {
            $currentlyEdited.editable('close');
        }
        else if( e.data.toggleFontSize && (e.metaKey && (e.keyCode == 38 || e.keyCode == 40)) ) {
            var fontSize = parseInt($textArea.css('font-size'), 10);
            fontSize += e.keyCode == 40 ? -1 : 1;
            $textArea.css('font-size', fontSize+'px');
            return false;
        }
    },

    /**
     * Adjusts the height of the textarea to remove scroll
     * @todo This way of doing it does not make the textarea smaller when the number of text lines gets smaller
     */
    adjustTextAreaHeight = function() {
        if( $textArea[0].scrollHeight !== parseInt($textArea.attr('data-scroll'), 10) ) {
            $textArea.css('height', $textArea[0].scrollHeight +'px');
            $textArea.attr('data-scroll', $textArea[0].scrollHeight);
        }
    },

    /**
     * Function creating editor
     */
    elementEditor = function($el, opts) {

        if( $el.is(':editing') )
            return;

        $currentlyEdited = $el;
        $el.attr('data-is-editing', '1');

        var defaultText = $.trim( $el.html() ),
            defaultFontSize = $el.css('font-size'),
            elementHeight = $el.height(),
            textareaStyle = 'width: 96%; padding:0; margin:0; border:0; background:none;'+
                            'font-family: '+$el.css('font-family')+'; font-size: '+$el.css('font-size')+';'+
                            'font-weight: '+$el.css('font-weight')+';';

        if( opts.lineBreaks ) {
            defaultText = defaultText.replace(/<br( |)(|\/)>/g, '\n');
        }

        $textArea = $('<textarea></textarea>');
        $el.text('');

        if( navigator.userAgent.match(/webkit/i) !== null ) {
            textareaStyle = document.defaultView.getComputedStyle($el.get(0), "").cssText;
        }

        if( opts.toggleFontSize || opts.closeOnEnter ) {
            $win.bind('keydown', opts, keyHandler);
        }
        $win.bind('keyup', adjustTextAreaHeight);

        $textArea
            .val(defaultText)
            .blur(function() {

                $currentlyEdited = false;
                
                // Get new text and font size
                var newText = $.trim( $textArea.val() ),
                    newFontSize = $textArea.css('font-size');
                if( opts.lineBreaks ) {
                    newText = newText.replace(new RegExp('\n','g'), '<br />');
                }

                // Update element
                $el.html( newText );
                $el.removeAttr('data-is-editing');
                if( newFontSize != defaultFontSize ) {
                    $el.css('font-size', newFontSize);
                }

                // remove textarea and size toggles
                $textArea.remove();
                $win.unbind('keydown', keyHandler);
                $win.unbind('keyup', adjustTextAreaHeight);

                // Run callback
                if( typeof opts.callback == 'function' ) {
                    opts.callback({
                        content : newText == defaultText ? false : newText,
                        fontSize : newFontSize == defaultFontSize ? false : newFontSize,
                        $el : $el
                    });
                }
            })
            .attr('style', textareaStyle)
            .appendTo($el)
            .css({
                margin: 0,
                padding: 0,
                height : elementHeight +'px',
                overflow : 'hidden'
            })
            .focus()
            .get(0).select();

            adjustTextAreaHeight();

            $el.trigger('edit', [$textArea]);
    },

    /**
     * Event listener
     */
    editEvent = function(event) {
        if( $currentlyEdited !== false ) {
            // Not closing the currently open editor before opening a new
            // editor makes things go crazy
            $currentlyEdited.editable('close');
            var $this = $(this);
            elementEditor($this, event.data);
        }
        else {
            elementEditor($(this), event.data);            
        }
        return false;
    };

    /**
     * Jquery plugin that makes elments editable
     * @param {Object|String} [opts] Either callback function or the string 'destroy' if wanting to remove the editor event
     * @return {jQuery|Boolean}
     */
    $.fn.editable = function(opts) {

        if(typeof opts == 'string') {

            if( this.is(':editable') ) {

                switch (opts) {
                    case 'open':
                        if( !this.is(':editing') ) {
                            this.trigger(this.attr(EVENT_ATTR));
                        }
                        break;
                    case 'close':
                        if( this.is(':editing') ) {
                            $textArea.trigger('blur');
                        }
                        break;
                    case 'destroy':
                        if( this.is(':editing') ) {
                            $textArea.trigger('blur');
                        }
                        this.unbind(this.attr(EVENT_ATTR));
                        this.removeAttr(EVENT_ATTR);
                        break;
                    default:
                        console.warn('Unknown command "'+opts+'" for jquery.editable');
                }

            } else {
                console.error('Calling .editable() on an element that is not editable, call .editable() first');
            }
        }
        else {

            if( this.is(':editable') ) {
                console.warn('Making an already editable element editable, call .editable("destroy") first');
                this.editable('destroy');
            }

            opts = $.extend({
                event : 'dblclick',
                touch : true,
                lineBreaks : true,
                toggleFontSize : true,
                closeOnEnter : false
            }, opts);

            if( SUPPORTS_TOUCH && opts.touch ) {
                opts.event = DBL_TAP_EVENT;
                this.unbind('touchend', tapper);
                this.bind('touchend', tapper);
            }
            else {
                opts.event += '.textEditor';
            }

            this.bind(opts.event, opts, editEvent);
            this.attr(EVENT_ATTR, opts.event);            
        }

        return this;
    };

    /**
     * Add :editable :editing to $.is()
     * @param {Object} statement
     * @return {*}
     */
    $.fn.is = function(statement) {
        if( typeof statement == 'string' && statement.indexOf(':') === 0) {
            if( statement == ':editable' ) {
                return this.attr(EVENT_ATTR) !== undefined;
            } else if( statement == ':editing' ) {
                return this.attr(IS_EDITING_ATTR) !== undefined;
            }
        }
        return oldjQueryIs.apply(this, arguments);
    }

})(jQuery);
