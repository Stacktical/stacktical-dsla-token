pragma solidity 0.4.24;

import "zos-lib/contracts/Initializable.sol";
import "openzeppelin-eth/contracts/ownership/Ownable.sol";

contract TimeLockable is Initializable, Ownable {
    uint256 public releaseDate;
    address public crowdsaleAddress;

    event CrowdsaleAddressSet(address _crowdsaleAddress);

    /**
      * @dev Initializer
      * @param _releaseDate The date from which users will be able to transfer
      * the token
      */
    function initialize(uint _releaseDate, address _admin) public initializer {
        require(_releaseDate > block.timestamp);
        releaseDate = _releaseDate;

        Ownable.initialize(_admin);
    }

    /**
      * @dev Reverts if are not past the releaseDate or if the caller isn't the owner
      */
    modifier unlocked() {
        require(block.timestamp > releaseDate || isOwner() || msg.sender == crowdsaleAddress);
        _;
    }

    /**
      * @dev Allows contract's owner to edit the date at which users are
      * allowed to trade their token
      * @param _newReleaseDate The release date that will replace the former one
      */
    function setReleaseDate(uint256 _newReleaseDate) public onlyOwner {
        require(block.timestamp < releaseDate);
        require(_newReleaseDate >= block.timestamp);

        releaseDate = _newReleaseDate;
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

    /**
      * @dev Gives the crowdsaleAddress the token is bound to
      * @return The current crowdsaleAddress
      */
    function getCrowdsaleAddress() public view returns(address) {
        return crowdsaleAddress;
    }
}
