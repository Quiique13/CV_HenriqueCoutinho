import { type Language, type Translate } from "./messages";
import type {
  GalleryCategory,
  GalleryPhoto,
  GalleryProject,
  GalleryVideo,
  Project,
} from "./portfolio";

type Localized<T> = Record<Exclude<Language, "en">, T>;
type ProjectCopy = Pick<
  Project,
  "discipline" | "summary" | "description" | "features"
>;

const projectCopy: Record<string, Localized<ProjectCopy>> = {
  savings: {
    pt: {
      discipline: "FINANÇAS PESSOAIS",
      summary: "Tornar as finanças do dia a dia mais fáceis de compreender.",
      description:
        "Um planeador de finanças pessoais que reúne compras do dia a dia, contas mensais e despesas anuais numa única interface.",
      features: [
        "Acompanha despesas, rendimentos, contas e transferências.",
        "Consulta as finanças através de gráficos numa interface responsiva.",
        "Gere perfis locais separados e exporta cópias de segurança.",
      ],
    },
    fr: {
      discipline: "FINANCES PERSONNELLES",
      summary: "Rendre les finances du quotidien plus faciles à comprendre.",
      description:
        "Un outil de gestion des finances personnelles qui réunit les achats du quotidien, les factures mensuelles et les dépenses annuelles dans une seule interface.",
      features: [
        "Suis les dépenses, revenus, comptes et virements.",
        "Explore tes finances avec des graphiques et une interface adaptative.",
        "Gère des profils locaux distincts et exporte des sauvegardes.",
      ],
    },
    es: {
      discipline: "FINANZAS PERSONALES",
      summary: "Entender las finanzas del día a día es un poco más fácil.",
      description:
        "Un planificador de finanzas personales que reúne compras cotidianas, facturas mensuales y gastos anuales en una sola interfaz.",
      features: [
        "Haz un seguimiento de gastos, ingresos, cuentas y transferencias.",
        "Explora tus finanzas con gráficos y una interfaz adaptable.",
        "Gestiona perfiles locales independientes y exporta copias de seguridad.",
      ],
    },
  },
  petstay: {
    pt: {
      discipline: "GESTÃO DE HOTÉIS PARA ANIMAIS",
      summary:
        "Uma estadia mais organizada para os nossos amigos de quatro patas.",
      description:
        "Uma aplicação de gestão para hotéis de animais, criada em português europeu para reunir reservas, hóspedes e os detalhes do dia a dia.",
      features: [
        "Gere hóspedes, tutores, reservas e estados de pagamento.",
        "Define preços por idade e época do ano.",
        "Planeia a capacidade e a ocupação com um simulador de receitas mensais.",
      ],
    },
    fr: {
      discipline: "GESTION DE PENSIONS POUR ANIMAUX",
      summary: "Un séjour mieux organisé pour nos amis à quatre pattes.",
      description:
        "Une application de gestion pour les pensions pour animaux, conçue en portugais européen pour centraliser les réservations, les pensionnaires et les tâches quotidiennes.",
      features: [
        "Gère les pensionnaires, leurs propriétaires, les réservations et les paiements.",
        "Définis des tarifs selon l’âge et la saison.",
        "Planifie la capacité et l’occupation avec un simulateur de revenus mensuels.",
      ],
    },
    es: {
      discipline: "GESTIÓN DE HOTELES PARA MASCOTAS",
      summary:
        "Una estancia mejor organizada para nuestros amigos de cuatro patas.",
      description:
        "Una aplicación de gestión para hoteles de mascotas, diseñada en portugués europeo para reunir reservas, huéspedes y tareas del día a día.",
      features: [
        "Gestiona huéspedes, propietarios, reservas y estados de pago.",
        "Define tarifas según la edad y la temporada.",
        "Planifica la capacidad y la ocupación con un simulador de ingresos mensuales.",
      ],
    },
  },
  battlecraft: {
    pt: {
      discipline: "PLATAFORMA DE ESPORTS",
      summary: "Trazer as comunidades de esports para dentro do jogo.",
      description:
        "Uma plataforma de esports centrada em coleções de cartas digitais, criação de equipas e participação em ligas, com ferramentas de transmissão em direto e integrações com a Twitch.",
      features: [
        "Coleciona cartas de jogadores, cria equipas e compete nas classificações.",
        "Explora estatísticas de jogos, bónus de coleção, recompensas e passes de batalha.",
        "Liga a Twitch aos grafismos das transmissões em direto e às atualizações de donativos.",
      ],
    },
    fr: {
      discipline: "PLATEFORME D’ESPORT",
      summary: "Faire entrer les communautés d’esport dans le jeu.",
      description:
        "Une plateforme d’esport axée sur les collections de cartes numériques, la création d’équipes et la participation aux ligues, avec des outils de diffusion en direct et des intégrations Twitch.",
      features: [
        "Collectionne des cartes de joueurs, forme des équipes et grimpe au classement.",
        "Consulte les statistiques des matchs, les bonus de collection, les récompenses et les passes de combat.",
        "Relie Twitch aux habillages de diffusion en direct et aux notifications de dons.",
      ],
    },
    es: {
      discipline: "PLATAFORMA DE DEPORTES ELECTRÓNICOS",
      summary: "Llevar a las comunidades de esports al centro del juego.",
      description:
        "Una plataforma de esports centrada en las colecciones de cartas digitales, la creación de equipos y la participación en ligas, con herramientas de retransmisión en directo e integraciones con Twitch.",
      features: [
        "Colecciona cartas de jugadores, forma equipos y compite en las clasificaciones.",
        "Explora estadísticas de partidas, bonificaciones de colección, recompensas y pases de batalla.",
        "Conecta Twitch con los gráficos de las retransmisiones en directo y las actualizaciones de donaciones.",
      ],
    },
  },
};

