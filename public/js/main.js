var PlayIDE = {
}

PlayIDE.currentFile = null;

PlayIDE.init = function() {
    var splitted = window.location.toString().split("#");
    if (splitted.length > 1) PlayIDE.currentFile = splitted[1];
    PlayIDE.setFile();
    PlayIDE.startHashInterval();
}

PlayIDE.setFile = function() {
    jQuery("#filename").html(PlayIDE.currentFile);
    jQuery.get(
        "/bespin/file/at/" + PlayIDE.currentFile,
        null,
        function(data, textStatus) {
            bespin.value = data;
            PlayIDE.setSyntax(PlayIDE.currentFile);
        }
    );
}

PlayIDE.setSyntax = function(filename) {
    bespin.setSyntax(filename.split(".").pop());
}

PlayIDE.save = function() {
    jQuery.post(
        "/bespin/save" + PlayIDE.currentFile,
        bespin.value);
}

PlayIDE.load = function() {
    jQuery("#loadfiles").modal();
}

PlayIDE.startHashInterval = function() {
    var inst = PlayIDE;
    setInterval(function () {
        var anchor = document.location.hash.slice(1);
        if (inst.currentAnchor == anchor) {
            return;
        }
        inst.currentAnchor = anchor;
        var splitted = window.location.toString().split("#");
        if (splitted.length > 1) PlayIDE.currentFile = splitted[1];
        PlayIDE.setFile();
        jQuery("#loadpopup").hide();
    }, 300);
}
