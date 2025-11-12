'use client';

import { Meal } from '@/lib/diet-data';
import { Utensils, Flame, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
  const mealTypeColors = {
    cafe: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
    almoco: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
    jantar: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
    lanche: 'bg-green-500/10 text-green-700 border-green-500/20'
  };

  const mealTypeLabels = {
    cafe: 'Café da Manhã',
    almoco: 'Almoço',
    jantar: 'Jantar',
    lanche: 'Lanche'
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-pink-500/50">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-pink-500" />
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
              {meal.name}
            </h3>
          </div>
          <Badge className={mealTypeColors[meal.type]}>
            {mealTypeLabels[meal.type]}
          </Badge>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-center">
            <Flame className="w-4 h-4 mx-auto mb-1 text-orange-500" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Calorias</p>
            <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{meal.calories}</p>
          </div>
          <div className="text-center">
            <Activity className="w-4 h-4 mx-auto mb-1 text-red-500" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Proteína</p>
            <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{meal.protein}g</p>
          </div>
          <div className="text-center">
            <Activity className="w-4 h-4 mx-auto mb-1 text-blue-500" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Carbs</p>
            <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{meal.carbs}g</p>
          </div>
          <div className="text-center">
            <Activity className="w-4 h-4 mx-auto mb-1 text-yellow-500" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Gordura</p>
            <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{meal.fats}g</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-2">Ingredientes:</h4>
            <ul className="space-y-1">
              {meal.ingredients.map((ingredient, index) => (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-2">Preparo:</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">{meal.preparation}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
