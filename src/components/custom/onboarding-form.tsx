'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface OnboardingFormProps {
  onComplete: (data: UserData) => void;
}

export interface UserData {
  name: string;
  email: string;
  currentWeight: number;
  height: number;
  goalWeight: number;
  age: number;
  gender: string;
  activityLevel: string;
}

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<UserData>>({
    gender: 'female',
    activityLevel: 'sedentary'
  });

  const updateFormData = (field: keyof UserData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simula processamento
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onComplete(formData as UserData);
    setIsLoading(false);
  };

  const isStepValid = () => {
    if (step === 1) {
      return formData.name && formData.email && formData.age;
    }
    if (step === 2) {
      return formData.currentWeight && formData.height && formData.goalWeight;
    }
    if (step === 3) {
      return formData.gender && formData.activityLevel;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Passo {step} de 3
            </span>
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              {Math.round((step / 3) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Informações Básicas */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Vamos começar! 👋
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Conte-nos um pouco sobre você
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  placeholder="Maria Silva"
                  value={formData.name || ''}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="maria@exemplo.com"
                  value={formData.email || ''}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="age">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={formData.age || ''}
                  onChange={(e) => updateFormData('age', parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Medidas e Objetivos */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Suas medidas 📏
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Vamos calcular seu plano personalizado
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentWeight">Peso atual (kg)</Label>
                  <Input
                    id="currentWeight"
                    type="number"
                    step="0.1"
                    placeholder="75.0"
                    value={formData.currentWeight || ''}
                    onChange={(e) => updateFormData('currentWeight', parseFloat(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="165"
                    value={formData.height || ''}
                    onChange={(e) => updateFormData('height', parseInt(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="goalWeight">Peso desejado (kg)</Label>
                <Input
                  id="goalWeight"
                  type="number"
                  step="0.1"
                  placeholder="65.0"
                  value={formData.goalWeight || ''}
                  onChange={(e) => updateFormData('goalWeight', parseFloat(e.target.value))}
                  className="mt-1"
                />
                {formData.currentWeight && formData.goalWeight && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Meta: {formData.currentWeight > formData.goalWeight ? 'perder' : 'ganhar'}{' '}
                    {Math.abs(formData.currentWeight - formData.goalWeight).toFixed(1)} kg
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Estilo de Vida */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Seu estilo de vida 🏃
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Isso nos ajuda a personalizar seu plano
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="gender">Sexo</Label>
                <Select 
                  value={formData.gender} 
                  onValueChange={(value) => updateFormData('gender', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Feminino</SelectItem>
                    <SelectItem value="male">Masculino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="activityLevel">Nível de atividade física</Label>
                <Select 
                  value={formData.activityLevel} 
                  onValueChange={(value) => updateFormData('activityLevel', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">
                      Sedentário (pouco ou nenhum exercício)
                    </SelectItem>
                    <SelectItem value="light">
                      Levemente ativo (1-3 dias/semana)
                    </SelectItem>
                    <SelectItem value="moderate">
                      Moderadamente ativo (3-5 dias/semana)
                    </SelectItem>
                    <SelectItem value="active">
                      Muito ativo (6-7 dias/semana)
                    </SelectItem>
                    <SelectItem value="very_active">
                      Extremamente ativo (atleta)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <p className="font-semibold mb-1">Quase lá!</p>
                  <p>
                    Com essas informações, vamos criar um plano de treino e alimentação 
                    100% personalizado para você alcançar seus objetivos.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={isLoading}
              className="flex-1"
            >
              Voltar
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!isStepValid() || isLoading}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Criando seu plano...
              </>
            ) : step === 3 ? (
              'Criar meu plano'
            ) : (
              'Continuar'
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
