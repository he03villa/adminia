document.addEventListener('build', function (e) {
    var dato3 = localStorage.getItem("valueQR");
    var id = localStorage.getItem("id");
    qr(dato3, id);
}, false);

function qr(dato, id){
    $("#" + id).html("");
    const cont = document.getElementById(id);
    if (cont) {
        var qrcode = new QRCode(cont, {
            text: dato,
            width: document.documentElement.clientWidth > 1199 ? 190: 150,
            height: document.documentElement.clientWidth > 1199 ? 190: 150,
            colorDark: "#000",
            colorLight: "#fff",
            correctLevel: QRCode.CorrectLevel.H
        });
        $("#"+ id +" img").addClass("zoom");
        $("#"+ id +" img").attr("title2", dato);
        if (document.documentElement.clientWidth < 1200) {
            $("#"+ id +" img").css("margin", "auto");
        }
        $("#" + id).removeAttr("title");
    }
}