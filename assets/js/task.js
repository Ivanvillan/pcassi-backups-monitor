const idEquipment = localStorage.getItem('idEquipment');
getTaskbyEquipment();
$(document).ready(function () {
    $('.modal').modal();
    $('.tooltipped').tooltip();
    M.updateTextFields();
    $('select').formSelect();
});

$('.colArrowBack').click(function (e) { 
    e.preventDefault();
    window.location.href = '/views/home/equipments/equipments.php';
});
$("#type").change(function(){
    type = $(this).children("option:selected").val();
});
$("#compression").change(function(){
    compression = $(this).children("option:selected").val();
});
$("#editType").change(function(){
    editType = $(this).children("option:selected").val();
});
$("#editCompression").change(function(){
    editCompression = $(this).children("option:selected").val();
});
function getTaskbyEquipment(){
    $.ajax({
        type: "GET",
        url: "/backupmonitor-api/public/index.php/methods/tasks/" + idEquipment,
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
                `<div class="cardTask" idTask="${row[i].idtask}">
                    <div class="row">
                        <i class="material-icons delete">remove</i>
                        <h1 class="col truncate s10 m10 l10" style="font-size: 28px; font-weight: bold; line-height: 42px; color: #101416; margin-left: 20px; margin-top: 20px; margin-bottom: 10px;">${row[i].name}</h1>
                        <span class="col truncate s10 m10 l10" type="${row[i].type}" style="font-size: 24px; color: #101416; margin-left: 20px; margin-bottom: 10px; font-style: normal; font-weight: normal; line-height: 28px;">${type}</span>
                        <span class="col truncate s10 m10 l10" compression="${row[i].compression} "style="font-size: 24px; color: #101416; margin-left: 20px; margin-bottom: 10px; font-style: normal; font-weight: normal; line-height: 28px;">${typeCompression}</span>
                        <span class="col truncate s10 m10 l10" interval="${row[i].interval_time}" style="font-size: 24px; color: #101416; margin-left: 20px; margin-bottom: 10px; font-style: normal; font-weight: normal; line-height: 28px;">Intervalo: ${intervalNum}</span>
                        <span class="col s2 m2 l2" state="${row[i].enabled}" style="font-size: 18px; color: #101416; margin-left: 20px; font-style: italic; font-weight: 300; line-height: 21px;">${enabled}</span>
                        <i class="material-icons col s1 m1 l1 state" style="color: #101416; font-size: 21px; margin-left: 20px; cursor: pointer;">change_circle</i>
                    </div>
                    <div class="row">
                        <div class="col task" style="width: 40px; height: 40px; background: #101416; float: right; border-radius: 20px; margin-right: 23px; cursor: pointer;">
                            <i class="material-icons" style="color: #F1F9FF !important; font-size: 23px; position: relative; top: 8px; right: 2px;">cloud_download</i>
                        </div>
                        <div href="#editTask" class="col btnEditTask modal-trigger" style="width: 40px; height: 40px; background: #101416; float: right; border-radius: 20px; margin-right: 8px; cursor: pointer;">
                            <i class="material-icons" style="color: #F1F9FF !important; font-size: 24px; position: relative; top: 8px; right: 1px;">edit_note</i>
                        </div>
                    </div>
                </div>`
                );
            }  
            $('.listTask').html(html.join(''));

            $('.state').click(function (e) { 
                e.preventDefault();

                let task = $(this)[0].parentElement.parentElement;
                idTask = $(task).attr('idTask');

                let elementH1 = $(this)[0].parentElement.parentElement;
                let childrenH1 = $(elementH1).children()[0];
                let childH1 = $(childrenH1).children()[1];
                let name = $(childH1).text();
                
                let elementType = $(this)[0].parentElement.parentElement;
                let childrenType = $(elementType).children()[0];
                let childType = $(childrenType).children()[2];
                let type = $(childType).attr('type');

                let elementCompression = $(this)[0].parentElement.parentElement;
                let childrenCompression = $(elementCompression).children()[0];
                let childCompression = $(childrenCompression).children()[3];
                let compression = $(childCompression).attr('compression');

                let elementInterval = $(this)[0].parentElement.parentElement;
                let childrenInterval = $(elementInterval).children()[0];
                let childInterval = $(childrenInterval).children()[4];
                let interval = $(childInterval).attr('interval');

                let elementState = $(this)[0].parentElement.parentElement;
                let childrenState = $(elementState).children()[0];
                let childState = $(childrenState).children()[5];
                let state = $(childState).attr('state');

                if(state == "1"){
                    $.ajax({
                        type: "POST",
                        url: "/backupmonitor-api/public/index.php/methods/tasks/save",
                        data: {
                            "name": name,
                            "type": type,
                            "idequipment": idEquipment,
                            "compression": compression,
                            "interval_time": interval,
                            "id": idTask,
                            "enabled": 0
                        },
                        dataType: "json",
                        success: function (response) {
                            M.toast({html: 'Estado actualizado'});
                            getTaskbyEquipment();
                        },
                        error: function(){
                            M.toast({html: 'Error al actualizar estado'});
                        }
                    });
                }
                if(state == "0"){
                    $.ajax({
                        type: "POST",
                        url: "/backupmonitor-api/public/index.php/methods/tasks/save",
                        data: {
                            "name": name,
                            "type": type,
                            "idequipment": idEquipment,
                            "compression": compression,
                            "interval_time": interval,
                            "id": idTask,
                            "enabled": 1
                        },
                        dataType: "json",
                        success: function (response) {
                            M.toast({html: 'Estado actualizado'});
                            getTaskbyEquipment();
                        },
                        error: function(){
                            M.toast({html: 'Error al actualizar estado'});
                        }
                    });
                }
            });
            $('.btnEditTask').click(function (e) { 
                e.preventDefault();

                let task = $(this)[0].parentElement.parentElement;
                idTask = $(task).attr('idTask');

                let elementH1 = $(this)[0].parentElement.parentElement;
                let childrenH1 = $(elementH1).children()[0];
                let childH1 = $(childrenH1).children()[1];
                let name = $(childH1).text();
                
                let elementType = $(this)[0].parentElement.parentElement;
                let childrenType = $(elementType).children()[0];
                let childType = $(childrenType).children()[2];
                let editTypeAttr = $(childType).attr('type');

                let elementCompression = $(this)[0].parentElement.parentElement;
                let childrenCompression = $(elementCompression).children()[0];
                let childCompression = $(childrenCompression).children()[3];
                let editCompressionAttr = $(childCompression).attr('compression');

                let elementInterval = $(this)[0].parentElement.parentElement;
                let childrenInterval = $(elementInterval).children()[0];
                let childInterval = $(childrenInterval).children()[4];
                let interval = $(childInterval).attr('interval');

                $("input[name='editName']").val(name);
                $("input[name='editInterval']").val(interval);
                editType = editTypeAttr;
                editCompression = editCompressionAttr;
                M.updateTextFields();

                $('.editTask').click(function (e) { 
                    e.preventDefault();
    
                    editName = $("input[name='editName']").val();
                    editInterval = $("input[name='editInterval']").val();
    
                    $.ajax({
                        type: "POST",
                        url: "/backupmonitor-api/public/index.php/methods/tasks/save",
                        data: {
                            "name": editName,
                            "type": editType,
                            "idequipment": idEquipment,
                            "compression": editCompression,
                            "interval_time": editInterval,
                            "id": idTask,
                            "enabled": 1
                        },
                        dataType: "json",
                        success: function (response) {
                            $('.editTask').removeClass('hide');
                            $('.preloader-editTask').addClass('hide');
                            M.toast({html: 'Tarea editada'});
                            getTaskbyEquipment();
                        },
                        error: function(){
                            M.toast({html: 'Error al editar tarea'});
                            $('.editTask').removeClass('hide');
                            $('.preloader-editTask').addClass('hide');
                        }
                    }); 
                });

            });

            $('.task').click(function (e) { 
                e.preventDefault();
                
                let task = $(this)[0].parentElement.parentElement;
                let idTask = $(task).attr('idTask');
                
                let elementH1 = $(this)[0].parentElement.parentElement;
                let childrenH1 = $(elementH1).children()[0];
                let childH1 = $(childrenH1).children()[1];
                let nameTask = $(childH1).text();
                
                let taskPathPre = 'cd C:\\Program Files (x86)\\Cobian Backup 11\nbackupmonitor.exe /trigger=1 /equipment=';
                let taskNamePre = 'pre' +  nameTask + '.bat';
                
                let taskPathPost = 'cd C:\\Program Files (x86)\\Cobian Backup 11\nbackupmonitor.exe /trigger=2 /equipment=';
                let taskNamePost = 'pos' + nameTask + '.bat';
                
                let pathTask = ' /task=';
                
                let pathName = ' /name='
                
                let nameFile = 'Config' + ' ' + nameTask;
                
                let zip = new JSZip();
                
                zip.file(taskNamePre, taskPathPre + idEquipment + pathTask + idTask + pathName + `"${nameTask}"`);
                zip.file(taskNamePost, taskPathPost + idEquipment + pathTask + idTask + pathName + `"${nameTask}"`);
                
                let content = zip.generate({type:"blob"});
                saveAs(content, nameFile);
            });

            $('.delete').click(function (e) { 
                e.preventDefault();
                let task = $(this)[0].parentElement.parentElement;
                idTask = $(task).attr('idTask');
                if(confirm('ATENCIÓN: Vas a eliminar esta tarea, ¿Deseas continuar?')) {
                    $.ajax({
                        type: "DELETE",
                        url: '/backupmonitor-api/public/index.php/methods/tasks',
                        data: {
                            "id": idTask
                        },
                        dataType: "json",
                        success: (response) => {
                            location.reload();
                            M.toast({html: 'Tarea eliminada'});
                        },
                        error: () => {
                            M.toast({html: 'Error al eliminar tarea'});
                        }
                    })
                }
            });
        }
    });
}
$('.addTask').click(function (e) { 
    e.preventDefault();
    $('.addTask').addClass('hide');
    $('.preloader-addTask').removeClass('hide');
    let name = $("input[name='name']").val();
    let interval_time = $("input[name='interval']").val();
    $.ajax({
        type: "POST",
        url: "/backupmonitor-api/public/index.php/methods/tasks/save",
        data: {
            "name": name,
            "type": type,
            "idequipment": idEquipment,
            "compression": compression,
            "interval_time": interval_time,
        },
        dataType: "json",
        success: function (response) {
            $('.addTask').removeClass('hide');
            $('.preloader-addTask').addClass('hide');
            M.toast({html: 'Tarea creada'});
            $('#addTaskForm').trigger('reset');
            getTaskbyEquipment();
        },
        error: function(){
            M.toast({html: 'Error al crear tarea'});
            $('.addTask').removeClass('hide');
            $('.preloader-addTask').addClass('hide');
        }
    });
});

$('.btnDownloadApp').click(function (e) { 
    e.preventDefault();
    window.location.href = 'https://cloud3.pcassi.com.ar/index.php/s/WxjymHEFTpqgEin/download';
});
$('.btnLogout').click(function (e) { 
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/backupmonitor-api/public/index.php/methods/users/logout",
        data: {
            "id": user_id
        },
        dataType: "json",
        success: function (response) {
            M.toast({html: 'Sesion finalizada'});
            window.location.href = '/views/auth/login.php';
        },
        error: function (err) { 
            M.toast({html: 'Error al cerrar sesion'});
         }
    });
});
