'use client';

import { useState } from 'react';
import { workouts, Exercise } from '@/lib/workout-data';
import { meals, dietPlans, nutritionTips } from '@/lib/diet-data';
import { WorkoutCard } from '@/components/custom/workout-card';
import { MealCard } from '@/components/custom/meal-card';
import { ProgressTracker } from '@/components/custom/progress-tracker';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Dumbbell, 
  Apple, 
  TrendingUp, 
  Home,
  Flame,
  Target,
  Clock,
  CheckCircle2,
  X,
  Play,
  Info,
  User,
  Scale,
  Ruler,
  TrendingDown
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function FitnessApp() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [workoutCategory, setWorkoutCategory] = useState<string>('todos');
  const [dietGoal, setDietGoal] = useState<string>('perder-peso');
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);

  // Dados do perfil do usuário (exemplo)
  const userProfile = {
    name: 'Maria Silva',
    currentWeight: 75,
    height: 165,
    goalWeight: 65,
    weightToLose: 10,
    bmi: 27.5,
    dailyCalorieGoal: 1800
  };

  const filteredWorkouts = workoutCategory === 'todos' 
    ? workouts 
    : workouts.filter(w => w.category === workoutCategory);

  const selectedDietPlan = dietPlans.find(plan => plan.goal === dietGoal);
  const selectedMeals = selectedDietPlan 
    ? meals.filter(meal => selectedDietPlan.meals.includes(meal.id))
    : [];

  const handleStartWorkout = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsWorkoutStarted(true);
  };

  const handleCloseWorkout = () => {
    setSelectedExercise(null);
    setIsWorkoutStarted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  FitHome Pro
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Seu personal trainer em casa
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                <Flame className="w-3 h-3 mr-1" />
                7 dias de sequência
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 p-8 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Transforme seu corpo em casa! 💪
            </h2>
            <p className="text-lg md:text-xl text-purple-100 mb-6 max-w-2xl">
              Treinos personalizados sem equipamentos + dieta completa. 
              Tudo que você precisa para alcançar seus objetivos!
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Home className="w-5 h-5" />
                <span className="font-semibold">100% em casa</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Target className="w-5 h-5" />
                <span className="font-semibold">Resultados reais</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">15-30 min/dia</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Card */}
        <Card className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Seu Perfil
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Acompanhe sua evolução
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <Scale className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Peso Atual</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {userProfile.currentWeight} kg
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-2">
                <Ruler className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Altura</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {userProfile.height} cm
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Meta</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {userProfile.goalWeight} kg
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">A Perder</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {userProfile.weightToLose} kg
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  IMC (Índice de Massa Corporal)
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {userProfile.bmi.toFixed(1)} - Sobrepeso
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Meta Calórica Diária
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {userProfile.dailyCalorieGoal} kcal
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Progress Tracker */}
        <div className="mb-8">
          <ProgressTracker />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="nutrition" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-white dark:bg-gray-800 border-2">
            <TabsTrigger 
              value="workouts" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white py-3"
            >
              <Dumbbell className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Treinos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="nutrition"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white py-3"
            >
              <Apple className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Nutrição</span>
            </TabsTrigger>
            <TabsTrigger 
              value="tips"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white py-3"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Dicas</span>
            </TabsTrigger>
          </TabsList>

          {/* WORKOUTS TAB */}
          <TabsContent value="workouts" className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={workoutCategory === 'todos' ? 'default' : 'outline'}
                onClick={() => setWorkoutCategory('todos')}
                className={workoutCategory === 'todos' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : ''}
              >
                Todos
              </Button>
              <Button
                variant={workoutCategory === 'cardio' ? 'default' : 'outline'}
                onClick={() => setWorkoutCategory('cardio')}
                className={workoutCategory === 'cardio' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : ''}
              >
                ❤️ Cardio
              </Button>
              <Button
                variant={workoutCategory === 'forca' ? 'default' : 'outline'}
                onClick={() => setWorkoutCategory('forca')}
                className={workoutCategory === 'forca' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : ''}
              >
                💪 Força
              </Button>
              <Button
                variant={workoutCategory === 'core' ? 'default' : 'outline'}
                onClick={() => setWorkoutCategory('core')}
                className={workoutCategory === 'core' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : ''}
              >
                🔥 Core
              </Button>
              <Button
                variant={workoutCategory === 'flexibilidade' ? 'default' : 'outline'}
                onClick={() => setWorkoutCategory('flexibilidade')}
                className={workoutCategory === 'flexibilidade' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : ''}
              >
                🧘 Flexibilidade
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkouts.map(exercise => (
                <WorkoutCard 
                  key={exercise.id} 
                  exercise={exercise}
                  onStart={handleStartWorkout}
                />
              ))}
            </div>
          </TabsContent>

          {/* NUTRITION TAB */}
          <TabsContent value="nutrition" className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Escolha seu objetivo:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dietPlans.map(plan => (
                  <Button
                    key={plan.id}
                    variant={dietGoal === plan.goal ? 'default' : 'outline'}
                    onClick={() => setDietGoal(plan.goal)}
                    className={`h-auto py-4 flex-col items-start ${
                      dietGoal === plan.goal 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                        : ''
                    }`}
                  >
                    <span className="font-bold text-lg mb-1">{plan.name}</span>
                    <span className="text-sm opacity-90">{plan.dailyCalories} kcal/dia</span>
                    <span className="text-xs opacity-75 mt-1">{plan.description}</span>
                  </Button>
                ))}
              </div>
            </Card>

            {/* Guia de Alimentação */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                📋 Como Deve se Alimentar
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">
                    🍞 Carboidratos - Sua Fonte de Energia
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Para perder {userProfile.weightToLose}kg de forma saudável, consuma carboidratos estrategicamente:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                        ☀️ Café da Manhã (7h-9h)
                      </p>
                      <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Pão integral (2 fatias) - 30g carbs</li>
                        <li>• Aveia (1 xícara) - 27g carbs</li>
                        <li>• Banana (1 unidade) - 23g carbs</li>
                        <li>• Frutas vermelhas - 15g carbs</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                      <p className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                        🍽️ Almoço (12h-14h)
                      </p>
                      <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Arroz integral (1 xícara) - 45g carbs</li>
                        <li>• Batata doce (média) - 26g carbs</li>
                        <li>• Grão de bico (1 xícara) - 45g carbs</li>
                        <li>• Macarrão integral - 40g carbs</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                      <p className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                        🥤 Lanche Pré-Treino (16h-17h)
                      </p>
                      <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Banana com aveia - 35g carbs</li>
                        <li>• Tapioca pequena - 28g carbs</li>
                        <li>• Pão integral + geleia - 30g carbs</li>
                        <li>• Frutas secas (30g) - 25g carbs</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                      <p className="font-semibold text-green-700 dark:text-green-300 mb-2">
                        🌙 Jantar (19h-21h)
                      </p>
                      <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Batata doce (pequena) - 20g carbs</li>
                        <li>• Legumes variados - 15g carbs</li>
                        <li>• Quinoa (1/2 xícara) - 20g carbs</li>
                        <li>• Salada + vegetais - 10g carbs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border-2 border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Info className="w-5 h-5 text-yellow-600" />
                    Dica Importante sobre Carboidratos
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Para perder peso:</strong> Consuma mais carboidratos nas primeiras refeições do dia (café e almoço) quando seu corpo precisa de energia. Reduza à noite quando o metabolismo fica mais lento.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Meta diária:</strong> 150-180g de carboidratos (distribuídos ao longo do dia)
                  </p>
                </div>
              </div>
            </Card>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Seu plano alimentar:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedMeals.map(meal => (
                  <MealCard key={meal.id} meal={meal} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TIPS TAB */}
          <TabsContent value="tips" className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Guia Nutricional Completo
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Aprenda sobre os macronutrientes essenciais e onde encontrá-los:
              </p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nutritionTips.map((tip, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                    {tip.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {tip.description}
                  </p>
                  
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Fontes principais:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tip.sources.map((source, i) => (
                        <Badge key={i} variant="secondary">
                          {source}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                      Quantidade diária: {tip.dailyAmount}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2">
              <h4 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
                💡 Dicas Pro para Resultados Máximos:
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Consistência é tudo:</strong> Treinar 3-4x por semana é melhor que 1x intenso
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Hidratação:</strong> Beba água antes, durante e depois do treino
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Sono:</strong> 7-9 horas de sono são essenciais para recuperação muscular
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Progressão:</strong> Aumente intensidade gradualmente a cada 2 semanas
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Alimentação:</strong> Coma proteína em todas as refeições para manter massa muscular
                  </span>
                </li>
              </ul>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Workout Dialog */}
      <Dialog open={isWorkoutStarted} onOpenChange={handleCloseWorkout}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedExercise && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                  <span className="text-3xl">
                    {selectedExercise.category === 'cardio' && '❤️'}
                    {selectedExercise.category === 'forca' && '💪'}
                    {selectedExercise.category === 'core' && '🔥'}
                    {selectedExercise.category === 'flexibilidade' && '🧘'}
                  </span>
                  {selectedExercise.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedExercise.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-center">
                    <Clock className="w-5 h-5 mx-auto mb-2 text-purple-500" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Duração</p>
                    <p className="font-bold text-gray-900 dark:text-gray-100">{selectedExercise.duration}</p>
                  </div>
                  <div className="text-center">
                    <Flame className="w-5 h-5 mx-auto mb-2 text-orange-500" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Calorias</p>
                    <p className="font-bold text-gray-900 dark:text-gray-100">{selectedExercise.calories} kcal</p>
                  </div>
                  <div className="text-center">
                    <Dumbbell className="w-5 h-5 mx-auto mb-2 text-pink-500" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Equipamento</p>
                    <p className="font-bold text-gray-900 dark:text-gray-100 text-sm">{selectedExercise.equipment}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-100">
                    Como executar:
                  </h4>
                  <ol className="space-y-3">
                    {selectedExercise.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 pt-0.5">
                          {instruction}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-6"
                    onClick={handleCloseWorkout}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Iniciar Treino
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleCloseWorkout}
                    className="px-6"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="mt-16 py-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-gray-100">FitHome Pro</strong> - Seu personal trainer em casa 💪
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Transforme seu corpo sem sair de casa. Treinos + Nutrição completa.
          </p>
        </div>
      </footer>
    </div>
  );
}
