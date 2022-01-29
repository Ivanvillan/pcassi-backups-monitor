$(document).ready(function(){
    $('.modal').modal();
});
dashboard();

$('.btnClient').click(function (e) { 
    e.preventDefault();
    getTriggersByClient();
    $('h5').html(titleClient+titleRegister);
    $('#titleEquipment').remove();
    $('#titleTask').remove();
});

$('.btnEquipment').click(function (e) { 
    e.preventDefault();

    $('#titleTask').remove();

    titleEquipment = '<div id="titleEquipment" style="display: inline-block;"><i class="material-icons" style="color: #101416 !important; font-size: 18px;">chevron_right</i>EQUIPOS</div>';
    $('h5').html(titleClient + titleEquipment);

    $.ajax({
        type: "GET",
        url: "/backupmonitor-api/public/index.php/methods/equipments/" + idClient,
        dataType: "json",
        success: function (response) {
            console.log(response);
            let row = response.result;
            let html = [];
            for (let i=0; i < row.length; i++){
                let enabled = row[i].enabled;
                if(enabled == '1'){
                    enabled = 'Activo';
                }
                if(enabled == '0'){
                    enabled = 'Inactivo';
                }
                html.push(
                `<div class="cardEquipment" idEquipment="${row[i].idequipment}" style="cursor: pointer;">
                    <span class="col truncate s12 m12 l12" style="font-size: 18px; font-weight: bold; line-height: 28px; color: #101416; margin-left: 3px; margin-top: 3px;">${row[i].pcname}</span>
                    <span class="col truncate s12 m12 l12" style="font-size: 14px; font-weight: normal; line-height: 18px; color: #101416; margin-left: 3px;">${row[i].location}</span>
                    <span class="col s2 m2 l2" state="${row[i].enabled}" style="font-size: 14px; color: #101416; margin-left: 3px; font-style: italic; font-weight: 300; line-height: 14px; margin-top: 3px;">${enabled}</span>
                </div>`
                );
            }
            $('.listTriggers').html(html.join(''));

            $('.cardEquipment').click(function (e) { 
                e.preventDefault();
                idEquipment = $(this).attr('idequipment');
                
                $('#titleEquipment').remove();

                let elementEquipment = $(this)[0].children[0];
                let textEquipment = $(elementEquipment).text();
                let nameEquipment = '<div id="titleEquipment" style="display: inline-block;"><i class="material-icons" style="color: #101416 !important; font-size: 18px;">chevron_right</i>'+textEquipment+'</div>';

                $('h5').html(titleClient + nameEquipment);
                getTriggersByEquipment();
            });
        }
    });
});

$('.btnTask').click(function (e) { 
    e.preventDefault();
    
    titleTask = '<div id="titleEquipment" style="display: inline-block;"><i class="material-icons" style="color: #101416 !important; font-size: 18px;">chevron_right</i>TAREAS</div>';
    $('h5').html(titleClient + titleTask);
    
    getTaskByClient();
});

