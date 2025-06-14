import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { formatDate, handleImageError } from '@/utils/helpers';
import { Calendar, ExternalLink, Target } from 'lucide-react';

const NewsCard = ({ article, index }) => {
  return (
    <motion.article
      key={article.url || index}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: "easeOut" }}
      className="news-card group flex flex-col"
    >
      {article.urlToImage ? (
        <div className="relative overflow-hidden rounded-t-xl aspect-video">
          <img
            src={article.urlToImage}
            alt={article.title || "Imagem da notícia"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
          <div 
            className="image-placeholder absolute inset-0 bg-slate-700/50 flex items-center justify-center text-slate-400 text-sm" 
            style={{display: 'none'}}
          >
            Imagem Indisponível
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
      ): (
          <div className="relative overflow-hidden rounded-t-xl aspect-video bg-slate-700/50 flex items-center justify-center">
            <Target className="w-12 h-12 text-slate-500"/>
          </div>
      )}
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs text-green-400 mb-2">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(article.publishedAt)}
        </div>
        
        <h2 className="text-lg font-bold text-white mb-2 line-clamp-3 group-hover:text-green-300 transition-colors flex-grow">
          {article.title || "Título indisponível"}
        </h2>
        
        {article.description && (
          <p className="text-slate-300 text-sm mb-3 line-clamp-3">
            {article.description}
          </p>
        )}
        
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-700/50">
          <span className="text-xs text-slate-400 truncate max-w-[150px]">
            {article.source?.name || "Fonte desconhecida"}
          </span>
          
          <Button
            variant="link"
            size="sm"
            className="text-green-400 hover:text-green-300 p-0 h-auto"
            onClick={() => article.url && window.open(article.url, '_blank')}
            disabled={!article.url}
          >
            Ler mais
            <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
};

export default NewsCard;
