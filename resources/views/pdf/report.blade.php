<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Laporan Hasil Uji</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            margin: 25px;
            line-height: 1.4;
        }

        h1,
        h2,
        h3 {
            text-align: center;
            margin-bottom: 5px;
            margin-top: 10px;
        }

        h1 {
            font-size: 16px;
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

        th,
        td {
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

        .signature {
            margin-top: 80px;
            text-align: right;
        }

        .header-info {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
        }

        .date {
            text-align: center;
            font-size: 11px;
            color: #666;
            margin-bottom: 15px;
        }

        .notes {
            margin-top: 15px;
            padding: 10px;
            background-color: #f9f9f9;
            border-left: 3px solid #333;
            font-size: 11px;
        }
    </style>
</head>

<body>

    <div class="header-info">
        <h1>LAPORAN HASIL UJI</h1>
        <h3>ORDER-{{ $order->order_number }}</h3>
    </div>

    <p class="date">Tanggal: {{ \Carbon\Carbon::now()->format('d F Y') }}</p>

    <table style="margin-top: 5px; margin-bottom: 15px; border: none;">
        <tr style="border: none;">
            <td style="border: none; width: 30%;"><strong>Nama Klien:</strong></td>
            <td style="border: none;">{{ $order->clients?->name ?? '-' }}</td>
        </tr>
        <tr style="border: none;">
            <td style="border: none;"><strong>Alamat:</strong></td>
            <td style="border: none;">{{ $order->clients?->address ?? '-' }}</td>
        </tr>
    </table>

    @foreach ($data as $sample)
        <h3>Sampel: {{ $sample['sample'] }}</h3>

        <table>
            <thead>
                <tr>
                    <th style="width: 3%;">No</th>
                    <th style="width: 20%;">Nama Parameter</th>
                    <th style="width: 8%; text-align: center;">Satuan</th>
                    <th style="width: 10%; text-align: center;">Standar Maksimal</th>
                    <th style="width: 10%; text-align: center;">Hasil</th>
                    <th style="width: 12%; text-align: center;">Standar Minimal</th>
                    <th style="width: 12%; text-align: center;">Baku Mutu</th>
                    <th style="width: 12%; text-align: center;">Standar Acuan</th>
                    <th style="width: 13%;">Keterangan</th>
                </tr>
            </thead>
            <tbody>
                @php $no = 1; @endphp
                @foreach ($sample['parameters'] as $param)
                    <tr>
                        <td class="text-center">{{ $no++ }}</td>
                        <td>{{ $param['parameter_name'] }}</td>
                        <td class="text-center">{{ $param['unit'] }}</td>
                        <td class="text-center">{{ $param['quality_max'] }}</td>
                        <td class="text-center">{{ $param['result'] }}</td>
                        <td class="text-center">{{ $param['detection_limit'] }}</td>
                        <td class="text-center">{{ $param['quality_standard'] }}</td>
                        <td class="text-center">{{ $param['reference'] }}</td>
                        <td>{{ $param['keterangan'] }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endforeach

    <div style="margin-top: 60px;">
        <p style="margin: 0; margin-bottom: 30px;"><strong>Pengesahan Laporan:</strong></p>

        <table style="border: none; width: 100%; margin-top: 30px;">
            <tr style="border: none;">
                <td style="border: none; width: 50%; text-align: center; vertical-align: top;">
                    <div style="min-height: 120px; border-bottom: 1px solid #000; margin-bottom: 5px;">
                        @if($supervisor && $supervisor->signature)
                            <img src="data:image/png;base64,{{ base64_encode(file_get_contents(storage_path('app/public/' . $supervisor->signature))) }}" style="max-width: 150px; max-height: 100px;" />
                        @endif
                    </div>
                    <p style="margin: 0; font-weight: bold; font-size: 11px;">Supervisor Laboratorium</p>
                    @if($supervisor)
                        <p style="margin: 0; font-size: 10px; color: #666;">{{ $supervisor->name }}</p>
                        <p style="margin: 0; font-size: 10px; color: #999;">{{ $supervisorDate->format('d/m/Y') }}</p>
                    @endif
                </td>
                <td style="border: none; width: 50%; text-align: center; vertical-align: top;">
                    <div style="min-height: 120px; border-bottom: 1px solid #000; margin-bottom: 5px;">
                        @if($manager && $manager->signature)
                            <img src="data:image/png;base64,{{ base64_encode(file_get_contents(storage_path('app/public/' . $manager->signature))) }}" style="max-width: 150px; max-height: 100px;" />
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