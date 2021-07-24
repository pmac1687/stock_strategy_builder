import React from 'react';

const ShowNotes = (props) => (
    <li onClick={props.onClick} className="items-center">
        <a href='blah' className={"text-xs uppercase py-3 font-bold block "}>
          <i className={"fas fa-map-marked mr-2 text-sm " }></i>
          {props.content} {props.icon}
        </a>
    </li>
);

export default ShowNotes;