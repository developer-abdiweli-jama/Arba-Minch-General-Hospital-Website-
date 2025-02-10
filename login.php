<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

echo "Script started.<br>"; // Debugging statement

// Database connection
$host = 'localhost';
$port = 3304;
$dbname = 'hospital_db';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Database connected.<br>"; // Debugging statement
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "Form submitted.<br>"; // Debugging statement

    $email = $_POST['email']; // Use email instead of username
    $password = $_POST['password'];

    // Fetch user from database
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        echo "Login successful.<br>"; // Debugging statement
        // Login successful, start session
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role'];

        // Redirect based on role
        if ($user['role'] === 'admin') {
            header("Location: ../front-end/admin_dashboard.html");
        } else {
            header("Location: ../front-end/index.html");
        }
        exit();
    } else {
    
        // Invalid credentials
        echo "<script>
         window.location.href='../front-end/index.html';
         
         </script>";
    }
} else {
    echo "No form submission.<br>"; // Debugging statement
}
?>