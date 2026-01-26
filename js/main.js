document.querySelector('button').addEventListener('click', submit)
const account = document.querySelector('.account')
const myBalance = document.querySelector('.myBalance')
const from = document.querySelector('.for')
const history = document.querySelector('.history')
let error = document.createElement('h2')

function submit() {
  const option = document.querySelector('select').value
  const amount = document.querySelector('.amount').value

  if (isNaN(amount) === true) {
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
    let storeHistory = JSON.parse(localStorage.getItem('history'))
    if (storeHistory === null) {
      storeHistory = []
    }
    storeHistory.push(transaction)
    localStorage.setItem('history', JSON.stringify(storeHistory))

    localStorage.setItem('current', current)

    const p = document.createElement('p')

    const date = Date().split(' ').slice(0,4)

    p.textContent = transaction
    history.append(p)
  }
}

myBalance.textContent = `$${Number(localStorage.getItem('current'))}`

const myAccount = new Account(Number(localStorage.getItem('current')))

let arrayHistory = JSON.parse(localStorage.getItem('history'))

for (let i = 0; i < arrayHistory.length; i++) {
  const p = document.createElement('p')

  p.textContent = arrayHistory[i]
  history.append(p)
}