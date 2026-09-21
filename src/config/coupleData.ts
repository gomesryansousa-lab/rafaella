import { CoupleConfig } from '../types';

export const coupleData: CoupleConfig = {
  partnerName: "Rafaella",
  senderName: "Ryan",
  metDate: "2022-02-15",
  whatsapp: "5511999999999", // Número configurável (formato internacional com DDD, ex: 5511999999999)
  heroPhoto: "/Nós 1.jpeg",

  music: {
    title: "Velha Infância",
    artist: "Tribalistas",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/35/75/b0/3575b0ec-081c-51fe-e309-6b471db1350b/mzaf_4480844379824079165.plus.aac.p.m4a",
    coverImage: "/nós 2.jpeg"
  },

  timeline: [
    {
      id: "marco-1",
      date: "2022-02-15",
      displayDate: "Início de 2022",
      title: "O dia em que eu te vi pela primeira vez.",
      tag: "O Início",
      description: "Eu me lembro como se fosse hoje, você chegando com a Peixoto fazendo aquelas 3 perguntas que estavam em alta no auge de 2022. \"Me fala seu nome, sua idade e sua sexualidade.\" Ali eu não vou negar que te achei meio doidinha kkkk, mas no meio dessa suas perguntas que você fez pra mim. Surgiu a quarta, que era eu me perguntando. \"Como eu faço pra conseguir essa garota?.\"",
      details: "Eu não fazia ideia de que uma brincadeira de escola entre corredores e perguntas rápidas traria a pessoa mais marcante para os meus dias.",
      photo: "/year-2022.jpg"
    },
    {
      id: "marco-2",
      date: "2022-05-10",
      displayDate: "Nossos códigos",
      title: "“Qual é a graça?”",
      tag: "Nossa Piada",
      description: "A nossa piada do Coringa, a que ninguém mais entendia. Com você eu nunca precisei explicar nada.",
      details: "Bastava um olhar, uma entonação boba, e a gente já caía na risada. Era o nosso mundo particular dentro de qualquer multidão.",
      photo: "/coringa.jpg"
    },
    {
      id: "marco-3",
      date: "2022-09-20",
      displayDate: "Dias leves",
      title: "Tudo parecia mais leve com você.",
      tag: "Cumplicidade",
      description: "O fato de só sentimos saudades quando perdemos nunca fez tanto sentido quanto faz agora. Você era minha paz em meio caos, era a minha luz em meia escuridão e era minha princesa em meios tanto espinhos da vida.",
      highlightPhrase: "Você era minha paz em meio caos, era a minha luz em meia escuridão e era minha princesa em meios tanto espinhos da vida.",
      details: "Você tem um jeito único de fazer o tempo desacelerar e qualquer lugar parecer seguro e acolhedor.",
      photo: "/coracao-real.jpg"
    },
    {
      id: "marco-4",
      date: "2023-04-12",
      displayDate: "Construção",
      title: "Cada conversa, um tijolo",
      tag: "A Casa Que Erguemos",
      description: "Meses de confiança sincera, mensagens de bom dia, áudios intermináveis e a certeza de que tínhamos um ao outro.",
      details: "Construir algo com você sempre foi fácil e natural, porque sua presença sempre foi verdade e paz.",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop"
    }
  ],

  gallery: [
    {
      id: "gal-1",
      url: "/nós 3.jpeg",
      caption: "Aquele dia que eu não esqueço.",
      aspectRatio: "portrait",
      location: "São Paulo"
    },
    {
      id: "gal-2",
      url: "/nós 4.jpeg",
      caption: "Você deixava tudo mais leve.",
      aspectRatio: "portrait",
      location: "Em casa"
    },
    {
      id: "gal-3",
      url: "/nós 5.jpeg",
      caption: "Uma das minhas fotos preferidas.",
      aspectRatio: "portrait",
      location: "Praia"
    },
    {
      id: "gal-4",
      url: "/nós 6.jpeg",
      caption: "Um instante que ficou",
      aspectRatio: "landscape",
      location: "Momentos nossos"
    },
    {
      id: "gal-5",
      url: "/nós 7.jpeg",
      caption: "Uma lembrança boa...",
      aspectRatio: "portrait",
      location: "Para sempre gravado"
    }
  ],

  reasons: [
    {
      id: 1,
      number: "01",
      shortTitle: "Sua leveza",
      content: "O jeito que você deixa qualquer dia mais leve."
    },
    {
      id: 2,
      number: "02",
      shortTitle: "Sua alegria",
      content: "O seu riso."
    },
    {
      id: 3,
      number: "03",
      shortTitle: "Seu coração",
      content: "O jeito que você cuida de quem gosta."
    },
    {
      id: 4,
      number: "04",
      shortTitle: "O inesperado",
      content: "Como você chegou na minha vida: sem aviso, no meio de uma brincadeira."
    },
    {
      id: 5,
      number: "05",
      shortTitle: "Nossos segredos",
      content: "A nossa piada, que só a gente entendia."
    },
    {
      id: 6,
      number: "06",
      shortTitle: "A sua presença",
      content: "Como eu me sentia ao seu lado."
    }
  ],

  secretMessages: [
    {
      id: "easter-1",
      location: "No coração do início",
      hint: "Onde tudo começa",
      unlockedTitle: "Primeiro segredo",
      message: "Você achou. Eu sabia que você ia clicar aqui primeiro."
    },
    {
      id: "easter-2",
      location: "No rodapé discreto",
      hint: "No final de tudo",
      unlockedTitle: "Agradecimento honesto",
      message: "Se você chegou até aqui, obrigado de verdade. Só isso já é mais do que eu merecia."
    },
    {
      id: "easter-3",
      location: "No marco 'Qual é a graça?'",
      hint: "A nossa piada do Coringa",
      unlockedTitle: "Nossa piada",
      message: "A nossa piada do Coringa. Eu nunca vou esquecer."
    },
    {
      id: "easter-4",
      location: "Na quarta foto da galeria",
      hint: "Um retrato autêntico",
      unlockedTitle: "Foto preferida",
      message: "Essa é a minha preferida. Você estava tão você."
    },
    {
      id: "easter-5",
      location: "Na estrela central da constelação",
      hint: "O céu de fevereiro de 2022",
      unlockedTitle: "Aquele acaso",
      message: "O céu daquele fevereiro. O melhor acaso da minha vida."
    }
  ],

  secretUnsaidLetter: {
    teaser: "Agora, sem metáfora.",
    title: "Sem desculpas ou rodeios.",
    typewriterIntro: "Aquelas conversas que você viu.",
    content: [
      "Não existe explicação que faça aquilo ficar certo, e eu não vou insultar sua inteligência tentando inventar uma. As palavras foram minhas. A escolha de dizer foi minha.",
      "Você não exagerou. Você não entendeu errado. E tinha todo o direito de ir embora.",
      "Me desculpa, Rafaella. De verdade."
    ],
    closing: "Assumir o erro é o mínimo que você merece ouvir."
  },

  loveLetter: {
    title: "Uma carta para você",
    date: "Escrita com respeito e honestidade",
    paragraphs: [
      "Se eu pudesse te dar qualquer coisa neste exato momento, eu não te daria flores, presentes ou qualquer coisa que o dinheiro pudesse comprar. Eu te daria a capacidade de enxergar através dos meus olhos.",
      "Queria que, por um instante, você pudesse olhar para mim do jeito que eu sempre olhei para você. Queria que enxergasse tudo aquilo que eu senti, tudo aquilo que guardei, cada momento em que você foi importante para mim, cada detalhe seu que ficou marcado em mim e, principalmente, o quanto você significou e ainda significa.",
      "E se, mesmo olhando através dos meus olhos, você ainda não conseguisse enxergar a forma como eu te vejo, eu arrancaria meus próprios olhos e os colocaria em você. Mesmo sabendo que, depois disso, eu nunca mais enxergaria o mundo da mesma maneira.",
      "Porque, se fosse preciso ficar cego para que você pudesse finalmente enxergar o que existiu dentro de mim, eu escolheria a cegueira.",
      "Mas talvez essa seja a parte mais dolorosa de tudo: eu queria que você pudesse enxergar o meu coração sem que eu precisasse arrancá-lo do peito para te entregar.",
      "Eu sei que você viu coisas que te machucaram. Sei que algumas palavras minhas, mesmo não tendo representado uma traição, foram infantis, desnecessárias e capazes de fazer você questionar aquilo que eu sentia por você. E eu não quero diminuir a sua dor nem fingir que aquilo não teve peso.",
      "Eu só queria que você soubesse que aquelas palavras não são maiores do que tudo aquilo que eu vivi, senti e construí ao seu lado.",
      "Se eu pudesse voltar naquele momento, eu escolheria cada palavra diferente. Não porque agora eu tenha medo de te perder, mas porque hoje eu consigo enxergar o quanto algumas atitudes podem ferir justamente a pessoa que a gente mais queria proteger.",
      "E talvez seja isso que eu mais queria que você enxergasse através dos meus olhos: não um homem perfeito, porque eu nunca fui. Mas alguém que errou, reconheceu o próprio erro e que, apesar de tudo, nunca deixou de sentir por você aquilo que sentia quando olhava nos seus olhos.",
      "Eu não quero que você se lembre apenas do meu pior momento. Eu queria que, antes de decidir o que eu fui para você, você lembrasse também de tudo aquilo que nós fomos um para o outro."
    ],
    signOff: "Ryan"
  },

  constellation: {
    title: "O céu naquela noite",
    date: "Fevereiro de 2022",
    description: "O universo estava exatamente assim quando você chegou na minha vida."
  },

  finalSection: {
    paragraphs: [
      "Eu poderia ter escrito milhares de palavras…",
      "poderia ter colocado milhares de fotos…",
      "mas nada disso desfaz o que eu fiz.",
      "Só me resta pedir desculpa. E dizer que, se um dia você quiser, eu adoraria uma chance.",
      "No seu tempo. Sem pressa. Sem cobrança. Pra podermos realizar o vídeo de fundo."
    ],
    closingNotes: [
      "Com sinceridade, Ryan",
      "A decisão é sempre sua."
    ],
    ctaButton: "Conversar com o Ryan",
    whatsappPrompt: "Sem pressão, sem textão. Só se você quiser.",
    whatsappDefaultText: "Oi, Ryan. Eu li o site."
  }
};
