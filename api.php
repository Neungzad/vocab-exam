<?php 
header('Access-Control-Allow-Origin: *');  

$action = $_GET['action'];

if ($action == 'getAllVocab') {
	getAllVocab();
}

function connectDB()
{
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "cu_tep";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	$conn->set_charset("utf8");
	
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	return $conn;
}

function getAllVocab()
{
	$resultArray = array();

	$conn = connectDB();

	$sql = "SELECT * FROM vocabulary";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {	  	    
	    while($row = $result->fetch_assoc()) {	    	
	    	$resultArray[] = array(
	    		'id'=>$row['id'],
	    		'name_th'=>$row['name_th'],
	    		'name_eng'=>$row['name_eng']
	    		);
	    }	    
	} 

	echo json_encode($resultArray);
}
