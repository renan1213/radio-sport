import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NewsCard from '@/components/NewsCard';
import { Button } from '@/components/ui/button';
import { RefreshCw, Trophy } from 'lucide-react';

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, index) => (
      <div key={index} className="news-card p-6">
        <div className="loading-shimmer h-48 rounded-lg mb-4"></div>
        <div className="loading-shimmer h-6 rounded-md mb-3 w-3/4"></div>
        <div className="loading-shimmer h-4 rounded-md mb-1 w-full"></div>
        <div className="loading-shimmer h-4 rounded-md w-5/6"></div>
      </div>
    ))}
  </div>
);

const EmptyState = ({ searchTerm, onRefresh, loading }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16 glass-effect rounded-xl shadow-xl"
  >
    <Trophy className="w-16 h-16 text-green-500 mx-auto mb-6 opacity-70" />
    <h3 className="text-3xl font-bold text-white mb-3">
      Nenhuma Notícia Encontrada
    </h3>
    <p className="text-slate-300 text-lg mb-6">
      {searchTerm ? "Tente palavras-chave diferentes." : "Aguarde as últimas novidades do mundo do futebol!"}
    </p>
    <Button
      onClick={onRefresh}
      disabled={loading}
      className="bg-green-600 hover:bg-green-700 text-white font-semibold"
    >
      <RefreshCw className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
      Tentar Atualizar Novamente
  </Button>
  </motion.div>
);


const NewsGrid = ({ news, loading, searchTerm, onRefresh }) => {
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (news.length === 0) {
    return <EmptyState searchTerm={searchTerm} onRefresh={onRefresh} loading={loading} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {news.map((article, index) => (
        <NewsCard key={article.url || index} article={article} index={index} />
      ))}
    </motion.div>
  );
};

export default NewsGrid;
