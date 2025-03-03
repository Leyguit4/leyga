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
    typingText: string;
    description: string;
    cta: string;
  };
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
  typingText: string;
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
      greeting: "Olá, eu sou",
      typingText: "Desenvolvedor Full Stack & Criador de Bots",
      description: "Especializado em desenvolvimento de bots e sistemas personalizados para Discord, com foco em interação e engajamento de comunidades.",
      cta: "Ver Projetos"
    },
    portfolio: {
      title: "Meus Projetos",
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
      description: "Tem algum projeto em mente? Vamos conversar!"
    },
    footer: {
      rights: "Todos os direitos reservados"
    },
    typingText: "Desenvolvedor Full Stack & Criador de Bots"
  },
  en: {
    nav: {
      about: "About",
      portfolio: "Portfolio",
      contact: "Contact"
    },
    hero: {
      greeting: "Hi, I'm",
      typingText: "Full Stack Developer & Bot Creator",
      description: "Specialized in developing custom bots and systems for Discord, focusing on community interaction and engagement.",
      cta: "View Projects"
    },
    portfolio: {
      title: "My Projects",
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
      description: "Have a project in mind? Let's talk!"
    },
    footer: {
      rights: "All rights reserved"
    },
    typingText: "Full Stack Developer & Bot Creator"
  }
};

export type { Translation };
export default translations;