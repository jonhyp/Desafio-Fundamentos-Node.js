import Transaction from '../models/Transaction';


interface TransactionDTO{
  title: string,
  value: number,
  type: 'income' | 'outcome',
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    let totalIncome:number = 0;
    let totalOutcome: number = 0;
    this.transactions.forEach((transaction) => {
      if( transaction.type === 'income' ){
        totalIncome += transaction.value;
      }
      else{
        totalOutcome += transaction.value;
      }
    })
    const balanceTotal = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    }
    return balanceTotal;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    let totalIncome = 0;
    this.transactions.forEach((transaction) => {
      if( transaction.type === 'income' ){
        totalIncome += transaction.value;
      }
    })
    if(type === 'outcome' && value>totalIncome){
        throw Error('Not enouth money')
      }
    else{
      const transaction = new Transaction({ title, value, type })
      this.transactions.push(transaction);
      return(transaction);
    }
  }
}

export default TransactionsRepository;
