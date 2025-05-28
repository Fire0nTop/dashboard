"use client"
import {Battery, Clock, Droplets, Pause, Play, Settings, Square, Thermometer, Wifi} from "lucide-react";
import {useEffect, useState} from "react";
import {GlassCard} from "@/components/custom/glass-card";

const BambuLabVisionUI = () => {
    const [printers, setPrinters] = useState([
        {
            id: 1,
            name: "X1 Carbon",
            status: "printing",
            progress: 67,
            timeRemaining: "2h 15m",
            bedTemp: 60,
            nozzleTemp: 220,
            layer: "156/230",
            filament: "PLA - Black",
            model: "phone_case.3mf"
        },
        {
            id: 2,
            name: "A1 Mini",
            status: "idle",
            progress: 0,
            timeRemaining: "--",
            bedTemp: 25,
            nozzleTemp: 25,
            layer: "--/--",
            filament: "PETG - Clear",
            model: "Ready to print"
        }
    ]);

    const [selectedPrinter, setSelectedPrinter] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setPrinters(prev => prev.map(printer => {
                if (printer.status === 'printing' && printer.progress < 100) {
                    return {
                        ...printer,
                        progress: Math.min(printer.progress + 0.1, 100),
                        timeRemaining: printer.progress > 95 ? "5m" : printer.timeRemaining
                    };
                }
                return printer;
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const StatusIndicator = () => {
        const colors = {
            printing: 'bg-green-400',
            idle: 'bg-blue-400',
            error: 'bg-red-400'
        };

        return (
            <div className={`w-3 h-3 rounded-full ${colors.printing} animate-pulse`} />
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 font-system">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                    {selectedPrinter !== null && (
                        <button
                            onClick={() => setSelectedPrinter(null)}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/70 hover:text-white transition-all"
                        >
                            ←
                        </button>
                    )}
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                        <div className="w-4 h-4 bg-white rounded-sm"></div>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">Bambu Lab</h1>
                        <p className="text-white/70 text-sm">
                            {selectedPrinter !== null ? printers[selectedPrinter].name : 'Print Farm'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                    <Wifi className="w-4 h-4" />
                    <Battery className="w-4 h-4" />
                    <span className="text-xs">14:32</span>
                </div>
            </div>

            {selectedPrinter === null ? (
                /* Printer Overview Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {printers.map((printer,) => (
                        <button
                            key={printer.id}
                            className="text-left transition-all duration-300 hover:scale-102 hover:-translate-y-0.5"
                        >
                            <GlassCard className="p-4 hover:bg-white/15 cursor-pointer">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                        <StatusIndicator />
                                        <h3 className="text-lg font-bold text-white">{printer.name}</h3>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-white">{Math.round(printer.progress)}%</div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-white/10 rounded-full h-1.5 mb-3">
                                    <div
                                        className="bg-gradient-to-r from-blue-400 to-purple-500 h-1.5 rounded-full transition-all duration-1000"
                                        style={{ width: `${printer.progress}%` }}
                                    />
                                </div>

                                {/* Key Info Grid */}
                                <div className="grid grid-cols-2 gap-2 mb-3">
                                    <div>
                                        <div className="flex items-center space-x-1 mb-0.5">
                                            <Clock className="w-3 h-3 text-blue-400" />
                                            <span className="text-white/60 text-xs">Time</span>
                                        </div>
                                        <span className="text-white font-semibold text-sm">{printer.timeRemaining}</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-1 mb-0.5">
                                            <Thermometer className="w-3 h-3 text-orange-400" />
                                            <span className="text-white/60 text-xs">Temp</span>
                                        </div>
                                        <span className="text-white font-semibold text-sm">{printer.nozzleTemp}°C</span>
                                    </div>
                                </div>

                                {/* Current Model */}
                                <div className="border-t border-white/10 pt-2 mb-2">
                                    <span className="text-white text-xs font-medium truncate block">{printer.model}</span>
                                </div>

                                {/* Status Badge */}
                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                                    printer.status === 'printing'
                                        ? 'bg-green-400/20 text-green-400'
                                        : printer.status === 'idle'
                                            ? 'bg-blue-400/20 text-blue-400'
                                            : 'bg-red-400/20 text-red-400'
                                }`}>
                  {printer.status.charAt(0).toUpperCase() + printer.status.slice(1)}
                </span>
                            </GlassCard>
                        </button>
                    ))}
                </div>
            ) : (
                /* Detailed Printer View */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Print Status */}
                    <div className="lg:col-span-2">
                        <GlassCard className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-1">{printers[selectedPrinter].name}</h2>
                                    <p className="text-white/70 text-sm">{printers[selectedPrinter].model}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-xl text-green-400 transition-colors">
                                        <Play className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-xl text-yellow-400 transition-colors">
                                        <Pause className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-red-400 transition-colors">
                                        <Square className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Progress Circle */}
                            <div className="relative w-32 h-32 mx-auto mb-4">
                                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 144 144">
                                    <circle
                                        cx="72"
                                        cy="72"
                                        r="56"
                                        stroke="white"
                                        strokeOpacity="0.1"
                                        strokeWidth="6"
                                        fill="none"
                                    />
                                    <circle
                                        cx="72"
                                        cy="72"
                                        r="56"
                                        stroke="url(#gradient)"
                                        strokeWidth="6"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray={`${printers[selectedPrinter].progress * 3.52} 352`}
                                        className="transition-all duration-1000"
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#3B82F6" />
                                            <stop offset="100%" stopColor="#8B5CF6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-white">{Math.round(printers[selectedPrinter].progress)}%</span>
                                    <span className="text-white/60 text-xs">Complete</span>
                                </div>
                            </div>

                            {/* Print Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="flex items-center justify-center space-x-1 mb-1">
                                        <Clock className="w-3 h-3 text-blue-400" />
                                        <span className="text-white/60 text-xs">Time Remaining</span>
                                    </div>
                                    <span className="text-white font-semibold text-sm">{printers[selectedPrinter].timeRemaining}</span>
                                </div>
                                <div className="text-center">
                                    <span className="text-white/60 text-xs block mb-1">Layer</span>
                                    <span className="text-white font-semibold text-sm">{printers[selectedPrinter].layer}</span>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Temperature & Controls */}
                    <div className="space-y-4">
                        {/* Temperature */}
                        <GlassCard className="p-4">
                            <h3 className="text-white font-semibold mb-3 flex items-center text-sm">
                                <Thermometer className="w-4 h-4 mr-2 text-orange-400" />
                                Temperature
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-white/70 text-sm">Nozzle</span>
                                    <span className="text-white font-mono text-sm">{printers[selectedPrinter].nozzleTemp}°C</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-1.5">
                                    <div
                                        className="bg-gradient-to-r from-orange-400 to-red-500 h-1.5 rounded-full transition-all duration-1000"
                                        style={{ width: `${(printers[selectedPrinter].nozzleTemp / 250) * 100}%` }}
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/70 text-sm">Bed</span>
                                    <span className="text-white font-mono text-sm">{printers[selectedPrinter].bedTemp}°C</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-1.5">
                                    <div
                                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-1.5 rounded-full transition-all duration-1000"
                                        style={{ width: `${(printers[selectedPrinter].bedTemp / 100) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </GlassCard>

                        {/* Filament */}
                        <GlassCard className="p-4">
                            <h3 className="text-white font-semibold mb-3 flex items-center text-sm">
                                <Droplets className="w-4 h-4 mr-2 text-blue-400" />
                                Filament
                            </h3>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black rounded-full mx-auto mb-2 shadow-lg"></div>
                                <p className="text-white text-sm">{printers[selectedPrinter].filament}</p>
                                <p className="text-white/60 text-xs">Ready</p>
                            </div>
                        </GlassCard>

                        {/* Quick Actions */}
                        <GlassCard className="p-4">
                            <h3 className="text-white font-semibold mb-3 text-sm">Quick Actions</h3>
                            <div className="space-y-2">
                                <button className="w-full p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 text-left transition-colors flex items-center text-sm">
                                    <Settings className="w-3 h-3 mr-2" />
                                    Settings
                                </button>
                                <button className="w-full p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 text-left transition-colors text-sm">
                                    Load Filament
                                </button>
                                <button className="w-full p-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-purple-400 text-left transition-colors text-sm">
                                    Calibrate
                                </button>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BambuLabVisionUI;