import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { PHONE_NUMBER } from '@/constants';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Youtube, ClipboardCheck, Phone, Play, Link as LinkIcon, UserCircle } from 'lucide-react';

const CallToActionSection = ({ pedroRegisPhotoUrl }) => {
  const { toast } = useToast();
  const [isLiveStreamConfigOpen, setIsLiveStreamConfigOpen] = useState(false);
  const [liveStreamUrl, setLiveStreamUrl] = useState(localStorage.getItem('liveStreamUrl') || '');
  const [currentLiveUrl, setCurrentLiveUrl] = useState(localStorage.getItem('liveStreamUrl') || '');


  const handleScheduleInterview = () => {
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent("Olá Pedro Regis, gostaria de agendar uma entrevista para o Radio Sport Show.")}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSaveLiveStreamConfig = () => {
    if (liveStreamUrl) {
      setCurrentLiveUrl(liveStreamUrl);
      localStorage.setItem('liveStreamUrl', liveStreamUrl);
      toast({
        title: "📺 URL da Transmissão Atualizada!",
        description: "O botão 'Assistir Agora' usará a nova URL.",
      });
    }
    setIsLiveStreamConfigOpen(false);
  };

  const handleWatchLive = () => {
    if (currentLiveUrl) {
      window.open(currentLiveUrl, '_blank');
    } else {
      toast({
        title: "🚧 Nenhuma URL de transmissão configurada!",
        description: "Clique no ícone de link (🔗) para adicionar uma URL.",
        variant: "destructive"
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="grid md:grid-cols-2 gap-8 mb-12"
    >
      <div className="glass-effect p-6 rounded-xl shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-500/80 rounded-full mr-3 animate-pulse">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">TRANSMISSÃO AO VIVO</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsLiveStreamConfigOpen(true)} className="text-slate-400 hover:text-green-400" aria-label="Configurar URL da Transmissão ao Vivo">
            <LinkIcon className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-slate-300 mb-4">
          {currentLiveUrl ? "Estamos ao vivo! Clique abaixo para assistir." : "Fique ligado! Configure a URL da sua transmissão ao vivo."}
        </p>
        <Button 
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
          onClick={handleWatchLive}
          disabled={!currentLiveUrl}
        >
          <Play className="w-5 h-5 mr-2"/> {currentLiveUrl ? "Assistir Agora" : "Assistir Agora (Configure URL)"}
        </Button>
      </div>

      <div className="glass-effect p-6 rounded-xl shadow-xl flex flex-col items-center text-center">
          <img src={pedroRegisPhotoUrl} alt="Pedro Regis" className="w-24 h-24 rounded-full border-4 border-green-500 shadow-lg mb-4"/>
          <h2 className="text-2xl font-bold text-white mb-2">Agende sua Entrevista</h2>
          <p className="text-slate-300 mb-4">
            Tem uma história para contar? Quer participar do Radio Sport Show com Pedro Regis? Entre em contato!
          </p>
          <Button onClick={handleScheduleInterview} className="w-full max-w-xs bg-green-600 hover:bg-green-700 text-white font-semibold">
            <Phone className="w-5 h-5 mr-2"/> Agendar via WhatsApp
          </Button>
      </div>
      <Dialog open={isLiveStreamConfigOpen} onOpenChange={setIsLiveStreamConfigOpen}>
        <DialogContent className="sm:max-w-[425px] bg-slate-800 border-slate-700 text-slate-100">
          <DialogHeader>
            <DialogTitle>Configurar Transmissão ao Vivo</DialogTitle>
            <DialogDescription>
              Insira a URL da sua transmissão ao vivo (YouTube, Twitch, etc.).
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="live-url" className="text-right">
                URL
              </Label>
              <Input
                id="live-url"
                value={liveStreamUrl}
                onChange={(e) => setLiveStreamUrl(e.target.value)}
                placeholder="https://youtube.com/live/..."
                className="col-span-3 bg-slate-700 border-slate-600 focus:ring-red-500"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="border-slate-600 hover:bg-slate-700">Cancelar</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSaveLiveStreamConfig} className="bg-red-600 hover:bg-red-700">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default CallToActionSection;