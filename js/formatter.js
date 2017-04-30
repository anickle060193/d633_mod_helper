var NIGHTFALL_IMG = {
    "devils": "https://i.imgur.com/GGPedzI.jpg",
    "will of crota": "https://i.imgur.com/EErmCD3.jpg",
    "s.a.b.e.r": "https://i.imgur.com/Vk5JUok.jpg",
    "perfected": "https://i.imgur.com/dB5hCQx.jpg",
    "wretched": "https://i.imgur.com/77eAfKH.jpg",
    "summoning pits": "https://i.imgur.com/WptWSpN.jpg",
    "shadow thief": "https://i.imgur.com/MPXttpO.jpg",
    "blighted chalice": "https://i.imgur.com/oLvy95E.jpg",
    "abomination": "https://i.imgur.com/QZMe8GB.jpg",
    "nexus": "https://i.imgur.com/O2U9GJh.jpg",
    "winter": "https://i.imgur.com/TpyTBxT.jpg",
    "echo": "https://i.imgur.com/qeSg3Rv.jpg",
    "cerberus": "https://i.imgur.com/p048Jqz.jpg",
    "dust palace": "https://i.imgur.com/jqFEFxr.jpg",
    "undying": "https://i.imgur.com/QrSTSGC.jpg",
    "shield": "https://i.imgur.com/c2fr9SN.jpg",
    "sunless": "https://i.imgur.com/r4BOTib.jpg"
};

var RAID_IMG = {
    "vault": "https://i.imgur.com/Omt2ujf.jpg",
    "crota" :"https://i.imgur.com/DH6OWPO.jpg",
    "king" : "https://i.imgur.com/tzGREPM.jpg",
    "wrath": "https://i.imgur.com/bOy1aWH.jpg"
};

var RAID_CHALLENGE_GUIDES = {
    "templar": { href: "https://www.reddit.com/r/DestinyTheGame/comments/63dcfh/templar_challenge_mode_guide_with_video/", name: "Templar Challenge" },
    "Atheon": { href: "https://www.reddit.com/r/DestinyTheGame/comments/63kcf5/atheon_challenge_guide_tips_collection/", name: "Atheon Challenge" },
    "deathsinger": { href: "https://www.reddit.com/r/DestinyTheGame/comments/67fnp9/age_of_triumph_deathsinger_challenge_guide/", name: "Deathsinger Challenge" },
    "crota": { href: "https://www.reddit.com/r/DestinyTheGame/comments/623kle/easyquick_way_to_complete_crota_challenge_mode_in/", name: "Crota Challenge" },
    "warpriest": { href: "https://www.reddit.com/r/DestinyTheGame/wiki/raidchallenges#wiki_warpriest_challenge_mode_guide", name: "Warpriest Challenge" },
    "golgoroth": { href: "https://www.reddit.com/r/DestinyTheGame/wiki/raidchallenges#wiki_golgoroth_challenge_mode_guide", name: "Golgoroth Challenge" },
    "oryx": { href: "https://www.reddit.com/r/DestinyTheGame/comments/4cenr1/oryx_challenge_mode_a_video_and_text_guide/", name: "Oryx Challenge" },
    "vosik": { href: "https://www.reddit.com/r/DestinyTheGame/comments/5fitn4/vosik_challenge_mode_complete_updated_guide_and/", name: "Vosik Challenge Guide" },
    "aksis": { href: "https://www.reddit.com/r/DestinyTheGame/comments/5fbh4f/complete_aksis_challenge_guide_and_tips_for_aksis/", name: "Aksis Challenge Guide" },
};

function getNightfallImg( nightfallName )
{
    nightfallName = nightfallName.toLowerCase();
    for( let keyword in NIGHTFALL_IMG )
    {
        if( nightfallName.includes( keyword ) )
        {
            return NIGHTFALL_IMG[ keyword ];
        }
    }
    return "";
}

function getWeeklyRaidChallengeModeHref()
{
    challenge = this.toLowerCase();
    for( let keyword in RAID_CHALLENGE_GUIDES )
    {
        if( challenge.includes( keyword ) )
        {
            return RAID_CHALLENGE_GUIDES[ keyword ].href;
        }
    }
    return "#";
}

function getWeeklyRaidChallengeModeName()
{
    challenge = this.toLowerCase();
    for( let keyword in RAID_CHALLENGE_GUIDES )
    {
        if( challenge.includes( keyword ) )
        {
            return RAID_CHALLENGE_GUIDES[ keyword ].name;
        }
    }
    return this;
}

function getRaidImg( raidName )
{
    raidName = raidName.toLowerCase();
    for( let keyword in RAID_IMG )
    {
        if( raidName.includes( keyword ) )
        {
            return RAID_IMG[ keyword ];
        }
    }
    return "";
}

$( function()
{
    new Clipboard( "[data-clipboard-target]" );

    var params = new URL( window.location ).searchParams;

    var view = {
        nightfall_name: params.get( "nightfall_name" ),
        nightfall_img: getNightfallImg( params.get( "nightfall_name" ) ) ,
        nightfall_modifiers: params.get( "nightfall_modifiers" ).split( /[\n\r]+/ ).join( ", " ),
        strike_modifiers: params.get( "strike_modifiers" ).split( /[\n\r]+/ ).join( ", " ),
        weekly_raid_name: params.get( "weekly_raid_name" ),
        weekly_raid_img: getRaidImg( params.get( "weekly_raid_name" ) ),
        weekly_raid_challenge_modes: params.get( "weekly_raid_challenge_modes" ).split( /[\n\r]+/ ),
        weekly_raid_challenge_mode_href: getWeeklyRaidChallengeModeHref,
        weekly_raid_challenge_mode_name: getWeeklyRaidChallengeModeName,
        xur_location: params.get( "xur_location" ),
        xur_legacy_engram: params.get( "xur_legacy_engram" ),
        xur_warlock_armor: params.get( "xur_warlock_armor" ),
        xur_titan_armor: params.get( "xur_titan_armor" ),
        xur_hunter_armor: params.get( "xur_hunter_armor" ),
        xur_weapon: params.get( "xur_weapon" ),
        iron_banner_game_mode: "N/A"
    };

    $.get( "template.html" ).done( function( data )
    {
        setValue( "html", decodeHTML( Mustache.render( data, view ) ) );
    } );

} );