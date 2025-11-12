// Dados de treinos para casa
export interface Exercise {
  id: string;
  name: string;
  category: 'cardio' | 'forca' | 'flexibilidade' | 'core';
  equipment: string;
  duration: string;
  calories: number;
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  description: string;
  instructions: string[];
  videoUrl: string; // URL do vídeo demonstrativo
}

export const workouts: Exercise[] = [
  // CARDIO
  {
    id: '1',
    name: 'Polichinelos',
    category: 'cardio',
    equipment: 'Nenhum',
    duration: '3 minutos',
    calories: 30,
    difficulty: 'iniciante',
    description: 'Exercício cardiovascular clássico que queima calorias rapidamente',
    instructions: [
      'Fique em pé com os pés juntos',
      'Pule abrindo as pernas e levantando os braços',
      'Retorne à posição inicial',
      'Mantenha ritmo constante'
    ],
    videoUrl: 'https://www.youtube.com/embed/2W4ZNSwoW_4'
  },
  {
    id: '2',
    name: 'Burpees',
    category: 'cardio',
    equipment: 'Nenhum',
    duration: '5 minutos',
    calories: 50,
    difficulty: 'avancado',
    description: 'Exercício completo que trabalha corpo inteiro e queima muitas calorias',
    instructions: [
      'Comece em pé',
      'Agache e apoie as mãos no chão',
      'Jogue as pernas para trás (prancha)',
      'Faça uma flexão',
      'Pule voltando à posição de agachamento',
      'Pule para cima com os braços estendidos'
    ],
    videoUrl: 'https://www.youtube.com/embed/JZQA08SlJnM'
  },
  {
    id: '3',
    name: 'Corrida Estacionária',
    category: 'cardio',
    equipment: 'Nenhum',
    duration: '10 minutos',
    calories: 80,
    difficulty: 'iniciante',
    description: 'Simula corrida sem sair do lugar, ótimo para aquecimento',
    instructions: [
      'Fique em pé',
      'Levante os joelhos alternadamente',
      'Balance os braços naturalmente',
      'Mantenha ritmo constante'
    ],
    videoUrl: 'https://www.youtube.com/embed/hGvyEg4q8KM'
  },
  
  // FORÇA
  {
    id: '4',
    name: 'Flexões',
    category: 'forca',
    equipment: 'Nenhum',
    duration: '3 séries de 15',
    calories: 40,
    difficulty: 'intermediario',
    description: 'Fortalece peito, ombros e tríceps',
    instructions: [
      'Posição de prancha com mãos no chão',
      'Desça o corpo mantendo-o reto',
      'Empurre de volta para cima',
      'Mantenha core contraído'
    ],
    videoUrl: 'https://www.youtube.com/embed/IODxDxX7oi4'
  },
  {
    id: '5',
    name: 'Agachamento com Garrafa',
    category: 'forca',
    equipment: 'Garrafa de água (2L)',
    duration: '4 séries de 12',
    calories: 60,
    difficulty: 'intermediario',
    description: 'Fortalece pernas e glúteos usando peso improvisado',
    instructions: [
      'Segure garrafa próxima ao peito',
      'Pés na largura dos ombros',
      'Agache como se fosse sentar',
      'Mantenha costas retas',
      'Suba empurrando pelos calcanhares'
    ],
    videoUrl: 'https://www.youtube.com/embed/YaXPRqUwItQ'
  },
  {
    id: '6',
    name: 'Prancha',
    category: 'core',
    equipment: 'Nenhum',
    duration: '3x 60 segundos',
    calories: 25,
    difficulty: 'iniciante',
    description: 'Fortalece abdômen e core completo',
    instructions: [
      'Apoie antebraços e pontas dos pés',
      'Corpo reto da cabeça aos pés',
      'Contraia abdômen',
      'Mantenha posição sem deixar quadril cair'
    ],
    videoUrl: 'https://www.youtube.com/embed/pSHjTRCQxIw'
  },
  {
    id: '7',
    name: 'Rosca com Mochila',
    category: 'forca',
    equipment: 'Mochila com livros',
    duration: '3 séries de 15',
    calories: 35,
    difficulty: 'intermediario',
    description: 'Fortalece bíceps usando peso improvisado',
    instructions: [
      'Segure mochila com as mãos',
      'Braços estendidos ao lado do corpo',
      'Flexione cotovelos levantando mochila',
      'Desça controladamente'
    ],
    videoUrl: 'https://www.youtube.com/embed/sAq_ocpRh_I'
  },
  
  // CORE
  {
    id: '8',
    name: 'Abdominais',
    category: 'core',
    equipment: 'Nenhum',
    duration: '3 séries de 20',
    calories: 30,
    difficulty: 'iniciante',
    description: 'Fortalece reto abdominal',
    instructions: [
      'Deite de costas, joelhos dobrados',
      'Mãos atrás da cabeça',
      'Levante tronco em direção aos joelhos',
      'Desça controladamente'
    ],
    videoUrl: 'https://www.youtube.com/embed/1fbU_MkV7NE'
  },
  {
    id: '9',
    name: 'Mountain Climbers',
    category: 'core',
    equipment: 'Nenhum',
    duration: '4 minutos',
    calories: 45,
    difficulty: 'intermediario',
    description: 'Trabalha core e cardio simultaneamente',
    instructions: [
      'Posição de prancha',
      'Traga joelho direito ao peito',
      'Alterne rapidamente com joelho esquerdo',
      'Mantenha quadril baixo'
    ],
    videoUrl: 'https://www.youtube.com/embed/nmwgirgXLYM'
  },
  
  // FLEXIBILIDADE
  {
    id: '10',
    name: 'Alongamento de Pernas',
    category: 'flexibilidade',
    equipment: 'Toalha',
    duration: '10 minutos',
    calories: 15,
    difficulty: 'iniciante',
    description: 'Melhora flexibilidade e previne lesões',
    instructions: [
      'Sente com pernas estendidas',
      'Use toalha nos pés para puxar',
      'Incline-se para frente suavemente',
      'Segure por 30 segundos cada lado'
    ],
    videoUrl: 'https://www.youtube.com/embed/g_tea8ZNk5A'
  },
  {
    id: '11',
    name: 'Yoga Básico',
    category: 'flexibilidade',
    equipment: 'Tapete ou toalha',
    duration: '15 minutos',
    calories: 40,
    difficulty: 'iniciante',
    description: 'Sequência de posturas para flexibilidade e relaxamento',
    instructions: [
      'Cachorro olhando para baixo',
      'Guerreiro I e II',
      'Triângulo',
      'Criança (descanso)',
      'Respire profundamente em cada postura'
    ],
    videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE'
  }
];

export const workoutPrograms = [
  {
    id: 'beginner',
    name: 'Iniciante - 30 Dias',
    description: 'Programa completo para quem está começando',
    duration: '30 dias',
    frequency: '3x por semana',
    exercises: ['1', '3', '4', '6', '8', '10']
  },
  {
    id: 'intermediate',
    name: 'Intermediário - Queima Total',
    description: 'Intensifique seus treinos e queime mais calorias',
    duration: '45 dias',
    frequency: '4x por semana',
    exercises: ['2', '4', '5', '7', '9', '11']
  },
  {
    id: 'advanced',
    name: 'Avançado - Beast Mode',
    description: 'Para quem quer resultados máximos',
    duration: '60 dias',
    frequency: '5x por semana',
    exercises: ['2', '4', '5', '7', '9']
  }
];
