pragma solidity 0.4.24;

import "zos-lib/contracts/Initializable.sol";
import "openzeppelin-eth/contracts/ownership/Ownable.sol";
import "openzeppelin-eth/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-eth/contracts/token/ERC20/ERC20Burnable.sol";
import "openzeppelin-eth/contracts/token/ERC20/ERC20Detailed.sol";
import "./lib/TimeLockable.sol";

contract DSLA_v0 is Initializable, ERC20, ERC20Detailed, ERC20Burnable, TimeLockable, Ownable {
    address public crowdsaleAddress;

    event CrowdsaleAddressSet(address _crowdsaleAddress);

    /**
      * @dev Initializer
      * @param _releaseDate The date from which users will be able to transfer
      * @param _admin The address of the admin allowed to always transfer tokens
      * set the unlockDate and the crowdsaleAddress
      */
    function initialize(address _admin) public initializer {
        ERC20Detailed.initialize("DSLA", "DSLA", 18);
        Ownable.initialize(_admin);

        // Dec 31th 2018 8AM GMT
        uint unlockDate = 1546243200;
        TimeLockable.initialize(unlockDate);

        // Tokenbits supply = 10 billions * 10^18 = 1 * 10^28 = 10000000000000000000000000000
        uint256 initialSupply = 10000000000000000000000000000;
        _mint(_admin, initialSupply);
    }

    /**
      * @dev Reverts if are not past the releaseDate, if the caller isn't the owner
      * or crowdsaleAddress
      */
    modifier transferLock() {
        require(!isTimeLocked() || isOwner() || msg.sender == crowdsaleAddress);
        _;
    }

    /**
      * @dev Extend parent behavior requiring transfer to be out of lock-up period
      * @param _from address The address which you want to send tokens from
      * @param _to address The address which you want to transfer to
      * @param _value uint256 the amount of tokens to be transferred
      */
    function transferFrom(address _from, address _to, uint256 _value) public transferLock returns(bool) {
        super.transferFrom(_from, _to, _value);
    }

    /**
      * @dev Extend parent behavior requiring transfer to be out of lock-up period
      * @param _to address The address which you want to transfer to
      * @param _value uint256 the amount of tokens to be transferred
      */
    function transfer(address _to, uint256 _value) public transferLock returns(bool) {
        super.transfer(_to, _value);
    }

    /**
      * @dev Allows contract's owner to edit the date at which users are
      * allowed to trade their token
      * @param _newUnlockDate The release date that will replace the former one
      */
    function setUnlockDate(uint256 _newUnlockDate) public onlyOwner {
        _setUnlockDate(_newUnlockDate);
    }

    /**
      * @dev NECESSARY: Allows contract's owner to set the address of the crowdsale's
      * contract. This is necessary so the token contract allows the crowdsale contract
      * to deal the tokens during lock-up period.
      * @param _crowdsaleAddress The address of the crowdsale contract
      */
    function setCrowdsaleAddress(address _crowdsaleAddress) public onlyOwner {
        crowdsaleAddress = _crowdsaleAddress;

        emit CrowdsaleAddressSet(_crowdsaleAddress);
    }
}
