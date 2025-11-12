export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Abaixo do peso';
  if (bmi < 25) return 'Peso normal';
  if (bmi < 30) return 'Sobrepeso';
  return 'Obesidade';
}

export function calculateDailyCalories(
  weight: number,
  height: number,
  age: number,
  gender: string,
  activityLevel: string,
  goal: 'lose' | 'maintain' | 'gain'
): number {
  // Fórmula de Harris-Benedict
  let bmr: number;
  
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  // Multiplicador de atividade
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };

  const tdee = bmr * (activityMultipliers[activityLevel] || 1.2);

  // Ajuste baseado no objetivo
  if (goal === 'lose') return Math.round(tdee - 500); // Déficit de 500 calorias
  if (goal === 'gain') return Math.round(tdee + 300); // Superávit de 300 calorias
  return Math.round(tdee);
}

export function calculateMacros(calories: number, goal: 'lose' | 'maintain' | 'gain') {
  let proteinPercent = 0.30;
  let carbPercent = 0.40;
  let fatPercent = 0.30;

  if (goal === 'lose') {
    proteinPercent = 0.35;
    carbPercent = 0.35;
    fatPercent = 0.30;
  } else if (goal === 'gain') {
    proteinPercent = 0.30;
    carbPercent = 0.45;
    fatPercent = 0.25;
  }

  return {
    protein: Math.round((calories * proteinPercent) / 4), // 4 calorias por grama
    carbs: Math.round((calories * carbPercent) / 4),
    fat: Math.round((calories * fatPercent) / 9) // 9 calorias por grama
  };
}

export function generatePersonalizedPlan(userData: {
  currentWeight: number;
  height: number;
  goalWeight: number;
  age: number;
  gender: string;
  activityLevel: string;
}) {
  const { currentWeight, height, goalWeight, age, gender, activityLevel } = userData;
  
  const bmi = calculateBMI(currentWeight, height);
  const bmiCategory = getBMICategory(bmi);
  const weightToLose = currentWeight - goalWeight;
  
  let goal: 'lose' | 'maintain' | 'gain' = 'maintain';
  if (weightToLose > 0) goal = 'lose';
  if (weightToLose < 0) goal = 'gain';

  const dailyCalories = calculateDailyCalories(
    currentWeight,
    height,
    age,
    gender,
    activityLevel,
    goal
  );

  const macros = calculateMacros(dailyCalories, goal);

  // Estimativa de tempo para atingir meta (perda saudável: 0.5-1kg por semana)
  const weeksToGoal = Math.abs(weightToLose) / 0.75; // 0.75kg por semana (média)
  const monthsToGoal = Math.ceil(weeksToGoal / 4);

  return {
    bmi: parseFloat(bmi.toFixed(1)),
    bmiCategory,
    weightToLose: Math.abs(weightToLose),
    goal,
    dailyCalories,
    macros,
    estimatedTimeMonths: monthsToGoal,
    recommendations: generateRecommendations(goal, bmiCategory, activityLevel)
  };
}

function generateRecommendations(
  goal: 'lose' | 'maintain' | 'gain',
  bmiCategory: string,
  activityLevel: string
): string[] {
  const recommendations: string[] = [];

  if (goal === 'lose') {
    recommendations.push('Foque em treinos de cardio 3-4x por semana');
    recommendations.push('Adicione treinos de força 2-3x por semana para preservar massa muscular');
    recommendations.push('Mantenha déficit calórico consistente de 500 calorias/dia');
    recommendations.push('Priorize proteínas em todas as refeições');
  } else if (goal === 'gain') {
    recommendations.push('Foque em treinos de força 4-5x por semana');
    recommendations.push('Aumente progressivamente a carga dos exercícios');
    recommendations.push('Consuma superávit calórico de 300-500 calorias/dia');
    recommendations.push('Faça 5-6 refeições por dia');
  } else {
    recommendations.push('Mantenha rotina de exercícios 3-4x por semana');
    recommendations.push('Balance treinos de cardio e força');
    recommendations.push('Mantenha alimentação equilibrada');
  }

  if (activityLevel === 'sedentary') {
    recommendations.push('Comece devagar e aumente intensidade gradualmente');
    recommendations.push('Caminhe pelo menos 30 minutos por dia');
  }

  return recommendations;
}
