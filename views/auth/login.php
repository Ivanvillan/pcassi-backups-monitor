<?php
session_start();
if(!empty($_SESSION['ID'])){
    header('Location: /views/home/index.php');
};
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Backup Monitor | Inicio</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="/assets/css/login.css">
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col s12 m12 l12 center-align imageTop">
                <img class="responsive-img" width="400" height="250" src="/assets/img/r0bab.png"> 
            </div>
            <div class="col s12 m12 l12 center-align firstInput">
                <input type="text" id="email" name="email" placeholder="Usuario"></input>
            </div>
            <div class="col s12 m12 l12 center-align secondInput">
                <input type="password" id="password" name="password" placeholder="Contraseña"></input>
            </div>
            <div class="col s12 m12 l12 center-align btnLogin">
                <div class="btnSm">
                    <a href="#" class="isValidate">Iniciar sesion<i class="material-icons iconArrow">chevron_right</i></a> 
                    <div class="preloader-wrapper hide small active">
                        <div class="spinner-layer spinner-red-only">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div><div class="gap-patch">
                            <div class="circle"></div>
                        </div><div class="circle-clipper">
                            <div class="circle"></div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col s12 m12 l12 center-align imageBottom">
                <img class="responsive-img" width="150" height="120" src="/assets/img/mark-b.png">
            </div>
        </div>
        <!--  -->
    </div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script src="/assets/js/login.js"></script>
</body>
</html>