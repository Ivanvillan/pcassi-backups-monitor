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
    <title>Backup Monitor | Inicio</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="/assets/css/index.css">
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col s12 m12 l12 center-align imageTop">
                <img class="responsive-img" width="400" height="250" src="/assets/img/r0bab.png"> 
            </div>
            <div class="col s12 m12 l12 center-align firstButton">
                <a href="#" class="btn clients">Clientes</a>
            </div>
            <div class="col s12 m12 l12 center-align secondButton">
                <a href="#" class="btn dashboard">Dashboard</a>
            </div>
            <div class="col s12 m12 l12 center-align imageBottom">
                <img class="responsive-img" width="150" height="120" src="/assets/img/mark-b.png">
            </div>
        </div>
    </div>
    <div class="btnLogout btn right">Cerrar sesión</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script>
    var user_id = <?php echo json_encode($user_id) ?>;
</script>
<script src="/assets/js/index.js"></script>
</body>
</html>