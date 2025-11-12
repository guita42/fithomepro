'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Flame, TrendingUp, Calendar } from 'lucide-react';

export function ProgressTracker() {
  const [weekProgress] = useState({
    workoutsCompleted: 3,
    workoutsGoal: 5,
    caloriesBurned: 850,
    caloriesGoal: 1500,
    currentStreak: 7,
    totalWorkouts: 24
  });

  const workoutPercentage = (weekProgress.workoutsCompleted / weekProgress.workoutsGoal) * 100;
  const caloriesPercentage = (weekProgress.caloriesBurned / weekProgress.caloriesGoal) * 100;

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Seu Progresso
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Continue assim, você está arrasando! 🔥
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Treinos da Semana */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500" />
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                Treinos da Semana
              </span>
            </div>
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
              {weekProgress.workoutsCompleted}/{weekProgress.workoutsGoal}
            </span>
          </div>
          <Progress value={workoutPercentage} className="h-3" />
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Faltam {weekProgress.workoutsGoal - weekProgress.workoutsCompleted} treinos para bater sua meta!
          </p>
        </div>

        {/* Calorias Queimadas */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                Calorias Queimadas
              </span>
            </div>
            <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
              {weekProgress.caloriesBurned}/{weekProgress.caloriesGoal} kcal
            </span>
          </div>
          <Progress value={caloriesPercentage} className="h-3" />
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Mais {weekProgress.caloriesGoal - weekProgress.caloriesBurned} kcal para sua meta semanal!
          </p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Sequência</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {weekProgress.currentStreak}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">dias seguidos</p>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-pink-200 dark:border-pink-800">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-pink-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Total</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {weekProgress.totalWorkouts}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">treinos completos</p>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-orange-200 dark:border-orange-800 col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-orange-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Nível</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Intermediário
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">continue evoluindo!</p>
        </div>
      </div>

      <Button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold">
        Ver Histórico Completo
      </Button>
    </Card>
  );
}
