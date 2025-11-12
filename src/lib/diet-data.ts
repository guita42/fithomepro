// Dados de nutrição e dieta
export interface Meal {
  id: string;
  name: string;
  type: 'cafe' | 'almoco' | 'jantar' | 'lanche';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  preparation: string;
}

export interface DietPlan {
  id: string;
  name: string;
  goal: 'perder-peso' | 'ganhar-massa' | 'manter';
  dailyCalories: number;
  description: string;
  meals: string[];
}

export const meals: Meal[] = [
  // CAFÉ DA MANHÃ
  {
    id: 'm1',
    name: 'Café Energético',
    type: 'cafe',
    calories: 350,
    protein: 20,
    carbs: 45,
    fats: 10,
    ingredients: [
      '2 fatias de pão integral',
      '2 ovos mexidos',
      '1 banana',
      'Café sem açúcar'
    ],
    preparation: 'Prepare os ovos mexidos com pouco óleo. Torre o pão. Sirva com a banana e café.'
  },
  {
    id: 'm2',
    name: 'Café Proteico',
    type: 'cafe',
    calories: 400,
    protein: 30,
    carbs: 40,
    fats: 12,
    ingredients: [
      '1 xícara de aveia',
      '1 scoop de whey protein (ou 200ml leite)',
      '1 colher de pasta de amendoim',
      'Frutas vermelhas'
    ],
    preparation: 'Cozinhe a aveia com água. Adicione o whey/leite, pasta de amendoim e frutas.'
  },
  
  // ALMOÇO
  {
    id: 'm3',
    name: 'Almoço Balanceado',
    type: 'almoco',
    calories: 550,
    protein: 40,
    carbs: 60,
    fats: 15,
    ingredients: [
      '150g de frango grelhado',
      '1 xícara de arroz integral',
      'Salada verde à vontade',
      '1 colher de azeite'
    ],
    preparation: 'Grelhe o frango com temperos. Cozinhe o arroz. Monte o prato com salada e regue com azeite.'
  },
  {
    id: 'm4',
    name: 'Almoço Vegetariano',
    type: 'almoco',
    calories: 500,
    protein: 25,
    carbs: 70,
    fats: 12,
    ingredients: [
      '1 xícara de grão de bico',
      'Batata doce assada',
      'Brócolis no vapor',
      'Tomate e cebola'
    ],
    preparation: 'Cozinhe o grão de bico. Asse a batata doce. Cozinhe brócolis no vapor. Tempere com limão.'
  },
  
  // JANTAR
  {
    id: 'm5',
    name: 'Jantar Leve',
    type: 'jantar',
    calories: 400,
    protein: 35,
    carbs: 30,
    fats: 15,
    ingredients: [
      '150g de peixe grelhado',
      'Legumes assados (abobrinha, cenoura)',
      'Salada verde',
      'Azeite e limão'
    ],
    preparation: 'Grelhe o peixe. Asse os legumes com temperos. Monte o prato com salada.'
  },
  {
    id: 'm6',
    name: 'Jantar Proteico',
    type: 'jantar',
    calories: 450,
    protein: 40,
    carbs: 35,
    fats: 18,
    ingredients: [
      '2 ovos cozidos',
      '100g de atum',
      'Salada de folhas',
      'Tomate, pepino, cenoura'
    ],
    preparation: 'Cozinhe os ovos. Misture atum com salada. Tempere com azeite e vinagre.'
  },
  
  // LANCHES
  {
    id: 'm7',
    name: 'Lanche Pré-Treino',
    type: 'lanche',
    calories: 200,
    protein: 10,
    carbs: 30,
    fats: 5,
    ingredients: [
      '1 banana',
      '1 colher de pasta de amendoim',
      'Aveia'
    ],
    preparation: 'Corte a banana, adicione pasta de amendoim e polvilhe aveia.'
  },
  {
    id: 'm8',
    name: 'Lanche Pós-Treino',
    type: 'lanche',
    calories: 250,
    protein: 25,
    carbs: 25,
    fats: 5,
    ingredients: [
      '1 scoop whey protein (ou 300ml leite)',
      '1 fruta (maçã ou banana)',
      'Castanhas (5 unidades)'
    ],
    preparation: 'Bata o whey com água/leite. Coma a fruta e castanhas.'
  },
  {
    id: 'm9',
    name: 'Lanche Saudável',
    type: 'lanche',
    calories: 180,
    protein: 8,
    carbs: 20,
    fats: 8,
    ingredients: [
      'Iogurte natural',
      'Granola',
      'Mel',
      'Frutas picadas'
    ],
    preparation: 'Misture iogurte com granola, mel e frutas.'
  }
];

export const dietPlans: DietPlan[] = [
  {
    id: 'weight-loss',
    name: 'Perda de Peso',
    goal: 'perder-peso',
    dailyCalories: 1800,
    description: 'Déficit calórico controlado para perda de gordura saudável',
    meals: ['m1', 'm3', 'm5', 'm7']
  },
  {
    id: 'muscle-gain',
    name: 'Ganho de Massa',
    goal: 'ganhar-massa',
    dailyCalories: 2500,
    description: 'Superávit calórico com alto teor proteico para hipertrofia',
    meals: ['m2', 'm3', 'm6', 'm7', 'm8']
  },
  {
    id: 'maintenance',
    name: 'Manutenção',
    goal: 'manter',
    dailyCalories: 2000,
    description: 'Dieta balanceada para manter peso e saúde',
    meals: ['m1', 'm4', 'm5', 'm9']
  }
];

export const nutritionTips = [
  {
    title: 'Proteínas',
    description: 'Essenciais para construção muscular',
    sources: ['Frango', 'Peixe', 'Ovos', 'Feijão', 'Lentilha', 'Grão de bico'],
    dailyAmount: '1.6-2g por kg de peso corporal'
  },
  {
    title: 'Carboidratos',
    description: 'Fonte principal de energia',
    sources: ['Arroz integral', 'Batata doce', 'Aveia', 'Pão integral', 'Frutas'],
    dailyAmount: '3-5g por kg de peso corporal'
  },
  {
    title: 'Gorduras Saudáveis',
    description: 'Importantes para hormônios e saúde',
    sources: ['Azeite', 'Abacate', 'Castanhas', 'Amendoim', 'Salmão'],
    dailyAmount: '0.8-1g por kg de peso corporal'
  },
  {
    title: 'Hidratação',
    description: 'Fundamental para performance',
    sources: ['Água', 'Água de coco', 'Chás naturais'],
    dailyAmount: '35ml por kg de peso corporal'
  }
];
