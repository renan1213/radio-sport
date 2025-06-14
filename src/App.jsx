
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import CallToActionSection from '@/components/CallToActionSection';
import NewsControls from '@/components/NewsControls';
import NewsGrid from '@/components/NewsGrid';
import Footer from '@/components/Footer';
import { fetchNewsArticles } from '@/services/newsApi';
import { isValidUrl } from '@/utils/helpers';

const LOGO_URL = "565682b4-6c98-460b-8586-925db3c79c2d.png";
const PEDRO_REGIS_PHOTO_URL = "https://storage.googleapis.com/hostinger-horizons-assets-prod/300e3271-ee44-439d-b297-6319596148d2/5809f446365e77d7020d0867248b0bab.jpg";


function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [radioStreamUrl, setRadioStreamUrl] = useState(localStorage.getItem('radioStreamUrl') || '');
  const [volume, setVolume] = useState(parseFloat(localStorage.getItem('radioVolume')) || 0.5);
  const audioRef = useRef(null);
  const { toast } = useToast();

  const loadNews = useCallback(async () => {
    setLoading(true);
    try {
      const articles = await fetchNewsArticles();
      setNews(articles);
      setLastUpdated(new Date());
      
      if (articles.length > 0) {
        toast({
          title: "✅ Notícias atualizadas!",
          description: `${articles.length} notícias carregadas com sucesso.`,
        });
      } else {
        toast({
          title: "🤔 Nenhuma notícia nova encontrada",
          description: "Verifique os termos de busca ou tente mais tarde.",
        });
      }
    } catch (error) {
      console.error('Erro ao buscar notícias:', error);
      toast({
        title: "❌ Erro ao carregar notícias",
        description: error.message || "Verifique sua conexão e tente novamente.",
        variant: "destructive"
      });
      setNews([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadNews();
    const interval = setInterval(loadNews, 600000);
    return () => clearInterval(interval);
  }, [loadNews]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      localStorage.setItem('radioVolume', volume.toString());
    }
  }, [volume]);

  useEffect(() => {
    if (radioStreamUrl && audioRef.current) {
      audioRef.current.src = radioStreamUrl;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Erro ao tocar rádio:", e));
      }
    }
    localStorage.setItem('radioStreamUrl', radioStreamUrl);
  }, [radioStreamUrl, isPlaying]);


  const handlePlayPause = () => {
    if (!radioStreamUrl) {
      toast({
        title: "📻 URL da Rádio não configurada!",
        description: "Clique no ícone de configurações (⚙️) para adicionar uma URL de stream.",
        variant: "destructive"
      });
      return;
    }
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => {
          console.error("Erro ao tocar rádio:", e);
          toast({
            title: "❌ Erro ao tocar rádio",
            description: "Verifique a URL do stream ou sua conexão.",
            variant: "destructive"
          });
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const handleRadioStreamChange = (newUrlOrName) => {
    let finalUrl = newUrlOrName;
    if (!isValidUrl(newUrlOrName)) {
      toast({
        title: "🚧 Busca por nome de rádio",
        description: `Tentaremos encontrar um stream para "${newUrlOrName}". Por enquanto, apenas URLs diretas são totalmente suportadas.`,
      });
      finalUrl = `https://stream.zeno.fm/stations/slug/${newUrlOrName.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')}`;
    }
    
    setRadioStreamUrl(finalUrl);
    if (isPlaying && audioRef.current) {
      audioRef.current.src = finalUrl;
      audioRef.current.load(); 
      audioRef.current.play().catch(e => {
        console.error("Erro ao tocar nova URL/nome:", e);
        toast({
            title: "❌ Erro ao tocar rádio",
            description: "Não foi possível encontrar ou tocar o stream. Verifique o nome ou URL.",
            variant: "destructive"
          });
      });
    } else if (audioRef.current) {
       audioRef.current.src = finalUrl;
    }
  };

  const filteredNews = news.filter(article =>
    article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-slate-100">
      <Toaster />
      <audio ref={audioRef} />
      <Header 
        newsCount={news.length}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        audioRef={audioRef}
        onVolumeChange={handleVolumeChange}
        currentVolume={volume}
        onRadioStreamChange={handleRadioStreamChange}
        logoBackgroundUrl={LOGO_URL}
        pedroRegisPhotoUrl={PEDRO_REGIS_PHOTO_URL}
      />
      <main className="container mx-auto px-4 py-8">
        <CallToActionSection pedroRegisPhotoUrl={PEDRO_REGIS_PHOTO_URL} />
        <NewsControls 
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          lastUpdated={lastUpdated}
          onRefresh={loadNews}
          loading={loading}
        />
        <NewsGrid 
          news={filteredNews}
          loading={loading}
          searchTerm={searchTerm}
          onRefresh={loadNews}
        />
      </main>
      <Footer logoUrl={LOGO_URL} />
    </div>
  );
}

export default App;