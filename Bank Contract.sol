// SPDX-License-Identifier: MIT
pragma solidity >0.8.13 <=0.8.21;

contract Bank {
    address private BankOwner;
    struct AccountHolder {
        string holderName;
        address accountAddress;
        uint256 balance;
        bool account;
    }
    struct Loan {
        address borrower;
        uint256 loanAmount;
        uint256 interestRate;
        uint256 numberOfEMI;
        uint256 emiAmount;
        uint256 lastEMIPaymentTimestamp;
        uint256 EMIAmountWithInterest;
        uint256 repayment;
        string loanType;
        bool loanApproved;
        bool loanActive;
        bool hasAppliedForLoan;
    }

    enum LoanType {
        PersonalLoan,
        EducationalLoan,
        BusinessLoan,
        HomeLoan
    }

    mapping(address => AccountHolder) public accountHolder;
    mapping(address => Loan) public personalLoan;
    mapping(address => Loan) public educationalLoan;
    mapping(address => Loan) public businessLoan;
    mapping(address => Loan) public homeLoan;
    uint8 private time = 1 minutes;

    event Deposit(address owner, uint256 amount);
    event Transfer(address from, address to, uint256 amount);
    event LoanTrasnsfer(address borrower, uint256 loanAmount, string message);

    constructor() {
        BankOwner = msg.sender;
    }

    modifier onlyOwner() {
        require(
            msg.sender == BankOwner,
            "Only bank owner can perform this work."
        );
        _;
    }

    function DepositFundToTheBank() public payable onlyOwner {
        require(msg.value > 0, "msg.value is greater than 0");
        emit Deposit(msg.sender, msg.value);
    }

    function createAccountOnBank(string memory name) external payable {
        AccountHolder memory newAccount = accountHolder[msg.sender];
        require(
            msg.sender != BankOwner,
            "Address you select is owner address."
        );
        require(
            newAccount.accountAddress == address(0),
            "Your account is already exist."
        );
        require(
            msg.value >= 100,
            "Please select > 100 value because mininum amount in your account = 100"
        );

        newAccount.holderName = name;
        newAccount.accountAddress = msg.sender;
        newAccount.account = true;
        newAccount.balance = msg.value;
        accountHolder[msg.sender] = newAccount;
        emit Deposit(msg.sender, msg.value);
    }

    function depositeMoneyByUser() external payable {
        AccountHolder memory depositAmount = accountHolder[msg.sender];
        require(
            depositAmount.account != false,
            "Please Firstly create your account in the bank after then deposite the money."
        );
        require(msg.value > 0, "Please provide valid amount of money");

        depositAmount.balance += msg.value;
        accountHolder[msg.sender] = depositAmount;
        emit Deposit(msg.sender, msg.value);
    }

    function withdrawMoneyByUser(uint256 amount) public payable {
        AccountHolder memory withdrawAmount = accountHolder[msg.sender];

        require(
            withdrawAmount.account != false,
            "Please Firstly create your account in the bank after then withdraw the money."
        );
        require(
            withdrawAmount.balance >= amount,
            "You have not sufficient balance."
        );
        withdrawAmount.balance -= amount;
        accountHolder[msg.sender]= withdrawAmount;
        payable(msg.sender).transfer(amount);
        emit Deposit(msg.sender, amount);
    }

    function transferMoney(address to, uint256 amount) public {
        AccountHolder memory transferAmount = accountHolder[msg.sender];
        AccountHolder memory transferAmountTo = accountHolder[to];
        require(
            transferAmount.account != false,
            "Please Firstly create your account in the bank after then transfer the money."
        );
        require(
            transferAmountTo.account != false,
            "to account is also exist in the bank"
        );
        require(to != address(0), "to != address(0)");
        require(
            transferAmount.account != false,
            "Please Firstly create your account in the bank after then deposite the money."
        );
        require(
            transferAmount.balance >= amount,
            "There is no sufficient balance in your account."
        );
        require(amount > 0, "Amount is always greater than 0.");
        payable(to).transfer(amount);
        transferAmount.balance -= amount;
        transferAmountTo.balance += amount;
        accountHolder[msg.sender] = transferAmount;
        accountHolder[to] = transferAmountTo;

        emit Transfer(msg.sender, to, amount);
    }

    function loanApply(
        uint256 loanAmount,
        uint256 numberOfMonths,
        LoanType loanType
    ) external returns (string memory loantype) {

        require(
            accountHolder[msg.sender].account != false,
            "Please Firstly create your account in the bank after then you will apply for the Loan."
        );
        require(loanAmount > 0, "Amount > 0");
        require(numberOfMonths > 0, "EMI is considered as a month by month");
        if (uint8(loanType) == 0) {
            Loan memory newLoan = personalLoan[msg.sender];
            require(
                !newLoan.hasAppliedForLoan,
                "You already apply for a Personal loan"
            );
            require(!newLoan.loanActive, "Your Loan already active");
            uint8 interestRate = 12;
            loanCalculate(newLoan, interestRate, loanAmount, numberOfMonths);
            newLoan.loanType = "Personal Loan";
            personalLoan[msg.sender] = newLoan;
        } else if (uint8(loanType) == 1) {
            Loan memory newLoan = educationalLoan[msg.sender];
            require(
                !newLoan.hasAppliedForLoan,
                "You already apply for a Educational loan"
            );
            uint8 interestRate = 8;
            loanCalculate(newLoan, interestRate, loanAmount, numberOfMonths);
            newLoan.loanType = "Educational Loan";
             educationalLoan[msg.sender] = newLoan;
        } else if (uint8(loanType) == 2) {
            Loan memory newLoan = businessLoan[msg.sender];
            require(
                !newLoan.hasAppliedForLoan,
                "You already apply for a Business loan"
            );
            require(!newLoan.loanActive, "Your Loan already active");
            uint8 interestRate = 14;
            loanCalculate(newLoan, interestRate, loanAmount, numberOfMonths);
            newLoan.loanType = "Business Loan";
            businessLoan[msg.sender] = newLoan;
        } else if (uint8(loanType) == 3) {
            Loan memory newLoan = homeLoan[msg.sender];
            require(
                !newLoan.hasAppliedForLoan,
                "You already apply for a Home loan"
            );

            uint8 interestRate = 10;
            loanCalculate(newLoan, interestRate, loanAmount, numberOfMonths);
            newLoan.loanType = "Home Loan";
            homeLoan[msg.sender] = newLoan;
        } else {
            return
                "You select invalied loan type. Please select valid loan type.";
        }
    }

    function loanCalculate(
        Loan memory loantype,
        uint8 interestRate,
        uint256 loanAmount,
        uint256 numberOfMonths
    ) internal view {
        require(!loantype.loanActive, "Your Loan already active");
        uint256 emiAmount = calculateEMIAmount(
            loanAmount,
            interestRate,
            numberOfMonths
        );
        loantype.interestRate = interestRate;
        loantype.emiAmount = emiAmount;
        loantype.EMIAmountWithInterest = 0;
        loantype.borrower = msg.sender;
        loantype.loanAmount = loanAmount;
        loantype.numberOfEMI = numberOfMonths;
        loantype.repayment = 0;
        loantype.lastEMIPaymentTimestamp = block.timestamp;
        loantype.loanApproved = false;
        loantype.loanActive = false;
        loantype.hasAppliedForLoan = true;
    }

    function approveLoan(address payable borrower, LoanType loanType)
        external
        payable
        onlyOwner
        returns (string memory loantype)
    {
        AccountHolder memory loanAmount = accountHolder[borrower];
        if (uint8(loanType) == 0) {
            Loan memory loan = personalLoan[borrower];
            processOfApproveLoan(loan, loanAmount);
            payable(borrower).transfer(loan.loanAmount);
             personalLoan[borrower] = loan;
        } else if (uint8(loanType) == 1) {
            Loan memory loan = educationalLoan[borrower];
            processOfApproveLoan(loan, loanAmount);
            payable(borrower).transfer(loan.loanAmount);
            educationalLoan[borrower] = loan;
        } else if (uint8(loanType) == 2) {
            Loan memory loan = businessLoan[borrower];
            processOfApproveLoan(loan, loanAmount);
            payable(borrower).transfer(loan.loanAmount);
            businessLoan[borrower] = loan;
        } else if (uint8(loanType) == 3) {
            Loan memory loan = homeLoan[borrower];
            processOfApproveLoan(loan, loanAmount);
            payable(borrower).transfer(loan.loanAmount);
            homeLoan[borrower] = loan;
        } else {
            return "Invalid Loan Type.";
        }
        accountHolder[borrower] = loanAmount;
    }

    function processOfApproveLoan(
        Loan memory loantype,
        AccountHolder memory loanAmount
    ) internal pure {
        require(
            loantype.borrower != address(0),
            "Borrower has not applied for the loan"
        );
        require(!loantype.loanActive, "Loan already active");
        loantype.loanApproved = true;
        loantype.loanActive = true;
        loanAmount.balance += loantype.loanAmount;

    }

    function calculateEMIAmount(
        uint256 loanAmount,
        uint256 interestRate,
        uint256 numberOfMonths
    ) private pure returns (uint256) {
        uint256 totalAmountAfterLoanRecover = loanAmount +
            (loanAmount * interestRate) /
            100;
        uint256 Emi = totalAmountAfterLoanRecover / numberOfMonths;
        return Emi;
    }

    function loanRepay(LoanType loanType) external payable {
        AccountHolder storage loanAmount = accountHolder[msg.sender];
        if (uint8(loanType) == 0) {
            Loan storage loan = personalLoan[msg.sender];
            processForLoanRepay(loan, loanAmount);
        } else if (uint8(loanType) == 1) {
            Loan storage loan = educationalLoan[msg.sender];
            processForLoanRepay(loan, loanAmount);
        } else if (uint8(loanType) == 2) {
            Loan storage loan = businessLoan[msg.sender];
            processForLoanRepay(loan, loanAmount);
        } else if (uint8(loanType) == 3) {
            Loan storage loan = homeLoan[msg.sender];
            processForLoanRepay(loan, loanAmount);
        }
    }

    function processForLoanRepay(
        Loan storage loan,
        AccountHolder storage loanAmount
    ) internal {
        require(
            block.timestamp > loan.lastEMIPaymentTimestamp + time,
            "Your EMI payment time is not come"
        );
        require(loan.loanApproved, "Loan not approved");
        require(loan.loanActive, "Already payed your loan.");
        require(msg.value > 0, "Please provide valid amount of money");
        require(msg.value == loan.emiAmount, "Please select valid EMI value.");
        loan.numberOfEMI -= 1;
        loan.repayment += 1;
        loan.lastEMIPaymentTimestamp = block.timestamp;
        loan.EMIAmountWithInterest += loan.emiAmount;
        loanAmount.balance -= loan.emiAmount;

        emit Transfer(msg.sender, BankOwner, loan.emiAmount);

        if (loan.numberOfEMI == 0) {
            loan.loanActive = false;
            loan.hasAppliedForLoan = false;
        }
    }

    // function checkBalanceInBank() public view returns (uint256 Balance){
    //     return address(this).balance;
    // }
}
