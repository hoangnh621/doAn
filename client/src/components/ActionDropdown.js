/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import '../scss/ActionDropdown.scss'
import {BsThreeDotsVertical, BsPen} from 'react-icons/bs'
import {RiDeleteBinLine} from 'react-icons/ri'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const AvatarDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
  <Dropdown isOpen={dropdownOpen} toggle={toggle} >
      <DropdownToggle caret >
          <a href = {null} className = "d-flex">
             <BsThreeDotsVertical/>
          </a>
      </DropdownToggle>
      <DropdownMenu >
            <DropdownItem><BsPen className = "mr-2"/>Chỉnh sửa</DropdownItem>
            <DropdownItem><RiDeleteBinLine className = "mr-2"/>Xóa</DropdownItem>
      </DropdownMenu>
  </Dropdown>
  );
}

export default AvatarDropdown
