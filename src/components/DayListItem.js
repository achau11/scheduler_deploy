import React from 'react';
import classNames from 'classnames/bind';

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayListClass = classNames('day-list__item',{
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  });

  function formatSpots(){
    let str = '';
    
    if (props.spots) {
      (props.spots === 1) ? (str = `${props.spots} spot remaining`) : (str = `${props.spots} spots remaining`);
    } else {
      str = 'no spots remaining';
    }
    
    return str; 
  }

  return (
    <li 
      className={dayListClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'>{formatSpots()}</h3>
    </li>
  );
}