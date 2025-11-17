// Sistema de pagamento integrado com Mercado Pago
// Conta beneficiária: 4174 0122 3023 4095 - Guilherme Tavares / fithomeprolasy

export interface PaymentData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  cpf: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  message: string;
  error?: string;
}

// Validação de cartão de crédito (Algoritmo de Luhn)
export function validateCardNumber(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (!/^\d{13,19}$/.test(cleaned)) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

// Validação de data de expiração
export function validateExpiryDate(expiryDate: string): boolean {
  const [month, year] = expiryDate.split('/').map(v => parseInt(v));
  if (!month || !year) return false;
  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;

  return true;
}

// Validação de CVV
export function validateCVV(cvv: string): boolean {
  return /^\d{3,4}$/.test(cvv);
}

// Validação de CPF
export function validateCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleaned)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned[i]) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleaned[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned[i]) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleaned[10])) return false;

  return true;
}

// Detecta bandeira do cartão
export function getCardBrand(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (/^4/.test(cleaned)) return 'Visa';
  if (/^5[1-5]/.test(cleaned)) return 'Mastercard';
  if (/^3[47]/.test(cleaned)) return 'American Express';
  if (/^6(?:011|5)/.test(cleaned)) return 'Discover';
  if (/^35/.test(cleaned)) return 'JCB';
  if (/^(?:2131|1800|35)/.test(cleaned)) return 'JCB';
  if (/^3(?:0[0-5]|[68])/.test(cleaned)) return 'Diners Club';
  if (/^(5018|5020|5038|5893|6304|6759|6761|6762|6763)/.test(cleaned)) return 'Maestro';
  if (/^(606282|3841)/.test(cleaned)) return 'Hipercard';
  if (/^636368/.test(cleaned)) return 'Elo';
  
  return 'Desconhecido';
}

// Formata número do cartão
export function formatCardNumber(value: string): string {
  const cleaned = value.replace(/\s/g, '');
  const chunks = cleaned.match(/.{1,4}/g) || [];
  return chunks.join(' ').substr(0, 19);
}

// Formata data de expiração
export function formatExpiryDate(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length >= 2) {
    return cleaned.substr(0, 2) + '/' + cleaned.substr(2, 2);
  }
  return cleaned;
}

// Formata CPF
export function formatCPF(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return cleaned.replace(/(\d{3})(\d+)/, '$1.$2');
  if (cleaned.length <= 9) return cleaned.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4').substr(0, 14);
}

// Processa pagamento via Mercado Pago
export async function processPayment(
  paymentData: PaymentData,
  amount: number,
  plan: 'monthly' | 'annual'
): Promise<PaymentResult> {
  // Validações
  if (!validateCardNumber(paymentData.cardNumber)) {
    return {
      success: false,
      message: 'Número do cartão inválido',
      error: 'INVALID_CARD_NUMBER'
    };
  }

  if (!validateExpiryDate(paymentData.expiryDate)) {
    return {
      success: false,
      message: 'Data de expiração inválida ou cartão vencido',
      error: 'INVALID_EXPIRY_DATE'
    };
  }

  if (!validateCVV(paymentData.cvv)) {
    return {
      success: false,
      message: 'CVV inválido',
      error: 'INVALID_CVV'
    };
  }

  if (!validateCPF(paymentData.cpf)) {
    return {
      success: false,
      message: 'CPF inválido',
      error: 'INVALID_CPF'
    };
  }

  // Simula processamento de pagamento
  // Em produção, aqui você faria a chamada real para API do Mercado Pago
  try {
    // Simula delay de processamento
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Dados do beneficiário (fixos)
    const beneficiary = {
      account: '4174 0122 3023 4095',
      name: 'Guilherme Tavares',
      alias: 'fithomeprolasy'
    };

    // Simula resposta da API do Mercado Pago
    // Em produção, você usaria:
    // const response = await fetch('https://api.mercadopago.com/v1/payments', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     transaction_amount: amount,
    //     description: `FitHome Pro - Plano ${plan === 'monthly' ? 'Mensal' : 'Anual'}`,
    //     payment_method_id: 'credit_card',
    //     payer: {
    //       email: 'user@email.com',
    //       identification: {
    //         type: 'CPF',
    //         number: paymentData.cpf
    //       }
    //     },
    //     token: cardToken, // Token gerado pelo Mercado Pago SDK
    //     installments: 1,
    //     statement_descriptor: 'FITHOME PRO'
    //   })
    // });

    // Simula sucesso (90% de aprovação)
    const isApproved = Math.random() > 0.1;

    if (isApproved) {
      const transactionId = `MP${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Salva informações da transação
      localStorage.setItem('payment_transaction', JSON.stringify({
        transactionId,
        amount,
        plan,
        date: new Date().toISOString(),
        beneficiary,
        status: 'approved'
      }));

      return {
        success: true,
        transactionId,
        message: 'Pagamento aprovado com sucesso! Bem-vindo ao FitHome Pro Premium! 🎉'
      };
    } else {
      return {
        success: false,
        message: 'Pagamento recusado. Verifique os dados do cartão ou tente outro método de pagamento.',
        error: 'PAYMENT_DECLINED'
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao processar pagamento. Tente novamente.',
      error: 'PROCESSING_ERROR'
    };
  }
}

// Verifica status do pagamento
export function getPaymentStatus(): any {
  const transaction = localStorage.getItem('payment_transaction');
  return transaction ? JSON.parse(transaction) : null;
}

// Cancela assinatura
export function cancelSubscription(): void {
  localStorage.removeItem('subscription_status');
  localStorage.removeItem('subscription_plan');
  localStorage.removeItem('payment_transaction');
  localStorage.removeItem('trial_start_date');
}
