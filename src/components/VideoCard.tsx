import { useState, useRef, useEffect } from 'react';

interface VideoCardProps {
  title: string;
  videoId: string;
  description: string;
}

export function VideoCard({ title, videoId, description }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Função para extrair o ID do vídeo do link do Google Drive
  const getEmbedUrl = (url: string) => {
    const id = url.match(/\/d\/(.*?)\//)![1];
    return `https://drive.google.com/file/d/${id}/preview?autoplay=0`;
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
    <div className={`group relative overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2`}>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-red-500 font-display">
          {title}
        </h3>
        <p className="mb-4 text-gray-300">
          {description}
        </p>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-red-500 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
            {(!isPlaying || !iframeLoaded) && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center z-10 bg-black/30 group-hover:bg-black/40 transition-colors cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 opacity-90 group-hover:opacity-100 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
            )}
            <iframe
              ref={iframeRef}
              src={getEmbedUrl(videoId)}
              className="w-full h-full relative z-0 video-custom-controls"
              allowFullScreen
              allow="autoplay; encrypted-media"
              onLoad={() => setIframeLoaded(true)}
              style={{ border: 'none' }}
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
}
