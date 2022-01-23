<?php
session_start();
  include('database.php');

if(isset($_POST['name'])) {
  # echo $_POST['name'] . ', ' . $_POST['description'];
  $task_name = $_POST['name'];
  $task_modulo = $_POST['modulo'];
  $persona = $_SESSION["usuario"];

  $task_description = $_POST['description'];
$hoy = date("j, n, Y");
  $query = "INSERT into task(name, description,estado,fecha,modulo,viendo) VALUES ('$task_name', '$task_description', 'Nosotros', '$hoy', '$task_modulo','$persona')";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }

  echo "Task Added Successfully";  

}

?>
