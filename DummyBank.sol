// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// Declare the smart contract
contract DummyBank {
    using SafeMath for uint256;
    uint256 public ethersIn;

    address payable public owner;

    uint256 public capPercentage;

    mapping(address => uint) balances;
    address[] participants;


    constructor() {
        ethersIn = 0;
        capPercentage = 1;
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "You are not the owner of the smart contract!"
        );
        _;
    }

    receive() external payable {}

    function participate(uint256 _amount) public payable {
        require(msg.value == _amount, "msg.value donesn't equal _amount!");

        

        ethersIn = ethersIn.add(msg.value);
        if (balances[msg.sender] == 0) {
            participants.push(msg.sender);
        }
        balances[msg.sender] += msg.value;
    }

    struct Res {
        address winner;
        uint256 total; 
        uint256 cap; 
    }

    function distribute() public payable onlyOwner returns (Res memory) {
        uint256 cap = ethersIn / 100 * capPercentage;
        owner.transfer(cap); 

        uint256 randromDepositIndex = getRandomParticipantIndex();

        address winner = participants[randromDepositIndex];
        payable(winner).transfer(ethersIn - cap);
        Res memory res = Res(winner, ethersIn - cap, cap);

        for (uint256 i = 0; i < participants.length; i++) 
        {
            address participant = participants[i];
            
            balances[participant] = 0;
        }
        ethersIn = 0;
        delete participants;

        return res;
    }

    function getEthDeposited() public view returns (uint256) {
        return ethersIn;
    }

    function getBalanceInWei() public view returns (uint256) {
        return address(this).balance;
    }

    function getParticipants() public view returns (address[] memory) {
        return participants;
    }

    function getParticipantBalance(address _participant) public  view returns (uint256) {
        return balances[_participant];
    }

    function getBalanceInEth() public view returns (uint256) {
        uint256 weiBalance = address(this).balance;
        uint256 ethBalance = weiBalance.div(10**18);
        return ethBalance;
    }

    function setNewCapPercentage(uint256 _newCapPercentage) public onlyOwner {
        require(
            msg.sender == owner,
            "You are not the owner of the smart contract!"
        );
        capPercentage = _newCapPercentage;
    }

    function setNewOwner(address _newOwner) public onlyOwner {
        owner = payable(_newOwner);
    }

    function getRandomParticipantIndex() private view returns (uint256) {
        bytes memory rand = abi.encode(block.difficulty, block.timestamp);
        uint256 randomHash = uint256(keccak256(rand));
        return randomHash % participants.length;
    }
}
