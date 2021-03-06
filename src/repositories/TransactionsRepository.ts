import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string,
  value: number,
  type: 'income' | 'outcome',
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {

    const transactions = this.transactions;

    return transactions
  }

  public getBalance(): Balance {

    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    }

    this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        balance.income = balance.income + transaction.value;
      } else if (transaction.type === 'outcome') {
        balance.outcome = balance.outcome + transaction.value;
      }
    });

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