export function localizeProject(project: Project, language: Language): Project {
  return language === "en"
    ? project
    : { ...project, ...projectCopy[project.theme]?.[language] };
}

type TimelineCopy = [title: string, description: string, place?: string];
export const timelineCopy: Record<string, Localized<TimelineCopy>> = {
  "Frontend Developer": {
    pt: [
      "Programador frontend",
      "Aplicações responsivas, integrações com APIs, grafismos para transmissões em direto e interfaces de monitorização em tempo real.",
    ],
    fr: [
      "Développeur front-end",
      "Applications adaptatives, intégrations d’API, habillages pour le direct et interfaces de suivi en temps réel.",
    ],
    es: [
      "Desarrollador frontend",
      "Aplicaciones adaptables, integraciones de API, gráficos para retransmisiones en directo e interfaces de monitorización en tiempo real.",
    ],
  },
  "Creative Lead": {
    pt: [
      "Responsável criativo",
      "Grafismos para transmissões, identidade visual de eventos, conteúdos para redes sociais e produção de vídeo.",
    ],
    fr: [
      "Responsable créatif",
      "Habillages de diffusion, identité visuelle d’événements, contenus pour les réseaux sociaux et production vidéo.",
    ],
    es: [
      "Responsable creativo",
      "Grafismos para retransmisiones, identidad visual de eventos, contenido para redes sociales y producción de vídeo.",
    ],
  },
  "Graphic Designer Intern": {
    pt: [
      "Estagiário de design gráfico",
      "Paginação editorial, fotografia de produto e materiais visuais para impressão e meios digitais.",
    ],
    fr: [
      "Stagiaire en design graphique",
      "Mise en page éditoriale, photographie de produits et visuels pour l’imprimé et le numérique.",
    ],
    es: [
      "Diseñador gráfico en prácticas",
      "Maquetación editorial, fotografía de producto y recursos visuales para impresión y medios digitales.",
    ],
  },
  "Designer, Photographer & Videographer": {
    pt: [
      "Designer, fotógrafo e videógrafo",
      "Fotografia, vídeo e campanhas criativas para vários clientes.",
      "Freelance",
    ],
    fr: [
      "Designer, photographe et vidéaste",
      "Photographie, vidéo et campagnes créatives pour différents clients.",
      "Indépendant",
    ],
    es: [
      "Diseñador, fotógrafo y videógrafo",
      "Fotografía, vídeo y campañas creativas para distintos clientes.",
      "Autónomo",
    ],
  },
  "Creative Media": {
    pt: [
      "Média criativos",
      "Uma etapa na Irlanda, dedicada a explorar os média criativos.",
      "DkIT · Irlanda",
    ],
    fr: [
      "Médias créatifs",
      "Une étape en Irlande pour explorer les médias créatifs.",
      "DkIT · Irlande",
    ],
    es: [
      "Medios creativos",
      "Una etapa en Irlanda para explorar los medios creativos.",
      "DkIT · Irlanda",
    ],
  },
  "Communication Technologies": {
    pt: [
      "Tecnologias da comunicação",
      "Formação de base em comunicação e tecnologia criativa.",
    ],
    fr: [
      "Technologies de la communication",
      "Une formation de base en communication et en technologies créatives.",
    ],
    es: [
      "Tecnologías de la comunicación",
      "Formación de base en comunicación y tecnología creativa.",
    ],
  },
  "Electrical Engineering": {
    pt: [
      "Engenharia eletrotécnica",
      "O início técnico de um percurso criativo.",
    ],
    fr: [
      "Génie électrique",
      "Le point de départ technique d’un parcours créatif.",
    ],
    es: [
      "Ingeniería eléctrica",
      "El comienzo técnico de una trayectoria creativa.",
    ],
  },
};

