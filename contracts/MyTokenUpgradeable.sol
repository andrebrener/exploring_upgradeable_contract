//SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract MyTokenUpgradeable is
    Initializable,
    ERC20Upgradeable,
    OwnableUpgradeable
{
    function initialize(uint256 mintAmount) external initializer {
        __ERC20_init("MyUpgradeableToken", "UT");
        __Ownable_init();
        _mint(_msgSender(), mintAmount);
    }

    function mint(address to, uint amount) external {
        _mint(to, amount);
    }
}
