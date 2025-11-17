'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Lock, 
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Shield
} from 'lucide-react';
import {
  processPayment,
  validateCardNumber,
  getCardBrand,
  formatCardNumber,
  formatExpirationDate,
  validateExpirationDate,
  type PaymentData,
  type CardData
} from '@/lib/mercadopago';

interface CheckoutModalProps {
  plan: 'monthly' | 'annual';
  onSuccess: (paymentId: string) => void;
  onClose: () => void;
}

export function CheckoutModal({ plan, onSuccess, onClose }: CheckoutModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');

  const planDetails = {
    monthly: { name: 'Plano Mensal', price: 15.90, description: 'Renovação mensal' },
    annual: { name: 'Plano Anual', price: 170.00, description: 'Economize R$ 20,80' }
  };

  const selectedPlan = planDetails[plan];
  const cardBrand = getCardBrand(cardNumber);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16) {
      setCardNumber(formatCardNumber(value));
    }
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setExpirationDate(formatExpirationDate(value));
    }
  };

  const handleSecurityCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setSecurityCode(value);
    }
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      // Formata CPF: 000.000.000-00
      let formatted = value;
      if (value.length > 3) formatted = `${value.slice(0, 3)}.${value.slice(3)}`;
      if (value.length > 6) formatted = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
      if (value.length > 9) formatted = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
      setCpf(formatted);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (!validateCardNumber(cardNumber.replace(/\s/g, ''))) {
      setError('Número do cartão inválido');
      return;
    }

    const [month, year] = expirationDate.split('/');
    if (!validateExpirationDate(month, year)) {
      setError('Data de validade inválida');
      return;
    }

    if (securityCode.length < 3) {
      setError('CVV inválido');
      return;
    }

    if (!cardholderName.trim()) {
      setError('Nome do titular é obrigatório');
      return;
    }

    if (cpf.replace(/\D/g, '').length !== 11) {
      setError('CPF inválido');
      return;
    }

    if (!email.includes('@')) {
      setError('Email inválido');
      return;
    }

    setIsProcessing(true);

    try {
      const paymentData: PaymentData = {
        plan,
        amount: selectedPlan.price,
        email,
        name: cardholderName
      };

      const cardData: CardData = {
        cardNumber: cardNumber.replace(/\s/g, ''),
        cardholderName,
        expirationMonth: month,
        expirationYear: year,
        securityCode,
        identificationType: 'CPF',
        identificationNumber: cpf.replace(/\D/g, '')
      };

      const result = await processPayment(paymentData, cardData);

      if (result.success && result.paymentId) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess(result.paymentId!);
        }, 2000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Pagamento Aprovado! 🎉
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Seu acesso premium foi ativado com sucesso!
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Redirecionando...</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl my-8 p-6 md:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          disabled={isProcessing}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Finalizar Pagamento
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pagamento 100% seguro via Mercado Pago
              </p>
            </div>
          </div>

          {/* Plan Summary */}
          <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {selectedPlan.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedPlan.description}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  R$ {selectedPlan.price.toFixed(2)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {plan === 'monthly' ? 'por mês' : 'por ano'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isProcessing}
            />
          </div>

          {/* Card Number */}
          <div>
            <Label htmlFor="cardNumber">Número do Cartão</Label>
            <div className="relative">
              <Input
                id="cardNumber"
                type="text"
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={handleCardNumberChange}
                required
                disabled={isProcessing}
                className="pr-20"
              />
              {cardBrand !== 'Desconhecida' && (
                <Badge className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border">
                  {cardBrand}
                </Badge>
              )}
            </div>
          </div>

          {/* Cardholder Name */}
          <div>
            <Label htmlFor="cardholderName">Nome do Titular</Label>
            <Input
              id="cardholderName"
              type="text"
              placeholder="Nome como está no cartão"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value.toUpperCase())}
              required
              disabled={isProcessing}
            />
          </div>

          {/* Expiration & CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiration">Validade</Label>
              <Input
                id="expiration"
                type="text"
                placeholder="MM/AA"
                value={expirationDate}
                onChange={handleExpirationChange}
                required
                disabled={isProcessing}
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="text"
                placeholder="000"
                value={securityCode}
                onChange={handleSecurityCodeChange}
                required
                disabled={isProcessing}
              />
            </div>
          </div>

          {/* CPF */}
          <div>
            <Label htmlFor="cpf">CPF do Titular</Label>
            <Input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={handleCpfChange}
              required
              disabled={isProcessing}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Security Info */}
          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Seus dados estão protegidos com criptografia de ponta a ponta
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-6 text-lg"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Pagar R$ {selectedPlan.price.toFixed(2)}
              </>
            )}
          </Button>

          {/* Payment Info */}
          <div className="text-center space-y-2">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Pagamento processado via Mercado Pago
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Conta destino: Guilherme Tavares - FitHomePro
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400 dark:text-gray-600">
              <span>✓ Ambiente seguro</span>
              <span>✓ Dados criptografados</span>
              <span>✓ Garantia de 7 dias</span>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
