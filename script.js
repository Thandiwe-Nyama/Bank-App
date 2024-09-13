let user = {
    username: '',
    password: '',
    balance: 1000,
    transactions: []
};

let admin = {
    username: 'admin',
    password: '12345'
};

function showLogin(role) {
    document.getElementById('role-selection').classList.add('hidden');
    if (role === 'user') {
        document.getElementById('user-login').classList.remove('hidden');
    } else if (role === 'admin') {
        document.getElementById('admin-login').classList.remove('hidden');
    }
}

function login(role) {
    if (role === 'user') {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const errorElement = document.getElementById('login-error');

        if (!/^\d+$/.test(password)) {
            errorElement.textContent = 'Password must contain only numbers!';
            return;
        }

        user.username = username;
        user.password = password;

        alert(`Welcome, ${user.username}! You have successfully logged in.`);
        
        document.getElementById('user-login').classList.add('hidden');
        document.getElementById('user-dashboard').classList.remove('hidden');
        document.getElementById('user-name').textContent = user.username;
        updateBalance();

    } else if (role === 'admin') {
        const adminUsername = document.getElementById('admin-username').value.trim();
        const adminPassword = document.getElementById('admin-password').value.trim();
        const errorElement = document.getElementById('admin-login-error');

        if (adminUsername === admin.username && adminPassword === admin.password) {
            alert('Welcome, Admin!');
            document.getElementById('admin-login').classList.add('hidden');
            document.getElementById('admin-dashboard').classList.remove('hidden');
            showAdminUsers();
        } else {
            errorElement.textContent = 'Invalid admin username or password!';
        }
    }
}

function logout() {
    document.getElementById('user-dashboard').classList.add('hidden');
    document.getElementById('admin-dashboard').classList.add('hidden');
    document.getElementById('role-selection').classList.remove('hidden');

    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('login-error').textContent = '';
    document.getElementById('admin-username').value = '';
    document.getElementById('admin-password').value = '';
    document.getElementById('admin-login-error').textContent = '';
}

function deposit() {
    const amount = parseFloat(document.getElementById('deposit-amount').value);
    const errorElement = document.getElementById('deposit-error');

    if (!isNaN(amount) && amount > 0) {
        user.balance += amount;
        user.transactions.push(`Deposited R${amount}`);
        updateBalance();
        document.getElementById('deposit-amount').value = '';
        showSection('user-dashboard');
        alert(`You have successfully deposited R${amount}. Your new balance is R${user.balance.toFixed(2)}.`);
    } else {
        errorElement.textContent = 'Enter a valid amount!';
    }
}

function withdraw() {
    const amount = parseFloat(document.getElementById('withdraw-amount').value);
    const errorElement = document.getElementById('withdraw-error');

    if (!isNaN(amount) && amount > 0) {
        if (amount <= user.balance) {
            user.balance -= amount;
            user.transactions.push(`Withdrew R${amount}`);
            updateBalance();
            document.getElementById('withdraw-amount').value = '';
            showSection('user-dashboard');
            alert(`You have successfully withdrawn R${amount}. Your new balance is R${user.balance.toFixed(2)}.`);
        } else {
            errorElement.textContent = 'Insufficient funds!';
        }
    } else {
        errorElement.textContent = 'Enter a valid amount!';
    }
}

function showSection(section) {
    const sections = ['role-selection', 'user-login', 'admin-login', 'user-dashboard', 'admin-dashboard', 'deposit', 'withdraw', 'transactions', 'manage-users'];
    sections.forEach(s => document.getElementById(s).classList.add('hidden'));

    document.getElementById(section).classList.remove('hidden');

    if (section === 'transactions') {
        displayTransactions();
    }
}

function updateBalance() {
    document.getElementById('balance').textContent = user.balance.toFixed(2);
}

function displayTransactions() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';

    user.transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.textContent = transaction;
        transactionList.appendChild(li);
    });
}
F
function showAdminUsers() {
    document.getElementById('user-name-list').textContent = user.username;
    document.getElementById('user-balance-list').textContent = user.balance.toFixed(2);
}
