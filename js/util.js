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