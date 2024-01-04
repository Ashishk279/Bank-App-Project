const address = "0xadC71511F8ea2D0F5F9adf0eE6f07e740Fb3f665";
const abi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "borrower",
        type: "address",
      },
      {
        internalType: "enum Bank.LoanType",
        name: "loanType",
        type: "uint8",
      },
    ],
    name: "approveLoan",
    outputs: [
      {
        internalType: "string",
        name: "loantype",
        type: "string",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "createAccountOnBank",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "depositeMoneyByUser",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "loanAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numberOfMonths",
        type: "uint256",
      },
      {
        internalType: "enum Bank.LoanType",
        name: "loanType",
        type: "uint8",
      },
    ],
    name: "loanApply",
    outputs: [
      {
        internalType: "string",
        name: "loantype",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    inputs: [],
    name: "DepositFundToTheBank",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum Bank.LoanType",
        name: "loanType",
        type: "uint8",
      },
    ],
    name: "loanRepay",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "loanAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "LoanTrasnsfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferMoney",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawMoneyByUser",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "accountHolder",
    outputs: [
      {
        internalType: "string",
        name: "holderName",
        type: "string",
      },
      {
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "account",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "businessLoan",
    outputs: [
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "loanAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "interestRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numberOfEMI",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "emiAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastEMIPaymentTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "EMIAmountWithInterest",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "repayment",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "loanType",
        type: "string",
      },
      {
        internalType: "bool",
        name: "loanApproved",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "loanActive",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "hasAppliedForLoan",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "educationalLoan",
    outputs: [
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "loanAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "interestRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numberOfEMI",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "emiAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastEMIPaymentTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "EMIAmountWithInterest",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "repayment",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "loanType",
        type: "string",
      },
      {
        internalType: "bool",
        name: "loanApproved",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "loanActive",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "hasAppliedForLoan",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "homeLoan",
    outputs: [
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "loanAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "interestRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numberOfEMI",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "emiAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastEMIPaymentTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "EMIAmountWithInterest",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "repayment",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "loanType",
        type: "string",
      },
      {
        internalType: "bool",
        name: "loanApproved",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "loanActive",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "hasAppliedForLoan",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "personalLoan",
    outputs: [
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "loanAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "interestRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numberOfEMI",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "emiAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastEMIPaymentTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "EMIAmountWithInterest",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "repayment",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "loanType",
        type: "string",
      },
      {
        internalType: "bool",
        name: "loanApproved",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "loanActive",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "hasAppliedForLoan",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const web3 = new Web3(window.ethereum);
const contractInstance = new web3.eth.Contract(abi, address);
export default contractInstance;
