// SPDX-License-Identifier: blank

pragma solidity 0.8.7;

contract SimpleStorage {
    uint256 favNum;

    struct People {
        string name;
        uint256 favNum;
    }

    People[] public people;

    mapping(string => uint256) public nameToFavNum;

    function store(uint256 _favNum) public {
        favNum = _favNum;
    }

    function retrieve() public view returns (uint256) {
        return favNum;
    }

    function addPerson(string memory _name, uint256 _favNum) public {
        people.push(People(_name, _favNum));
        nameToFavNum[_name] = _favNum;
    }
}
