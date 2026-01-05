import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Book, MessageSquare, Zap, Info, ChevronDown, ChevronUp, Home } from 'lucide-react';

export default function TrackerManual() {
  const [activeSection, setActiveSection] = useState('battery');
  const [expandedCommand, setExpandedCommand] = useState(null);

  // Datos de autonomía
  const batteryData = [
    { interval: '10 min', hours: 26, days: 1.08, label: '24-28h' },
    { interval: '15 min', hours: 41, days: 1.71, label: '40-42h' },
    { interval: '20 min', hours: 52, days: 2.17, label: '48-56h' },
    { interval: '30 min', hours: 78, days: 3.25, label: '72-84h' },
    { interval: '1 hora', hours: 156, days: 6.5, label: '6-7 días' },
    { interval: '2 horas', hours: 312, days: 13, label: '12-14 días' },
    { interval: '3 horas', hours: 468, days: 19.5, label: '18-21 días' }
  ];

  // Comandos SMS
  const smsCommands = [
    {
      id: 1,
      command: 'INTERVALO#MINUTOS',
      description: 'Configura el intervalo de envío de datos GPS',
      values: '5-180 minutos',
      example: 'INTERVALO#15',
      details: 'Define cada cuántos minutos el rastreador enviará su posición al servidor. Valores más bajos consumen más batería.'
    },
    {
      id: 2,
      command: 'SETNUM',
      description: 'Configura un numero de teléfono para recibir notificaciones',
      values: 'Número de teléfono',
      example: 'SETNUM#5512345678',
      details: 'Define un número de teléfono autorizado para enviar comandos al rastreador.'
    },
    {
      id: 3,
      command: 'SERVIDOR#IP#PUERTO',
      description: 'Configura el servidor de destino',
      values: 'IP: dirección IPv4, Puerto: 1-65535',
      example: 'SERVIDOR#192.168.1.100#5000',
      details: 'Define la dirección del servidor donde se enviarán los datos de posición.'
    },
    {
      id: 4,
      command: 'MODO#TIPO',
      description: 'Cambia el modo de operación',
      values: 'NORMAL, AHORRO, CONTINUO',
      example: 'MODO#AHORRO',
      details: 'NORMAL: balance entre precisión y consumo. AHORRO: menor consumo de batería. CONTINUO: máxima frecuencia de actualización.'
    },
    {
      id: 5,
      command: 'UBICACION',
      description: 'Solicita la ubicación actual',
      values: 'Sin parámetros',
      example: 'UBICACION',
      details: 'El rastreador responde inmediatamente con su posición GPS actual vía SMS.'
    },
    {
      id: 6,
      command: 'BATERIA',
      description: 'Consulta el nivel de batería',
      values: 'Sin parámetros',
      example: 'BATERIA',
      details: 'Responde con el porcentaje de batería restante.'
    },
    {
      id: 7,
      command: 'RESET',
      description: 'Reinicia el dispositivo',
      values: 'Sin parámetros',
      example: 'RESET',
      details: 'Reinicia el rastreador. Útil para resolver problemas de conectividad.'
    },
    {
      id: 8,
      command: 'STATUS',
      description: 'Obtiene el estado completo del dispositivo',
      values: 'Sin parámetros',
      example: 'STATUS',
      details: 'Responde con información completa: batería, señal GPS, señal celular, modo de operación, etc.'
    }
  ];

  const sections = [
    { id: 'battery', name: 'Autonomía de Batería', icon: Zap },
    { id: 'commands', name: 'Comandos SMS', icon: MessageSquare },
    { id: 'info', name: 'Información Adicional', icon: Info }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Book size={40} />
              <h1 className="text-4xl font-bold">Manual de Usuario</h1>
            </div>
            <a
              href="/app"
              className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors shadow-lg font-semibold"
            >
              <Home size={20} />
              Inicio
            </a>
          </div>
          <p className="text-blue-100 text-lg">
            Guía completa para el uso y configuración del rastreador GPS
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-2 overflow-x-auto py-4">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg whitespace-nowrap transition-all ${
                    activeSection === section.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={20} />
                  {section.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Sección: Autonomía de Batería */}
        {activeSection === 'battery' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Consumo Energético y Autonomía
            </h2>
            
            <div className="mb-8">
              <p className="text-gray-700 mb-4">
                La autonomía del rastreador varía significativamente según el intervalo de rastreo configurado. 
                A continuación se muestra la relación entre la frecuencia de actualización y la duración de la batería:
              </p>
            </div>

            {/* Gráfica */}
            <div className="mb-8">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={batteryData}>
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
                      value: 'Días de autonomía', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fontSize: '14px', fontWeight: '600' }
                    }}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
                            <p className="font-semibold text-gray-800">{payload[0].payload.interval}</p>
                            <p className="text-blue-600">Autonomía: {payload[0].payload.label}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '14px' }} />
                  <Line
                    type="monotone"
                    dataKey="days"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 6 }}
                    activeDot={{ r: 8 }}
                    name="Autonomía (días)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Tabla de datos */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-300">
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Intervalo de Rastreo</th>
                    <th className="px-6 py-3 text-right font-semibold text-gray-700">Autonomía Estimada</th>
                  </tr>
                </thead>
                <tbody>
                  {batteryData.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">{row.interval}</td>
                      <td className="px-6 py-4 text-right text-gray-700">{row.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Nota:</span> Los valores mostrados son estimaciones basadas en el consumo 
                promedio del dispositivo con el Modo de Ahorro activado. La autonomía real puede variar según las 
                condiciones de uso, calidad de la señal y temperatura ambiente.
              </p>
            </div>
          </div>
        )}

        {/* Sección: Comandos SMS */}
        {activeSection === 'commands' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Comandos de Configuración por SMS
            </h2>
            
            <div className="mb-8">
              <p className="text-gray-700 mb-4">
                Puedes configurar el rastreador enviando comandos SMS al número del chip insertado en el dispositivo. 
                Todos los comandos distinguen entre mayúsculas y minúsculas.
              </p>
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Importante:</span> Escribe los comandos exactamente como se muestran. 
                  El rastreador responderá confirmando la configuración o indicando si hubo un error.
                </p>
              </div>
            </div>

            {/* Tabla de comandos */}
            <div className="space-y-4">
              {smsCommands.map((cmd) => (
                <div key={cmd.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedCommand(expandedCommand === cmd.id ? null : cmd.id)}
                    className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-3">
                        <code className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded font-mono text-sm font-semibold">
                          {cmd.command}
                        </code>
                        <span className="text-gray-700">{cmd.description}</span>
                      </div>
                    </div>
                    {expandedCommand === cmd.id ? (
                      <ChevronUp className="text-gray-500" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-500" size={20} />
                    )}
                  </button>
                  
                  {expandedCommand === cmd.id && (
                    <div className="px-6 py-4 bg-white border-t border-gray-200">
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-600 mb-1">Valores permitidos:</p>
                          <p className="text-gray-800">{cmd.values}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-600 mb-1">Ejemplo:</p>
                          <code className="px-3 py-1 bg-green-100 text-green-700 rounded font-mono text-sm">
                            {cmd.example}
                          </code>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-700">{cmd.details}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sección: Información Adicional */}
        {activeSection === 'info' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Información Adicional
            </h2>

            <div className="space-y-6">
              {/* Especificaciones Técnicas */}
              <div className="border-l-4 border-indigo-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Especificaciones Técnicas</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><span className="font-semibold">Chip GPS:</span> Módulo NEO-6M</li>
                  <li><span className="font-semibold">Precisión GPS:</span> ±2.5 metros CEP</li>
                  <li><span className="font-semibold">Módulo GSM:</span> SIM800L (2G)</li>
                  <li><span className="font-semibold">Batería:</span> Li-ion 3.7V 2000mAh</li>
                  <li><span className="font-semibold">Temperatura de operación:</span> -10°C a 60°C</li>
                  <li><span className="font-semibold">Dimensiones:</span> 85mm × 55mm × 25mm</li>
                  <li><span className="font-semibold">Peso:</span> 120g (con batería)</li>
                </ul>
              </div>

              {/* LED Indicadores */}
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Indicadores LED</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-green-500 mt-1 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-gray-800">LED Verde - Encendido fijo</p>
                      <p className="text-sm text-gray-600">El dispositivo está encendido y operando normalmente</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mt-1 flex-shrink-0 animate-pulse"></div>
                    <div>
                      <p className="font-semibold text-gray-800">LED Azul - Parpadeando</p>
                      <p className="text-sm text-gray-600">Buscando señal GPS o transmitiendo datos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-500 mt-1 flex-shrink-0 animate-pulse"></div>
                    <div>
                      <p className="font-semibold text-gray-800">LED Rojo - Parpadeando</p>
                      <p className="text-sm text-gray-600">Batería baja (menos del 15%)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recomendaciones */}
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Recomendaciones de Uso</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Coloque el rastreador en un lugar con vista despejada al cielo para mejor recepción GPS</li>
                  <li>Evite cubrir completamente el dispositivo con materiales metálicos</li>
                  <li>Cargue completamente la batería antes del primer uso</li>
                  <li>Para máxima autonomía, configure intervalos de 1-2 horas</li>
                  <li>Verifique la cobertura de red del operador en la zona de uso</li>
                  <li>Actualice el APN según su operador móvil</li>
                </ul>
              </div>

              {/* Solución de Problemas */}
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Solución de Problemas Comunes</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-800">El rastreador no envía datos</p>
                    <p className="text-sm text-gray-600 mt-1">
                      • Verifique que el APN esté configurado correctamente<br/>
                      • Confirme que hay saldo y datos en el chip SIM<br/>
                      • Envíe el comando STATUS para verificar el estado
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Posición GPS imprecisa</p>
                    <p className="text-sm text-gray-600 mt-1">
                      • Espere 2-3 minutos para que el GPS obtenga señal<br/>
                      • Asegúrese de estar en un área con vista al cielo<br/>
                      • Evite usar en interiores o bajo estructuras metálicas
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Batería se descarga rápido</p>
                    <p className="text-sm text-gray-600 mt-1">
                      • Aumente el intervalo de rastreo (recomendado: 30 min o más)<br/>
                      • Active el modo AHORRO con el comando SMS<br/>
                      • Verifique que la batería no esté dañada
                    </p>
                  </div>
                </div>
              </div>

              {/* Soporte */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Soporte Técnico</h3>
                <p className="text-gray-700 mb-4">
                  ¿Necesitas ayuda adicional? Nuestro equipo de soporte está disponible para asistirte.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Email</p>
                    <p className="text-gray-800">soporte@cosmos-rastreo.com</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Horario</p>
                    <p className="text-gray-800">Lunes a Viernes, 9:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}