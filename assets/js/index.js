$('.clients').click(function (e) { 
    e.preventDefault();
    window.location.href = '/views/home/clients/clients.php';
});
$('.dashboard').click(function (e) { 
    e.preventDefault();
    window.location.href = '/views/home/dashboard/dashboard.php';
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