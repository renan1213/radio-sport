import React from 'react';
import { Instagram, Facebook, Phone } from 'lucide-react';
import { INSTAGRAM_USERNAME, FACEBOOK_USERNAME, PHONE_NUMBER } from '@/constants';

const Footer = ({ logoUrl }) => {
  return (
    <footer className="bg-slate-900/70 border-t border-slate-700/50 mt-16 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            {logoUrl && <img src={logoUrl} alt="Radio Sport Show Logo" className="w-32 h-auto mb-2 opacity-80"/>}
            <span className="text-xl font-black gradient-text">RADIO SPORT SHOW</span>
            <p className="text-md text-slate-300 font-medium">com Pedro Regis</p>
          </div>
          
          <div className="flex justify-center items-center gap-6">
            <a href={`https://instagram.com/${INSTAGRAM_USERNAME}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-400 transition-colors" aria-label="Instagram de Pedro Regis">
              <Instagram className="w-8 h-8"/>
            </a>
            <a href={`https://facebook.com/${FACEBOOK_USERNAME}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-400 transition-colors" aria-label="Facebook de Pedro Regis">
              <Facebook className="w-8 h-8"/>
            </a>
            <a href={`https://wa.me/${PHONE_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-400 transition-colors" aria-label="WhatsApp de Pedro Regis">
              <Phone className="w-7 h-7"/>
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Radio Sport Show. Todos os direitos reservados.
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Desenvolvido por Renan 😎.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;