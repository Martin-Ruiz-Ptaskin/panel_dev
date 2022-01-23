<?php 
session_start();

$Ses = $_POST['seesion'];

$_SESSION["usuario"]=$Ses;

echo $_SESSION["usuario"];

?>