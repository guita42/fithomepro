'use client';

import { Exercise } from '@/lib/workout-data';
import { Dumbbell, Clock, Flame, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface WorkoutCardProps {
  exercise: Exercise;
  onStart: (exercise: Exercise) => void;
}

export function WorkoutCard({ exercise, onStart }: WorkoutCardProps) {
  const difficultyColors = {
    iniciante: 'bg-green-500/10 text-green-600 border-green-500/20',
    intermediario: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    avancado: 'bg-red-500/10 text-red-600 border-red-500/20'
  };

  const categoryIcons = {
    cardio: '❤️',
    forca: '💪',
    flexibilidade: '🧘',
    core: '🔥'
  };

  return (
    <Card className="group relative overflow-hidden border-2 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{categoryIcons[exercise.category]}</div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {exercise.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {exercise.equipment}
              </p>
            </div>
          </div>
          <Badge className={difficultyColors[exercise.difficulty]}>
            {exercise.difficulty}
          </Badge>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          {exercise.description}
        </p>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-purple-500" />
            <span className="text-gray-700 dark:text-gray-300">{exercise.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-gray-700 dark:text-gray-300">{exercise.calories} kcal</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-gray-700 dark:text-gray-300 capitalize">{exercise.category}</span>
          </div>
        </div>

        <Button 
          onClick={() => onStart(exercise)}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
        >
          <Dumbbell className="w-4 h-4 mr-2" />
          Começar Treino
        </Button>
      </div>
    </Card>
  );
}
