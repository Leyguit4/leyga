import { useState, useRef, useEffect } from 'react';

interface VideoCardProps {
  title: string;
  videoId: string;
  description: string;
  darkMode: boolean; // Adiciona darkMode às props
}

export function VideoCard({ title, videoId, description, darkMode }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Função para extrair o ID do vídeo do link do Google Drive
  const getEmbedUrl = (id: string) => {
    return `https://drive.google.com/file/d/${id}/preview`;
  };

  // Função para iniciar o vídeo
  const handlePlay = () => {
    if (iframeRef.current) {
      // Envia mensagem para o iframe do Google Drive
      iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      setIsPlaying(true);
    }
  };

  // Listener para mensagens do iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin.includes('drive.google.com')) {
        if (event.data === 'playing') {
          setIsPlaying(true);
        } else if (event.data === 'paused') {
          setIsPlaying(false);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="group relative rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-500 animate-card-float-slow">
      {/* Camadas de fundo animadas */}
      <div className={`absolute inset-0 animate-gradient-move ${
        darkMode 
          ? 'bg-gradient-to-br from-red-600 via-black to-red-800' 
          : 'bg-gradient-to-br from-purple-600 via-white to-yellow-400'
      }`} />
      
      {/* Camada de brilho animada */}
      <div className={`absolute inset-0 animate-shine ${
        darkMode
          ? 'bg-gradient-to-r from-transparent via-red-500/30 to-transparent'
          : 'bg-gradient-to-r from-transparent via-purple-500/30 to-transparent'
      }`} />

      {/* Bordas luminosas */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-600 via-red-500 to-yellow-400 opacity-75 blur group-hover:opacity-100 animate-border-flow transition-opacity duration-500" />

      {/* Conteúdo principal */}
      <div className="relative bg-gray-900/90 backdrop-blur-sm h-full z-10 rounded-2xl p-6 group-hover:bg-gray-900/70 transition-all duration-500">
        {/* Título com efeito de brilho */}
        <h3 className={`text-2xl font-bold mb-2 text-center animate-text-glow ${
          darkMode
            ? 'bg-gradient-to-r from-red-500 via-white to-red-500'
            : 'bg-gradient-to-r from-purple-400 via-yellow-300 to-purple-400'
        } bg-clip-text text-transparent bg-300% group-hover:bg-100% transition-all duration-500`}>
          {title}
        </h3>

        {/* Descrição com fade in */}
        <p className="text-gray-300 text-center text-sm opacity-75 group-hover:opacity-100 transform group-hover:translate-y-1 transition-all duration-500">
          {description}
        </p>

        {/* Container do vídeo com efeito de profundidade */}
        <div className="relative mt-4 transform group-hover:-translate-y-1 transition-transform duration-500">
          <div className="relative p-4">
            {/* Sombra animada do vídeo */}
            <div className="absolute inset-0 z-0">
              {/* Primeira camada de sombra */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 rounded-lg opacity-75 blur-xl transform hover:scale-110 transition-transform duration-700 animate-glow-slow" />
              
              {/* Segunda camada de sombra com rotação */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg opacity-50 blur-2xl animate-spin-slow" />
              
              {/* Terceira camada de efeito pulse */}
              <div className="absolute inset-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg opacity-40 blur-xl animate-pulse-glow" />
            </div>

            {/* Container do vídeo com fundo escuro */}
            <div className="relative z-10 rounded-lg overflow-hidden bg-gray-900">
              <iframe
                ref={iframeRef}
                src={getEmbedUrl(videoId)}
                className="w-full aspect-video rounded-lg"
                allowFullScreen
                allow="autoplay; encrypted-media"
                onLoad={() => setIframeLoaded(true)}
                style={{ border: 'none' }}
              />

              {/* Overlay do play animado */}
              {(!isPlaying || !iframeLoaded) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 group-hover:bg-black/40 transition-all duration-500">
                  <button
                    onClick={handlePlay}
                    className="group/play relative transform hover:scale-125 transition-all duration-500"
                  >
                    {/* Círculos animados */}
                    <div className="absolute -inset-4 animate-ping-slow opacity-25 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-md" />
                    <div className="absolute -inset-8 animate-pulse-slow opacity-15 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-lg" />
                    
                    {/* Nova borda interativa */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#ff1cf7] via-[#00ff87] to-[#00e0ff] rounded-full opacity-0 group-hover/play:opacity-100 blur animate-spin-slow transition-opacity duration-300" />
                    
                    {/* Ícone do play com nova animação */}
                    <div className="relative bg-gray-900 rounded-full p-4 transform transition-all duration-300 group-hover/play:bg-opacity-80">
                      <svg 
                        viewBox="0 0 24 24" 
                        className={`w-12 h-12 transform group-hover/play:scale-110 transition-transform duration-300 ${
                          darkMode ? 'text-red-500' : 'text-purple-500'
                        } animate-bounce-subtle`}
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}