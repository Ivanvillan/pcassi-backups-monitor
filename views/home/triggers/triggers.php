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
    <title>Backup Monitor | Registros</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="/assets/css/triggers.css">
</head>
<body>
    <div class="container">
        <!-- ULTIMOS REGISTROS GENERALES -->
        <div class="row row-triggers">
            <a href="#" class="back-init col s1 m1 l1 margin-a" style="margin-top: 30px"><i class="material-icons prefix" style="color: #000 !important;">arrow_back</i></a>
            <h4 class="col s12 m11 l11">LISTA DE REGISTROS</h4>
            <div class="col s12 m5 l5 input-field">
                <input type="text" id="searchLastRegister">
                <label for="searchLastRegister">Buscar...</label>
            </div>
            <div class="col s12 m12 l12">
                <table class="responsive-table highlight lastRegister-table">
                    <thead>
                        <tr>
                            <th>Empresa</th>
                            <th>Equipo</th>
                            <th>Ubicación</th>
                            <th>Tipo</th>
                            <th>Detalle</th>
                            <th>Fecha</th>
                            <th>Intervalo</th>
                            <th>Transcurrido</th>
                            <th>Tarea</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="/assets/js/triggers.js"></script>
</body>
</html>