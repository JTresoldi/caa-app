export const PICTOGRAM_SECTIONS = [
  { id: 'favorites', label: 'Favoritos', icon: '⭐' },
  { id: 'quick-messages', label: 'Mensagens rápidas', icon: '⚡' },
  { id: 'core', label: 'Essenciais', icon: '💬' },
  { id: 'actions', label: 'Ações', icon: '🏃' },
  { id: 'foods', label: 'Alimentos', icon: '🍎' },
  { id: 'drinks', label: 'Bebidas', icon: '🥤' },
  { id: 'feelings', label: 'Sentimentos', icon: '😊' },
  { id: 'body-pain', label: 'Corpo/Dor', icon: '🩹' },
  { id: 'people', label: 'Pessoas', icon: '👥' },
  { id: 'activities', label: 'Atividades', icon: '🎯' },
  { id: 'places', label: 'Lugares', icon: '📍' },
  { id: 'objects', label: 'Objetos', icon: '🧸' },
] as const;

export type PictogramSection = (typeof PICTOGRAM_SECTIONS)[number];
export type PictogramSectionId = PictogramSection['id'];
export type PictogramCategory = Exclude<PictogramSectionId, 'favorites'>;
export type PictogramBehavior = 'sentence' | 'immediate';

export type PictogramImage = {
  uri: string;
  alt: string;
};

export type Pictogram = {
  id: string;
  label: string;
  spokenText: string;
  order: number;
  behavior: PictogramBehavior;
  emoji?: string;
  image?: PictogramImage;
  backgroundColor: string;
  category: PictogramCategory;
  isFavorite: boolean;
};

