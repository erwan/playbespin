var PlayIDE = {
}

PlayIDE.currentFile = null;

PlayIDE.init = function() {
    var splitted = window.location.toString().split("#");
    if (splitted.length > 1) PlayIDE.currentFile = splitted[1];
    PlayIDE.setFile();
}

PlayIDE.setFile = function() {
    jQuery("#filename").html(PlayIDE.currentFile);
    jQuery.get(
        "/bespin/file/at/" + PlayIDE.currentFile,
        null,
        function(data, textStatus) {
            bespin.value = data;
        }
    );
}

PlayIDE.save = function() {
    jQuery.post(
        "/bespin/save" + PlayIDE.currentFile,
        bespin.value);
}

PlayIDE.load = function() {
    jQuery("#loadfiles").modal();
}

