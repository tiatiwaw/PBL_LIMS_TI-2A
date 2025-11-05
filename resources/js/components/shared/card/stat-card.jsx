export default function StatCard({ stat }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-6">
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
