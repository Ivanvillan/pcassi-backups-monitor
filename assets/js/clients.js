getClients();
searchClient();
$(document).ready(function () {
    $('.modal').modal();
});
$('.colArrowBack').click(function (e) { 
    e.preventDefault();
    window.location.href = '/views/home/index.php';
});
function getClients(){
    $.ajax({
        type: "GET",
        url: "/backupmonitor-api/public/index.php/methods/customers",
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
                `<div class="cardClient content" idClient="${row[i].idclient}">
                    <div class="row">
                        <i class="material-icons delete">remove</i>
                        <h1 class="col truncate s10 m10 l10" style="font-size: 28px; font-weight: bold; line-height: 42px; color: #F1F9FF; margin-left: 20px; margin-top: 20px; margin-bottom: 10px;">${row[i].name}</h1>
                        <input type="text" class="input-field hide col truncate s10 m10 l10" name="editName" value="${row[i].name}" style="font-size: 24px; line-height: 42px; font-weight: bold; color: #F1F9FF; margin-left: 30px; margin-top: 20px; margin-bottom: 10px;">
                        <span class="col s2 m2 l2" state="${row[i].enabled}" style="font-size: 18px; color: #F1F9FF; margin-left: 20px; font-style: italic; font-weight: 300; line-height: 21px;">${enabled}</span>
                        <i class="material-icons col s1 m1 l1 state" style="color: #F1F9FF !important; font-size: 21px; margin-left: 20px; cursor: pointer;">change_circle</i>
                    </div>
                    <div class="row">
                        <div class="col equipments" style="width: 40px; height: 40px; background: #F1F9FF; float: right; border-radius: 20px; margin-right: 23px; position: relative; top: 15px; cursor: pointer;">
                            <i class="material-icons" style="color: #101416 !important; font-size: 28px; position: relative; top: 6px; right: 5px;">chevron_right</i>
                        </div>
                        <div class="col editClient" style="width: 40px; height: 40px; background: #F1F9FF; float: right; border-radius: 20px; margin-right: 8px; position: relative; top: 15px; cursor: pointer;">
                            <i class="material-icons" style="color: #101416 !important; font-size: 24px; position: relative; top: 8px; right: 2px;">edit_note</i>
                        </div>
                        <div class="col done hide" style="width: 40px; height: 40px; background: #F1F9FF; float: right; border-radius: 20px; margin-right: 8px; position: relative; top: 15px; cursor: pointer;">
                            <i class="material-icons" style="color: #101416 !important; font-size: 24px; position: relative; top: 8px; right: 2px;">done</i>
                        </div>
                    </div>
                </div>
                `
                );
            }    
            $('.listClients').html(html.join(''));
            $('.equipments').click(function (e) { 
                e.preventDefault();
                let element = $(this)[0].parentElement.parentElement;
                idClient = $(element).attr('idClient');
                localStorage.setItem('idClient', idClient);
                window.location.href = '/views/home/equipments/equipments.php';

            });
            $('.state').click(function (e) { 
                e.preventDefault();

                let client = $(this)[0].parentElement.parentElement;
                idClient = $(client).attr('idClient');

                let elementH1 = $(this)[0].parentElement.parentElement;
                let childrenH1 = $(elementH1).children()[0];
                let childH1 = $(childrenH1).children()[1];
                let name = $(childH1).text();

                let element = $(this)[0].parentElement.parentElement;
                let children = $(element).children()[0];
                let child = $(children).children()[3];
                let state = $(child).attr('state');
                if(state == "1"){
                    $.ajax({
                        type: "POST",
                        url: "/backupmonitor-api/public/index.php/methods/customers/save",
                        data: {
                            "name": name,
                            "enabled": 0,
                            "id": idClient
                        },
                        dataType: "json",
                        success: function (response) {
                            M.toast({html: 'Estado actualizado'});
                            getClients();
                        },
                        error: function(){
                            M.toast({html: 'Error al actualizar estado'});
                        }
                    });
                }
                if(state == "0"){
                    $.ajax({
                        type: "POST",
                        url: "/backupmonitor-api/public/index.php/methods/customers/save",
                        data: {
                            "name": name,
                            "enabled": 1,
                            "id": idClient
                        },
                        dataType: "json",
                        success: function (response) {
                            M.toast({html: 'Estado actualizado'});
                            getClients();
                        },
                        error: function(){
                            M.toast({html: 'Error al actualizar estado'});
                        }
                    });
                }
            });
            $('.editClient').click(function (e) { 
                e.preventDefault();
                M.updateTextFields();

                let elementDelete = $(this)[0].parentElement.parentElement;
                let childrenDelete = $(elementDelete).children()[0];
                let childDelete = $(childrenDelete).children()[0];

                let elementName = $(this)[0].parentElement.parentElement;
                let childrenName = $(elementName).children()[0];
                let childName = $(childrenName).children()[1];
                let editName = $(childName).text();

                let elementBtnEdit = $(this)[0].parentElement;
                let childBtnEdit = $(elementBtnEdit).children()[1];
                
                let parentDone = $(this)[0].parentElement;
                let childDone = $(parentDone).children()[2];
                
                let parentEquipments = $(this)[0].parentElement;
                let childEquipments = $(parentEquipments).children()[0];
                
                let elementH1 = $(this)[0].parentElement.parentElement;
                let childrenH1 = $(elementH1).children()[0];
                let childH1 = $(childrenH1).children()[1];
                
                let elementInput = $(this)[0].parentElement.parentElement;
                let childrenInput = $(elementInput).children()[0];
                let childInput = $(childrenInput).children()[2];
                
                $(childDelete).addClass('hide');
                $(childBtnEdit).addClass('hide');
                $(childDone).removeClass('hide');
                $(childEquipments).css({'pointer-events': 'none', 'opacity': '0.5', 'background': '#ccc'});
                $(childH1).addClass('hide');
                $(childInput).removeClass('hide');
                
		        $(childInput).val(editName);

            });
            $('.done').click(function (e) { 
                e.preventDefault();

                let element = $(this)[0].parentElement.parentElement;
                idClient = $(element).attr('idClient');

                let elementBtnEdit = $(this)[0].parentElement;
                let childBtnEdit = $(elementBtnEdit).children()[1];
                
                let parentDone = $(this)[0].parentElement;
                let childDone = $(parentDone).children()[2];
                
                let parentEquipments = $(this)[0].parentElement;
                let childEquipments = $(parentEquipments).children()[0];
                
                let elementH1 = $(this)[0].parentElement.parentElement;
                let childrenH1 = $(elementH1).children()[0];
                let childH1 = $(childrenH1).children()[1];
                
                let elementInput = $(this)[0].parentElement.parentElement;
                let childrenInput = $(elementInput).children()[0];
                let childInput = $(childrenInput).children()[2];
                
                let editName = $(childInput).val();

                $.ajax({
                    type: "POST",
                    url: "/backupmonitor-api/public/index.php/methods/customers/save",
                    data: {
                        "name": editName,
                        "enabled": 1,
                        "id": idClient
                    },
                    dataType: "json",
                    success: function (response) {
                        M.toast({html: 'Nombre actualizado'});
                        getClients();
                        $(childBtnEdit).removeClass('hide');
                        $(childDone).addClass('hide');
                        $(childEquipments).css({'pointer-events': 'all', 'opacity': '1', 'background': '#F1F9FF'});
                        $(childH1).removeClass('hide');
                        $(childInput).addClass('hide');
                    },
                    error: function(){
                        M.toast({html: 'Error al actualizar nombre'});
                        $(childBtnEdit).removeClass('hide');
                        $(childDone).addClass('hide');
                        $(childEquipments).css({'pointer-events': 'all', 'opacity': '1', 'background': '#F1F9FF'});
                        $(childH1).removeClass('hide');
                        $(childInput).addClass('hide');
                    }
                });
            });

            $('.delete').click(function (e) { 
                e.preventDefault();
                let client = $(this)[0].parentElement.parentElement;
                idClient = $(client).attr('idClient');
                console.log(client);
                if(confirm('ATENCIÓN: Vas a eliminar este cliente, ¿Deseas continuar?')) {
                    $.ajax({
                        type: "DELETE",
                        url: '/backupmonitor-api/public/index.php/methods/customers',
                        data: {
                            "id": idClient
                        },
                        dataType: "json",
                        success: (response) => {
                            location.reload();
                            M.toast({html: 'Cliente eliminado'});
                        },
                        error: () => {
                            M.toast({html: 'Error al eliminar cliente'});
                        }
                    })
                }
            });
        }
    });
} 
$('.addClient').click(function (e) { 
    e.preventDefault();
    $('.addClient').addClass('hide');
    $('.preloader-addClient').removeClass('hide');
    let name = $("input[name='name']").val();
    $.ajax({
        type: "POST",
        url: "/backupmonitor-api/public/index.php/methods/customers/save",
        data: {
            "name": name,
        },
        dataType: "json",
        success: function (response) {
            $('.addClient').removeClass('hide');
            $('.preloader-addClient').addClass('hide');
            M.toast({html: 'Cliente creado'});
            $('#addClientForm').trigger('reset');
            getClients();
        },
        error: function(){
            M.toast({html: 'Error al crear cliente'});
            $('.addClient').removeClass('hide');
            $('.preloader-addClient').addClass('hide');
        }
    });
});
function searchClient(){
    $("#searchClient").on("keyup", function() {
        let value = $(this).val().toLowerCase();
        $(".content").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}
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