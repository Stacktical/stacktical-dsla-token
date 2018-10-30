pragma solidity 0.4.24;

import "zos-lib/contracts/Initializable.sol";
import "openzeppelin-eth/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-eth/contracts/token/ERC20/ERC20Burnable.sol";
import "openzeppelin-eth/contracts/token/ERC20/ERC20Detailed.sol";
import "./lib/TimeLockable.sol";

contract DSLA_v0 is Initializable, ERC20, ERC20Detailed, ERC20Burnable, TimeLockable {
    // Tokenbits supply = 10 billions * 10^18 = 1 * 10^28 = 10000000000000000000000000000
    uint256 public constant INITIAL_SUPPLY = 10000000000000000000000000000;

    /**
      * @dev Initializer
      * @param _releaseDate The date from which users will be able to transfer
      * the token
      */
    function initialize(uint _releaseDate, address _admin) public initializer {
        ERC20Detailed.initialize("DSLA", "DSLA", 18);
        TimeLockable.initialize(_releaseDate, _admin);

        // TODO: consider solving to only be able to mint once
        _mint(_admin, INITIAL_SUPPLY);
    }

    /**
      * @dev Extend parent behavior requiring transfer to be out of lock-up period
      * @param _from address The address which you want to send tokens from
      * @param _to address The address which you want to transfer to
      * @param _value uint256 the amount of tokens to be transferred
      */
    function transferFrom(address _from, address _to, uint256 _value) public unlocked returns(bool) {
        super.transferFrom(_from, _to, _value);
    }

    /**
      * @dev Extend parent behavior requiring transfer to be out of lock-up period
      * @param _to address The address which you want to transfer to
      * @param _value uint256 the amount of tokens to be transferred
      */
    function transfer(address _to, uint256 _value) public unlocked returns(bool) {
        super.transfer(_to, _value);
    }
}
