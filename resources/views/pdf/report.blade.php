<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Laporan Hasil Uji</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; margin: 25px; }
        h1, h2, h3 { text-align: center; margin-bottom: 5px; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 40px; }
        th, td { border: 1px solid #000; padding: 6px; text-align: left; }
        th { background-color: #f2f2f2; }
        .text-center { text-align: center; }
        .signature { margin-top: 60px; text-align: right; }
    </style>
</head>
<body>

    <h1>LAPORAN HASIL UJI</h1>
    <h3>ORDER-{{ $order->order_number }}</h3>
    <p style="text-align:center;">Tanggal: {{ \Carbon\Carbon::now()->format('d F Y') }}</p>

    @foreach ($data as $sample)
        <h3>Nama Sampel: {{ $sample['sample'] }}</h3>

        <table>
            <thead>
                <tr>
                    <th style="width: 5%;">No</th>
                    <th style="width: 40%;">Nama Parameter</th>
                    <th style="width: 15%;">Hasil</th>
                    <th style="width: 20%;">Satuan</th>
                    <th style="width: 20%;">Standar Acuan</th>
                </tr>
            </thead>
            <tbody>
                @php $no = 1; @endphp
                @foreach ($sample['parameters'] as $param)
                    <tr>
                        <td class="text-center">{{ $no++ }}</td>
                        <td>{{ $param['parameter_name'] }}</td>
                        <td class="text-center">{{ $param['result'] }}</td>
                        <td>{{ $param['unit'] }}</td>
                        <td>{{ $param['reference'] }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endforeach

    <div class="signature">
        <p>Mengetahui,</p>
        <br><br><br>
        <p><strong>Analis Laboratorium</strong></p>
    </div>

</body>
</html>
