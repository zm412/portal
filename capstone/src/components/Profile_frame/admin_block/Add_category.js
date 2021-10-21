import React, { Component } from 'react';
import CSRFToken from '../csrftoken';
import {useDispatch, useSelector} from 'react-redux';
import {setIsChanged} from '../../../reducers/categoryReducer'

export  const Add_category = ({}) => {

  const [ userInfo, setUserInfo ] = React.useState(user_info);
  const [ typeC, setTypeC ] = React.useState('null');
  const [ nameC, setNameC ] = React.useState('');
  const [ message, setMessage ] = React.useState(null);
  const [ validExt, setValidExt ] = React.useState('');
  const [ isMainCategory, setIsMainCategory ] = React.useState(typeC == 'null');
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories).categories
 
  let add_category = (e) => document.querySelector("#add_new_category").classList.toggle('none_display');

  let handleChange = (e) => { 
    const elem = Array.from(event.target.options).find(el => el.selected)
    setTypeC(e.target.value) ;
    setIsMainCategory(e.target.value=='null')
    setNameC('');
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    let form_data = new FormData(e.target);
 
    try{
      let response = await fetch(`add_category/`, {
          method: 'POST',
          headers: { 'X-CSRFToken': csrftoken },
          body: form_data
      });
      let data = await response.json();
      setMessage(data.message);
      setValidExt('');
      dispatch(setIsChanged(true));
      setNameC('');
      setTypeC('null') ;
      setIsMainCategory(true)

    } catch(e){
        console.error(e);
    }
  }

  let types_content = categories.filter(item =>  item.type_content == 'null').map((n, i) => <option value={n.name} key={i}>{n.name}</option>)

  return (
   <div className='row'>
     <p>{ message }</p>
     <button id='add_category' onClick={add_category} className="btn btn-success center_cl col-sm-7">Add category</button>

     <form id='add_new_category' onSubmit={handleSubmit} method='POST' className='none_display' >
        <div className="col-auto">

          <label htmlFor="id_type_category" className='visually-hidden'>Type category: </label>
          <select name="type_content" className='form-select mt-4' onChange={handleChange} value={typeC} id="id_type_category">
              <option value="null">Null</option>
              { types_content } 
          </select>
        </div>
      {
      isMainCategory && 
        <div className="col-auto">
          <label htmlFor="valid_ext" className='visually-hidden'>Extensions devided by coma</label>
          <input name='valid_extensions' type='text' id='valid_ext' onChange={(e)=>setValidExt(e.target.value)}  value={validExt}/>
        </div>
 
      }

        <div className="col-auto">
          <label className="visually-hidden" htmlFor="name_category">Name of new category</label>
          <input type="text" name='name'  className="form-control mt-2" id='name_category' onChange={(e)=>setNameC(e.target.value)}  value={nameC} />
        </div>
            <div className="col-auto">
          <input type='submit' className='btn btn-primary mt-2'  value='add' />
        </div>
    </form>
  </div>
  )
};
