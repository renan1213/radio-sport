import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Clock, RefreshCw } from 'lucide-react';
import { formatDate } from '@/utils/helpers';

const NewsControls = ({ searchTerm, onSearchTermChange, lastUpdated, onRefresh, loading }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
      <div className="relative flex-1 w-full md:max-w-md">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar notícias de futebol..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-slate-800/60 border-2 border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />
      </div>
      
      <div className="flex items-center gap-4">
        {lastUpdated && (
          <div className="flex items-center text-slate-400 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            Última Atualização: {formatDate(lastUpdated)}
          </div>
        )}
        <Button
          onClick={onRefresh}
          disabled={loading}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold"
        >
          <RefreshCw className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Atualizando...' : 'Atualizar Notícias'}
        </Button>
      </div>
    </div>
  );
};

export default NewsControls;
