<?php 
	
	include("settings.php");

	$post = $_POST;

	
	//Create connection
	$conn = new mysqli($db, $username, $password, $dbname);

	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	$fullname = mysqli_real_escape_string($conn, $_POST['fullname']);
	$phone = mysqli_real_escape_string($conn, $_POST['phone']);
	$email = mysqli_real_escape_string($conn, $_POST['email']);
	$serialNo = mysqli_real_escape_string($conn, $_POST['serial']);
	$address1 = mysqli_real_escape_string($conn, $_POST['address']);
	$city = mysqli_real_escape_string($conn, $_POST['city']);
	$state = mysqli_real_escape_string($conn, $_POST['state']);
	$postcode = mysqli_real_escape_string($conn, $_POST['postcode']);
	$country = mysqli_real_escape_string($conn, $_POST['country']);
	$products = mysqli_real_escape_string($conn, $_POST['gifts']);
	$files = mysqli_real_escape_string($conn, $_POST['files']);
	$newsletter = mysqli_real_escape_string($conn, $_POST['newsletter']);
	if($newsletter=="true"){
		$newsletter = "on";
	}
	else{
		$newsletter = "off";
	}
	$created_date = date("Y-m-d");

	

	$sql = "INSERT INTO {$table_name} (fullname, email, phone, serialNo, address1, city, state, postcode, country, products, files, newsletter, created_date) VALUES 
	('{$fullname}', '{$email}', '{$phone}', '{$serialNo}', '{$address1}', '{$city}', '{$state}', '{$postcode}', '{$country}', '{$products}', '{$files}', '{$newsletter}', '{$created_date}')";

	if ($conn->query($sql) === TRUE) {
		$msg = "Hi, \r\n
			There is a new submission. \r\n
			Name: {$fullname} \r\n
			Email: {$email} \r\n
			Phone: {$phone} \r\n
			Serials: {$serialNo} \r\n
			Address: {$address1} \r\n
			City: {$city} \r\n
			State: {$state} \r\n
			Postcode: {$postcode} \r\n
			Country: {$country} \r\n
			Products: {$products} \r\n
			Subscript: {$newsletter} \r\n
			Date: {$created_date} \r\n
		";
		
		// send email
		mail($notify_email,"Bose - Be rewarded for every Lifestyle® system you sell",$msg);
	} else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$conn->close();


	header('Content-type: application/json');
	echo json_encode($post);
?>