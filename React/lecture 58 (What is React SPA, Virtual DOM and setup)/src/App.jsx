import { useEffect, useMemo, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'khata-transactions'
const CATEGORIES = ['Food', 'Travel', 'Shopping', 'Bills', 'Health', 'Salary', 'Business', 'Other']

const today = () => {
  const date = new Date()
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
  return localDate.toISOString().slice(0, 10)
}
const currentMonth = () => today().slice(0, 7)

function readTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Could not load saved transactions:', error)
    return []
  }
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount)
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

function Icon({ name, size = 20 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>,
    list: <><path d="M8 6h13M8 12h13M8 18h13" /><path d="M3 6h.01M3 12h.01M3 18h.01" /></>,
    chart: <><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-5 5" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    down: <><path d="m7 10 5 5 5-5" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    trash: <><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6" /></>,
    wallet: <><rect x="3" y="5" width="18" height="15" rx="3" /><path d="M3 9h18m-5 5h2" /><path d="M6 5V4a2 2 0 0 1 2-2h10" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
  }

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

function App() {
  const [transactions, setTransactions] = useState(readTransactions)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [filter, setFilter] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState({ type: 'expense', description: '', amount: '', category: 'Food', date: today() })
  const [search, setSearch] = useState('')
  const [activeNav, setActiveNav] = useState('Overview')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
    } catch (error) {
      console.error('Could not save transactions:', error)
    }
  }, [transactions])

  const monthTransactions = useMemo(
    () => transactions
      .filter((transaction) => transaction.date.startsWith(selectedMonth))
      .sort((a, b) => b.date.localeCompare(a.date)),
    [transactions, selectedMonth],
  )

  const visibleTransactions = useMemo(() => monthTransactions.filter((transaction) => {
    const matchesFilter = filter === 'All' || transaction.type === filter.toLowerCase()
    const matchesSearch = transaction.description.toLowerCase().includes(search.toLowerCase())
      || transaction.category.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  }), [filter, monthTransactions, search])

  const totals = useMemo(() => monthTransactions.reduce((result, transaction) => {
    result[transaction.type] += transaction.amount
    return result
  }, { income: 0, expense: 0 }), [monthTransactions])

  const balance = totals.income - totals.expense
  const monthLabel = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' })
    .format(new Date(`${selectedMonth}-15T00:00:00`))
  const weeklyTotals = Array.from({ length: 5 }, (_, week) => monthTransactions.reduce((result, transaction) => {
    const transactionWeek = Math.min(4, Math.floor((Number(transaction.date.slice(8, 10)) - 1) / 7))
    if (transactionWeek === week) result[transaction.type] += transaction.amount
    return result
  }, { income: 0, expense: 0 }))
  const chartMax = Math.max(1, ...weeklyTotals.flatMap((week) => [week.income, week.expense]))

  function openModal(type = 'expense') {
    setForm({ type, description: '', amount: '', category: type === 'income' ? 'Salary' : 'Food', date: today() })
    setIsModalOpen(true)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const amount = Number(form.amount)
    if (!form.description.trim() || !Number.isFinite(amount) || amount <= 0) return

    setTransactions((current) => [{
      id: crypto.randomUUID(),
      ...form,
      description: form.description.trim(),
      amount,
    }, ...current])
    setSelectedMonth(form.date.slice(0, 7))
    setFilter('All')
    setIsModalOpen(false)
  }

  function deleteTransaction(id) {
    setTransactions((current) => current.filter((transaction) => transaction.id !== id))
  }

  function exportCsv() {
    const rows = [
      ['Date', 'Type', 'Description', 'Category', 'Amount'],
      ...monthTransactions.map((transaction) => [
        transaction.date,
        transaction.type,
        transaction.description,
        transaction.category,
        transaction.amount,
      ]),
    ]
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n')
    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    link.download = `khata-${selectedMonth}.csv`
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" aria-label="Khata home">
          <span className="brand-mark"><Icon name="wallet" size={21} /></span>
          <span>khata<span className="brand-dot">.</span></span>
        </a>

        <div className="nav-label">MENU</div>
        <nav className="main-nav" aria-label="Main navigation">
          {[
            { name: 'Overview', icon: 'grid', target: 'overview' },
            { name: 'Transactions', icon: 'list', target: 'transactions' },
            { name: 'Reports', icon: 'chart', target: 'reports' },
          ].map((item) => (
            <a
              className={`nav-link ${activeNav === item.name ? 'active' : ''}`}
              href={`#${item.target}`}
              key={item.name}
              onClick={() => setActiveNav(item.name)}
            >
              <Icon name={item.icon} size={19} />
              <span>{item.name}</span>
              {item.name === 'Transactions' && monthTransactions.length > 0 && (
                <span className="nav-count">{monthTransactions.length}</span>
              )}
            </a>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="tip-card">
            <span className="tip-sparkle">✳</span>
            <p>A little tip</p>
            <span>Small steps today, stronger savings tomorrow.</span>
          </div>
          <div className="user-profile">
            <div className="avatar">Y</div>
            <div className="user-info"><strong>Your account</strong><span>Personal space</span></div>
            <span className="profile-menu">···</span>
          </div>
        </div>
      </aside>

      <main className="main-content" id="overview">
        <header className="topbar">
          <div className="breadcrumb">My space <span>/</span> <strong>{activeNav}</strong></div>
          <div className="topbar-right">
            <span className="today-label">{new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }).format(new Date())}</span>
            <button className="avatar avatar-small" aria-label="Your account">Y</button>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><span className="status-dot" /> YOUR MONEY, IN ONE PLACE</div>
              <h1>Good things start with <span>a good plan.</span></h1>
              <p className="page-subtitle">Track what comes in, what goes out, and everything in between.</p>
            </div>
            <button className="primary-button" onClick={() => openModal('expense')}>
              <Icon name="plus" size={18} /> Add transaction
            </button>
          </section>

          <section className="summary-grid" aria-label={`${monthLabel} money summary`}>
            <article className="summary-card balance-card">
              <div className="card-top"><span className="card-label">Total balance</span><span className="card-icon balance-icon"><Icon name="wallet" size={18} /></span></div>
              <div className={`card-amount ${balance < 0 ? 'negative' : ''}`}>{formatCurrency(balance)}</div>
              <div className="card-foot"><span className="balance-pill">●</span> Your net balance <span className="card-month">{monthLabel}</span></div>
              <div className="balance-decoration" aria-hidden="true"><span /><span /><span /></div>
            </article>

            <article className="summary-card">
              <div className="card-top"><span className="card-label">Money received</span><span className="card-icon income-icon"><Icon name="arrow" size={18} /></span></div>
              <div className="card-amount">{formatCurrency(totals.income)}</div>
              <div className="card-foot"><span className="trend-up">↗</span> <strong>{monthTransactions.filter((item) => item.type === 'income').length}</strong> income entries <span className="card-month">{monthLabel}</span></div>
            </article>

            <article className="summary-card">
              <div className="card-top"><span className="card-label">Money spent</span><span className="card-icon expense-icon"><Icon name="arrow" size={18} /></span></div>
              <div className="card-amount">{formatCurrency(totals.expense)}</div>
              <div className="card-foot"><span className="trend-down">↘</span> <strong>{monthTransactions.filter((item) => item.type === 'expense').length}</strong> expense entries <span className="card-month">{monthLabel}</span></div>
            </article>
          </section>

          <section className="content-grid">
            <article className="panel transactions-panel" id="transactions">
              <div className="panel-heading">
                <div><h2>Recent transactions</h2><p>Your money moves, all in one place.</p></div>
                <button className="text-button" onClick={exportCsv} disabled={monthTransactions.length === 0}>Download CSV <Icon name="down" size={15} /></button>
              </div>

              <div className="transaction-toolbar">
                <div className="filter-tabs" role="group" aria-label="Filter transactions">
                  {['All', 'Income', 'Expense'].map((option) => (
                    <button key={option} className={`filter-tab ${filter === option ? 'selected' : ''}`} onClick={() => setFilter(option)}>{option}</button>
                  ))}
                </div>
                <label className="search-box">
                  <Icon name="search" size={16} />
                  <input aria-label="Search transactions" placeholder="Search..." value={search} onChange={(event) => setSearch(event.target.value)} />
                </label>
              </div>

              <div className="transaction-head"><span>TRANSACTION</span><span>CATEGORY</span><span>DATE</span><span>AMOUNT</span><span /></div>
              <div className="transaction-list">
                {visibleTransactions.length > 0 ? visibleTransactions.map((transaction) => (
                  <div className="transaction-row" key={transaction.id}>
                    <div className="transaction-name">
                      <span className={`transaction-icon ${transaction.type}`}><Icon name={transaction.type === 'income' ? 'arrow' : 'wallet'} size={17} /></span>
                      <span className="transaction-title"><strong>{transaction.description}</strong><small>{transaction.type === 'income' ? 'Money received' : 'Money spent'}</small></span>
                    </div>
                    <span className="category-badge">{transaction.category}</span>
                    <span className="transaction-date">{formatDate(transaction.date)}</span>
                    <strong className={`transaction-amount ${transaction.type}`}>
                      {transaction.type === 'income' ? '+' : '−'}{formatCurrency(transaction.amount)}
                    </strong>
                    <button className="delete-button" onClick={() => deleteTransaction(transaction.id)} aria-label={`Delete ${transaction.description}`} title="Delete transaction">
                      <Icon name="trash" size={16} />
                    </button>
                  </div>
                )) : (
                  <div className="empty-state">
                    <span className="empty-icon"><Icon name="wallet" size={22} /></span>
                    <strong>{search ? 'No matching transactions' : 'Your story starts here'}</strong>
                    <p>{search ? 'Try a different search, or clear your filters.' : `Add your first transaction to see your ${monthLabel} activity.`}</p>
                    {!search && <button className="empty-add" onClick={() => openModal('expense')}><Icon name="plus" size={16} /> Add your first transaction</button>}
                  </div>
                )}
              </div>
              {monthTransactions.length > 0 && <div className="list-footer">Showing {visibleTransactions.length} of {monthTransactions.length} transactions <label className="month-picker"><span>{monthLabel}</span><input aria-label="Select month" type="month" value={selectedMonth} onChange={(event) => event.target.value && setSelectedMonth(event.target.value)} /></label></div>}
              {monthTransactions.length === 0 && <div className="empty-month-picker"><label className="month-picker"><span>{monthLabel}</span><input aria-label="Select month" type="month" value={selectedMonth} onChange={(event) => event.target.value && setSelectedMonth(event.target.value)} /></label></div>}
            </article>

            <article className="panel chart-panel" id="reports">
              <div className="panel-heading chart-heading">
                <div><h2>Cash flow</h2><p>Your income vs expenses</p></div>
                <label className="month-picker chart-month"><span>{monthLabel}</span><input aria-label="Select chart month" type="month" value={selectedMonth} onChange={(event) => event.target.value && setSelectedMonth(event.target.value)} /></label>
              </div>
              <div className="chart-legend"><span><i className="legend-dot income-dot" /> Income</span><span><i className="legend-dot expense-dot" /> Expenses</span></div>
              <div className="chart-area">
                <div className="chart-y-labels"><span>{formatCurrency(chartMax)}</span><span>{formatCurrency(chartMax / 2)}</span><span>₹0</span></div>
                <div className="chart-plot">
                  <div className="chart-gridlines"><span /><span /><span /></div>
                  <div className="bar-groups">
                    {weeklyTotals.map((week, index) => (
                      <div className="bar-group" key={index}>
                        <div className="bars">
                          <span className="bar income-bar" style={{ height: `${Math.max(week.income ? 4 : 0, week.income / chartMax * 100)}%` }} title={`Income: ${formatCurrency(week.income)}`} />
                          <span className="bar expense-bar" style={{ height: `${Math.max(week.expense ? 4 : 0, week.expense / chartMax * 100)}%` }} title={`Expenses: ${formatCurrency(week.expense)}`} />
                        </div>
                        <span className="week-label">Week {index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="chart-summary">
                <div><span>Net this month</span><strong className={balance < 0 ? 'negative' : ''}>{formatCurrency(balance)}</strong></div>
                <span className={`net-indicator ${balance >= 0 ? 'positive' : 'negative-bg'}`}>{balance >= 0 ? '↗' : '↘'}</span>
              </div>
              {monthTransactions.length === 0 && <div className="chart-empty-note">Add transactions to see your cash flow.</div>}
            </article>
          </section>
          <footer className="page-footer"><span>Made for a little more peace of mind.</span><span>Every rupee has a story <span className="footer-heart">♥</span></span></footer>
        </div>
      </main>

      {isModalOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsModalOpen(false) }}>
          <section className="transaction-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-heading">
              <div><div className="eyebrow">KEEP YOUR KHATA UP TO DATE</div><h2 id="modal-title">Add a transaction</h2><p>Every little detail helps you see the bigger picture.</p></div>
              <button className="modal-close" onClick={() => setIsModalOpen(false)} aria-label="Close dialog"><Icon name="close" size={19} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="type-switch" role="group" aria-label="Transaction type">
                <button type="button" className={form.type === 'expense' ? 'chosen expense-choice' : ''} onClick={() => setForm({ ...form, type: 'expense', category: 'Food' })}><span>↗</span> I spent</button>
                <button type="button" className={form.type === 'income' ? 'chosen income-choice' : ''} onClick={() => setForm({ ...form, type: 'income', category: 'Salary' })}><span>↙</span> I received</button>
              </div>
              <label className="form-label">Amount
                <span className="amount-input"><span>₹</span><input required type="number" min="1" step="0.01" placeholder="0.00" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} autoFocus /></span>
              </label>
              <label className="form-label">What was it for?
                <input required maxLength="60" placeholder={form.type === 'income' ? 'e.g. Monthly salary' : 'e.g. Dinner with friends'} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
              </label>
              <div className="form-row">
                <label className="form-label">Category
                  <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
                    {CATEGORIES.filter((category) => category === 'Other' || (form.type === 'income' ? ['Salary', 'Business', 'Other'].includes(category) : !['Salary', 'Business'].includes(category))).map((category) => <option key={category}>{category}</option>)}
                  </select>
                </label>
                <label className="form-label">Date
                  <input required type="date" value={form.date} max={today()} onChange={(event) => setForm({ ...form, date: event.target.value })} />
                </label>
              </div>
              <button type="submit" className="primary-button submit-button"><Icon name="plus" size={18} /> Save transaction</button>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
