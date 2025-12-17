<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Laporan Hasil Uji</title>
    <style>
        body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 12px;
            margin: 25px;
            line-height: 1.4;
        }

        h1, h2, h3 {
            text-align: center;
            margin-bottom: 5px;
            margin-top: 10px;
        }

        h1 {
            font-size: 16px;
            font-weight: bold;
        }

        h2 {
            font-size: 12px;
            font-weight: bold;
        }

        h3 {
            font-size: 13px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            margin-bottom: 30px;
        }

        th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
            font-size: 11px;
        }

        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }

        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }

        .header-top {
            display: table;
            width: 100%;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 3px solid #000;
        }

        .header-left {
            display: table-cell;
            width: 80px;
            vertical-align: middle;
        }

        .header-center {
            display: table-cell;
            text-align: center;
            vertical-align: middle;
            padding: 0 15px;
        }

        .header-right {
            display: table-cell;
            width: 80px;
            text-align: center;
            vertical-align: middle;
        }

        .logo-img {
            width: 75px;
            height: 75px;
        }

        .icon-circle {
            width: 70px;
            height: 70px;
            background-color: #0f5e6e;
            border-radius: 50%;
            display: inline-block;
            text-align: center;
            line-height: 70px;
            color: white;
            font-size: 24px;
        }

        .header-info {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 5px;
        }

        .company-name {
            font-size: 18px;
            font-weight: bold;
            margin: 0;
        }

        .company-subtitle {
            font-size: 12px;
            font-weight: bold;
            margin: 3px 0;
        }

        .company-address {
            font-size: 9px;
            margin: 2px 0;
            line-height: 1.3;
        }

        .company-email {
            font-size: 9px;
            margin: 2px 0;
        }

        .signature-box {
            min-height: 80px;
            border-bottom: 1px solid #000;
            margin-bottom: 5px;
        }
    </style>
</head>

<body>

    {{-- Header Kop Surat --}}
    <div class="header-top">
        <div class="header-left">
            <img src="{{ public_path('polines.jpeg') }}" class="logo-img" alt="Logo Polines">
        </div>
        
        <div class="header-center">
            <p class="company-name">LABOO</p>
            <p class="company-subtitle">LABORATORY ASSISTANT BASED ONLINE OPERATION</p>
            <p class="company-address">Jl. Prof. Soedarto, Tembalang, Kec. Tembalang, Kota Semarang, Jawa Tengah 50275</p>
            <p class="company-email">Email: fiacode.202428@gmail.com</p>
        </div>
        
        <div class="header-right">
            <img src="{{ public_path('laboo.jpeg') }}" style="width: 70px; height: 70px; border-radius: 50%;" alt="Icon Laboo">
        </div>
    </div>

    {{-- Judul Laporan --}}
    <div class="header-info">
        <h1>LAPORAN HASIL UJI</h1>
        <h3>ORDER-{{ $order->order_number }}</h3>
    </div>

    {{-- Informasi Klien --}}
    <table style="margin-top: 15px; margin-bottom: 25px; border: none;">
        <tr style="border: none;">
            <td style="border: none; width: 25%;"><strong>Nama klien</strong></td>
            <td style="border: none; width: 2%;">:</td>
            <td style="border: none;">{{ $order->clients?->name ?? '-' }}</td>
        </tr>
        <tr style="border: none;">
            <td style="border: none;"><strong>Alamat</strong></td>
            <td style="border: none;">:</td>
            <td style="border: none;">{{ $order->clients?->address ?? '-' }}</td>
        </tr>
    </table>

    {{-- Data Sampel dan Parameter --}}
    @foreach ($data as $sample)
        <h3>Sampel: {{ $sample['sample'] }}</h3>

        <table>
            <thead>
                <tr>
                    <th style="width: 5%;">No</th>
                    <th style="width: 35%;">Nama Parameter</th>
                    <th style="width: 15%; text-align: center;">Hasil</th>
                    <th style="width: 25%;">Baku Mutu</th>
                    <th style="width: 20%;">Satuan</th>
                    <th style="width: 25%;">Standar Acuan</th>
                </tr>
            </thead>
            <tbody>
                @php $no = 1; @endphp
                @foreach ($sample['parameters'] as $param)
                    <tr>
                        <td class="text-center">{{ $no++ }}</td>
                        <td>{{ $param['parameter_name'] }}</td>
                        <td class="text-center">{{ $param['result'] }}</td>
                        <td>{{ $param['quality'] }}</td>
                        <td>{{ $param['unit'] }}</td>
                        <td>{{ $param['reference'] }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endforeach

    {{-- Pengesahan --}}
    <div style="margin-top: 60px;">
        <p style="margin: 0; margin-bottom: 30px;"><strong>Pengesahan Laporan:</strong></p>

        <table style="border: none; width: 100%; margin-top: 30px;">
            <tr style="border: none;">
                <td style="border: none; width: 50%; text-align: center; vertical-align: top;">
                    <div class="signature-box">
                        @if($supervisor && $supervisor->signature)
                            <img src="{{ $supervisor->signature }}" style="max-width: 100px; max-height: 60px;" alt="Signature"/>
                        @endif
                    </div>
                    <p style="margin: 0; font-weight: bold; font-size: 11px;">Supervisor Laboratorium</p>
                    @if($supervisor)
                        <p style="margin: 0; font-size: 10px; color: #666;">{{ $supervisor->name }}</p>
                        <p style="margin: 0; font-size: 10px; color: #999;">{{ $supervisorDate->format('d/m/Y') }}</p>
                    @endif
                </td>
                <td style="border: none; width: 50%; text-align: center; vertical-align: top;">
                    <div class="signature-box">
                        @if($manager && $manager->signature)
                            <img src="{{ $manager->signature }}" style="max-width: 100px; max-height: 60px;" alt="Signature"/>
                        @endif
                    </div>
                    <p style="margin: 0; font-weight: bold; font-size: 11px;">Manager Laboratorium</p>
                    @if($manager)
                        <p style="margin: 0; font-size: 10px; color: #666;">{{ $manager->name }}</p>
                        <p style="margin: 0; font-size: 10px; color: #999;">{{ $managerDate->format('d/m/Y') }}</p>
                    @endif
                </td>
            </tr>
        </table>
    </div>

</body>
</html>