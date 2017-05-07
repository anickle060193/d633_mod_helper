window.D633 || ( window.D633 = { } );

window.D633.destiny = ( function()
{
    var Class = {
        Titan: 0,
        Hunter: 1,
        Warlock: 2,
        Unknown: 3
    };
    var ItemType = {
        None: 0,
        Currency: 1,
        Armor: 2,
        Weapon: 3,
        Bounty: 4,
        CompletedBounty: 5,
        BountyReward: 6,
        Message: 7,
        Engram: 8,
        Consumable: 9,
        ExchangeMaterial: 10,
        MissionReward: 11,
        QuestStep: 12,
        QuestStepComplete: 13,
        Emblem: 14,
        Quest: 15
    };
    var ItemSubTypes = {
        None: 0,
        Crucible: 1,
        Vanguard: 2,
        IronBanner: 3,
        Queen: 4,
        Exotic: 5,
        AutoRifle: 6,
        Shotgun: 7,
        Machinegun: 8,
        HandCannon: 9,
        RocketLauncher: 10,
        FusionRifle: 11,
        SniperRifle: 12,
        PulseRifle: 13,
        ScoutRifle: 14,
        Camera: 15,
        Crm: 16,
        Sidearm: 17,
        Sword: 18,
        Mask: 19
    };

    var CLASS_NAMES = [ "Titan", "Hunter", "Warlock", "Unknown" ];
    var ITEM_TYPE_NAMES = [
        "None",
        "Currency",
        "Armor",
        "Weapon",
        "Bounty",
        "Completed Bounty",
        "Bounty Reward",
        "Message",
        "Engram",
        "Consumable",
        "Exchange Material",
        "Mission Reward",
        "Quest Step",
        "Completed Quest Step",
        "Emblem",
        "Quest"
    ];

    var ITEM_SUB_TYPE_NAMES = [
        "None",
        "Crucible",
        "Vanguard",
        "Iron Banner",
        "Queen",
        "Exotic",
        "Auto Rifle",
        "Shotgun",
        "Machinegun",
        "Hand Cannon",
        "Rocket Launcher",
        "Fusion Rifle",
        "Sniper Rifle",
        "Pulse Rifle",
        "Scout Rifle",
        "Camera",
        "Crm",
        "Sidearm",
        "Sword",
        "Mask"
    ];

    function get( url )
    {
        return $.get( {
            url: "https://www.bungie.net/platform/Destiny" + url.replace( /\/?(\?|#|$)/, "/$1" ),
            headers: {
                "X-API-KEY": "9492f000be70437ab933484743bc1ad7"
            }
        } );
    }

    function getAdvisorData( callback )
    {
        get( "/Advisors/V2/" ).done( function( json )
        {
            callback( json.Response.data );
        } );
    }

    function getManifestDataRequest( type, id, callback )
    {
        return get( "/Manifest/" + type + "/" + id );
    }

    function getManifestData( type, id, callback )
    {
        getManifestDataRequest( type, id ).done( function( json )
        {
            callback( json.Response.data );
        } );
    }

    function getActivityData( activityHash, callback )
    {
        getManifestData( "Activity", activityHash, function( data )
        {
            callback( data.activity );
        } );
    }

    function getItemDataRequest( itemHash )
    {
        return getManifestDataRequest( "InventoryItem", itemHash )
    }

    function getItemData( itemHash, callback )
    {
        getManifestData( "InventoryItem", itemHash, function( data )
        {
            callback( data.inventoryItem );
        } );
    }

    function getNightfallName( advisorData, callback )
    {
        getActivityData( advisorData.activities.nightfall.display.activityHash, function( nightfall )
        {
            callback( nightfall.activityName );
        } );
    }

    function getWeeklyRaidName( advisorData, callback )
    {
        getActivityData( advisorData.activities.weeklyfeaturedraid.display.activityHash, function( weeklyRaid )
        {
            callback( weeklyRaid.activityName );
        } );
    }

    function getStrikeModifiers( activityData )
    {
        return D633.util.flatten( $.map( activityData.extended.skullCategories, function( skullCategory )
        {
            return $.map( skullCategory.skulls, function( skull )
            {
                return skull.displayName;
            } );
        } ) );
    }

    function getNightfallModifiers( advisorData )
    {
        return getStrikeModifiers( advisorData.activities.nightfall );
    }

    function getWeeklyStrikeModifiers( advisorData )
    {
        return getStrikeModifiers( advisorData.activities.heroicstrike );
    }

    function getWeeklyRaidChallenges( advisorData )
    {
        var challenges = D633.util.flatten( $.map( advisorData.activities.weeklyfeaturedraid.activityTiers, function( activityTier )
        {
            return D633.util.flatten( $.map( activityTier.skullCategories, function( skullCategory )
            {
                return $.map( skullCategory.skulls, function( skull )
                {
                    return skull.displayName;
                } );
            } ) );
        } ) );
        var heroicIndex = challenges.indexOf( "Heroic" );
        if( heroicIndex !== -1 )
        {
            challenges.splice( heroicIndex, 1 );
        }
        return challenges;
    }

    function getXurData( callback )
    {
        get( "/Advisors/Xur" ).done( function( json )
        {
            if( json.ErrorCode == 1 && json.Response && json.Response.data )
            {
                callback( json.Response.data );
            }
            else
            {
                callback( null );
            }
        } );
    }

    function getXurInfo( callback )
    {
        getXurData( function( xurData )
        {
            var xd = {
                Location: null,
                Warlock: null,
                Titan: null,
                Hunter: null,
                LegacyEngram: null,
                Weapon: null
            };

            if( !xurData )
            {
                callback( xd, false );
                return;
            }

            var requests = $.map( xurData.saleItemCategories[ 2 ].saleItems, function( saleItem )
            {
                return getItemDataRequest( saleItem.item.itemHash );
            } );
            $.when.apply( $, requests ).done( function()
            {
                var items =  $.map( arguments, function( arg )
                {
                    return arg[ 0 ].Response.data.inventoryItem;
                } );
                $.each( items, function( i, item )
                {
                    switch( item.classType )
                    {
                        case Class.Warlock:
                            xd.Warlock = item.itemName;
                            break;

                        case Class.Titan:
                            xd.Titan = item.itemName;
                            break;

                        case Class.Hunter:
                            xd.Hunter = item.itemName;
                            break;

                        case Class.Unknown:
                            if( item.itemType == ItemType.Engram )
                            {
                                xd.LegacyEngram = item.itemTypeName.replace( / Engram$/, "" );
                            }
                            else if( item.itemType == ItemType.Weapon )
                            {
                                xd.Weapon = item.itemName;
                            }
                            break;
                    }
                } );
                callback( xd, true );
            } );
        } );
    }

    function getTrialssMap( advisorData, callback )
    {
        if( advisorData.activities.trials.status.active )
        {
            callback( advisorData.activities.trials.display.flavor, true );
        }
        else
        {
            callback( "", false );
        }
    }

    function getIronBannerGameMode( advisorData, callback )
    {
        callback( "", false );
    }

    function getWeeklyCrucibleGameMode( advisorData, callback )
    {
        getActivityData( advisorData.activities.weeklycrucible.display.activityHash, function( activity )
        {
            callback( activity.activityName );
        } )
    }

    return {
        getAdvisorData: getAdvisorData,
        getNightfallName: getNightfallName,
        getNightfallModifiers: getNightfallModifiers,
        getWeeklyStrikeModifiers: getWeeklyStrikeModifiers,
        getWeeklyRaidName: getWeeklyRaidName,
        getWeeklyRaidChallenges: getWeeklyRaidChallenges,
        getXurInfo: getXurInfo,
        getWeeklyCrucibleGameMode: getWeeklyCrucibleGameMode,
        getTrialssMap: getTrialssMap,
        getIronBannerGameMode: getIronBannerGameMode
    };
} )();
