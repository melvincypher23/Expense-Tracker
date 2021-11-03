//</script><script type="text/babel">

document.getElementsByClassName("loader")[0].style.display = "none";

const { useState, useEffect } = React;

const Header = () => {
    return(
        <div className="header">
            <h3>Expense Tracker</h3>
        </div>
    );
}

const SubHeader = ({ HeaderText }) => {
    return(
        <div className="sub-header">
            <h4>{ HeaderText }</h4>
        </div>
    );
}

const History = ({ HistText, HistDate, HistAmount }) => {

    let history_type = "";

    if (HistAmount < 0) {
        history_type = "history-container expense-shower";
    } else {
        history_type = "history-container income-shower";
    }

    return(
        <div className={history_type}>
            <div className="history-text">{ HistText }</div>
            <div className="history-time">{ HistDate }</div>
            <div className="history-amount">{ HistAmount }</div>
        </div>
    );
}

const Balance = ({ income, expense, totalAvail }) => {

    return(
        <div className="balance-container">
            <div className="total-balance">
                <div className="balance-header">YOUR BALANCE</div>
                <div className="balance-value">${totalAvail}</div>
            </div>
            <div className="inex-container-main">
                <div className="inex-display-main">
                    <div className="inex-header">Income</div>
                    <div className="inex-value" style={{'color': 'green'}}>${income}</div>
                </div>

                <div className="inex-display-main">
                    <div className="inex-header">Expense</div>
                    <div className="inex-value" style={{'color': 'red'}}>${expense}</div>
                </div>
            </div>
        </div>
    );
}

const AddTransaction = ({ newTransaction }) => {

    const handleAddTransaction = (e) => {
        e.preventDefault();
        let txt = document.getElementById("txt");
        let amnt = document.getElementById("amount");
        newTransaction(txt.value, amnt.value);
        txt.value = "";
        amnt.value = "";
        window.scrollTo(0, 0);
    }

    return(
        <div className="transaction-container">
            <form>
                <div className="input-container">
                    <div className="input-label">Text</div>
                    <div className="input-main"><input type="text" id="txt" placeholder="Enter text..."/></div>
                </div>

                <div className="input-container">
                    <div className="input-label">Amount<br />(positive - income, negative - expense)</div>
                    <div className="input-main"><input type="number" id="amount" placeholder="Enter amount..."/></div>
                </div>

                <div className="input-container">
                    <button className="btn-add-trans" onClick={handleAddTransaction}>Add transaction</button>
                </div>
            </form>
        </div>
    );
}

const App = () => {

    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [availAmount, setAvailAmount] = useState(income - expense);

    const [historyData, setHistoryData] = useState([]);

    const newTransaction = (txt, amnt) => {
        setHistoryData([...historyData, {text: txt, amount: amnt}]);
        if (amnt > 0) {
            setIncome(income + Number(amnt));
        } else {
            setExpense(expense - Number(amnt));
        }
    }

    useEffect(() => {
        setAvailAmount(income - expense);
    }, [income, expense]);

    return(
        <div className="App">
            <div className="container">
                <Header />
                <Balance 
                    income={income}
                    expense={expense}
                    totalAvail={availAmount} 
                />
                <SubHeader HeaderText="History"/>
                <div className="hist-container">
                    {
                        historyData.length === 0 && <h5>No transaction history found</h5>
                    }
                    {
                        historyData.length > 0 && historyData.map(history => {
                            return(
                                <History 
                                    HistText={history.text} 
                                    HistDate={history.date} 
                                    HistAmount={history.amount}
                                    key={uuidv4()}
                                />
                            )
                        })
                    }
                </div>
                <div className="addtrans-container">
                    <SubHeader HeaderText="Add new transaction"/>
                    <AddTransaction 
                        newTransaction={newTransaction}
                    />
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
