document.querySelector('button').addEventListener('click', submit)
const account = document.querySelector('.account')
const myBalance = document.querySelector('.myBalance')
const from = document.querySelector('.description')
const history = document.querySelector('.history')
let error = document.createElement('h2')

let arrayHistory = JSON.parse(localStorage.getItem('history'))
if (arrayHistory === null) {
  arrayHistory = []
}
localStorage.setItem('history', JSON.stringify(arrayHistory))

function submit() {
  const option = document.querySelector('select').value
  const amount = document.querySelector('.amount').value

  if (isNaN(amount) === true || amount === '') {
    error.textContent = 'Amount is not a number. Please enter a number.'
    account.append(error)
  } else if (option === 'income') {
    error.textContent = ''
    myAccount.income(Number(amount))
    myAccount.history(`+$${amount}`)
  } else if (option === 'expense') {
    error.textContent = ''
    myAccount.expesne(Number(amount))
    myAccount.history(`-$${amount}`)
  }
}

class Account {
  constructor(current = 0) {
    this.current = current
  }

  income(number) {
    this.current += number
    myBalance.textContent = `$${this.current}` 
  }

  expesne(number) {
    this.current -= number
    myBalance.textContent = `$${this.current}` 
  }

  history(earnOrSpent) {
    const date = Date().split(' ').slice(0,4)
    let tran = `${date[0]}, ${date[1]}, ${date[2]}, ${date[3]} ${from.value.toUpperCase()}: ${earnOrSpent}`
    this.updateHisAndCur(tran, this.current)
  }

  updateHisAndCur(transaction, current) {
    localStorage.setItem('current', current)

    arrayHistory.push(transaction)
    localStorage.setItem('history', JSON.stringify(arrayHistory))

    if (arrayHistory.length > 30) {
      arrayHistory.shift()
      localStorage.setItem('history', JSON.stringify(arrayHistory))
    }

    for (let i = 0; i < arrayHistory.length; i++) {
      document.querySelector(`.p${i + 1}`).textContent = arrayHistory[i]
    }
  }
}

for (let i = 0; i < arrayHistory.length; i++) {
  document.querySelector(`.p${i + 1}`).textContent = arrayHistory[i]
}

myBalance.textContent = `$${Number(localStorage.getItem('current'))}`

const myAccount = new Account(Number(localStorage.getItem('current')))