// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract ScholarshipCredit {
    struct StudentDetails {
        address studentAddress;
        uint256 id;
        uint256 age;
        uint256 rank;
    }

    StudentDetails[] public studentDetailsList;
    mapping(address => bool) public isRegistered; // Changed to a boolean mapping
    mapping(address => uint256) public balances; // Mapping to store balances

    event Deregistered(address indexed merchantAddress);

    // constructor() {}

    function registerMerchant(address _student, uint256 id, uint256 age, uint256 rank) public {
        require(age >= 18, "Age was not sufficient to register");
        require(rank < 500, "Rank must be under 500 to register");
        
        studentDetailsList.push(StudentDetails(_student, id, age, rank));
        isRegistered[_student] = true; // Set the flag to true
        balances[_student] = 100; // Initialize balance to 100 credits
    }

    function deregisterMerchant(address merchantAddress) public {
        require(isRegistered[merchantAddress], "Merchant is not registered.");
        isRegistered[merchantAddress] = false; // Set the flag to false
        balances[merchantAddress] = 0; // Reset balance to 0
        emit Deregistered(merchantAddress);
    }

    function checkBalance(address usera) public view returns (uint256) {
        require(isRegistered[usera], "User is not registered.");
        return balances[usera];
    }

    function printRegisteredStudents() public view returns (StudentDetails[] memory) {
        return studentDetailsList;
    }

   
}
