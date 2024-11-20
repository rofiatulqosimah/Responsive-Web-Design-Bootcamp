let price = 19.5;
let cid = [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
];

const currencyUnit = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
};

function checkCashRegister(price, cash, cid) {
    let change = Number((cash - price).toFixed(2));
    let totalCid = Number(cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2));
    
    if (totalCid < change) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    
    if (totalCid === change) {
        // For CLOSED status, return original cid array in reverse order
        return { 
            status: "CLOSED", 
            change: cid.filter(item => item[1] > 0).reverse()
        };
    }
    
    let changeArray = [];
    let tempCid = cid.slice().reverse();
    let remainingChange = change;
    
    for (let [denomination, available] of tempCid) {
        const unit = currencyUnit[denomination];
        let amount = 0;
        
        while (remainingChange >= unit && available > 0) {
            amount += unit;
            remainingChange -= unit;
            remainingChange = Number(remainingChange.toFixed(2));
            available -= unit;
        }
        
        if (amount > 0) {
            changeArray.push([denomination, amount]);
        }
    }
    
    if (remainingChange > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    
    return { status: "OPEN", change: changeArray };
}

function formatChangeOutput(result) {
    const changeText = result.change
        .map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`)
        .join(" ");
    
    return `Status: ${result.status}${changeText ? " " + changeText : ""}`;
}

function updateChangeDue(text, status) {
    const changeDue = document.getElementById('change-due');
    changeDue.textContent = text;
    changeDue.className = `status-${status.toLowerCase()}`;
    
    changeDue.classList.add('highlight');
    setTimeout(() => {
        changeDue.classList.remove('highlight');
    }, 500);
}

function animateCurrencyItem(element) {
    element.style.animation = 'none';
    element.offsetHeight;
    element.style.animation = 'fadeIn 0.5s ease-out';
}

document.getElementById('price-display').textContent = price.toFixed(2);

function updateDrawerDisplay() {
    const drawerDisplay = document.getElementById('drawer-display');
    drawerDisplay.innerHTML = cid.map(([currency, amount]) => `
        <div class="currency-item">
            <span>${currency}</span>
            <span>$${amount.toFixed(2)}</span>
        </div>
    `).join('');
}

document.getElementById('purchase-btn').addEventListener('click', function() {
    const cashInput = document.getElementById('cash');
    const cash = parseFloat(cashInput.value);

    if (isNaN(cash)) {
        alert("Please enter a valid cash amount");
        return;
    }

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    if (cash === price) {
        updateChangeDue("No change due - customer paid with exact cash", "closed");
        return;
    }

    const result = checkCashRegister(price, cash, [...cid]);
    const outputText = formatChangeOutput(result);
    updateChangeDue(outputText, result.status);

    document.querySelectorAll('.currency-item').forEach(item => {
        animateCurrencyItem(item);
    });
});

updateDrawerDisplay();

const cashInput = document.getElementById('cash');
cashInput.addEventListener('focus', function() {
    this.style.transform = 'scale(1.02)';
});

cashInput.addEventListener('blur', function() {
    this.style.transform = 'scale(1)';
});