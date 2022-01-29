const idClient = localStorage.getItem('idClient');
getEquipments();
$(document).ready(function () {
    $('.modal').modal();
});
$('.colArrowBack').click(function (e) { 
    e.preventDefault();
    window.location.href = '/views/home/clients/clients.php';
});
function getEquipments(){
    $.ajax({
        type: "GET",
        url: "/backupmonitor-api/public/index.php/methods/equipments/" + idClient,
        dataType: "json",
        success: function (response) {
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
                `<div class="cardEquipments" idEquipment="${row[i].idequipment}">
                    <div class="row">
                        <i class="material-icons delete">remove</i>
                        <h1 class="col truncate s10 m10 l10" style="font-size: 28px; font-weight: bold; line-height: 42px; color: #F1F9FF; margin-left: 20px; margin-top: 20px; margin-bottom: 10px;">${row[i].pcname}</h1>
                        <input type="text" class="input-field hide col truncate s10 m10 l10" name="editPcname" value="${row[i].pcname}" style="font-size: 24px; font-weight: bold; line-height: 42px; color: #F1F9FF; margin-left: 30px; margin-top: 20px; margin-bottom: 10px;">
                        <span class="col truncate s10 m10 l10" style="font-size: 24px; color: #F1F9FF; margin-left: 20px; margin-bottom: 10px; font-style: normal; font-weight: normal; line-height: 28px;">${row[i].location}</span>
                        <input type="text" class="input-field hide col truncate s10 m10 l10" name="editLocation" value="${row[i].location}" style="font-size: 18px; color: #F1F9FF; margin-left: 30px; margin-bottom: 10px; font-style: normal; font-weight: normal; line-height: 28px;">
                        <span class="col s2 m2 l2" state="${row[i].enabled}" style="font-size: 18px; color: #F1F9FF; margin-left: 20px; font-style: italic; font-weight: 300; line-height: 21px;">${enabled}</span>
                        <i class="material-icons col s1 m1 l1 state" style="color: #F1F9FF !important; font-size: 21px; margin-left: 20px; cursor: pointer;">change_circle</i>
                    </div>
                    <div class="row">
                        <div class="col task" style="width: 40px; height: 40px; background: #F1F9FF; float: right; border-radius: 20px; margin-right: 23px; position: relative; top: 37px; cursor: pointer;">
                            <i class="material-icons" style="color: #101416 !important; font-size: 28px; position: relative; top: 6px; right: 5px;">chevron_right</i>
                        </div>
                        <div class="col editEquipment" style="width: 40px; height: 40px; background: #F1F9FF; float: right; border-radius: 20px; margin-right: 8px; position: relative; top: 37px; cursor: pointer;">
                            <i class="material-icons" style="color: #101416 !important; font-size: 24px; position: relative; top: 8px; right: 2px;">edit_note</i>
                        </div>
                        <div class="col done hide" style="width: 40px; height: 40px; background: #F1F9FF; float: right; border-radius: 20px; margin-right: 8px; position: relative; top: 37px; cursor: pointer;">
                            <i class="material-icons" style="color: #101416 !important; font-size: 24px; position: relative; top: 8px; right: 2px;">done</i>
                        </div>
                    </div>
                </div>`
                );
            }  
            $('.listEquipments').html(html.join(''));
            $('.task').click(function (e) { 
                e.preventDefault();
                let element = $(this)[0].parentElement.parentElement;
                idEquipment = $(element).attr('idEquipment');
                localStorage.setItem('idEquipment', idEquipment);
                window.location.href = '/views/home/task/task.php';

            });
            $('.state').click(function (e) { 
                e.preventDefault();

                let equipment = $(this)[0].parentElement.parentElement;
                idEquipment = $(equipment).attr('idEquipment');

                let elementH1 = $(this)[0].parentElement.parentElement;
                let childrenH1 = $(elementH1).children()[0];
                let childH1 = $(childrenH1).children()[1];
                let pcname = $(childH1).text();
                
                let elementLocation = $(this)[0].parentElement.parentElement;
                let childrenLocation = $(elementLocation).children()[0];
                let childLocation = $(childrenLocation).children()[3];
                let location = $(childLocation).text();

                let element = $(this)[0].parentElement.parentElement;
                let children = $(element).children()[0];
                let child = $(children).children()[5];
                let state = $(child).attr('state');
                console.log(child);
                console.log(state);

                if(state == "1"){
                    $.ajax({
                        type: "POST",
                        url: "/backupmonitor-api/public/index.php/methods/equipments/save",
                        data: {
                            "pcname": pcname,
                            "location": location,
                            "enabled": 0,
                            "idclient": idClient,
                            "id": idEquipment
                        },
                        dataType: "json",
                        success: function (response) {
                            M.toast({html: 'Estado actualizado'});
                            getEquipments();
                        },
                        error: function(){
                            M.toast({html: 'Error al actualizar estado'});
                        }
                    });
                }
                if(state == "0"){
                    $.ajax({
                        type: "POST",
                        url: "/backupmonitor-api/public/index.php/methods/equipments/save",
                        data: {
                            "pcname": pcname,
                            "location": location,
                            "enabled": 1,
                            "idclient": idClient,
                            "id": idEquipment
                        },
                        dataType: "json",
                        success: function (response) {
                            M.toast({html: 'Estado actualizado'});
                            getEquipments();
                        },
                        error: function(){
                            M.toast({html: 'Error al actualizar estado'});
                        }
                    });
                }
            });
            $('.editEquipment').click(function (e) { 
                e.preventDefault();
                M.updateTextFields();

                let elementDelete = $(this)[0].parentElement.parentElement;
                let childrenDelete = $(elementDelete).children()[0];
                let childDelete = $(childrenDelete).children()[0];

                let elementBtnEdit = $(this)[0].parentElement;
                let childBtnEdit = $(elementBtnEdit).children()[1];

                let parentDone = $(this)[0].parentElement;
                let childDone = $(parentDone).children()[2];
                
                let parentTask = $(this)[0].parentElement;
                let childTask = $(parentTask).children()[0];
                
                let elementH1 = $(this)[0].parentElement.parentElement;
                let childrenH1 = $(elementH1).children()[0];
                let childH1 = $(childrenH1).children()[1];
                let editPcname = $(childH1).text();
                
                let elementInputH1 = $(this)[0].parentElement.parentElement;
                let childrenInputH1 = $(elementInputH1).children()[0];
                let childInputH1 = $(childrenInputH1).children()[2];
                
                let elementSpan = $(this)[0].parentElement.parentElement;
                let childrenSpan = $(elementSpan).children()[0];
                let childSpan = $(childrenSpan).children()[3];
                let editLocation = $(childSpan).text()
                
                let elementInputSpan = $(this)[0].parentElement.parentElement;
                let childrenInputSpan = $(elementInputSpan).children()[0];
                let childInputSpan = $(childrenInputSpan).children()[4];

                $(childDelete).addClass('hide');
                $(childBtnEdit).addClass('hide');
                $(childDone).css({'top': '17px'});
                $(childDone).removeClass('hide');
                $(childTask).css({'pointer-events': 'none', 'opacity': '0.5', 'background': '#ccc', 'top': '17px'});
                $(childH1).addClass('hide');
                $(childInputH1).removeClass('hide');
                $(childSpan).addClass('hide');
                $(childInputSpan).removeClass('hide');

                $(childInputH1).val(editPcname);
                $(childInputSpan).val(editLocation);

            });
            $('.done').click(function (e) { 
                e.preventDefault();
                
                let equipment = $(this)[0].parentElement.parentElement;
                idEquipment = $(equipment).attr('idEquipment');

                let elementBtnEdit = $(this)[0].parentElement;
                let childBtnEdit = $(elementBtnEdit).children()[1];

                let parentDone = $(this)[0].parentElement;
                let childDone = $(parentDone).children()[2];
                
                let parentTask = $(this)[0].parentElement;
                let childTask = $(parentTask).children()[0];

                let elementH1 = $(this)[0].parentElement.parentElement;
                let childrenH1 = $(elementH1).children()[0];
                let childH1 = $(childrenH1).children()[1];
                
                let elementInputH1 = $(this)[0].parentElement.parentElement;
                let childrenInputH1 = $(elementInputH1).children()[0];
                let childInputH1 = $(childrenInputH1).children()[2];
                
                let elementSpan = $(this)[0].parentElement.parentElement;
                let childrenSpan = $(elementSpan).children()[0];
                let childSpan = $(childrenSpan).children()[3];
                
                let elementInputSpan = $(this)[0].parentElement.parentElement;
                let childrenInputSpan = $(elementInputSpan).children()[0];
                let childInputSpan = $(childrenInputSpan).children()[4];

                let editPcname = $(childInputH1).val();
                let editLocation = $(childInputSpan).val();

                $.ajax({
                    type: "POST",
                    url: "/backupmonitor-api/public/index.php/methods/equipments/save",
                    data: {
                        "pcname": editPcname,
                        "location": editLocation,
                        "enabled": 1,
                        "idclient": idClient,
                        "id": idEquipment
                    },
                    dataType: "json",
                    success: function (response) {
                        M.toast({html: 'Nombre actualizado'});
                        getEquipments();
                        $(childBtnEdit).removeClass('hide');
                        $(childDone).css({'top': '37px'});
                        $(childDone).addClass('hide');
                        $(childTask).css({'pointer-events': 'all', 'opacity': '1', 'background': '#F1F9FF', 'top': '37px'});
                        $(childH1).removeClass('hide');
                        $(childInputH1).addClass('hide');
                        $(childSpan).removeClass('hide');
                        $(childInputSpan).addClass('hide');
                    },
                    error: function(){
                        M.toast({html: 'Error al actualizar nombre'});
                        $(childBtnEdit).removeClass('hide');
                        $(childDone).addClass('hide');
                        $(childTask).css({'pointer-events': 'all', 'opacity': '1', 'background': '#F1F9FF', 'top': '37px'});
                        $(childH1).removeClass('hide');
                        $(childInputH1).addClass('hide');
                        $(childSpan).removeClass('hide');
                        $(childInputSpan).addClass('hide');
                    }
                });
            });

            $('.delete').click(function (e) { 
                e.preventDefault();
                let equipment = $(this)[0].parentElement.parentElement;
                idEquipment = $(equipment).attr('idEquipment');
                console.log(idEquipment);
                if(confirm('ATENCIÓN: Vas a eliminar este equipo, ¿Deseas continuar?')) {
                    $.ajax({
                        type: "DELETE",
                        url: '/backupmonitor-api/public/index.php/methods/equipments',
                        data: {
                            "id": idEquipment
                        },
                        dataType: "json",
                        success: (response) => {
                            location.reload();
                            M.toast({html: 'Equipo eliminado'});
                        },
                        error: () => {
                            M.toast({html: 'Error al eliminar equipo'});
                        }
                    })
                }
            });
        }
    });
}
$('.addEquipment').click(function (e) { 
    e.preventDefault();
    $('.addEquipment').addClass('hide');
    $('.preloader-addEquipment').removeClass('hide');
    let pcname = $("input[name='pcname']").val();
    let location = $("input[name='location']").val();
    $.ajax({
        type: "POST",
        url: "/backupmonitor-api/public/index.php/methods/equipments/save",
        data: {
            "pcname": pcname,
            "location": location,
            "idclient": idClient,
        },
        dataType: "json",
        success: function (response) {
            $('.addEquipment').removeClass('hide');
            $('.preloader-addEquipment').addClass('hide');
            M.toast({html: 'Equipo creado'});
            $('#addEquipmentForm').trigger('reset');
            getEquipments();
        },
        error: function(){
            M.toast({html: 'Error al crear equipo'});
            $('.addEquipment').removeClass('hide');
            $('.preloader-addEquipment').addClass('hide');
        }
    });
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