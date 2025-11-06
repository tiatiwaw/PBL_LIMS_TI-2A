export default function StatCard({ stat }) {
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