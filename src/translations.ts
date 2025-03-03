interface Project {
  title: string;
  description: string;
}

interface Translation {
  nav: {
    about: string;
    portfolio: string;
    contact: string;
  };
  hero: {
    greeting: string;
    description: string;
    cta: string;
  };
  typingText: string;
  portfolio: {
    title: string;
    projects: Project[];
  };
  contact: {
    title: string;
    description: string;
  };
  footer: {
    rights: string;
  };
}

interface Translations {
  [key: string]: Translation;
}

const translations: Translations = {
  pt: {
    nav: {
      about: "Sobre",
      portfolio: "Portfólio",
      contact: "Contato"
    },
    hero: {
      greeting: "Olá! Sou",
      description: "Sou programador de bots para Discord e vou te mostrar um pouco do meu trabalho a seguir.",
      cta: "Ver Portfólio"
    },
    typingText: "Desenvolvedor de Bots para Discord",
    portfolio: {
      title: "Portfólio",
      projects: [
        {
          title: "🎫 Sistema de Tickets",
          description: "Sistema completo de tickets para suporte, com categorias, prioridades e histórico de atendimentos."
        },
        {
          title: "📝 Sistema de Forms",
          description: "Formulários personalizáveis para coleta de dados, com validação e exportação de resultados."
        },
        {
          title: "🔓 Sistema de Unban",
          description: "Gerenciamento de banimentos com solicitações de desbanimento e análise de casos."
        },
        {
          title: "🏆 Sistema de Ranking",
          description: "Ranking de membros baseado em atividade, mensagens e participação em eventos."
        },
        {
          title: "👥 Sistema de Metadinhas",
          description: "Crie perfis compartilhados com outros membros do servidor para mostrar amizades e relacionamentos."
        },
        {
          title: "🕵️ Jogo O Espião",
          description: "Jogo interativo onde um jogador é o espião e precisa se misturar sem ser descoberto."
        },
        {
          title: "🪑 Jogo Dança das Cadeiras",
          description: "Versão digital do clássico jogo de festa, adaptado para servidores do Discord."
        }
      ]
    },
    contact: {
      title: "Entre em Contato",
      description: "Interessado em um bot personalizado para o seu servidor? Entre em contato comigo pelo Discord ou email!"
    },
    footer: {
      rights: "Todos os direitos reservados"
    }
  },
  en: {
    nav: {
      about: "About",
      portfolio: "Portfolio",
      contact: "Contact"
    },
    hero: {
      greeting: "Hello! I'm",
      description: "I'm a Discord bot developer and I'll show you some of my work below.",
      cta: "View Portfolio"
    },
    typingText: "Discord Bot Developer",
    portfolio: {
      title: "Portfolio",
      projects: [
        {
          title: "🎫 Ticket System",
          description: "Complete ticket system for support, with categories, priorities, and service history."
        },
        {
          title: "📝 Forms System",
          description: "Customizable forms for data collection, with validation and results export."
        },
        {
          title: "🔓 Unban System",
          description: "Ban management with unban requests and case analysis."
        },
        {
          title: "🏆 Ranking System",
          description: "Member ranking based on activity, messages, and event participation."
        },
        {
          title: "👥 Matching Profiles",
          description: "Create shared profiles with other server members to showcase friendships and relationships."
        },
        {
          title: "🕵️ Spy Game",
          description: "Interactive game where one player is the spy and needs to blend in without being discovered."
        },
        {
          title: "🪑 Musical Chairs",
          description: "Digital version of the classic party game, adapted for Discord servers."
        }
      ]
    },
    contact: {
      title: "Get in Touch",
      description: "Interested in a custom bot for your server? Contact me via Discord or email!"
    },
    footer: {
      rights: "All rights reserved"
    }
  }
};

export default translations;