function dashboard(){
    $.ajax({
        type: "GET",
        url: "/backupmonitor-api/public/index.php/methods/dashboard",
        dataType: "json",
        success: function (response) {
            console.log(response.result);
                let row = response.result;
                let html = [];
                for (let i=0; i < row.length; i++){
                let detail = row[i].detail;
                if (detail == null) {
                    detail = 'sinTareas';
                }
                let sortTask = detail.split(' ');
                for (item=0; item < sortTask.length; item++){
                    if (sortTask[item].split('=')[0] == 'error') {
                        borderColor = '#F20505';
                    }
                    if (sortTask[item].split('=')[0] == 'alerta') {
                        borderColor = '#FDD204';
                    }
                    if (sortTask[item].split('=')[0] == 'ok') {
                        borderColor = '#03A64A';
                    }
                    if (sortTask[item].split('=')[0] == 'sinDatos') {
                        borderColor = '#FDD204';
                    }
                    if (sortTask[item].split('=')[0] == 'sinTareas') {
                        borderColor = '#D9EAF9';
                    }
                }
                html.push(
                    `<div idClient=${row[i].idclient} data-target="showClient" class="cardClient modal-trigger" style="border-left-style: outset; border-left-color: ${borderColor}; border-left-width: 15px; cursor: pointer;">
                        <span class="col truncate s11 m11 l11" style="font-size: 14px; font-weight: bold; line-height: 24px; color: #101416; margin-left: 3px;">${row[i].name}</span>
                        <span class="col s10 m10 l10" style="font-size: 12px; font-weight: normal; line-height: 14px; color: #101416; margin-left: 3px;">TAREAS: ${row[i].tasks_count}</span>
                    </div>
                    `
                );
            }
            $('.listClients').html(html.join(''));
            $('.cardClient').click(function (e) { 
                e.preventDefault();

                let elementIdClient = $(this)[0];
                idClient = $(elementIdClient).attr('idClient');

                let elementSpan = $(this)[0];
                let childrenSpan = $(elementSpan).children()[0];
                titleClient = $(childrenSpan).text();
                titleRegister = '<div id="titleRegister" style="display: inline-block;"><i class="material-icons" style="color: #101416 !important; font-size: 18px;">chevron_right</i>ULTIMOS REGISTROS</div>';
                $('h5').html(titleClient+titleRegister);
                getTriggersByClient();

            });
        }
    }); 
}

function getTriggersByClient(){
    $.ajax({
        type: "GET",
        url: "/backupmonitor-api/public/index.php/methods/triggers/" + titleClient,
        dataType: "json",
        success: function (response) {
            console.log(response.result);
            let row = response.result;
            let html = [];
            for (let i=0; i < row.length; i++){
                let log = row[i].text_log;
                let type = row[i].type;
                let time = row[i].tiempo;
                if (log == null) {
                    log = 'Sin información';
                }

                if(type == null){
                    type = 'Sin información';
                }

                if (type != 'Sin información') {
                    type = type.split(' ')[0]
                }

                if (time == null) {
                    time = 0;
                }
                function convertHMS(value) {
                    const sec = parseInt(value, 10); // convert value to number if it's string
                    let hours   = Math.floor(sec / 3600); // get hours
                    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
                    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
                    // add 0 if value < 10; Example: 2 => 02
                    if (hours   < 10) {hours   = "0"+hours;}
                    if (minutes < 10) {minutes = "0"+minutes;}
                    if (seconds < 10) {seconds = "0"+seconds;}
                    return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
                }
                let timeToHours = convertHMS(time);
                html.push(
                    `<div class="cardTrigger" style="cursor: pointer;">
                        <span class="col truncate s12 m12 l12" style="font-size: 18px; font-weight: bold; line-height: 28px; color: #101416; margin-left: 3px; margin-top: 3px;">${row[i].tName}</span>
                        <span class="col truncate s12 m12 l12" style="font-size: 14px; font-weight: normal; line-height: 18px; color: #101416; margin-left: 3px;">${row[i].pcname}</span>
                        <span class="col truncate s12 m12 l12" style="font-size: 14px; font-weight: bold; line-height: 14px; color: #101416; margin-left: 3px; margin-top: 6px;">${log}</span>
                        <span class="col s12 m12 l12" style="font-size: 14px; font-weight: normal; line-height: 14px; color: #101416; margin-left: 3px; margin-top: 6px;">${type}</span>
                        <span class="col s12 m12 l12" style="font-size: 14px; font-weight: normal; font-style: italic; line-height: 14px; color: #101416; margin-left: 3px; margin-top: 6px;">${timeToHours}</span>
                    </div>
                    `
                );
            }
            $('.listTriggers').html(html.join(''));
	    $('.cardTrigger').click(function (e) { 
                e.preventDefault();
                let elementCard = $(this)[0];
                let elementParent = $(elementCard).children()[2];
                let textElement = $(elementParent).text();
		localStorage.setItem('textElement', textElement);
                window.open('/views/home/dashboard/log.php', '_blank'); 
            });
        }
    });
}

