import React from 'react';
import { faChevronUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  onClickFunc: () => void,
  title: string,
  id: string,
  margin: string,
  marginL: string | null,
}

const DropDown = ({ onClickFunc, title, id, margin, marginL }: Props) => (
    <li style={{ marginLeft: `${marginL}`}} onClick={onClickFunc} className="items-center" >
      <a className={"text-xs uppercase py-3 font-bold block " }>
        <i className={"fas fa-tv mr-2 text-sm "}></i>
        { title } <FontAwesomeIcon style={{ marginLeft:`${margin}`}} id={id} icon={faChevronUp} size='lg'/>
      </a>
    </li>
)

export default DropDown;