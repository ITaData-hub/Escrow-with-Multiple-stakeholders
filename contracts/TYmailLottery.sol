// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


struct Res {
    address winner;
    uint256 total;
    uint256 cap;
}

contract TYmailLottery {
    using SafeMath for uint256;
    uint256 public ethersIn; // Keeps track of total amount of Ethers deposited into the contract by users.
    address payable public owner; // Address of the contract owner. 
    uint256 public capPercentage; // Percentage of total deposited Ethers which goes to the owner of the contract after distribution.

    mapping(address => uint256) balances;
    address[] participants;

    constructor() {
        ethersIn = 0;
        capPercentage = 1;
        owner = payable(msg.sender);
    }

    event Participant (address _participant, uint256 balance);
    event Distribution (Res _res);
    event CapChanges (uint256 _cap);
    event OwnershipTransfer  (address _newOwner);

    // Modifier is used in functions to restrict their access only to the contract owner.
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "You are not the owner of the smart contract!"
        );
        _;
    }

    receive() external payable {}

    // Allows users to deposit Ethers into the contract. 
    function participate(uint256 _amount) public payable {
        require(msg.value == _amount, "msg.value donesn't equal _amount!");

        ethersIn = ethersIn.add(msg.value);
        if (balances[msg.sender] == 0) {
            participants.push(msg.sender);
        }
        balances[msg.sender] = balances[msg.sender].add(msg.value);
        emit Participant(msg.sender, balances[msg.sender]);
    }

    // It transfers cap amount to the owner of the contract and a random participant a winAmount amount.
    function distribute() public payable onlyOwner returns (Res memory) {
        uint256 cap = ethersIn.div(100).mul(capPercentage);
        uint256 winAmount = ethersIn.sub(cap);

        owner.transfer(cap);

        uint256 randomParticipantIndex = getRandomParticipantIndex();

        address winner = participants[randomParticipantIndex];
        payable(winner).transfer(winAmount);

        Res memory res = Res(winner, winAmount, cap);
        
        emit Distribution(res);

        clearPartisipants();

        return res;
    }

    function clearPartisipants() public payable onlyOwner {
        // Clear all balances.
        for (uint256 i = 0; i < participants.length; i++) {
            address participant = participants[i];

            balances[participant] = 0;
        }
        ethersIn = 0;
        delete participants;
    }

    // Generates a random index for selecting a random participant.
    function getRandomParticipantIndex() private view returns (uint256) {
        bytes memory rand = abi.encode(block.difficulty, block.timestamp);
        uint256 randomHash = uint256(keccak256(rand));
        return randomHash.mod(participants.length);
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

    function getParticipantBalance(address _participant)
        public
        view
        returns (uint256)
    {
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
        emit CapChanges(_newCapPercentage);
    }

    function setNewOwner(address _newOwner) public onlyOwner {
        owner = payable(_newOwner);
        emit OwnershipTransfer(owner);
    }

}
