<?php

header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require 'database.php';
// Get the posted data.

$postdata = file_get_contents("php://input");

if ($postdata) {
      $request = json_decode($postdata, true);
    // Sanitize.
    $nameProd = mysqli_real_escape_string($con, trim($request['nameProd']));
    $descProd = mysqli_real_escape_string($con, trim($request['descProd']));
    $price = mysqli_real_escape_string($con, (int)$request['price']);
    $disccount = mysqli_real_escape_string($con, (int)$request['disccount']);
    $createdOn = mysqli_real_escape_string($con, date("Y-m-d H:i:s", strtotime(str_replace('-', '/', $request['createdOn']))));

    echo $createdOn;
    $queryProd = "INSERT INTO products(nameProd,descProd,price,disccount,createdOn) 
    VALUES ('$nameProd','$descProd',$price,$disccount,'$createdOn')";

    if (mysqli_query($con,$queryProd)) {
        echo http_response_code(201);
        $product = [
            'nameProd' => $nameProd,
            'descProd' => $descProd,
            'price' => $price,
            'disccount' => $disccount,
            'createdOn' => $createdOn,
            'id' => mysqli_insert_id($con)
        ];
        header('Content-Type: application/json');
        echo json_encode($product);
        die();
    } else {
        echo "Error: " . $queryProd . "<br>" . $con->error;
    }
}

?>