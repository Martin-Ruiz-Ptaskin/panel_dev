<?php

include('database.php');

if(isset($_POST['id'])) {
 
  $id = $_POST['id'];
   
  $query="SELECT * FROM comentarios where id = $id ";
$result = mysqli_query($connection, $query);
$row = mysqli_fetch_array($result);



  if (!$result) {
    die('Query Failed.');
    echo "fail";
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'padre' => $row['padre'],
      'txt' => $row['comentario'],
      'id' => $row['id'],
      'fecha' => $row['fecha']

    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
 

}





?>
