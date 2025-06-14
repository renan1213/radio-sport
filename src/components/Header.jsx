import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { 
  Play, 
  Pause, 
  Volume2,
  VolumeX,
  Settings2,
  Trophy,
  Users,
  TrendingUp,
  Target,
  Radio
} from 'lucide-react';

const Header = ({ newsCount, isPlaying, onPlayPause, onVolumeChange, currentVolume, onRadioStreamChange, logoBackgroundUrl, pedroRegisPhotoUrl }) => {
  const { toast } = useToast();
  const [isRadioConfigOpen, setIsRadioConfigOpen] = useState(false);
  const [radioInput, setRadioInput] = useState(localStorage.getItem('radioStreamUrl') || '');
  const [tempVolume, setTempVolume] = useState(currentVolume);

  const stats = [
    { icon: Trophy, label: 'Notícias de Hoje', value: newsCount || '0' },
    { icon: Users, label: 'Comunidade', value: '15K+' },
    { icon: TrendingUp, label: 'Ao Vivo Agora', value: 'EM BREVE' },
    { icon: Radio, label: 'Sua Rádio', value: 'Online' }
  ];

  const handleSaveRadioConfig = () => {
    if (radioInput) {
      onRadioStreamChange(radioInput);
      toast({
        title: "📻 Rádio Configurada!",
        description: `Tentando conectar à: ${radioInput}.`,
      });
    }
    setIsRadioConfigOpen(false);
  };
  
  const handleVolumeIconClick = () => {
    if (currentVolume > 0) {
      setTempVolume(currentVolume); 
      onVolumeChange(0); 
    } else {
      onVolumeChange(tempVolume > 0 ? tempVolume : 0.5); 
    }
  };

  return (
    <header className="relative overflow-hidden py-12 md:py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-green-700/30 via-emerald-600/30 to-teal-700/30 opacity-60"></div>
      {logoBackgroundUrl && <div className="absolute inset-0" style={{ backgroundImage: `url(${logoBackgroundUrl})`, backgroundSize: 'contain', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat', opacity: 0.08, top: '-50px', transform: 'scale(1.3)' }}></div>}
      
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <div className="flex flex-col items-center mb-6 pt-8"> {/* Added pt-8 for spacing if logo was there */}
            <div className="flex items-center gap-3">
              <img src={pedroRegisPhotoUrl} alt="Pedro Regis" className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-green-500 shadow-lg"/>
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black gradient-text floating-animation">
                  RADIO SPORT SHOW
                </h1>
                <p className="text-xl md:text-2xl text-slate-100 font-semibold">
                  com Pedro Regis
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-10">
            <Button
              onClick={() => setIsRadioConfigOpen(true)}
              variant="outline"
              size="lg"
              className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white rounded-full p-3 md:p-4 shadow-md hover:shadow-green-500/30 transition-all"
              aria-label="Configurar Rádio"
            >
              <Settings2 className="w-5 h-5 md:w-7 md:h-7" />
            </Button>
            <Button
              onClick={onPlayPause}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-full pulse-glow text-lg shadow-lg hover:shadow-green-500/40 transition-all"
            >
              {isPlaying ? <Pause className="w-6 h-6 md:w-7 md:h-7 mr-2" /> : <Play className="w-6 h-6 md:w-7 md:h-7 mr-2" />}
              {isPlaying ? 'PAUSAR' : 'OUVIR'}
            </Button>
            <div className="flex items-center gap-2 glass-effect p-2 rounded-full">
              <Button
                variant="ghost"
                size="icon"
                className="text-green-400 hover:text-green-300 hover:bg-transparent p-1"
                onClick={handleVolumeIconClick}
                aria-label={currentVolume === 0 ? "Ativar som" : "Silenciar"}
              >
                {currentVolume === 0 ? <VolumeX className="w-5 h-5 md:w-6 md:h-6" /> : <Volume2 className="w-5 h-5 md:w-6 md:h-6" />}
              </Button>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={currentVolume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="w-16 md:w-24 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                aria-label="Controle de volume"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto mb-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 120 }}
                className="glass-effect rounded-xl p-4 shadow-lg hover:scale-105 transition-transform"
              >
                <stat.icon className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Dialog open={isRadioConfigOpen} onOpenChange={setIsRadioConfigOpen}>
        <DialogContent className="sm:max-w-[425px] bg-slate-800 border-slate-700 text-slate-100">
          <DialogHeader>
            <DialogTitle>Configurar Rádio</DialogTitle>
            <DialogDescription>
              Insira a URL do stream da sua rádio (ex: https://servidor.com/stream) ou o nome (ex: FM 98.0).
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="radio-url" className="text-right">
                URL/Nome
              </Label>
              <Input
                id="radio-url"
                value={radioInput}
                onChange={(e) => setRadioInput(e.target.value)}
                placeholder="Ex: https://... ou FM 98.0"
                className="col-span-3 bg-slate-700 border-slate-600 focus:ring-green-500"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="border-slate-600 hover:bg-slate-700">Cancelar</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSaveRadioConfig} className="bg-green-600 hover:bg-green-700">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;