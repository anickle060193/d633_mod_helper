window.D633 || ( window.D633 = { } );

window.D633.util = ( function()
{
    function setValue( id, value )
    {
        $( "#" + id ).val( value ).parents( ".mdl-js-textfield" ).each( function()
        {
            if( this.MaterialTextfield )
            {
                this.MaterialTextfield.checkDirty();
                this.MaterialTextfield.checkValidity();
            }
        } );
    }

    function flatten( arr )
    {
        return [].concat.apply( [], arr );
    }

    function decodeHTML( input )
    {
        var doc = new DOMParser().parseFromString( input, "text/html" );
        return $( doc.documentElement ).find( "body" )[ 0 ].innerHTML;
    }

    function initializeClipboard()
    {
        return new Clipboard( "[data-clipboard-target]" );
    }

    function getQueryParams()
    {
        return new URL( window.location ).searchParams
    }

    function splitLines( s )
    {
        return s.split( /[\n\r]+/ );
    }

    return {
        setValue: setValue,
        flatten: flatten,
        decodeHTML: decodeHTML,
        getQueryParams: getQueryParams,
        initializeClipboard: initializeClipboard,
        splitLines: splitLines
    };
} )();

