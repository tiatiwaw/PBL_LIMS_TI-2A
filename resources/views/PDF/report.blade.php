<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Laporan Hasil Uji</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            margin: 25px;
        }
        h1, h2, h3 {
            text-align: center;
            margin-bottom: 5px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        th, td {
            border: 1px solid #000;
            padding: 6px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .text-center {
            text-align: center;
        }
        .signature {
            margin-top: 60px;
            text-align: right;
        }
    </style>
</head>
<body>

    {{-- Header --}}
    <h1>LAPORAN HASIL UJI</h1>
    <h3>Nomor Order: {{ $order->id }}</h3>
    <p style="text-align:center;">Tanggal: {{ \Carbon\Carbon::now()->format('d F Y') }}</p>

    {{-- Tabel hasil uji --}}
    <table>
        <thead>
            <tr>
                <th style="width: 5%;">No</th>
                <th style="width: 25%;">Nama Parameter</th>
                <th style="width: 25%;">Nama Sampel</th>
                <th style="width: 15%;">Hasil</th>
                <th style="width: 15%;">Satuan</th>
                <th style="width: 15%;">Standar Acuan</th>
            </tr>
        </thead>
        <tbody>
            @php $no = 1; @endphp
            @foreach ($data as $sample)
                @foreach ($sample['parameters'] as $param)
                    <tr>
                        <td class="text-center">{{ $no++ }}</td>
                        <td>{{ $param['parameter_name'] }}</td>
                        <td>{{ $sample['sample'] }}</td>
                        <td class="text-center">{{ $param['result'] }}</td>
                        <td>{{ $param['unit'] }}</td>
                        <td>{{ $param['reference'] }}</td>
                    </tr>
                @endforeach
            @endforeach
        </tbody>
    </table>

    {{-- Tanda tangan --}}
    <div class="signature">
        <p>Mengetahui,</p>
        <br><br><br>
        <p><strong>Analis Laboratorium</strong></p>
    </div>

</body>
</html>
