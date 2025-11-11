export default function StatCard({ stat }) {
<<<<<<< HEAD
	return (
		<div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-6">
			<div className="bg-primary-hijauTerang p-4 rounded-lg">
				<stat.icon size={28} className="text-primary-hijauTua" />
			</div>
			<div>
				<p className="text-primary-hijauTua font-bold text-sm">{stat.title}</p>
				<p className="text-3xl font-bold text-primary-hijauTua">{stat.value}</p>
				<p className="text-primary-hijauTua font-bold text-xs mt-1">{stat.subtitle}</p>
			</div>
		</div>
	)
}
=======
  const Icon = stat.icon; // simpan dulu icon-nya (bisa undefined/null)

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-6">
      {/* Render icon hanya jika ada */}
      {Icon && (
        <div className="bg-primary-hijauTerang p-4 rounded-lg">
          <Icon size={28} className="text-primary-hijauTua" />
        </div>
      )}

      <div>
        <p className="text-primary-hijauTua font-bold text-sm">{stat.title}</p>
        <p className="text-3xl font-bold text-primary-hijauTua">{stat.value}</p>
        {stat.subtitle && (
          <p className="text-primary-hijauTua font-bold text-xs mt-1">{stat.subtitle}</p>
        )}
      </div>
    </div>
  );
}
>>>>>>> a15a978d4845461964e5e26b4c0f5d32ce26f2b2
