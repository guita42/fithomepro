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
  ArrowLeft,
  Shield
} from 'lucide-react';
import {
  processPayment,
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
  validateCPF,
  getCardBrand,
  formatCardNumber,
  formatExpiryDate,
  formatCPF,
  type PaymentData
} from '@/lib/payment';

interface CheckoutFormProps {
  plan: 'monthly' | 'annual';
  amount: number;
  onSuccess: (transactionId: string) => void;
  onCancel: () => void;
}

export function CheckoutForm({ plan, amount, onSuccess, onCancel }: CheckoutFormProps) {
  const [formData, setFormData] = useState<PaymentData>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    cpf: ''
  });

  const [errors, setErrors] = useState<Partial<PaymentData>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const cardBrand = getCardBrand(formData.cardNumber);

  const handleInputChange = (field: keyof PaymentData, value: string) => {
    let formattedValue = value;

    // Formatação automática
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (field === 'cardName') {
      formattedValue = value.toUpperCase();
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Limpa erro do campo ao digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    setPaymentError(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentData> = {};

    if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Número do cartão inválido';
    }

    if (!formData.cardName || formData.cardName.length < 3) {
      newErrors.cardName = 'Nome do titular é obrigatório';
    }

    if (!validateExpiryDate(formData.expiryDate)) {
      newErrors.expiryDate = 'Data inválida ou cartão vencido';
    }

    if (!validateCVV(formData.cvv)) {
      newErrors.cvv = 'CVV inválido';
    }

    if (!validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      const result = await processPayment(formData, amount, plan);

      if (result.success && result.transactionId) {
        onSuccess(result.transactionId);
      } else {
        setPaymentError(result.message);
      }
    } catch (error) {
      setPaymentError('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full mb-4">
          <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span className="text-sm font-semibold text-green-600 dark:text-green-400">
            Pagamento 100% Seguro via Mercado Pago
          </span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Finalizar Assinatura
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Plano {plan === 'monthly' ? 'Mensal' : 'Anual'} - R$ {amount.toFixed(2)}
        </p>
      </div>

      {/* Payment Error */}
      {paymentError && (
        <Card className="p-4 bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900 dark:text-red-100 mb-1">
                Pagamento não aprovado
              </p>
              <p className="text-sm text-red-700 dark:text-red-300">
                {paymentError}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card Number */}
        <div>
          <Label htmlFor="cardNumber" className="flex items-center gap-2 mb-2">
            <CreditCard className="w-4 h-4" />
            Número do Cartão
            {cardBrand !== 'Desconhecido' && (
              <Badge variant="secondary" className="ml-auto">
                {cardBrand}
              </Badge>
            )}
          </Label>
          <Input
            id="cardNumber"
            type="text"
            placeholder="0000 0000 0000 0000"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
            maxLength={19}
            className={errors.cardNumber ? 'border-red-500' : ''}
            disabled={isProcessing}
          />
          {errors.cardNumber && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {errors.cardNumber}
            </p>
          )}
        </div>

        {/* Card Name */}
        <div>
          <Label htmlFor="cardName" className="mb-2 block">
            Nome do Titular (como está no cartão)
          </Label>
          <Input
            id="cardName"
            type="text"
            placeholder="NOME COMPLETO"
            value={formData.cardName}
            onChange={(e) => handleInputChange('cardName', e.target.value)}
            className={errors.cardName ? 'border-red-500' : ''}
            disabled={isProcessing}
          />
          {errors.cardName && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {errors.cardName}
            </p>
          )}
        </div>

        {/* Expiry Date & CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiryDate" className="mb-2 block">
              Validade
            </Label>
            <Input
              id="expiryDate"
              type="text"
              placeholder="MM/AA"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              maxLength={5}
              className={errors.expiryDate ? 'border-red-500' : ''}
              disabled={isProcessing}
            />
            {errors.expiryDate && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                {errors.expiryDate}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="cvv" className="mb-2 block">
              CVV
            </Label>
            <Input
              id="cvv"
              type="text"
              placeholder="123"
              value={formData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value)}
              maxLength={4}
              className={errors.cvv ? 'border-red-500' : ''}
              disabled={isProcessing}
            />
            {errors.cvv && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                {errors.cvv}
              </p>
            )}
          </div>
        </div>

        {/* CPF */}
        <div>
          <Label htmlFor="cpf" className="mb-2 block">
            CPF do Titular
          </Label>
          <Input
            id="cpf"
            type="text"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={(e) => handleInputChange('cpf', e.target.value)}
            maxLength={14}
            className={errors.cpf ? 'border-red-500' : ''}
            disabled={isProcessing}
          />
          {errors.cpf && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {errors.cpf}
            </p>
          )}
        </div>

        {/* Payment Info */}
        <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                Seus dados estão seguros
              </p>
              <p className="text-blue-700 dark:text-blue-300 text-xs">
                Pagamento processado via Mercado Pago com criptografia SSL. Seus dados não são armazenados em nossos servidores.
              </p>
              <p className="text-blue-700 dark:text-blue-300 text-xs mt-2">
                <strong>Beneficiário:</strong> Guilherme Tavares (fithomeprolasy)
              </p>
            </div>
          </div>
        </Card>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isProcessing}
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button
            type="submit"
            disabled={isProcessing}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Pagar R$ {amount.toFixed(2)}
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-500 pt-4 border-t">
        <div className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-green-500" />
          <span>Pagamento seguro</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-green-500" />
          <span>Mercado Pago</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-green-500" />
          <span>Cancele quando quiser</span>
        </div>
      </div>
    </div>
  );
}
