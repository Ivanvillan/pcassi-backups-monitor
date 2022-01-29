<?php 
session_start();
if (isset($_SESSION['ID'])) {
    $user_id = $_SESSION['ID'];
    $user_email = $_SESSION['EMAIL'];
    $user_name = $_SESSION['USER'];
    $user_username = $_SESSION['PROFILE']; 
  }else{
    header("Location: /views/auth/login.php");
    die();
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Backup Monitor | Equipos</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="/assets/css/equipments.css">
</head>
<body>
<div class="btnLogout btn right">Cerrar sesión</div>
<div class="container">
    <div class="row">
        <a href="#" class="col s1 m1 l1 colArrowBack"><i class="material-icons prefix iconArrowBack">arrow_back</i></a>
        <h4 class="col s4 m4 l4">EQUIPOS</h4>
        <div class="col s6 m6 l6 colAddEquipment">
            <a href="#addEquipment" class="btn right modal-trigger btnAddEquipment"><i class="material-icons iconAddEquipment">add</i></a>
        </div>
        <div class="col s12 m12 l12 listEquipments">
        </div>
    </div>

    <div id="addEquipment" class="modal">
        <div class="modal-content">
            <div class="row">
                <h5 class="col s10 m10 l10">NUEVO EQUIPO</h5>
                <a class="col s1 m1 l1 right modal-close modalClose"><i class="material-icons iconClose">close</i></a>
                <div class="col s12 m12 l12 divider"></div>
                <form id="addEquipmentForm">
                    <div class="input-field col s12 m6 l6 offset-m2 offset-l2">
                        <input type="text" class="validate" id="pcname" name="pcname">
                        <label for="pcname">Nombre</label>
                    </div>
                    <div class="input-field col s12 m6 l6 offset-m2 offset-l2">
                        <input type="text" id="location" class="validate" name="location">
                        <label for="location">Ubicación</label>
                    </div>
                    <div class="modal-footer col s12 m12 l12 colModalFooter">
                        <a href="#!" class="btn right addEquipment">Aceptar</a>
                        <div class="preloader-wrapper preloader-addEquipment hide small right active">
                            <div class="spinner-layer spinner-red-only">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script>
    user_id = <?php echo json_encode($user_id) ?>;
</script>
<script src="/assets/js/equipments.js"></script>
</body>
</html>