const galleryCopy: Record<number, Localized<string[]>> = {
  147865647: {
    pt: ["O meu showreel de 2022."],
    fr: ["Mon showreel de 2022."],
    es: ["Mi reel de 2022."],
  },
  239361333: {
    pt: ["Bodas de prata do Fernando e da Janaina."],
    fr: ["Les noces d’argent de Fernando et Janaina."],
    es: ["Las bodas de plata de Fernando y Janaina."],
  },
  132586495: {
    pt: [
      "Minidocumentário sobre o artista Pedro Cunha, criador das bandas desenhadas «The Glosling» e «Besta Negra», disponíveis no Webtoons.",
    ],
    fr: [
      "Mini-documentaire sur l’artiste Pedro Cunha, créateur des bandes dessinées « The Glosling » et « Besta Negra », disponibles sur Webtoons.",
    ],
    es: [
      "Minidocumental sobre el artista Pedro Cunha, creador de los cómics «The Glosling» y «Besta Negra», disponibles en Webtoons.",
    ],
  },
  123545447: {
    pt: [
      "Documentário de dois minutos sobre uma conversa com um amigo espanhol durante o meu Erasmus na Irlanda.",
    ],
    fr: [
      "Documentaire de deux minutes sur une conversation avec un ami espagnol pendant mon Erasmus en Irlande.",
    ],
    es: [
      "Documental de dos minutos sobre una conversación con un amigo español durante mi Erasmus en Irlanda.",
    ],
  },
  211075901: {
    pt: ["Design criado para a myface."],
    fr: ["Créations réalisées pour myface."],
    es: ["Diseños realizados para myface."],
  },
  112514371: {
    pt: [
      "Vídeo promocional para a marca de roupa Chère.",
      "Visita o site da marca em chere-chere.net.",
    ],
    fr: [
      "Vidéo promotionnelle pour la marque de vêtements Chère.",
      "Retrouve la marque sur chere-chere.net.",
    ],
    es: [
      "Vídeo promocional para la marca de ropa Chère.",
      "Visita la web de la marca en chere-chere.net.",
    ],
  },
  112881667: {
    pt: [
      "Curta-metragem para um trabalho académico. O desafio era incluir um excerto de Charlie Chaplin e explorar o conceito de cultura. (08/2019)",
      "Trabalhámos com recursos muito limitados, por isso a qualidade ficou aquém do que pretendíamos.",
    ],
    fr: [
      "Court métrage réalisé pour un projet d’études. Il fallait intégrer un extrait de Charlie Chaplin et explorer la notion de culture. (08/2019)",
      "Nous avions très peu de moyens, ce qui a limité la qualité du résultat.",
    ],
    es: [
      "Cortometraje para un trabajo académico. El reto era incluir un fragmento de Charlie Chaplin y explorar el concepto de cultura. (08/2019)",
      "Contábamos con muy pocos recursos, así que la calidad quedó por debajo de lo que buscábamos.",
    ],
  },
  112724007: {
    pt: ["Entrevistas a alunos da AESE sobre a sua experiência no curso."],
    fr: [
      "Entretiens avec des étudiants de l’AESE pour recueillir leur avis sur le cours.",
    ],
    es: [
      "Entrevistas a estudiantes de AESE para conocer su opinión sobre el curso.",
    ],
  },
  112720311: {
    pt: [
      "Vídeos promocionais para a Top Fashion. Vê mais em @topfashionpt no Instagram.",
    ],
    fr: [
      "Vidéos promotionnelles pour Top Fashion. Retrouvez-en d’autres sur @topfashionpt sur Instagram.",
    ],
    es: [
      "Vídeos promocionales para Top Fashion. Puedes ver más en @topfashionpt en Instagram.",
    ],
  },
  112714099: {
    pt: [
      "DESIGN ATUAL",
      "PROPOSTA DE NOVA IDENTIDADE",
      "Este projeto é uma proposta de reformulação da identidade de uma empresa existente, com a qual não tenho qualquer ligação.",
    ],
    fr: [
      "IDENTITÉ ACTUELLE",
      "PROPOSITION DE REFONTE",
      "Ce projet propose une nouvelle identité à une entreprise existante avec laquelle je n’ai aucun lien.",
    ],
    es: [
      "DISEÑO ACTUAL",
      "PROPUESTA DE REDISEÑO",
      "Este proyecto propone una nueva identidad para una empresa existente con la que no tengo ninguna relación.",
    ],
  },
  113188661: {
    pt: [
      "Proposta de design sonoro para um anúncio da McDonald’s.",
      "Este é um projeto conceptual para uma empresa existente, com a qual não tenho qualquer ligação.",
    ],
    fr: [
      "Proposition de design sonore pour une publicité McDonald’s.",
      "Il s’agit d’un projet conceptuel pour une entreprise existante avec laquelle je n’ai aucun lien.",
    ],
    es: [
      "Propuesta de diseño sonoro para un anuncio de McDonald’s.",
      "Es un proyecto conceptual para una empresa existente con la que no tengo ninguna relación.",
    ],
  },
  112886667: {
    pt: [
      "Propostas de artigos para explorar o design editorial a partir dos textos fornecidos.",
    ],
    fr: [
      "Maquettes d’articles pour explorer le design éditorial à partir des textes fournis.",
    ],
    es: [
      "Propuestas de artículos para explorar el diseño editorial a partir de los textos facilitados.",
    ],
  },
  112886751: {
    pt: ["Conceitos publicitários para o Vale do Douro e a SoundCloud."],
    fr: ["Concepts publicitaires pour la vallée du Douro et SoundCloud."],
    es: ["Conceptos publicitarios para el valle del Duero y SoundCloud."],
  },
  112725107: {
    pt: [
      "Conceito de campanha da IKEA sobre mobiliário conectado, com imagens de banco e Photoshop.",
      "É uma proposta conceptual para uma empresa existente, com a qual não tenho qualquer ligação.",
    ],
    fr: [
      "Concept de campagne IKEA sur le mobilier connecté, réalisé avec des images de stock et Photoshop.",
      "Ce projet est une proposition pour une entreprise existante avec laquelle je n’ai aucun lien.",
    ],
    es: [
      "Concepto de campaña de IKEA sobre mobiliario conectado, realizado con imágenes de archivo y Photoshop.",
      "Es una propuesta conceptual para una empresa existente con la que no tengo ninguna relación.",
    ],
  },
  106005597: {
    pt: ["Montagem baseada no anime Pokémon."],
    fr: ["Montage inspiré de l’anime Pokémon."],
    es: ["Montaje basado en el anime Pokémon."],
  },
  105951307: {
    pt: [
      "Ilustração de Nathaniel Dodson, do canal tutvid no YouTube, que recriei para um trabalho académico.",
    ],
    fr: [
      "Illustration de Nathaniel Dodson, de la chaîne YouTube tutvid, que j’ai reproduite pour un projet d’études.",
    ],
    es: [
      "Ilustración de Nathaniel Dodson, del canal de YouTube tutvid, que recreé para un trabajo académico.",
    ],
  },
  112879685: {
    pt: ["Espécime tipográfico criado para um trabalho académico."],
    fr: ["Spécimen typographique réalisé pour un projet d’études."],
    es: ["Espécimen tipográfico realizado para un trabajo académico."],
  },
};

