'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Crown, 
  Zap, 
  TrendingUp,
  Users,
  Calendar,
  Sparkles,
  Gift
} from 'lucide-react';

interface PricingModalProps {
  onSelectPlan: (plan: 'monthly' | 'annual' | 'trial') => void;
  onClose: () => void;
}

export function PricingModal({ onSelectPlan, onClose }: PricingModalProps) {
  const features = [
    'Treinos personalizados ilimitados',
    'Plano alimentar customizado',
    'Vídeos demonstrativos em HD',
    'Acompanhamento de progresso',
    'Calculadora de macros',
    'Novos treinos toda semana',
    'Suporte prioritário',
    'Acesso ao app mobile',
    'Comunidade exclusiva'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              🎁 Teste Grátis por 5 Dias - Sem Compromisso!
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Desbloqueie Todo o Potencial 💪
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experimente GRÁTIS por 5 dias. Cancele quando quiser, sem taxas ocultas.
          </p>
        </div>

        {/* Trial Banner */}
        <Card className="mb-6 p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Gift className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">
                  🎉 Teste Grátis por 5 Dias!
                </h3>
                <p className="text-green-100">
                  Acesso completo a TODOS os recursos. Sem cartão de crédito necessário.
                </p>
              </div>
            </div>
            <Button
              onClick={() => onSelectPlan('trial')}
              className="bg-white text-green-600 hover:bg-green-50 font-bold text-lg px-8 py-6"
            >
              Começar Teste Grátis
            </Button>
          </div>
        </Card>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Monthly Plan */}
          <Card className="p-6 border-2 hover:border-purple-300 dark:hover:border-purple-700 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Plano Mensal
                </h3>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                  R$ 15,90
                </span>
                <span className="text-gray-600 dark:text-gray-400">/mês</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Cancele quando quiser
              </p>
            </div>

            <Button
              onClick={() => onSelectPlan('monthly')}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-6"
            >
              Assinar Mensal
            </Button>
          </Card>

          {/* Annual Plan */}
          <Card className="p-6 border-2 border-purple-500 dark:border-purple-600 relative overflow-hidden">
            <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
              <Crown className="w-3 h-3 mr-1" />
              Mais Popular
            </Badge>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Plano Anual
                </h3>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                  R$ 170,00
                </span>
                <span className="text-gray-600 dark:text-gray-400">/ano</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                  Economize R$ 20,80
                </Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  (~R$ 14,17/mês)
                </span>
              </div>
            </div>

            <Button
              onClick={() => onSelectPlan('annual')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6"
            >
              Assinar Anual
            </Button>
          </Card>
        </div>

        {/* Features List */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2">
          <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Tudo que você recebe:
          </h4>
          <div className="grid md:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Social Proof */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Users className="w-4 h-4" />
          <span>
            Mais de <strong className="text-purple-600 dark:text-purple-400">10.000 pessoas</strong> já transformaram seus corpos
          </span>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-500">
          <div className="flex items-center gap-1">
            <Check className="w-3 h-3 text-green-500" />
            <span>5 dias grátis</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="w-3 h-3 text-green-500" />
            <span>Pagamento seguro</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="w-3 h-3 text-green-500" />
            <span>Cancele quando quiser</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="w-3 h-3 text-green-500" />
            <span>Garantia de 7 dias</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
