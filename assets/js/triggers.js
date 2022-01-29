// FUNCIONES INICIALES
$(document).ready(function () {
    searchLastRegister();
    // LA FUNCION SE EJECUTA AUTOMATICAMENTE CADA 1 MINUTO
    setInterval(getLastTriggers(),60000);
});
// 
// MANEJO DE VISTAS
$('.back-init').click(function (e) { 
    e.preventDefault();
    window.location.href = '/views/home/index.php';
    $('body').css("background-image", "linear-gradient(rgba(255,255,255,.1), rgba(255,255,255,.1)), url('../../assets/backgound.jpg')");
});
// 
// FUNCION PARA TRAER LOS ULTIMOS REGISTROS
function getLastTriggers(){
    $.ajax({
        type: "GET",
        url: "/backupmonitor-api/public/index.php/methods/triggers",
        dataType: "json",
        success: function (response) {
            console.log(response.result);
            let row = response.result;
                let html = [];
                for (let i=0; i < row.length; i++){
                var interval = row[i].interval_time;
                if(interval != null){
                    var intervalNum = interval.split('.')[0] + 'HS.';
                }else{
                    var intervalNum = 'N/A';
                }
                var created = row[i].created;
                if(created != null){
                    var createdNum = created.split('.')[0];
                }else{
                    var createdNum = 'N/A';
                }
                var time = row[i].tiempo;
                if(time != null){
                    var timeNum = time + 'HS.';
                }else{
                    var timeNum = '0' + 'HS.';
                }
                var log = row[i].text_log;
                if(log == ''){
                    var logNum = 'TAREA COMPLETA';
                }else if (log == null){
                    var logNum = 'N/A';
                }else{
                    var logNum = '';
                }
                var type = row[i].type;
                if(type != null){
                    var typeNum = type;
                }else{
                    var typeNum = 'N/A';
                }
                html.push(
                `<tr class="content">
                <td>${row[i].businessname}</td> 
                <td>${row[i].pcname}</td> 
                <td>${row[i].location}</td> 
                <td>${typeNum}</td> 
                <td>${logNum}</td> 
                <td>${createdNum}</td> 
                <td>${intervalNum}</td> 
                <td>${timeNum}</td> 
                <td>${row[i].tName}</td> 
                </tr>`
                );
            }
            $('.lastRegister-table>tbody').html(html.join(''));
        }
    });
}
// 
// BUSCADOR
function searchLastRegister(){
    $("#searchLastRegister").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".content").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}
// 