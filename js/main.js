document.querySelector('button').addEventListener('click', submit)
const myBalance = document.querySelector('.myBalance')
const from = document.querySelector('.for')

class Balance {
  constructor(current) {
    this.current = current
  }

  income(number) {
    this.current += number
    myBalance.textContent = `$${this.current}`
    this.history(number) 
  }

  expesne(number) {
    this.current -= number
    myBalance.textContent = `$${this.current}`
    this.history(number) 
  }

  history(earnOrSpent) {
    const history = document.querySelector('.history')
    const p = document.createElement('p')

    p.textContent = `${from.value}: $${earnOrSpent}`
    history.append(p)
  }
}

const account = new Balance(0)

function submit() {
  const option = document.querySelector('select').value
  const amount = document.querySelector('.amount')

  if (option === 'income') {
    account.income(Number(amount.value))
  } else if (option === 'expense') {
    account.expesne(Number(amount.value))
  }
}