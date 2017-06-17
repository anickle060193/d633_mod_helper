$( function()
{
    function setCode( json )
    {
        document.getElementById( "code" ).innerHTML = JSON.stringify( json, null, 2 );
    }

    Promise.all( [

        D633.destiny.getAdvisorData().then( function( advisorData )
        {
            D633.util.setValue( "nightfall_modifiers", D633.destiny.getNightfallModifiers( advisorData ).join( "\n" ) );

            D633.util.setValue( "strike_modifiers", D633.destiny.getWeeklyStrikeModifiers( advisorData ).join( "\n" ) );

            D633.util.setValue( "weekly_raid_challenge_modes", D633.destiny.getWeeklyRaidChallenges( advisorData ).join( "\n" ) );

            return Promise.all( [

                D633.destiny.getNightfallName( advisorData ).then( function( nightfallName )
                {
                    D633.util.setValue( "nightfall_name", nightfallName );
                } ),

                D633.destiny.getWeeklyRaidName( advisorData ).then( function( weeklyRaidName )
                {
                    D633.util.setValue( "weekly_raid_name", weeklyRaidName );
                } ),

                D633.destiny.getTrialssMap( advisorData ).then( function( trialsMap )
                {
                    if( trialsMap )
                    {
                        D633.util.setValue( "trials_map", trialsMap );
                    }
                    else
                    {
                        D633.util.clearRequired( "#trials_map" );
                    }
                } ),

                D633.destiny.getIronBannerGameMode( advisorData ).then( function( ironBannerGameMode )
                {
                    if( ironBannerGameMode )
                    {
                        D633.util.setValue( "iron_banner_game_mode", ironBannerGameMode );
                    }
                    else
                    {
                        D633.util.clearRequired( "#iron_banner_game_mode" );
                    }
                } ),

                D633.destiny.getWeeklyCrucibleGameMode( advisorData ).then( function( weeklyCrucibleGameMode )
                {
                    D633.util.setValue( "weekly_crucible_game_mode", weeklyCrucibleGameMode );
                } )

            ] );
        } ),

        D633.destiny.getXurInfo().then( function( xurInfo )
        {
            if( xurInfo.Active )
            {
                D633.util.setValue( "xur_location", xurInfo.Location );
                D633.util.setValue( "xur_legacy_engram", xurInfo.LegacyEngram );
                D633.util.setValue( "xur_hunter_armor", xurInfo.Hunter );
                D633.util.setValue( "xur_titan_armor", xurInfo.Titan );
                D633.util.setValue( "xur_warlock_armor", xurInfo.Warlock );
                D633.util.setValue( "xur_weapon", xurInfo.Weapon );
            }
            else
            {
                D633.util.clearRequired( "[data-xur-field]" );
            }
        } )

    ] );
} );