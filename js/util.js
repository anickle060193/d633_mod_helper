window.D633 || ( window.D633 = { } );

window.D633.util = ( function()
{
    function updateMaterialTextField()
    {
        if( this && this.MaterialTextfield )
        {
            this.MaterialTextfield.checkDirty();
            this.MaterialTextfield.checkValidity();
            this.MaterialTextfield.checkFocus();
            this.MaterialTextfield.checkDisabled();
        }
    }

    function setValue( id, value )
    {
        $( "#" + id ).val( value ).parents( ".mdl-js-textfield" ).each( updateMaterialTextField );
    }

    function clearRequired( selector )
    {
        $( selector ).attr( "required", false ).parents( ".mdl-js-textfield" ).each( updateMaterialTextField );
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
        var params = { };
        for( var kv of new URL( window.location ).searchParams )
        {
            params[ kv[ 0 ] ] = kv[ 1 ] ? kv[ 1 ].trim() : "";
        }
        return params;
    }

    function splitLines( s )
    {
        return s.split( /[\n\r]+/ );
    }

    function getQueryParam( param )
    {
        return new URL( window.location ).searchParams.get( param );
    }

    function isBot()
    {
        return !!getQueryParam( 'bot' );
    }

    return {
        setValue: setValue,
        clearRequired: clearRequired,
        flatten: flatten,
        decodeHTML: decodeHTML,
        getQueryParams: getQueryParams,
        initializeClipboard: initializeClipboard,
        splitLines: splitLines,
        getQueryParam: getQueryParam,
        isBot: isBot
    };
} )();

