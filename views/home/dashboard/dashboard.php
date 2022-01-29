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
    <title>Backup Monitor | Dashboard</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="/assets/css/dashboard.css">
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col s12 m12 l12 listClients">
            </div>
        </div>
        <div id="showClient" class="modal">
            <div class="modal-content">
                <div class="row">
                    <h5 class="col s10 m10 l10"></h5>
                    <a class="col s1 m1 l1 right modal-close modalClose"><i class="material-icons iconClose">close</i></a>
                    <div class="col s12 m12 l12 divider"></div>
                    <div class="btn btnClient col s2 m2 l2">Cliente</div>
                    <div class="btn btnEquipment col s2 m2 l2">Equipos</div>
                    <div class="btn btnTask col s2 m2 l2">Tareas</div>
                    <div class="listTriggers col s12 m12 l12"></div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="/assets/js/dashboard.js"></script>
</body>
</html>