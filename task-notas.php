<?php

include('database.php');

if(isset($_POST['actual'])) {
 if($_POST['txt'] != "") {
  $id = $_POST['actual'];
   $txt = $_POST['txt'];
   $persona = $_POST['persona'];
$hoy = date("m.d.y");




 $insert= "INSERT into comentarios (id,padre,comentario,fecha) values ('.$id.','.$persona.','.$txt.','$hoy') ";
$result3 = mysqli_query($connection, $insert);

  if (!$result3) {
    die('Query Failed.');
    echo "fail";
  }
  else{
      echo "yes";  

  }

}

if(isset($_POST['select'])  ) {
  $id = $_POST['actual'];

   $sel = $_POST['select'];
  $query="SELECT * FROM task where id = $id ";
$result = mysqli_query($connection, $query);
$row=mysqli_fetch_array($result);




 $insert= "UPDATE  `task` SET   `estado`='$sel'  where id=$id";
$result3 = mysqli_query($connection, $insert);

  if (!$result3) {
    die('Query Failed.');
    echo "fail";
  }
  else{
      echo "yess";  

  }

}


}

?>
