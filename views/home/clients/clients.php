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
    <title>Backup Monitor | Clientes</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="/assets/css/clients.css">
</head>
<body>
<div class="btnLogout btn right">Cerrar sesión</div>
<div class="container">
    <div class="row">
        <a href="#" class="col s1 m1 l1 colArrowBack"><i class="material-icons prefix iconArrowBack">arrow_back</i></a>
        <h4 class="col s11 m11 l11">CLIENTES</h4>
        <div class="col s4 m4 l4 input-field">
            <input type="text" id="searchClient">
            <label for="searchClient">Buscar</label>
        </div>
        <div class="col s7 m7 l7 colAddClient">
            <a href="#addClient" class="btn right modal-trigger btnAddClient"><i class="material-icons iconAdd">add</i></a>
        </div>
        <div class="col s12 m12 l12 listClients">
        </div>
    </div>
    <div id="addClient" class="modal">
        <div class="modal-content">
            <div class="row">
                <h5 class="col s10 m10 l10">NUEVO CLIENTE</h5>
                <a class="col s1 m1 l1 right modal-close modalClose"><i class="material-icons">close</i></a>
                <div class="col s12 m12 l12 divider"></div>
                <form id="addClientForm">
                    <div class="input-field col s12 m6 l6 offset-m2 offset-l2">
                        <input type="text" class="validate" id="name" name="name">
                        <label for="name">Nombre</label>
                    </div>
                    <div class="modal-footer col s12 m12 l12 colModalAddClient">
                        <a href="#!" class="btn right addClient">Aceptar</a>
                        <div class="preloader-wrapper preloader-addClient hide small right active">
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
<script src="/assets/js/clients.js"></script>
</body>
</html>