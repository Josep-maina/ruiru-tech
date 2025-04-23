<?php
require_once 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Match form names exactly
    $full_name         = htmlspecialchars($_POST['fullname'] ?? '');
    $email             = htmlspecialchars($_POST['email'] ?? '');
    $id_number         = htmlspecialchars($_POST['id_number'] ?? '');
    $phone_number      = htmlspecialchars($_POST['phone'] ?? '');
    $course_interest   = htmlspecialchars($_POST['course'] ?? '');
    $kcse_mean_grade   = htmlspecialchars($_POST['kcse_grade'] ?? '');
    $date_of_birth     = htmlspecialchars($_POST['dob'] ?? '');
    $gender            = htmlspecialchars($_POST['gender'] ?? '');
    $nationality       = htmlspecialchars($_POST['nationality'] ?? '');
    $preferred_contact = htmlspecialchars($_POST['communication_method'] ?? '');
    $address           = htmlspecialchars($_POST['address'] ?? '');
    $parent_name       = htmlspecialchars($_POST['guardian_name'] ?? '');
    $parent_phone      = htmlspecialchars($_POST['guardian_phone'] ?? '');
    $emergency_contact = htmlspecialchars($_POST['emergency_contact'] ?? '');

    // Prepare SQL insert statement
    $stmt = $conn->prepare("INSERT INTO admissions (
        full_name, email, id_number, phone_number, course_interest, kcse_mean_grade,
        date_of_birth, gender, nationality, preferred_contact, address,
        parent_name, parent_phone, emergency_contact
    ) VALUES (
        :full_name, :email, :id_number, :phone_number, :course_interest, :kcse_mean_grade,
        :date_of_birth, :gender, :nationality, :preferred_contact, :address,
        :parent_name, :parent_phone, :emergency_contact
    )");

    try {
        $stmt->execute([
            ':full_name'         => $full_name,
            ':email'             => $email,
            ':id_number'         => $id_number,
            ':phone_number'      => $phone_number,
            ':course_interest'   => $course_interest,
            ':kcse_mean_grade'   => $kcse_mean_grade,
            ':date_of_birth'     => $date_of_birth,
            ':gender'            => $gender,
            ':nationality'       => $nationality,
            ':preferred_contact' => $preferred_contact,
            ':address'           => $address,
            ':parent_name'       => $parent_name,
            ':parent_phone'      => $parent_phone,
            ':emergency_contact' => $emergency_contact
        ]);

        // Success HTML
        echo "<!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Admission Success</title>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 50px; text-align: center; }
                .success-box { background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); display: inline-block; }
                .success-box h2 { color: #4CAF50; }
                .success-box p { font-size: 18px; }
            </style>
        </head>
        <body>
            <div class='success-box'>
                <h2>Application Submitted Successfully!</h2>
                <p>Thank you for applying, <strong>" . $full_name . "</strong>.</p>
                <p>We will contact you soon via your preferred method: <strong>" . $preferred_contact . "</strong>.</p>
            </div>
        </body>
        </html>";

    } catch (PDOException $e) {
        echo "Error saving data: " . $e->getMessage();
    }
} else {
    echo "Invalid request method.";
}
?>
