//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    // logging events
    event Approval(address indexed _owner, address indexed _spender,uint _value);
    event Transfer(address indexed _from, address indexed _to, uint _value);

}

contract EpicContract is Ownable{
    
    
    event SomeAwesomeEvent(address _addr, string _greeting);
    address public tokenAddress;
    IERC20 erc20_token;
    
    constructor(address _tokenAddress) {
        
        erc20_token = IERC20(_tokenAddress);

    }
    
    function checkAllowance(address owner) public view returns(uint256) {

        return erc20_token.allowance(owner, address(this));

    }

    function transferApprovedTokens(address owner, uint amount) public returns(bool) {

        return erc20_token.transferFrom(owner, address(this), amount);

    }

    function transferTokens(address receiver, uint amount) public returns(bool) {

        return erc20_token.transfer(receiver, amount);

    }

    function checkBalance(address account) external view returns(uint) {

        return erc20_token.balanceOf(account);

    }

    function checkTotalSupply() external view returns(uint) {
        return erc20_token.totalSupply();
    }
    
    
    
    function withdraw() external onlyOwner {

        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Transfer failed.");

    }

    

    
}
