<?php

header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata, true);
	
  // Validate.
  if ((int)$request['id'] < 1) {
    return http_response_code(400);
  }
    
  // Sanitize.
  $id = mysqli_real_escape_string($con, (int)$request['id']);
  $nameProd = mysqli_real_escape_string($con, trim($request['nameProd']));
  $descProd = mysqli_real_escape_string($con, trim($request['descProd']));
  $price = mysqli_real_escape_string($con, (int)($request['price']));
  $disccount = mysqli_real_escape_string($con, (int)$request['disccount']);
  $createdOn = mysqli_real_escape_string($con, date("Y-m-d H:i:s", strtotime(str_replace('-', '/', $request['createdOn']))));

  // Update.
  $queryUpdate = "UPDATE products SET nameProd ='$nameProd',descProd ='$descProd',price ='$price',disccount ='$disccount',createdOn ='$createdOn'  WHERE id = '$id' LIMIT 1";

  if(mysqli_query($con, $queryUpdate))
  {
    header('Content-Type: application/json');
    http_response_code(204);
    die();
  }
  else
  {
    return http_response_code(422);
  }  
}