
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { ListItems } from './common_components/ListItems';
import { Common_list } from './common_line/Common_list';
import {setIsPageChanged, setFilterArr, setStart, setEnd, setAllItemsList, setLimitNum, setCounter, setQuantity} from '../../reducers/allItemsReducer'
import { Button, Carousel, Card, Image } from 'react-bootstrap';

const FilterBlock = (props) => {
  const categories = useSelector(state => state.categories).categories;
  let list2 = categories.filter(item => item.type_content != 'null').map((item, i) => <option key={i} value={item.name}>{item.name}</option>)
  return(
    <div>
      <Button variant='success' onClick={(e)=> document.querySelector("#id_name_cat" ).classList.toggle('none_display')}>Filters</Button>

    <div  id="id_name_cat" className='none_display'>
      <form onSubmit={props.chooseName} >
        <select className='form-select' multiple={true}  onChange={props.chooseOptions}>
          <option disabled>No filters</option>
          { list2 }
        </select>
      <input type="submit" />
      </form>
    </div>

  </div>

  ) 
}
export const Common_line = () => {
  const dispatch = useDispatch();
  const { start, end, filterArr, items, limit_num, isPageChanged, quantity, counter} = useSelector(state => state.allItems)
  let last_page = Math.ceil( quantity / limit_num );
  const [ isThereFilter, setIsThereFilter] = React.useState(false);
  const [filters, setFilters] = React.useState(null);

  let chooseOptions = (e) => {
    const value = Array.from(event.target.options).filter(el => el.selected).map(el => el.value);
    setFilters(value) 
  }


  let chooseName = (e) => {
    e.preventDefault();
    dispatch(setIsPageChanged(true));
    setIsThereFilter(true)
    dispatch(setFilterArr(filters))
    document.querySelector("#id_name_cat" ).classList.add('none_display')
  }


  const onClickLink = (e) => {
    dispatch(setLimitNum(Number(e.target.dataset.limit)));
    dispatch(setCounter(1));
    dispatch(setEnd(start+Number(e.target.dataset.limit)));
    dispatch(setIsPageChanged(true));
  }

  
    
  function button_prev(e){
    let temp = counter;
    --temp;
    dispatch(setStart(( temp-1) * limit_num));
    dispatch(setEnd(temp * limit_num));
    dispatch(setIsPageChanged(true));
    dispatch(setCounter(temp));
  }

  function button_next(e){
    dispatch(setStart(counter * limit_num));
    dispatch(setEnd(( counter+1) * limit_num));
    dispatch(setCounter(counter+1));
    dispatch(setIsPageChanged(true));
  }
  let links =  [ 1, 3, 5].map((n, i) => (
          <a href="#" key={i} onClick={onClickLink} className="no_decoration"><strong  data-limit={n}> {n} </strong></a>
      ))

  let str_filters = filterArr && filterArr.length > 0 ? filterArr.reduce((str, n, i) =>  {
      str += i < filterArr.length-1 ? n + ', ': n;
      return str;
  }, '')
  : ''



  return(
    <div className="m-3">
    <FilterBlock chooseName={chooseName} chooseOptions={chooseOptions} filters={filters} />
    {
      isThereFilter && 
      <div>Choosen categories: <strong>{ str_filters }</strong></div>
    }
    On one page: { links }

    <p className="center_cl">Page <strong>{counter}</strong></p>

    <Common_list />

    {
      quantity > limit_num && counter > 1 && 
       <Button onClick={button_prev} variant="success" className="m-3">Prev</Button>
    }

    {
      quantity > limit_num && counter < last_page &&
       <Button onClick={button_next} variant="success" className="m-3">Next</Button>
    }
   </div>
  ) 
}