export const PICTOGRAMS: Pictogram[] = [
  // Essenciais
  { id: 'eu', label: 'Eu', spokenText: 'Eu', order: 1, behavior: 'sentence', emoji: '🙋', backgroundColor: '#FFF0BE', category: 'core', isFavorite: false },
  { id: 'voce', label: 'Você', spokenText: 'Você', order: 2, behavior: 'sentence', emoji: '🫵', backgroundColor: '#DCEBFF', category: 'core', isFavorite: false },
  { id: 'quero', label: 'Quero', spokenText: 'Quero', order: 3, behavior: 'sentence', emoji: '🫶', backgroundColor: '#DDF3D6', category: 'core', isFavorite: false },
  { id: 'nao-frase', label: 'Não', spokenText: 'Não', order: 4, behavior: 'sentence', emoji: '🚫', backgroundColor: '#FFD7D4', category: 'core', isFavorite: false },
  { id: 'mais', label: 'Mais', spokenText: 'Mais', order: 5, behavior: 'sentence', emoji: '➕', backgroundColor: '#D5F2EC', category: 'core', isFavorite: false },
  { id: 'acabou', label: 'Acabou', spokenText: 'Acabou', order: 6, behavior: 'sentence', emoji: '🏁', backgroundColor: '#E7ECF3', category: 'core', isFavorite: false },
  { id: 'aqui', label: 'Aqui', spokenText: 'Aqui', order: 7, behavior: 'sentence', emoji: '👇', backgroundColor: '#FFF0C7', category: 'core', isFavorite: false },
  { id: 'ali', label: 'Ali', spokenText: 'Ali', order: 8, behavior: 'sentence', emoji: '👉', backgroundColor: '#FFE1C7', category: 'core', isFavorite: false },
  { id: 'isso', label: 'Isso', spokenText: 'Isso', order: 9, behavior: 'sentence', emoji: '☝️', backgroundColor: '#E8F3FA', category: 'core', isFavorite: false },
  { id: 'gostar', label: 'Gostar', spokenText: 'Gostar', order: 10, behavior: 'sentence', emoji: '❤️', backgroundColor: '#FFDCDC', category: 'core', isFavorite: false },
  { id: 'nao-gostar', label: 'Não gostar', spokenText: 'Não gostar', order: 11, behavior: 'sentence', emoji: '💔', backgroundColor: '#F4D8E6', category: 'core', isFavorite: false },
  { id: 'fazer', label: 'Fazer', spokenText: 'Fazer', order: 12, behavior: 'sentence', emoji: '🛠️', backgroundColor: '#F1E9D8', category: 'core', isFavorite: false },
  { id: 'ir', label: 'Ir', spokenText: 'Ir', order: 13, behavior: 'sentence', emoji: '🚶', backgroundColor: '#DCEBFF', category: 'core', isFavorite: false },
  { id: 'ter', label: 'Ter', spokenText: 'Ter', order: 14, behavior: 'sentence', emoji: '🤲', backgroundColor: '#DDF5E3', category: 'core', isFavorite: false },

  // Ações
  { id: 'comer', label: 'Comer', spokenText: 'Comer', order: 1, behavior: 'sentence', emoji: '🍽️', backgroundColor: '#E7D9F5', category: 'actions', isFavorite: false },
  { id: 'beber', label: 'Beber', spokenText: 'Beber', order: 2, behavior: 'sentence', emoji: '🥤', backgroundColor: '#D8F3FF', category: 'actions', isFavorite: false },
  { id: 'brincar', label: 'Brincar', spokenText: 'Brincar', order: 3, behavior: 'sentence', emoji: '🧸', backgroundColor: '#FFF0C7', category: 'actions', isFavorite: false },
  { id: 'dormir', label: 'Dormir', spokenText: 'Dormir', order: 4, behavior: 'sentence', emoji: '😴', backgroundColor: '#FFE0B8', category: 'actions', isFavorite: false },
  { id: 'falar', label: 'Falar', spokenText: 'Falar', order: 5, behavior: 'sentence', emoji: '🗣️', backgroundColor: '#DDF5E3', category: 'actions', isFavorite: false },
  { id: 'abrir', label: 'Abrir', spokenText: 'Abrir', order: 6, behavior: 'sentence', emoji: '🔓', backgroundColor: '#DCEBFF', category: 'actions', isFavorite: false },
  { id: 'fechar', label: 'Fechar', spokenText: 'Fechar', order: 7, behavior: 'sentence', emoji: '🔒', backgroundColor: '#E7ECF3', category: 'actions', isFavorite: false },

  // Alimentos
  { id: 'arroz', label: 'Arroz', spokenText: 'Arroz', order: 1, behavior: 'sentence', emoji: '🍚', backgroundColor: '#F1E9D8', category: 'foods', isFavorite: false },
  { id: 'pao', label: 'Pão', spokenText: 'Pão', order: 2, behavior: 'sentence', emoji: '🍞', backgroundColor: '#FFE2B8', category: 'foods', isFavorite: false },
  { id: 'maca', label: 'Maçã', spokenText: 'Maçã', order: 3, behavior: 'sentence', emoji: '🍎', backgroundColor: '#FFD9D4', category: 'foods', isFavorite: false },
  { id: 'banana', label: 'Banana', spokenText: 'Banana', order: 4, behavior: 'sentence', emoji: '🍌', backgroundColor: '#FFF0BE', category: 'foods', isFavorite: false },
  { id: 'bolacha', label: 'Bolacha', spokenText: 'Bolacha', order: 5, behavior: 'sentence', emoji: '🍪', backgroundColor: '#FFE1C7', category: 'foods', isFavorite: false },
  { id: 'macarrao', label: 'Macarrão', spokenText: 'Macarrão', order: 6, behavior: 'sentence', emoji: '🍝', backgroundColor: '#FFF0C7', category: 'foods', isFavorite: false },

  // Bebidas
  { id: 'agua', label: 'Água', spokenText: 'Água', order: 1, behavior: 'sentence', emoji: '💧', backgroundColor: '#CFEAFF', category: 'drinks', isFavorite: false },
  { id: 'leite', label: 'Leite', spokenText: 'Leite', order: 2, behavior: 'sentence', emoji: '🥛', backgroundColor: '#E8F3FA', category: 'drinks', isFavorite: false },
  { id: 'suco', label: 'Suco', spokenText: 'Suco', order: 3, behavior: 'sentence', emoji: '🧃', backgroundColor: '#FFE7C8', category: 'drinks', isFavorite: false },

  // Pessoas
  { id: 'mae', label: 'Mãe', spokenText: 'Mãe', order: 1, behavior: 'sentence', emoji: '👩', backgroundColor: '#F7D7E7', category: 'people', isFavorite: false },
  { id: 'pai', label: 'Pai', spokenText: 'Pai', order: 2, behavior: 'sentence', emoji: '👨', backgroundColor: '#DCEBFF', category: 'people', isFavorite: false },
  { id: 'vovo', label: 'Vovó', spokenText: 'Vovó', order: 3, behavior: 'sentence', emoji: '👵', backgroundColor: '#F4D8E6', category: 'people', isFavorite: false },
  { id: 'professor', label: 'Professor', spokenText: 'Professor', order: 4, behavior: 'sentence', emoji: '🧑‍🏫', backgroundColor: '#DDF3D6', category: 'people', isFavorite: false },
  { id: 'terapeuta', label: 'Terapeuta', spokenText: 'Terapeuta', order: 5, behavior: 'sentence', emoji: '🧑‍⚕️', backgroundColor: '#E8F3FA', category: 'people', isFavorite: false },

  // Sentimentos
  { id: 'feliz', label: 'Feliz', spokenText: 'Feliz', order: 1, behavior: 'sentence', emoji: '😊', backgroundColor: '#FFF0BE', category: 'feelings', isFavorite: false },
  { id: 'triste', label: 'Triste', spokenText: 'Triste', order: 2, behavior: 'sentence', emoji: '😢', backgroundColor: '#D8F3FF', category: 'feelings', isFavorite: false },
  { id: 'bravo', label: 'Bravo', spokenText: 'Bravo', order: 3, behavior: 'sentence', emoji: '😠', backgroundColor: '#FFD7D4', category: 'feelings', isFavorite: false },
  { id: 'com-medo', label: 'Com medo', spokenText: 'Com medo', order: 4, behavior: 'sentence', emoji: '😨', backgroundColor: '#E7D9F5', category: 'feelings', isFavorite: false },
  { id: 'cansado', label: 'Cansado', spokenText: 'Cansado', order: 5, behavior: 'sentence', emoji: '🥱', backgroundColor: '#FFE0B8', category: 'feelings', isFavorite: false },

  // Corpo/Dor
  { id: 'cabeca', label: 'Cabeça', spokenText: 'Cabeça', order: 1, behavior: 'sentence', emoji: '🧠', backgroundColor: '#F7D7E7', category: 'body-pain', isFavorite: false },
  { id: 'barriga', label: 'Barriga', spokenText: 'Barriga', order: 2, behavior: 'sentence', emoji: '🫄', backgroundColor: '#FFE1C7', category: 'body-pain', isFavorite: false },
  { id: 'boca', label: 'Boca', spokenText: 'Boca', order: 3, behavior: 'sentence', emoji: '👄', backgroundColor: '#FFD7D4', category: 'body-pain', isFavorite: false },
  { id: 'ouvido', label: 'Ouvido', spokenText: 'Ouvido', order: 4, behavior: 'sentence', emoji: '👂', backgroundColor: '#FFF0BE', category: 'body-pain', isFavorite: false },
  { id: 'mao', label: 'Mão', spokenText: 'Mão', order: 5, behavior: 'sentence', emoji: '✋', backgroundColor: '#DDF3D6', category: 'body-pain', isFavorite: false },
  { id: 'dor', label: 'Dor', spokenText: 'Dor', order: 6, behavior: 'sentence', emoji: '🩹', backgroundColor: '#FFDCDC', category: 'body-pain', isFavorite: false },

  // Atividades
  { id: 'desenhar', label: 'Desenhar', spokenText: 'Desenhar', order: 1, behavior: 'sentence', emoji: '🎨', backgroundColor: '#E7D9F5', category: 'activities', isFavorite: false },
  { id: 'assistir', label: 'Assistir', spokenText: 'Assistir', order: 2, behavior: 'sentence', emoji: '📺', backgroundColor: '#DCEBFF', category: 'activities', isFavorite: false },
  { id: 'ouvir-musica', label: 'Ouvir música', spokenText: 'Ouvir música', order: 3, behavior: 'sentence', emoji: '🎵', backgroundColor: '#F4D8E6', category: 'activities', isFavorite: false },
  { id: 'passear', label: 'Passear', spokenText: 'Passear', order: 4, behavior: 'sentence', emoji: '🌳', backgroundColor: '#DDF3D6', category: 'activities', isFavorite: false },

  // Lugares
  { id: 'casa', label: 'Casa', spokenText: 'Casa', order: 1, behavior: 'sentence', emoji: '🏠', backgroundColor: '#FFF0C7', category: 'places', isFavorite: false },
  { id: 'escola', label: 'Escola', spokenText: 'Escola', order: 2, behavior: 'sentence', emoji: '🏫', backgroundColor: '#DCEBFF', category: 'places', isFavorite: false },
  { id: 'banheiro', label: 'Banheiro', spokenText: 'Banheiro', order: 3, behavior: 'sentence', emoji: '🚻', backgroundColor: '#F7D7E7', category: 'places', isFavorite: false },
  { id: 'parque', label: 'Parque', spokenText: 'Parque', order: 4, behavior: 'sentence', emoji: '🛝', backgroundColor: '#DDF3D6', category: 'places', isFavorite: false },

  // Objetos
  { id: 'celular', label: 'Celular', spokenText: 'Celular', order: 1, behavior: 'sentence', emoji: '📱', backgroundColor: '#DCEBFF', category: 'objects', isFavorite: false },
  { id: 'brinquedo', label: 'Brinquedo', spokenText: 'Brinquedo', order: 2, behavior: 'sentence', emoji: '🧸', backgroundColor: '#FFF0C7', category: 'objects', isFavorite: false },
  { id: 'bola', label: 'Bola', spokenText: 'Bola', order: 3, behavior: 'sentence', emoji: '⚽', backgroundColor: '#DDF3D6', category: 'objects', isFavorite: false },
  { id: 'livro', label: 'Livro', spokenText: 'Livro', order: 4, behavior: 'sentence', emoji: '📖', backgroundColor: '#E7D9F5', category: 'objects', isFavorite: false },

  // Mensagens rápidas
  { id: 'sim', label: 'Sim', spokenText: 'Sim', order: 1, behavior: 'immediate', emoji: '👍', backgroundColor: '#D5F2EC', category: 'quick-messages', isFavorite: false },
  { id: 'nao', label: 'Não', spokenText: 'Não', order: 2, behavior: 'immediate', emoji: '👎', backgroundColor: '#FFD7D4', category: 'quick-messages', isFavorite: false },
  { id: 'pare', label: 'Pare', spokenText: 'Pare', order: 3, behavior: 'immediate', emoji: '✋', backgroundColor: '#FFE1C7', category: 'quick-messages', isFavorite: false },
  { id: 'ajuda', label: 'Preciso de ajuda', spokenText: 'Preciso de ajuda', order: 4, behavior: 'immediate', emoji: '🆘', backgroundColor: '#FFDCDC', category: 'quick-messages', isFavorite: false },
  { id: 'estou-com-dor', label: 'Estou com dor', spokenText: 'Estou com dor', order: 5, behavior: 'immediate', emoji: '🤕', backgroundColor: '#F4D8E6', category: 'quick-messages', isFavorite: false },
  { id: 'quero-ir-embora', label: 'Quero ir embora', spokenText: 'Quero ir embora', order: 6, behavior: 'immediate', emoji: '🚪', backgroundColor: '#DCEBFF', category: 'quick-messages', isFavorite: false },
  { id: 'nao-entendi', label: 'Não entendi', spokenText: 'Não entendi', order: 7, behavior: 'immediate', emoji: '❓', backgroundColor: '#FFF0BE', category: 'quick-messages', isFavorite: false },
  { id: 'espere', label: 'Espere', spokenText: 'Espere', order: 8, behavior: 'immediate', emoji: '⏳', backgroundColor: '#E8F3FA', category: 'quick-messages', isFavorite: false },
];