function getTriggersByEquipment(){
    $.ajax({
        type: "GET",
        url: "/backupmonitor-api/public/index.php/methods/triggersbyequipment/" + idEquipment,
        dataType: "json",
        success: function (response) {
            console.log(response)
            let row = response.result;
            let html = [];
            for (let i=0; i < row.length; i++){
                let log = row[i].text_log;
                let type = row[i].type;
                let time = row[i].tiempo;
                if (log == null) {
                    log = 'Sin información';
                }

                if(type == null){
                    type = 'Sin información';
                }

                if (type != 'Sin información') {
                    type = type.split(' ')[0]
                }

                if (time == null) {
                    time = 0;
                }
                function convertHMS(value) {
                    const sec = parseInt(value, 10); // convert value to number if it's string
                    let hours   = Math.floor(sec / 3600); // get hours
                    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
                    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
                    // add 0 if value < 10; Example: 2 => 02
                    if (hours   < 10) {hours   = "0"+hours;}
                    if (minutes < 10) {minutes = "0"+minutes;}
                    if (seconds < 10) {seconds = "0"+seconds;}
                    return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
                }
                let timeToHours = convertHMS(time);
                html.push(
                    `<div class="cardTrigger" style="cursor: pointer;">
                        <span class="col truncate s12 m12 l12" style="font-size: 18px; font-weight: bold; line-height: 28px; color: #101416; margin-left: 3px; margin-top: 3px;">${row[i].name}</span>
                        <span class="col truncate s12 m12 l12" style="font-size: 14px; font-weight: normal; line-height: 18px; color: #101416; margin-left: 3px;">${row[i].pcname}</span>
                        <span class="col truncate s12 m12 l12" style="font-size: 14px; font-weight: bold; line-height: 14px; color: #101416; margin-left: 3px; margin-top: 6px;">${log}</span>
                        <span class="col s12 m12 l12" style="font-size: 14px; font-weight: normal; line-height: 14px; color: #101416; margin-left: 3px; margin-top: 6px;">${type}</span>
                        <span class="col s12 m12 l12" style="font-size: 14px; font-weight: normal; font-style: italic; line-height: 14px; color: #101416; margin-left: 3px; margin-top: 6px;">${timeToHours}</span>
                    </div>
                    `
                );
            }
            $('.listTriggers').html(html.join(''));
            $('.cardTrigger').click(function (e) { 
                e.preventDefault();
                let elementCard = $(this)[0];
                let elementParent = $(elementCard).children()[2];
                let textElement = $(elementParent).text();
                localStorage.setItem('textElement', textElement);
                window.open('/views/home/dashboard/log.php', '_blank'); 
            });
        }
    }); 
}

