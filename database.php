<?php

$connection = mysqli_connect(
  'localhost', 'root', '', 'taskdev'
);

// for testing connection
#if($connection) {
#  echo 'database is connected';
#}

?>
