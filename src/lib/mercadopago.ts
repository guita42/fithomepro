// Mercado Pago Integration
// IMPORTANTE: Em produção, use variáveis de ambiente para as credenciais

export interface PaymentData {
  plan: 'monthly' | 'annual';
  amount: number;
  email: string;
  name: string;
}

export interface CardData {
  cardNumber: string;
  cardholderName: string;
  expirationMonth: string;
  expirationYear: string;
  securityCode: string;
  identificationType: string;
  identificationNumber: string;
}

// Configuração do Mercado Pago
const MERCADOPAGO_PUBLIC_KEY = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || '';

// Simula processamento de pagamento
// Em produção, isso seria feito no backend com a API do Mercado Pago
export async function processPayment(
  paymentData: PaymentData,
  cardData: CardData
): Promise<{ success: boolean; message: string; paymentId?: string }> {
  try {
    // Validações básicas
    if (!cardData.cardNumber || cardData.cardNumber.length < 13) {
      return { success: false, message: 'Número do cartão inválido' };
    }

    if (!cardData.securityCode || cardData.securityCode.length < 3) {
      return { success: false, message: 'CVV inválido' };
    }

    if (!cardData.cardholderName) {
      return { success: false, message: 'Nome do titular é obrigatório' };
    }

    // Simula delay de processamento
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Em produção, aqui você faria a chamada real para API do Mercado Pago
    // usando o SDK no backend para processar o pagamento
    
    // Simula aprovação (90% de chance de aprovação para demonstração)
    const isApproved = Math.random() > 0.1;

    if (isApproved) {
      const paymentId = `MP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      return {
        success: true,
        message: 'Pagamento aprovado com sucesso!',
        paymentId
      };
    } else {
      return {
        success: false,
        message: 'Pagamento recusado. Verifique os dados do cartão e tente novamente.'
      };
    }
  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    return {
      success: false,
      message: 'Erro ao processar pagamento. Tente novamente.'
    };
  }
}

// Valida número do cartão (algoritmo de Luhn)
export function validateCardNumber(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (!/^\d+$/.test(cleaned)) return false;
  if (cleaned.length < 13 || cleaned.length > 19) return false;

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
  if (/^(?:5[0678]|6304|6390|67)/.test(cleaned)) return 'Maestro';
  if (/^(?:636368|438935|504175|451416|636297)/.test(cleaned)) return 'Elo';
  if (/^(?:606282|3841)/.test(cleaned)) return 'Hipercard';
  
  return 'Desconhecida';
}

// Formata número do cartão
export function formatCardNumber(value: string): string {
  const cleaned = value.replace(/\s/g, '');
  const groups = cleaned.match(/.{1,4}/g) || [];
  return groups.join(' ');
}

// Formata data de expiração
export function formatExpirationDate(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  }
  return cleaned;
}

// Valida data de expiração
export function validateExpirationDate(month: string, year: string): boolean {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Últimos 2 dígitos
  const currentMonth = currentDate.getMonth() + 1;

  const expMonth = parseInt(month);
  const expYear = parseInt(year);

  if (expMonth < 1 || expMonth > 12) return false;
  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;

  return true;
}