function getTaskByClient(){
    $.ajax({
        type: "GET",
        url: "/backupmonitor-api/public/index.php/methods/tasksbyuser/" + idClient,
        dataType: "json",
        success: function (response) {
            let row = response.result;
            let html = [];
            for (let i=0; i < row.length; i++){
                let interval = row[i].interval_time;
                if(interval != null){
                    intervalNum = interval.split('.')[0] + 'HS.';
                }else{
                    intervalNum = 'N/A';
                }
                let type = row[i].type;
                if(type == '1'){
                    type = 'Completo';
                }
                if(type == '2'){
                    type = 'Diferencial';
                }
                if(type == '3'){
                    type = 'Incremental';
                }
                if(type == '4'){
                    type = 'Vacía';
                }
                let typeCompression = row[i].compression;
                if(typeCompression == '1'){
                    typeCompression = 'Sin comprimir';
                }
                if(typeCompression == '2'){
                    typeCompression = 'Zip';
                }
                if(typeCompression == '3'){
                    typeCompression = '7Zip';
                }
                let enabled = row[i].enabled;
                if(enabled == '1'){
                    enabled = 'Activo';
                }
                if(enabled == '0'){
                    enabled = 'Inactivo';
                }
                html.push(
                `<div class="cardTask" idTask="${row[i].idtask}" style="cursor: pointer;">
                    <span class="col truncate s10 m10 l10" style="font-size: 18px; font-weight: bold; line-height: 24px; color: #101416; margin-left: 3px; margin-top: 3px; margin-bottom: 3px;">${row[i].name}</span>
                    <span class="col truncate s10 m10 l10" type="${row[i].type}" style="font-size: 14x; color: #101416; margin-left: 3px; margin-bottom: 3px; font-style: normal; font-weight: normal; line-height: 18px;">${type}</span>
                    <span class="col truncate s10 m10 l10" compression="${row[i].compression} "style="font-size: 14x; color: #101416; margin-left: 3px; margin-bottom: 3px; font-style: normal; font-weight: normal; line-height: 18px;">${typeCompression}</span>
                    <span class="col truncate s10 m10 l10" interval="${row[i].interval_time}" style="font-size: 14x; color: #101416; margin-left: 3px; margin-bottom: 3 px; font-style: normal; font-weight: normal; line-height: 18px;">Intervalo: ${intervalNum}</span>
                    <span class="col s2 m2 l2" state="${row[i].enabled}" style="font-size: 14px; color: #101416; margin-left: 3px; font-style: italic; font-weight: 300; margin-top: 3px; line-height: 18px;">${enabled}</span>
                </div>`
                );
            }  
            $('.listTriggers').html(html.join(''));
            $('.cardTask').click(function (e) { 
                e.preventDefault();
                idTask = $(this).attr('idTask');

                $('#titleEquipment').remove();

                let elementTask = $(this)[0].children[0];
                let textTask = $(elementTask).text();
                let nameTask = '<div id="titleTask" style="display: inline-block;"><i class="material-icons" style="color: #101416 !important; font-size: 18px;">chevron_right</i>'+'TAREAS'+'<i class="material-icons" style="color: #101416 !important; font-size: 18px;">chevron_right</i>'+textTask+'</div>';
                $('h5').html(titleClient + nameTask);

                getTriggerByTask();
            });
        }
    });
}

function getTriggerByTask(){
    $.ajax({
        type: "GET",
        url: "/backupmonitor-api/public/index.php/methods/triggersbytask/" + idTask,
        dataType: "json",
        success: function (response) {
            let row = response.result;
            let html = [];
            for (let i=0; i < row.length; i++){
                let log = row[i].text_log;
                let created = row[i].created.split('.')[0];
                let type = row[i].type;
                if (type == '1') {
                    type = 'Inicio';
                }
                if (type == '2') {
                    type = 'Fin';
                }
                html.push(
                    `<div class="cardTrigger" style="cursor: pointer;">
                        <span class="col s12 m12 l12" style="font-size: 18px; font-weight: bold; line-height: 24px; color: #101416; margin-left: 3px; margin-top: 6px;">${type}</span>
                        <span class="col truncate s12 m12 l12" style="font-size: 14px; font-weight: normal; line-height: 18px; color: #101416; margin-left: 3px;">${created}</span>
                        <span class="col truncate s12 m12 l12" style="font-size: 14px; font-weight: bold; line-height: 14px; color: #101416; margin-left: 3px; margin-top: 6px;">${log}</span>
                    </div>
                    `
                );
            }
            $('.listTriggers').html(html.join(''));
            $('.cardTrigger').click(function (e) { 
                e.preventDefault();
                let elementCard = $(this)[0];
                let elementParent = $(elementCard).children()[2];
                let textElement = $(elementParent).text();
                localStorage.setItem('textElement', textElement);
                window.open('/views/home/dashboard/log.php', '_blank'); 
            });
        }
    });
}