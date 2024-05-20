// Initialize Web3 using MetaMask's injected provider
const web3 = new Web3(window.ethereum);

// Define contract ABI and address
const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "merchantAddress",
        type: "address",
      },
    ],
    name: "Deregistered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "merchantAddress",
        type: "address",
      },
    ],
    name: "deregisterMerchant",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_student",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "age",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rank",
        type: "uint256",
      },
    ],
    name: "registerMerchant",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "usera",
        type: "address",
      },
    ],
    name: "checkBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "printRegisteredStudents",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "studentAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "age",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rank",
            type: "uint256",
          },
        ],
        internalType: "struct ScholarshipCredit.StudentDetails[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const contractAddress = "0xb7b29340a5bc9311b955a00272c86e642d0afe1a"; // Add your contract address here

// Initialize contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to connect MetaMask and display account info
async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      document.getElementById("connectButton").innerHTML = "Connected";
      document.getElementById("accountInfo").innerHTML = "Account Address: " + accounts[0];
      const actionsDiv = document.getElementById('actions');
      actionsDiv.classList.remove('hidden');
    } catch (error) {
      console.log(error);
    }
  } else {
    document.getElementById("connectButton").innerHTML = "Please install MetaMask";
  }
}
function showForm(formId) {
  const forms = document.querySelectorAll('.form-container');
  forms.forEach(form => form.classList.add('hidden'));
  const selectedForm = document.getElementById(formId);
  selectedForm.classList.remove('hidden');
}

// Function to toggle visibility of registration form
function showRegisterForm() {
  document.getElementById("registerform").classList.toggle("hidden");
}

// Function to toggle visibility of deregistration form
function showDeregisterForm() {
  document.getElementById("deregisterForm").classList.toggle("hidden");
}

// Function to toggle visibility of check balance form
function showCheckBalanceForm() {
  document.getElementById("checkBalanceForm").classList.toggle("hidden");
}

// Function to toggle visibility of registered students list
function showRegisteredStudentsList() {
  closeAllForms();
  document.getElementById("registeredStudentsList").classList.toggle("hidden");
}
function closeAllForms() {
  const forms = document.querySelectorAll(".form-container");
  forms.forEach(form => {
      if (!form.classList.contains("hidden")) {
          form.classList.add("hidden");
      }
  });
}
// Function to handle registration form submission
document.getElementById("registrationForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const stID = document.getElementById("stID").value;
  const stAge = document.getElementById("stAge").value;
  const stRank = document.getElementById("stRank").value;

  try {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const senderAddress = accounts[0];
    const result = await contract.methods
      .registerMerchant(senderAddress, stID, stAge, stRank)
      .send({ from: senderAddress });
    console.log("Transaction Hash:", result.transactionHash);
    console.log("Receipt:", result);
    document.getElementById("registerResult").innerHTML = "You are successfully registered for the Scholarship Credit System.";
    document.getElementById("registerResult").style.color = "green";
    document.getElementById("registerResult").style.fontWeight = "bold";
  } catch (error) {
    console.error(error);
    document.getElementById("registerResult").innerHTML = "Registration failed. Please try again.";
    document.getElementById("registerResult").style.color = "red";
    document.getElementById("registerResult").style.fontWeight = "bold";
  }
});

// Function to handle deregistration form submission
document.getElementById("deregistrationForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const merchantAddress = document.getElementById("merchantAddress").value;

  try {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const senderAddress = accounts[0];
    const result = await contract.methods.deregisterMerchant(merchantAddress).send({ from: senderAddress });
    console.log("Transaction Hash:", result.transactionHash);
    console.log("Receipt:", result);
    document.getElementById("deregisterResult").innerHTML = "Merchant deregistered successfully.";
    document.getElementById("deregisterResult").style.color = "green";
    document.getElementById("deregisterResult").style.fontWeight = "bold";
  } catch (error) {
    console.error(error);
    document.getElementById("deregisterResult").innerHTML = "Deregistration failed. Please try again.";
    document.getElementById("deregisterResult").style.color = "red";
    document.getElementById("deregisterResult").style.fontWeight = "bold";
  }
});

// Function to handle check balance form submission
document.getElementById("checkBalanceForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const studentAddress = document.getElementById("studentAddress").value;

  try {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const senderAddress = accounts[0];
    const balance = await contract.methods.checkBalance(studentAddress).call({ from: senderAddress });
    document.getElementById("balanceResult").innerHTML = `Balance for ${studentAddress}: ${balance} credits`;
    document.getElementById("balanceResult").style.color = "green";
    document.getElementById("balanceResult").style.fontWeight = "bold";
  } catch (error) {
    console.error(error);
    document.getElementById("balanceResult").innerHTML = "Failed to fetch balance. Please try again.";
    document.getElementById("balanceResult").style.color = "red";
    document.getElementById("balanceResult").style.fontWeight = "bold";
  }
});

/// Function to print registered students
async function printRegisteredStudents() {
  try {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const senderAddress = accounts[0];
    const students = await contract.methods.printRegisteredStudents().call({ from: senderAddress });
    let studentsList = "";
    students.forEach((student) => {
      studentsList += `<li>Address: ${student.studentAddress}, ID: ${student.id}, Age: ${student.age}, Rank: ${student.rank}</li>`;
    });
    document.getElementById("registeredStudentsList").innerHTML = `<ul>${studentsList}</ul>`;
  } catch (error) {
    console.error(error);
    document.getElementById("registeredStudentsList").innerHTML = "Failed to fetch registered students.";
  }
}