$( function()
{
    function setCode( json )
    {
        document.getElementById( "code" ).innerHTML = JSON.stringify( json, null, 2 );
    }

    D633.destiny.getAdvisorData( function( advisorData )
    {
        D633.destiny.getNightfallInfo( advisorData, function( nightfallName, nightfallHash )
        {
            D633.util.setValue( "nightfall_name", nightfallName );
            D633.util.setValue( "nightfall_hash", nightfallHash );
        } );
        D633.util.setValue( "nightfall_modifiers", D633.destiny.getNightfallModifiers( advisorData ).join( "\n" ) );

        D633.util.setValue( "strike_modifiers", D633.destiny.getWeeklyStrikeModifiers( advisorData ).join( "\n" ) );

        D633.destiny.getWeeklyRaidInfo( advisorData, function( weeklyRaidName, weeklyRaidHash )
        {
            D633.util.setValue( "weekly_raid_name", weeklyRaidName );
            D633.util.setValue( "weekly_raid_hash", weeklyRaidHash );
        } );
        D633.util.setValue( "weekly_raid_challenge_modes", D633.destiny.getWeeklyRaidChallenges( advisorData ).join( "\n" ) );

        D633.destiny.getTrialssMap( advisorData, function( trialsMap )
        {
            D633.util.setValue( "trials_map", trialsMap );
        } );

        D633.destiny.getIronBannerGameMode( advisorData, function( ironBannerGameMode )
        {
            D633.util.setValue( "iron_banner_game_mode", ironBannerGameMode );
        } );
    } );

    D633.destiny.getXurInfo( function( xurInfo )
    {
        D633.util.setValue( "xur_location", xurInfo.Location );
        D633.util.setValue( "xur_legacy_engram", xurInfo.LegacyEngram );
        D633.util.setValue( "xur_hunter_armor", xurInfo.Hunter );
        D633.util.setValue( "xur_titan_armor", xurInfo.Titan );
        D633.util.setValue( "xur_warlock_armor", xurInfo.Warlock );
        D633.util.setValue( "xur_weapon", xurInfo.Weapon );
    } );
} );