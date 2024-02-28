<?php
    $myFile = "emails.json";
    $fh = fopen($myFile, 'a') or die("can't open file");
    $stringData = $_GET["data"];
    fwrite($fh, $stringData);
    fclose($fh);
?>
