<?php
/**
 * Returns the list of products.
 */
require 'database.php';
    
$products = [];
$queryAllProd = "SELECT * FROM products";

if($result = mysqli_query($con,$queryAllProd))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $products[$i]['id']    = $row['id'];
    $products[$i]['nameProd'] = $row['nameProd'];
    $products[$i]['descProd'] = $row['descProd'];
    $products[$i]['price'] = $row['price'];
    $products[$i]['disccount'] = $row['disccount'];
    $products[$i]['createdOn'] = $row['createdOn'];
    $i++;
  }
    
  echo json_encode($products);
}
else
{
  http_response_code(404);
}