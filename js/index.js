function setCode( json )
{
    document.getElementById( "code" ).innerHTML = JSON.stringify( json, null, 2 );
}

$( function()
{
    getAdvisorData( function( advisorData )
    {
        getNightfallInfo( advisorData, function( nightfallName, nightfallHash )
        {
            setValue( "nightfall_name", nightfallName );
            setValue( "nightfall_hash", nightfallHash );
        } );
        setValue( "nightfall_modifiers", getNightfallModifiers( advisorData ).join( "\n" ) );

        setValue( "strike_modifiers", getWeeklyStrikeModifiers( advisorData ).join( "\n" ) );

        getWeeklyRaidInfo( advisorData, function( weeklyRaidName, weeklyRaidHash )
        {
            setValue( "weekly_raid_name", weeklyRaidName );
            setValue( "weekly_raid_hash", weeklyRaidHash );
        } );
        setValue( "weekly_raid_challenge_modes", getWeeklyRaidChallenges( advisorData ).join( "\n" ) );

        getTrialssMap( advisorData, function( trialsMap )
        {
            setValue( "trials_map", trialsMap );
        } );

        getIronBannerGameMode( advisorData, function( ironBannerGameMode )
        {
            setValue( "iron_banner_game_mode", ironBannerGameMode );
        } );
    } );

    getXurInfo( function( xurInfo )
    {
        setValue( "xur_location", xurInfo.Location );
        setValue( "xur_legacy_engram", xurInfo.LegacyEngram );
        setValue( "xur_hunter_armor", xurInfo.Hunter );
        setValue( "xur_titan_armor", xurInfo.Titan );
        setValue( "xur_warlock_armor", xurInfo.Warlock );
        setValue( "xur_weapon", xurInfo.Weapon );
    } );
} );