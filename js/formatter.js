$( function()
{
    var NIGHTFALL_IMG = {
        "devils": "https://i.imgur.com/gT1s5Qz.jpg",
        "will of crota": "https://i.imgur.com/CzbbvBL.jpg",
        "s.a.b.e.r": "https://i.imgur.com/QTuTs0V.jpg",
        "perfected": "https://i.imgur.com/uESrJ2r.jpg",
        "wretched": "https://i.imgur.com/EddcNvK.jpg",
        "summoning pits": "https://i.imgur.com/O6eKd0d.jpg",
        "shadow thief": "https://i.imgur.com/OAT1a5r.jpg",
        "blighted chalice": "https://i.imgur.com/PDbHdRj.jpg",
        "abomination": "https://i.imgur.com/H0fs8y1.jpg",
        "nexus": "https://i.imgur.com/UQT2KO5.jpg",
        "winter": "https://i.imgur.com/H4aY6Bm.jpg",
        "echo": "https://i.imgur.com/gmYIz6U.jpg",
        "cerberus": "https://i.imgur.com/BFqd7er.jpg",
        "dust palace": "https://i.imgur.com/CXyR942.jpg",
        "undying": "https://i.imgur.com/fyJGntU.jpg",
        "shield": "https://i.imgur.com/KWhNIbT.jpg",
        "sunless": "https://i.imgur.com/ItEqjZY.jpg"
    };

    var RAID_IMG = {
        "vault": "https://i.imgur.com/GcD85a8.jpg",
        "crota" :"https://i.imgur.com/XzL156X.jpg",
        "king" : "https://i.imgur.com/7AoMyq6.jpg",
        "wrath": "https://i.imgur.com/XTMN89h.jpg"
    };

    var RAID_CHALLENGE_GUIDE_HREFS = {
        "templar": "https://www.reddit.com/r/DestinyTheGame/comments/63dcfh/templar_challenge_mode_guide_with_video/",
        "atheon": "https://www.reddit.com/r/DestinyTheGame/comments/63kcf5/atheon_challenge_guide_tips_collection/",
        "deathsinger": "https://www.reddit.com/r/DestinyTheGame/comments/67fnp9/age_of_triumph_deathsinger_challenge_guide/",
        "crota": "https://www.reddit.com/r/DestinyTheGame/comments/623kle/easyquick_way_to_complete_crota_challenge_mode_in/",
        "warpriest": "https://www.reddit.com/r/DestinyTheGame/wiki/raidchallenges#wiki_warpriest_challenge_mode_guide",
        "golgoroth": "https://www.reddit.com/r/DestinyTheGame/wiki/raidchallenges#wiki_golgoroth_challenge_mode_guide",
        "oryx": "https://www.reddit.com/r/DestinyTheGame/comments/4cenr1/oryx_challenge_mode_a_video_and_text_guide/",
        "vosik": "https://www.reddit.com/r/DestinyTheGame/comments/5fitn4/vosik_challenge_mode_complete_updated_guide_and/",
        "aksis": "https://www.reddit.com/r/DestinyTheGame/comments/5fbh4f/complete_aksis_challenge_guide_and_tips_for_aksis/",
    };

    var CRUCIBLE_GAME_MODE_IMG = {
        "supremacy": "http://i.imgur.com/0QceHzS.jpg",
        "zone control": "http://i.imgur.com/Cj3Knla.jpg",
        "mayhem": "http://i.imgur.com/zgnXslm.jpg",
        "rift": "http://i.imgur.com/kYZRHwZ.jpg",
        "trials": "http://i.imgur.com/LPSFyAI.jpg",
        "iron banner": "http://i.imgur.com/6mbXDOZ.jpg",
        "elimination": "http://i.imgur.com/JFQHOaq.jpg",
        "inferno": "http://i.imgur.com/I1bSAXo.jpg",
        "doubles": "http://i.imgur.com/u9UQDQ9.jpg",
        "combined arms": "http://i.imgur.com/QOrJ48h.jpg",
        "salvage": "http://i.imgur.com/R5i1aEn.jpg",
        "skirmish": "http://i.imgur.com/75MldJy.jpg",
        "rumble": "http://i.imgur.com/JESxxj7.jpg",
        "clash": "http://i.imgur.com/OSkL65b.jpg",
        "control": "http://i.imgur.com/Bp0ywHK.jpg",
    };

    function findByKeyword( name, items, dflt )
    {
        name = name.toLowerCase();
        for( var keyword in items )
        {
            if( name.includes( keyword ) )
            {
                return items[ keyword ];
            }
        }

        return dflt;
    }

    function getNightfallImg( nightfallName )
    {
        return findByKeyword( nightfallName, NIGHTFALL_IMG, "" );
    }

    function getWeeklyRaidChallengeModeHref()
    {
        return findByKeyword( this, RAID_CHALLENGE_GUIDE_HREFS, "#" );
    }

    function getRaidImg( raidName )
    {
        return findByKeyword( raidName, RAID_IMG, "" );
    }

    function getWeeklyCrucibleGameModeImg( weeklyCrucibleGameMode )
    {
        return findByKeyword( weeklyCrucibleGameMode, CRUCIBLE_GAME_MODE_IMG, "" );
    }

    D633.util.initializeClipboard();

    var params = D633.util.getQueryParams();

    var view = {
        nightfall_name: params.nightfall_name,
        nightfall_img: getNightfallImg( params.nightfall_name ) ,
        nightfall_modifiers: D633.util.splitLines( params.nightfall_modifiers ).join( ", " ),
        strike_modifiers: D633.util.splitLines( params.strike_modifiers ).join( ", " ),
        weekly_raid_name: params.weekly_raid_name,
        weekly_raid_img: getRaidImg( params.weekly_raid_name ),
        weekly_raid_challenge_modes: D633.util.splitLines( params.weekly_raid_challenge_modes ),
        weekly_raid_challenge_mode_href: getWeeklyRaidChallengeModeHref,
        xur_location: params.xur_location || "N/A",
        xur_legacy_engram: params.xur_legacy_engram || "N/A",
        xur_warlock_armor: params.xur_warlock_armor || "N/A",
        xur_titan_armor: params.xur_titan_armor || "N/A",
        xur_hunter_armor: params.xur_hunter_armor || "N/A",
        xur_weapon: params.xur_weapon || "N/A",
        weekly_crucible_game_mode: params.weekly_crucible_game_mode,
        weekly_crucible_game_mode_img: getWeeklyCrucibleGameModeImg( params.weekly_crucible_game_mode ),
        iron_banner_game_mode: params.iron_banner_game_mode || "N/A",
        trials_map: params.trials_map || "N/A"
    };

    var cruciblePartialName = "";
    if( params.iron_banner_game_mode )
    {
        cruciblePartialName = "partials/iron_banner.html";
    }
    else if( params.trials_map )
    {
        cruciblePartialName = "partials/trials.html";
    }
    else
    {
        cruciblePartialName = "partials/weekly_crucible.html";
    }

    var templateGet = $.get( "template.html" );
    var crucibleGet = $.get( cruciblePartialName );

    $.when( templateGet, crucibleGet ).done( function( template, cruciblePartial )
    {
        D633.util.setValue( "html", Mustache.render( template[ 0 ], view, {
            crucible: cruciblePartial[ 0 ]
        } ) );
    } );

} );