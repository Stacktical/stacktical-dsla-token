pragma solidity 0.4.24;

import "zos-lib/contracts/Initializable.sol";

contract TimeLockable is Initializable {
    uint256 private _unlockDate;

    event UnLockDateSet(address _caller, uint256 _newUnlockDate);

    /**
      * @dev Initializer
      * @param _newUnlockDate The date from which users will be able to transfer
      * the token
      */
    function initialize(uint256 _initialUnlockDate) public initializer {
        require(_initialUnlockDate > block.timestamp);

        _unlockDate = _initialUnlockDate;

        emit UnLockDateSet(msg.sender, _initialUnlockDate);
    }

    /**
      * @dev Allows possibile implementation in parent contract to edit the
      * date at which users are allowed to trade their tokens
      * @param _newUnlockDate The unlock date that will replace the former one
      */
    function _setUnlockDate(uint256 _newUnlockDate) internal {
        require(block.timestamp < _unlockDate);
        require(_newUnlockDate >= block.timestamp);

        _unlockDate = _newUnlockDate;

        emit UnLockDateSet(msg.sender, _newUnlockDate);
    }

    /**
      * @return true if `_unlockDate` is in the future
      */
    function isTimeLocked() public view returns(bool) {
        return block.timestamp < _unlockDate;
    }

    /**
      * @return the address of the owner.
      */
    function unlockDate() public view returns(uint256) {
        return _unlockDate;
    }
}
