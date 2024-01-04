import contractInstance from "./abi.js";
const web3 = new Web3(window.ethereum);
let userAccount;
let ownerAccount;
let userLoginAccount;

const data = localStorage.getItem('myData1');
const data2 = localStorage.getItem('myData');
const data3 = localStorage.getItem('myData2');
console.log(data, data2, data3);

document.addEventListener("DOMContentLoaded", function () {
  // Login page
  const login = document.getElementById("login");
  login.addEventListener("click", function () {
    window.location.href = "home.html";
  })
});

document.addEventListener("DOMContentLoaded", function () {
  // Create new Account
  const account = document.getElementById("newAccount");
  account.addEventListener("click", function () {
    window.location.href = "create.html";
  })
});

document.addEventListener("DOMContentLoaded", async function () {
  // connect Wallet
  const button = document.getElementById("wallet_btn");
  button.addEventListener("click", async () => {
    if (typeof web3 !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum
          .request({
            method: "eth_requestAccounts",
          }).then((accounts) => {
            userAccount = accounts[0];
            const element = document.getElementById("MetamaskAccountDetails1");
            element.innerHTML = `Address of metamask account: ${userAccount}`;
            localStorage.setItem('myData1', userAccount);
            console.log(userAccount)
          });
        // Display a success message

        await web3.eth.getBalance(userAccount, (error, balance) => {
          if (!error) {
            const element = document.getElementById("MetamaskAccountDetails2");
            element.innerHTML = `Balance : ${web3.utils.fromWei(balance, "ether")}, "ETH"`
          }
        });
      } catch (err) {
        alert("You are not connected with metamask. Please try again.", err.message);
      }
    } else {
      alert("You need to install metamask");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // connect Wallet for owner
  const button = document.getElementById("Wallet_btn");
  button.addEventListener("click", async () => {
    if (typeof web3 !== "undefined" && typeof window.ethereum !== "undefined") {

      try {
        await window.ethereum
          .request({
            method: "eth_requestAccounts",
          })
          .then((accounts) => {
            ownerAccount = accounts[0];
            const element = document.getElementById("MetamaskAccountDetails1");
            element.innerHTML = `Address of metamask account: ${ownerAccount}`
            localStorage.setItem('myData', ownerAccount);
            console.log(ownerAccount)

          });

        await web3.eth.getBalance(ownerAccount, (error, balance) => {
          if (!error) {
            const element = document.getElementById("MetamaskAccountDetails2");
            element.innerHTML = `Balance : ${web3.utils.fromWei(balance, "ether")}, "ETH"`
          }
        });
      } catch (err) {
        alert("You are not connected with metamask. Please try again.", err.message);
      }
    } else {
      alert("You need to install metamask");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Create Account
  const input_field2 = document.getElementById("inputField2");
  input_field2.addEventListener("input", async (event) => {
    const name = event.target.value;
    console.log("Your Name =  ", name);
  });

  const input_field3 = document.getElementById("inputField3");
  input_field3.addEventListener("input", async (event) => {
    const amount = event.target.value;
    console.log("Deposit amount = ", amount);
  });

  const createAccount = document.getElementById("CreateAccount");
  createAccount.addEventListener("click", async () => {
    const name = input_field2.value;
    const amount = input_field3.value;
    const fundsToWei = web3.utils.fromWei(amount, "wei");
    console.log("Funds to wei ", amount);

    try {
      confirm("Do you want to create a account in our bank?");
      const gasEstimate = await contractInstance.methods
        .createAccountOnBank(name)
        .estimateGas({ from: data, value: fundsToWei });
      const element1 = document.getElementById("MetamaskAccountDetails3");
      element1.innerHTML = `Estimated gas cost: ${gasEstimate}`
      console.log("Estimated gas cost:", gasEstimate);

      const funds = await contractInstance.methods
        .createAccountOnBank(name)
        .send({ from: data, value: fundsToWei });
      const element2 = document.getElementById("MetamaskAccountDetails4");
      element2.innerHTML = `Block Transaction : ${funds.blockHash}`
      console.log(funds);
      alert("Your account is created successfully. Now login your account by click on \"Login Your Account \" button!! ");
      setTimeout(function () {
        window.location.href = "home.html";
      }, 5000);

    } catch (err) {
      alert("Create account transaction failed. Please try again!!", err.message);
    }
  });

});

document.addEventListener("DOMContentLoaded", function () {
  // Login account
  const loginAccount = document.getElementById("LoginAccount");
  loginAccount.addEventListener("click", async () => {
    if (typeof web3 !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum
          .request({
            method: "eth_requestAccounts",
          })
          .then((accounts) => {
            userLoginAccount = accounts[0];
            const element = document.getElementById("MetamaskAccountDetails1");
            element.innerHTML = `Address of metamask account: ${userLoginAccount}`
            localStorage.setItem('myData2', userLoginAccount);
          });
        await web3.eth.getBalance(userLoginAccount, (error, balance) => {
          if (!error) {
            const element = document.getElementById("MetamaskAccountDetails2");
            element.innerHTML = `Balance : ${web3.utils.fromWei(balance, "ether")}, "ETH"`
          }
        });
      } catch (err) {
        alert("You are not connected with metamask. Please try again.", err.message);
      }
    } else {
      alert("You need to install metamask!!");
    }
    const account = await contractInstance.methods.accountHolder(userLoginAccount).call();
    if (account.account == true) {
      console.log(account.account);
      setTimeout(function () {
        window.location.href = "account.html";
      }, 3000);

    } else {
      alert("There is no account of this address. Please create new account!!");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Details of account holder
  const accountDetail = document.getElementById("AccountDetail");
  accountDetail.addEventListener("click", async () => {
    const account = await contractInstance.methods.accountHolder(data3).call();
    const element1 = document.getElementById("MetamaskAccountDetails5");
    element1.innerHTML = `Account Holder: ${account.holderName}`
    const element2 = document.getElementById("MetamaskAccountDetails6");
    element2.innerHTML = `Account Address: ${account.accountAddress}`
    const element3 = document.getElementById("MetamaskAccountDetails7");
    element3.innerHTML = `Account Balance: ${account.balance}`
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Deposit fund by owner
  const input_field1 = document.getElementById("inputField1");
  input_field1.addEventListener("input", async (event) => {
    const fund = event.target.value;
    console.log("Deposit fund = ", fund);
  });

  const depositFundByOwner = document.getElementById("DepositFundByOwner");
  depositFundByOwner.addEventListener("click", async () => {
    const depositFund = input_field1.value;
    const fundsToWei = web3.utils.fromWei(depositFund, "wei");
    console.log("Funds to wei ", fundsToWei);
    console.log(data2)
    try {
      const gasEstimate = await contractInstance.methods
        .DepositFundToTheBank()
        .estimateGas({ from: data2, value: fundsToWei });
      const element1 = document.getElementById("MetamaskAccountDetails3");
      element1.innerHTML = `Estimated gas cost: ${gasEstimate}`
      console.log("Estimated gas cost:", gasEstimate);

      const funds = await contractInstance.methods
        .DepositFundToTheBank()
        .send({ from: data2, value: fundsToWei });
      const element2 = document.getElementById("MetamaskAccountDetails4");
      element2.innerHTML = `Block Transaction : ${funds.blockHash}`
      console.log(funds);
    } catch (err) {
      console.error("Deposit funds transaction failed:", err.message);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Deposit fund by user
  const input_field4 = document.getElementById("inputField4");
  input_field4.addEventListener("input", async (event) => {
    const amount = event.target.value;
    console.log("Deposit amount = ", amount);
  });

  const depositFundByUser = document.getElementById("DepositFundByUser");
  depositFundByUser.addEventListener("click", async () => {
    const depositFund = input_field4.value;
    const fundsToWei = web3.utils.fromWei(depositFund, "wei");
    try {
      const gasEstimate = await contractInstance.methods
        .depositeMoneyByUser()
        .estimateGas({ from: data3, value: fundsToWei });
      console.log(gasEstimate)
      const funds = await contractInstance.methods
        .depositeMoneyByUser()
        .send({ from: data3, value: fundsToWei });
      console.log(funds)
      alert("Funds Deposit SuccessFully. Please check account details!!", funds.blockHash);
    } catch (err) {
      alert("Deposit funds transaction failed:", err);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Withdraw amount from bank
  const input_field5 = document.getElementById("inputField5");
  input_field5.addEventListener("input", async (event) => {
    const amount = event.target.value;
    console.log("Withdraw amount = ", amount);
  });

  const withdrawAmount = document.getElementById("WithdrawAmount");
  withdrawAmount.addEventListener("click", async () => {
    const withdrawFund = input_field5.value;
    const fundsToWei = web3.utils.fromWei(withdrawFund, "wei");
    console.log("Funds to wei ", fundsToWei);
    try {
      const gasEstimate = await contractInstance.methods
        .withdrawMoneyByUser(fundsToWei)
        .estimateGas({ from: data3 });
      console.log("Estimated gas cost:", gasEstimate);

      const funds = await contractInstance.methods
        .withdrawMoneyByUser(fundsToWei)
        .send({ from: data3 });

      console.log(funds);
      alert("Funds are withdraw successfully!!", funds.blockHash);
    } catch (err) {
      alert("Withdraw funds transaction failed:", err.message);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Transfer Money
  const input_field6 = document.getElementById("inputField6");
  input_field6.addEventListener("input", async (event) => {
    const address = event.target.value;
    console.log("Address of person = ", address);
  });

  const input_field7 = document.getElementById("inputField7");
  input_field7.addEventListener("input", async (event) => {
    const amount = event.target.value;
    console.log("Transfer money = ", amount);
  });

  const transferMoney = document.getElementById("TransferMoney");
  transferMoney.addEventListener("click", async () => {
    const address = input_field6.value;
    const transferFund = input_field7.value;
    const fundsToWei = web3.utils.fromWei(transferFund, "wei");
    console.log("Funds to wei ", fundsToWei);
    try {
      const gasEstimate = await contractInstance.methods
        .transferMoney(address, transferFund)
        .estimateGas({ from: data3 });
      console.log("Estimated gas cost:", gasEstimate);

      const funds = await contractInstance.methods
        .transferMoney(address, transferFund)
        .send({ from: data3 });

      console.log(funds);
      alert("Funds transfer successfully!!", funds.blockHash);
    } catch (err) {
      alert("Transfer funds transaction failed:", err.message);
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const loanApply = document.getElementById("LoanApply");
  loanApply.addEventListener("click", function () {
    window.location.href = "loan.html";
  })
});

document.addEventListener("DOMContentLoaded", function () {
  // Loan Details
  const selectLoanType4 = document.getElementById("SelectLoanType4")
  const loanDetails = document.getElementById("CheckLoan");
  loanDetails.addEventListener("click", async () => {
    const loanType = selectLoanType4.value;
    let checkLoan;
    if (loanType == 0) {
      checkLoan = await contractInstance.methods.personalLoan(data3).call();
    }
    else if (loanType == 1) {
      checkLoan = await contractInstance.methods.educationalLoan(data3).call();
    }
    else if (loanType == 2) {
      checkLoan = await contractInstance.methods.businessLoan(data3).call();
    }
    else if (loanType == 3) {
      checkLoan = await contractInstance.methods.homeLoan(data3).call();
    }
    const element1 = document.getElementById("Detail1");
    element1.innerHTML = `Address : ${checkLoan.borrower}`
    const element2 = document.getElementById("Detail2");
    element2.innerHTML = `Loan Amount : ${checkLoan.loanAmount}`
    const element3 = document.getElementById("Detail3");
    element3.innerHTML = `InterestRate : ${checkLoan.interestRate}%`
    const element4 = document.getElementById("Detail4");
    element4.innerHTML = `Number of EMIs : ${checkLoan.numberOfEMI}`
    const element5 = document.getElementById("Detail5");
    element5.innerHTML = `EMI Amount : ${checkLoan.emiAmount}`
    const element6 = document.getElementById("Detail6");
    element6.innerHTML = `Last EMI Payment Timestamp : ${checkLoan.lastEMIPaymentTimestamp}`
    const element7 = document.getElementById("Detail7");
    element7.innerHTML = `EMI Amount With Interest : ${checkLoan.EMIAmountWithInterest}`
    const element8 = document.getElementById("Detail8");
    element8.innerHTML = `Repayments : ${checkLoan.repayment}`
    const element9 = document.getElementById("Detail9");
    element9.innerHTML = `Loan Type : ${checkLoan.loanType}`
    const element10 = document.getElementById("Detail10");
    element10.innerHTML = `Loan Approved : ${checkLoan.loanApproved}`
    const element11 = document.getElementById("Detail11");
    element11.innerHTML = `Loan Active : ${checkLoan.loanActive}`
    const element12 = document.getElementById("Detail12");
    element12.innerHTML = `Has Applied For Loan : ${checkLoan.hasAppliedForLoan}`
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Apply for loan
  const input_field8 = document.getElementById("inputField8");
  input_field8.addEventListener("input", async (event) => {
    const amount = event.target.value;
    // console.log("Transfer money = ", amount);
  });

  const numberOfMonths = document.getElementById("SelectNumberOfMonths");
  const loneType = document.getElementById("SelectLoanType")

  const applyLoan = document.getElementById("Loan_Apply");
  applyLoan.addEventListener("click", async () => {
    const amount = input_field8.value;
    const fundsToWei = web3.utils.fromWei(amount, "wei");
    const emi = numberOfMonths.value;
    const loanSelect = loneType.value;

    try {
      const funds = await contractInstance.methods.loanApply(fundsToWei, emi, loanSelect).send({ from: data3 });
      alert("Your loan apply request is send to the Bank. Please wait for loan approve!!!")
      // console.log(funds);
      await fetch('http://localhost:4001/wallet', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress: data3, loanType: loanSelect, amount: fundsToWei }),
      })
        .then(response => response.json())
        .then(response => {
          console.log(JSON.stringify(response));
        })
        .catch(error => {
          console.error("Fetch error:", error);
        });
    } catch (err) {
      console.error("Deposit funds transaction failed:", err.message);
    }
  });

});

document.addEventListener("DOMContentLoaded", function () {
  // Approve Loan by owner
  const input_field9 = document.getElementById("inputField9");
  input_field9.addEventListener("input", async (event) => {
    const address = event.target.value;
    console.log("Address of person = ", address);
  })

  const select_Loan_Type2 = document.getElementById("Select_Loan_Type1")

  const approveLoan = document.getElementById("ApproveLoan");
  approveLoan.addEventListener("click", async () => {
    const address = input_field9.value;
    const loanType = select_Loan_Type2.value;
    console.log(typeof (address))
    try {
      const gasEstimate = await contractInstance.methods
        .approveLoan(address, loanType)
        .estimateGas({ from: data2 });
      console.log("Estimated gas cost:", gasEstimate);

      const funds = await contractInstance.methods
        .approveLoan(address, loanType)
        .send({ from: data2 });
      alert("Loan approved successfully!!")
      await fetch(`http://localhost:4001/getDelete/${address}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to delete data: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Data deleted successfully:', data);
        })
        .catch((error) => {
          console.error('Error deleting data:', error);
        });
      console.log(funds);
    } catch (err) {
      alert(" Approve loan transaction failed:", err.message);
    }
  })
});

document.addEventListener("DOMContentLoaded", function () {
  // Loan Repay 
  const input_field10 = document.getElementById("inputField10");
  input_field10.addEventListener("input", async (event) => {
    const amount = event.target.value;
    // console.log("Transfer money = ", amount);
  });
  const selectLoanType3 = document.getElementById("SelectLoanType2");
  const loanRepay = document.getElementById("LoanRepay");
  loanRepay.addEventListener("click", async () => {
    const loanType = selectLoanType3.value;
    const amount = input_field10.value;
    try {

      const gasEstimate = await contractInstance.methods
        .loanRepay(loanType)
        .estimateGas({ from: data3, value:amount });
      console.log("Estimated gas cost:", gasEstimate);

      const funds = await contractInstance.methods
        .loanRepay(loanType)
        .send({ from: data3 , value:amount});
      alert("Loan repay successfully!!")
      console.log(funds);
    } catch (err) {
      alert("Loan repay transaction failed:", err.message);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let data;
  const detail = document.getElementById("Applier");
  detail.addEventListener('click', async () => {
    await fetch('http://localhost:4001/getWalletAddress')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        let formattedAddresses = '';

        for (const item of data) {
          if (item.walletAddress) {
            formattedAddresses += `{<br>walletAddress= ${item.walletAddress}<br> Loan Type = ${item.loanType}<br> Amount = ${item.amount}<br>} <br>`;

          }
        }
        console.log(formattedAddresses);
        const paragraph = document.getElementById("p");
        paragraph.innerHTML = formattedAddresses;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  })

})








