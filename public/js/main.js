var PlayIDE = {}

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
            bespin.setContent(data);
        }
    );
}

PlayIDE.save = function() {
    alert("TODO");
}

PlayIDE.load = function() {
    alert("TODO");
}