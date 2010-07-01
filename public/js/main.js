var PlayIDE = {
}

PlayIDE.currentFile = null;

PlayIDE.init = function() {
    bespin.editor.textChanged.add(function(newSelection) {
        jQuery("#save-button").removeClass("disabled");
    });
    var splitted = window.location.toString().split("#");
    if (splitted.length > 1) {
        PlayIDE.setFromHash(splitted[1]);
    }
    PlayIDE.startHashInterval();
}

PlayIDE.setFromHash = function(hash) {
    var filename = hash;
    var line = 1;
    if (hash.indexOf(serverConfig.rootUrl) > -1) {
        document.location = (""+document.location).split("#")[0] + "#" + hash.split(serverConfig.rootUrl)[1];
        return;
    }
    if (filename.indexOf("|") > -1) {
        var splitted = filename.split("|");
        filename = splitted[0];
        try {
            line = parseInt(splitted[1], 10);
        } catch(ex) { /* bad number, keep line 1 */}
    }
    PlayIDE.currentFile = filename;
    PlayIDE.currentLine = line;
    PlayIDE.setFile();
}

PlayIDE.setFile = function() {
    jQuery("#filename").html(PlayIDE.currentFile);
    jQuery.get(
        "/bespin/file/at/" + PlayIDE.currentFile,
        null,
        function(data, textStatus) {
            bespin.editor.value = data;
            bespin.editor.setLineNumber(PlayIDE.currentLine);
            PlayIDE.setSyntax(PlayIDE.currentFile);
        }
    );
}

PlayIDE.setSyntax = function(filename) {
    // bespin.editor.syntax = (filename.split(".").pop());
}

PlayIDE.save = function() {
    jQuery.post(
        "/bespin/save" + PlayIDE.currentFile,
        bespin.editor.value);
    jQuery("#save-button").addClass("disabled");
}

PlayIDE.load = function() {
    jQuery("#loadfiles").modal();
}

PlayIDE.locationHashChanged = function() {
    var anchor = document.location.hash.slice(1);
    PlayIDE.currentAnchor = anchor;
    PlayIDE.setFromHash(anchor);
    jQuery("#loadpopup").hide();
}

PlayIDE.startHashInterval = function() {
    if ("onhashchange" in window) {
        window.onhashchange = PlayIDE.locationHashChanged;
    } else {
        setInterval(function () {
            var anchor = document.location.hash.slice(1);
            if (PlayIDE.currentAnchor != anchor) {
                PlayIDE.locationHashChanged();
            }
        }, 300);
    }
}
