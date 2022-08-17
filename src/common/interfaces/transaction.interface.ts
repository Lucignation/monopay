export interface IBankAccount {
  accountName: string;
  accountNumber: number;
  bankName: string;
  balance: number;
  userId: unknown;
}

export interface ITransaction {
  title: string;
  transactionType: 'Credit' | 'Debit';
  amount: number;
  userId: unknown;
}
