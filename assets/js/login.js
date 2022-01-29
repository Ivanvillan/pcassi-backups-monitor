$('.isValidate').hover(function(){
    $('.iconArrow').css({"color": "#0E4068"});
}, function(){
    $('.iconArrow').css({"color": "#101416"});
});

$('.isValidate').click(function (e) { 
    e.preventDefault();
    var data = {
        "email": $('input[name="email"]').val(),
        "password": $('input[name="password"]').val(),
    };
    $('.isValidate').addClass('hide');
    $('.preloader-wrapper').removeClass('hide');
    $.ajax({
        type: "POST",
        url: "/backupmonitor-api/public/index.php/methods/users/login",
        data: data,
        dataType: "json",
        success: function (response) {
            if (response.message == "Login failed") {
                $('.isValidate').removeClass('hide');
                $('.preloader-wrapper').addClass('hide');
                M.toast({html: 'Error al iniciar sesion'});
            }else{
                window.location.href = '/views/home/index.php';
            }
        },
        error: function(err){
            $('.isValidate').removeClass('hide');
            $('.preloader-wrapper').addClass('hide');
            M.toast({html: 'Error al iniciar sesion'});
        }
    });
});
//
// Login boton enter
$('#email').keypress(function(e) {
    var key = e.which;
    if (key == 13) // the enter key code
    {
    $('.isValidate').click();
    return false;
    }
});
$('#password').keypress(function(e) {
    var key = e.which;
    if (key == 13) // the enter key code
    {
    $('.isValidate').click();
    return false;
    }
});
//