<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $source = $_POST['source'];
    $message = $_POST['message'];

    if (isset($email) && $email != "") {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            if($source == "Other") $source = $_POST['source-other'];
            // Setup email
            $receiving_email_address = "ntsoeleoff@gmail.com";
            // $body = "You have received an e-mail from ".$name."<".$email.">: \r\n".$message;
            $body = "
                <html>
                <head>
                <title>".$subject."</title>
                </head>
                <body>
                <table>
                <tr>
                <th>Name</th>
                <th>".$name."</th>
                </tr>
                <tr>
                <td>Email</td>
                <td>".$email."</td>
                </tr>
                <tr>
                <td>Subject</td>
                <td>".$subject."</td>
                </tr>
                <tr>
                <td>Email</td>
                <td>".$source."</td>
                </tr>
                <tr>
                <td>Email</td>
                <td>".$message."</td>
                </tr>
                </table>
                </body>
                </html>
            ";

            // Always set content-type when sending HTML email
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

            $headers .= 'From: AfroPumps Web Form' . "\r\n";
            $headers .= 'Cc: sandra.ntsoele@pm.me' . "\r\n";


            if(mail($receiving_email_address, $subject, $body, $headers)){
                header("Location: ../");
            }

        }
    }

?>
