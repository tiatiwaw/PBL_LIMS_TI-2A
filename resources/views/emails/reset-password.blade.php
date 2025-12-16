<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password - LIMS Laboo</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 0;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .header {
            background-color: #024D60;
            padding: 50px 30px;
            text-align: center;
            color: white;
        }

        .header h1 {
            font-size: 32px;
            font-weight: 700;
            margin: 0;
            letter-spacing: -0.5px;
        }

        .header p {
            font-size: 14px;
            opacity: 0.9;
            margin: 8px 0 0 0;
            font-weight: 400;
        }

        .content {
            padding: 40px 30px;
        }

        .greeting {
            font-size: 16px;
            color: #024D60;
            font-weight: 600;
            margin-bottom: 20px;
        }

        .message {
            font-size: 15px;
            color: #555;
            line-height: 1.7;
            margin-bottom: 30px;
        }

        .cta-section {
            text-align: center;
            margin: 35px 0;
        }

        .cta-button {
            display: inline-block;
            background-color: #2CACAD;
            color: #ffffff;
            padding: 13px 45px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 600;
            font-size: 16px;
            border: none;
            cursor: pointer;
        }

        .cta-button:hover {
            background-color: #1f9fa0;
        }

        .info-box {
            background-color: #F0FFFC;
            border-left: 4px solid #2CACAD;
            padding: 18px;
            margin: 30px 0;
            border-radius: 0;
            font-size: 14px;
            color: #024D60;
        }

        .info-box strong {
            display: inline;
            font-weight: 600;
        }

        .copy-link {
            background-color: #f5f5f5;
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 0;
            margin: 25px 0;
            word-break: break-all;
            font-size: 12px;
            color: #666;
            font-family: 'Courier New', monospace;
            line-height: 1.5;
        }

        .section-title {
            font-size: 14px;
            color: #666;
            text-align: center;
            margin-bottom: 12px;
            font-weight: 500;
        }

        .divider {
            height: 1px;
            background-color: #ddd;
            margin: 30px 0;
        }

        .warning {
            font-size: 13px;
            color: #024D60;
            margin-top: 25px;
            padding: 15px;
            background-color: #F0FFFC;
            border-radius: 0;
            border-left: 4px solid #024D60;
        }

        .warning strong {
            font-weight: 600;
            display: inline;
        }

        .footer {
            background-color: #f9f9f9;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #ddd;
        }

        .footer-text {
            font-size: 13px;
            color: #777;
            margin: 8px 0;
            line-height: 1.6;
        }

        .footer-text strong {
            color: #024D60;
            font-weight: 600;
        }

        .footer-text a {
            color: #2CACAD;
            text-decoration: none;
        }

        .footer-text a:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>Reset Password</h1>
            <p>Perbarui password akun Anda</p>
        </div>

        <!-- Content -->
        <div class="content">
            <p class="greeting">Halo,</p>

            <p class="message">
                Kami menerima permintaan untuk mereset password akun Anda. Klik tombol di bawah untuk membuat password
                yang baru.
            </p>

            <!-- CTA Button -->
            <div class="cta-section">
                <a href="{{ $resetUrl }}" class="cta-button">Reset Password</a>
            </div>

            <!-- Info Box -->
            <div class="info-box">
                <strong>Catatan Penting:</strong> Link reset password ini berlaku selama 60 menit. Jika sudah
                kadaluarsa, Anda dapat meminta link baru.
            </div>

            <!-- Copy Link Alternative -->
            <p class="section-title">Atau copy dan paste link ini ke browser Anda:</p>
            <div class="copy-link">{{ $resetUrl }}</div>

            <div class="divider"></div>

            <!-- Security Warning -->
            <div class="warning">
                <strong>Keamanan Akun:</strong> Jika Anda tidak melakukan permintaan reset password, abaikan email ini.
                Akun Anda aman karena kami memerlukan konfirmasi dari email yang terdaftar.
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p class="footer-text">
                <strong>LIMS Laboo</strong><br>
                Laboratory Information Management System
            </p>
            <p class="footer-text">
                © 2025 LIMS Laboo. Semua hak dilindungi.
            </p>
            <p class="footer-text" style="margin-top: 20px; font-size: 12px; color: #999;">
                Email ini dikirim ke: <strong>{{ $email }}</strong>
            </p>
        </div>
    </div>
</body>

</html>