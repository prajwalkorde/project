<?php
    // Check if form data exists
    if (isset($_POST['uname'], $_POST['email'], $_POST['phnum'], $_POST['pass'])) {
        $uname = $_POST['uname'];
        $email = $_POST['email'];
        $phnum = $_POST['phnum'];
        $pass = $_POST['pass'];

        // DB connection
        $conn = new mysqli('localhost', 'root', '', 'userData');

        // Check DB connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } else {
            // Prepare the SQL statement
            $stmt = $conn->prepare("INSERT INTO registration (uname, email, phnum, pass) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssis", $uname, $email, $phnum, $pass);
            $stmt->execute();

            // Return success message
            echo "Registration Successful.";
            $stmt->close();
            $conn->close();
        }
    } else {
        echo "Error: Form data not properly submitted.";
    }
?>
