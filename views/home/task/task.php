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
    <title>Backup Monitor | Tareas</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="/assets/css/task.css">
</head>
<body>
    <div class="btnLogout btn right">Cerrar sesión</div>
    <div class="container">
        <div class="row">
            <a href="#" class="col s1 m1 l1 colArrowBack"><i class="material-icons prefix iconArrowBack">arrow_back</i></a>
            <h4 class="col s4 m4 l4">TAREAS</h4>
            <div class="col s6 m6 l6 colAddTask">
                <a class="btn right btnDownloadApp"><i class="material-icons iconDownloadApp">file_download</i></a>
                <a href="#addTask" class="btn right modal-trigger btnAddTask"><i class="material-icons iconAdd">add</i></a>
            </div>
            <div class="col s12 m12 l12 listTask">
            </div>
        </div>
        <div id="addTask" class="modal">
            <div class="modal-content">
                <div class="row">
                    <h5 class="col s10 m10 l10">NUEVA TAREA</h5>
                    <a class="col s1 m1 l1 right modal-close closeTask"><i class="material-icons iconClose">close</i></a>
                    <div class="col s12 m12 l12 divider"></div>
                    <form id="addTaskForm">
                        <div class="input-field col s12 m6 l6">
                            <input type="text" class="validate" id="name" name="name">
                            <label for="name">Nombre</label>
                        </div>
                        <div class="input-field col s12 m6 l6">
                            <input type="text" id="interval" class="validate" name="interval">
                            <label for="interval">Intervalo de horas</label>
                        </div>
                        <div class="input-field col s12 m6 l6">
                            <select name="" id="type">
                                <option value="" disabled selected>Tipo</option>
                                <option value="3">Incremental</option>
                                <option value="1">Completa</option>
                                <option value="2">Diferencial</option>
                                <option value="4">Tarea Vacía</option>
                            </select>
                        </div>
                        <div class="input-field col s12 m6 l6">
                            <select name="" id="compression">
                                <option value="" disabled selected>Compresion</option>
                                <option value="1">Sin Compresión</option>
                                <option value="2">Zip</option>
                                <option value="3">7Zip</option>
                            </select>
                        </div>
                        <div class="modal-footer col s12 m12 l12 colModalFooter">
                            <a href="#!" class="btn right addTask">Aceptar</a>
                            <div class="preloader-wrapper preloader-addTask hide small right active">
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
        <div id="editTask" class="modal">
            <div class="modal-content">
                <div class="row">
                    <h5 class="col s10 m10 l10">EDITAR TAREA</h5>
                    <a class="col s1 m1 l1 right modal-close closeTask"><i class="material-icons iconClose">close</i></a>
                    <div class="col s12 m12 l12 divider"></div>
                    <form>
                        <div class="input-field col s12 m6 l6">
                            <input type="text" class="validate" id="name" name="editName">
                            <label for="name">Nombre</label>
                        </div>
                        <div class="input-field col s12 m6 l6">
                            <input type="text" id="interval" class="validate" name="editInterval">
                            <label for="interval">Intervalo de horas</label>
                        </div>
                        <div class="input-field col s12 m6 l6">
                            <select name="" id="editType">
                                <option value="" disabled selected>Tipo</option>
                                <option value="3">Incremental</option>
                                <option value="1">Completa</option>
                                <option value="2">Diferencial</option>
                                <option value="4">Tarea Vacía</option>
                            </select>
                        </div>
                        <div class="input-field col s12 m6 l6">
                            <select name="" id="editCompression">
                                <option value="" disabled selected>Compresion</option>
                                <option value="1">Sin Compresión</option>
                                <option value="2">Zip</option>
                                <option value="3">7Zip</option>
                            </select>
                        </div>
                        <div class="modal-footer col s12 m12 l12 colModalFooter">
                            <a href="#!" class="btn right editTask">Aceptar</a>
                            <div class="preloader-wrapper preloader-editTask hide small right active">
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
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.1.0/jszip-utils.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js"></script>
<script>
    user_id = <?php echo json_encode($user_id) ?>;
</script>
<script src="/assets/js/task.js"></script>
</body>
</html>