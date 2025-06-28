import React from "react";

const BatteryIcon = ({ percentage }) => {
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  const color =
    clampedPercentage > 60
      ? "bg-green-500"
      : clampedPercentage > 30
      ? "bg-yellow-400"
      : "bg-red-500";

  return (
    <div className="flex items-center space-x-1">
        <div className="relative w-8 h-4 border border-gray-600 rounded-sm flex items-center mr-2">
            <div
            className={`h-full ${color} transition-all duration-300`}
            style={{ width: `${clampedPercentage}%` }}
            ></div>
            <div className="absolute -right-1 w-0.5 h-2 bg-gray-600 rounded-sm"></div>
        </div>
        <span className="text-xs">{clampedPercentage}%</span>
    </div>
  );
};

export default BatteryIcon;
