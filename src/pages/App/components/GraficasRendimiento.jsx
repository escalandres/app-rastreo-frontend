import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function EnergyConsumptionChart() {
  const data = [
    { interval: '10 min', hours: 26, days: 1.08, label: '24-28h' },
    { interval: '15 min', hours: 41, days: 1.71, label: '40-42h' },
    { interval: '20 min', hours: 52, days: 2.17, label: '48-56h' },
    { interval: '30 min', hours: 78, days: 3.25, label: '72-84h' },
    { interval: '1 hora', hours: 156, days: 6.5, label: '6-7 días' },
    { interval: '2 horas', hours: 312, days: 13, label: '12-14 días' },
    { interval: '3 horas', hours: 468, days: 19.5, label: '18-21 días' }
  ];

  const [viewMode, setViewMode] = React.useState('days');
  const [chartType, setChartType] = React.useState('line');

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold text-gray-800">{payload[0].payload.interval}</p>
          <p className="text-blue-600">Autonomía: {payload[0].payload.label}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Consumo Energético del Rastreador
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Autonomía estimada con Modo de Ahorro activado
        </p>

        {/* Controles */}
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setChartType('line')}
              className={`px-4 py-2 rounded transition-all ${
                chartType === 'line'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Línea
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-4 py-2 rounded transition-all ${
                chartType === 'bar'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Barras
            </button>
          </div>

          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('hours')}
              className={`px-4 py-2 rounded transition-all ${
                viewMode === 'hours'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Horas
            </button>
            <button
              onClick={() => setViewMode('days')}
              className={`px-4 py-2 rounded transition-all ${
                viewMode === 'days'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Días
            </button>
          </div>
        </div>

        {/* Gráfica */}
        <ResponsiveContainer width="100%" height={400}>
          {chartType === 'line' ? (
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="interval" 
                stroke="#666"
                style={{ fontSize: '14px', fontWeight: '500' }}
              />
              <YAxis 
                stroke="#666"
                style={{ fontSize: '14px' }}
                label={{ 
                  value: viewMode === 'days' ? 'Días' : 'Horas', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fontSize: '14px', fontWeight: '600' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px', fontSize: '14px' }}
              />
              <Line
                type="monotone"
                dataKey={viewMode}
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 6 }}
                activeDot={{ r: 8 }}
                name={viewMode === 'days' ? 'Autonomía (días)' : 'Autonomía (horas)'}
              />
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="interval" 
                stroke="#666"
                style={{ fontSize: '14px', fontWeight: '500' }}
              />
              <YAxis 
                stroke="#666"
                style={{ fontSize: '14px' }}
                label={{ 
                  value: viewMode === 'days' ? 'Días' : 'Horas', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fontSize: '14px', fontWeight: '600' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px', fontSize: '14px' }}
              />
              <Bar
                dataKey={viewMode}
                fill="#3b82f6"
                name={viewMode === 'days' ? 'Autonomía (días)' : 'Autonomía (horas)'}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>

        {/* Tabla de datos */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Intervalo de Rastreo</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Autonomía Estimada</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{row.interval}</td>
                  <td className="px-4 py-3 text-right text-gray-700">{row.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Nota informativa */}
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Nota:</span> Los valores mostrados son estimaciones basadas en el consumo 
            promedio del dispositivo con el Modo de Ahorro activado. La autonomía real puede variar según las 
            condiciones de uso y la calidad de la señal.
          </p>
        </div>
      </div>
    </div>
  );
}