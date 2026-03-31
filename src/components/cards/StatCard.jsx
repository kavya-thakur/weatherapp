const StatCard = ({ label, value, icon }) => {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-[2px]">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{label}</p>

        {icon && (
          <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <p className="text-xl font-semibold mt-2 tracking-tight text-gray-900">
        {value}
      </p>
    </div>
  );
};

export default StatCard;
