// requirejs config
requirejs.config({
    baseUrl: ".",
    paths: {
      "main"       : "js/main",
      "jquery"     : "vender/jquery-2.1.1.min",
      "mousetrap"  : "vender/mousetrap.min",
      "progressbar": "vender/progressbar.min",
      "background" : "js/background",
      "apis"       : "js/apis",
      "vo"         : "js/vo",
      "date"       : "js/date",
      "controlbar" : "js/controlbar",
      "setting"    : "js/setting",
      "i18n"       : "js/i18n",
      "shortcuts"  : "js/shortcuts",
      "files"      : "js/files",
      "error"      : "js/error",
      "topsites"   : "js/topsites",
      "notify"     : "js/notify",
      "version"    : "js/version",
      "progress"   : "js/progress"
    },
    shim: {
      "mousetrap"   : {
          exports  : "Mousetrap"
      },
       "progressbar"   : {
          exports  : "ProgressBar"
      }
    }
});

// main
requirejs([ "jquery", "background", "date" , "controlbar", "setting", "i18n", "shortcuts", "files", "topsites", "version", "progress" ], function ( $, background, date, controlbar, setting, i18n, shortcuts, files, topsites, version, progress ) {

    progress.Init();

    // file system init
    files.Init( function( error ) {
        console.error( "File system error ", error );
    });

    // set background font
    background.SetLang( i18n.GetLocale() );

    // set language
    i18n.Init();

    // init radio input
    setting.Init();

    // get background image
    background.Get( setting.IsRandom() );

    // get time
    date.Toggle( setting.Mode( "clockstate" ));

    // listen
    controlbar.Listen( function( result ) {
        if ( typeof result === "boolean" )     background.Favorite( result );
        else if ( typeof result === "object" ) background.Upload( result );
    });
    setting.Listen( function( type, result ) {
        if ( type == "tsstate" )               topsites.Refresh( result );
        else if ( type == "clockstate" )       date.Toggle( result );
        else if ( type == "positionstate" )    controlbar.SetBgPosition();
    });

    // validation background
    background.Valid();

    topsites.Init();

    // short cuts init
    shortcuts.Init();

    version.Init();

});