export function galleryDescription(
  project: GalleryProject,
  language: Language,
) {
  if (language === "en") {
    return project.id === 132586495
      ? [
          "A short documentary about artist Pedro Cunha, creator of the comics The Glosling and Besta Negra, available on Webtoons.",
        ]
      : project.description;
  }
  return galleryCopy[project.id]?.[language] ?? project.description;
}

export const galleryCategoryMessage = {
  All: "categoryAll",
  Photography: "categoryPhotography",
  Design: "categoryDesign",
  "Film & sound": "categoryFilm",
} as const satisfies Record<GalleryCategory, Parameters<Translate>[0]>;

const imageDescriptions: Record<string, Localized<string>> = {
  "Image may contain: human face and person": {
    pt: "A imagem pode conter uma pessoa e um rosto humano",
    fr: "L’image peut montrer une personne et un visage humain",
    es: "La imagen puede mostrar a una persona y un rostro humano",
  },
  "Image may contain: screenshot": {
    pt: "A imagem pode conter uma captura de ecrã",
    fr: "L’image peut contenir une capture d’écran",
    es: "La imagen puede contener una captura de pantalla",
  },
  "Image may contain: book": {
    pt: "A imagem pode conter um livro",
    fr: "L’image peut montrer un livre",
    es: "La imagen puede mostrar un libro",
  },
  "Image may contain: person, christmas tree and holding": {
    pt: "A imagem pode mostrar uma pessoa a segurar algo e uma árvore de Natal",
    fr: "L’image peut montrer une personne tenant un objet et un sapin de Noël",
    es: "La imagen puede mostrar a una persona sosteniendo algo y un árbol de Navidad",
  },
  "Image may contain: art, screenshot and moon": {
    pt: "A imagem pode conter uma obra de arte, uma captura de ecrã e a Lua",
    fr: "L’image peut contenir de l’art, une capture d’écran et la Lune",
    es: "La imagen puede contener arte, una captura de pantalla y la Luna",
  },
  "Image may contain: poster": {
    pt: "A imagem pode conter um cartaz",
    fr: "L’image peut montrer une affiche",
    es: "La imagen puede mostrar un cartel",
  },
  "Image may contain: screenshot and abstract": {
    pt: "A imagem pode conter uma captura de ecrã e elementos abstratos",
    fr: "L’image peut contenir une capture d’écran et des éléments abstraits",
    es: "La imagen puede contener una captura de pantalla y elementos abstractos",
  },
};

export function galleryPhotoAlt(
  photo: GalleryPhoto,
  language: Language,
  t: Translate,
) {
  if (language === "en") return photo.alt;
  return (
    imageDescriptions[photo.alt]?.[language] ??
    t("galleryPhoto", { title: photo.title, number: photo.number })
  );
}

export function galleryVideoLabel(video: GalleryVideo, t: Translate) {
  if (video.label === "English") return t("english");
  if (video.label === "Portuguese") return t("portuguese");
  const numbered = /^Video (\d+)$/.exec(video.label);
  return numbered ? t("videoLabel", { number: numbered[1] }) : video.label;
}
