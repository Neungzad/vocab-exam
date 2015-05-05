<?php 

/**
*  Connect Database
*/
class Database 
{	
	const SERVER_NAME = "localhost";
	const USER_NAME = "root";
	const PASSWORD = "root";
	const DB_NAME = "cu_tep";

	function __construct() {}

	public static function connect()
	{
		$servername = Database::SERVER_NAME;
		$username = Database::USER_NAME;
		$password = Database::PASSWORD;
		$dbname = Database::DB_NAME;

		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		$conn->set_charset("utf8");
		
		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		} 

		return $conn;
	}
}

?>