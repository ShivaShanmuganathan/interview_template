//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.0;


import "hardhat/console.sol";

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

contract SwapTokens{

    IERC20 erc20_token1;
    IERC20 erc20_token2;
    
    constructor(address _tokenAddress1, address _tokenAddress2) {
        
        erc20_token1 = IERC20(_tokenAddress1);
        erc20_token2 = IERC20(_tokenAddress2);

    }

    function swapTokens (address tokenA, uint amount) public 
    {
        //10
        uint token1Balance = erc20_token1.balanceOf(address(this));
        //20
        uint token2Balance = erc20_token2.balanceOf(address(this));

        uint totalTokenBalance = token1Balance * token2Balance;

        // x0*y0 <= x1*y1
        // token1balance*token2balance = (token1balance+newtokens) * token2after
        // 10*20 = deposited(30+10)*5
        // 20 = sendingback(15)+5
        // 200 = 200 tokens
        // 200/40 
        
        IERC20(tokenA).transferFrom(msg.sender, address(this), amount);
        
        // 40 = 30+10
        uint token1BalanceAfter = erc20_token1.balanceOf(address(this));

        uint tokenActualBalance = totalTokenBalance / token1BalanceAfter;
        uint amountToSendBack = token2Balance - tokenActualBalance;
        IERC20(erc20_token2).transfer(msg.sender, amountToSendBack);



    }
    

}