
import React from 'react';
import { Admin_panel } from './Profile_frame/Admin_panel';
import { Personal_block } from './Profile_frame/Personal_block';
import { Common_line } from './Profile_frame/Common_line';

import { fetchDataPost } from '../collection_func'
import { Button, Carousel, Card, Image } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {setCategoriesList, setIsChanged} from '../reducers/categoryReducer'
import {setItemsList, setIsListChanged} from '../reducers/itemReducer'
import {setCheckItemsList, setIsShared} from '../reducers/checkItemReducer'
import {setIsPageChanged, setAllItemsList, setLimitNum, setCounter, setQuantity} from '../reducers/allItemsReducer'
import {setUserId, setUsername, setIsSuper, setFilesSize} from '../reducers/userInfoReducer'

const Tab = ({ add_class, content, id_elem, is_super, tabName }) => { 
  let classN =  `col col-sm-12 ${is_super == 'true' && id_elem == 'common_line' ? 'col-lg-4'
      : is_super == 'true' && id_elem != 'common_line' ? 'col-lg-3'
      : is_super != 'true' && id_elem == 'my_block' ? 'col-lg-4'
      : 'col-lg-6'}  
    m-4 p-2 frame ${add_class}`; 

  return( <div id={id_elem} className={classN} >
            <h5 className='tabName'>{tabName.toUpperCase()}</h5>
              {content}
          </div>
    ) 
}

export const Profile = ({ is_super, userid, username }) => {
  const dispatch = useDispatch();
  const isChanged = useSelector(state => state.categories).isChanged;
  const isListChanged = useSelector(state => state.items).isListChanged;
  const isShared = useSelector(state => state.checkItems).isShared;
  const { start, end, items, filterArr, isPageChanged, counter, limit_num } = useSelector(state => state.allItems)

 
  React.useEffect(() => {
    dispatch(setUserId(userid))
    dispatch(setIsSuper(is_super))
    dispatch(setUsername(username))
 }, []);



  const openTab = (e) => {
    let blocks = document.querySelectorAll('.frame');
    for(let item of blocks){
      item.id == e.target.dataset.tab  ? item.classList.add('active') : item.classList.remove('active');
    }
    let buttons = document.querySelectorAll('.main_button');
    for(let item of buttons){
      item == e.target  ? item.classList.add('active') : item.classList.remove('active');
    }
  }
 
  React.useEffect(() => {
 
    async function allFiles (e){
      fetchDataPost('get_all_approved_items/', {filterArr, start, end})
      .then(result => { 
          dispatch(setAllItemsList(result.item));
          dispatch(setQuantity(result.quantity));
          dispatch(setIsPageChanged(false));
      })
    }
    allFiles();
  }, [isPageChanged]);


   React.useEffect(() => {
    async function fetchData() {
        try {
          const response = await fetch('all_categories/');
          const json = await response.json();
          dispatch(setCategoriesList(json.categories))
          dispatch(setIsChanged(false))
        } catch (e) {
            console.error(e);
        }
    };
    fetchData();

  }, [isChanged]);


   React.useEffect(() => {

    async function fetchData() {
      try{
        let response = await fetch(`get_items_list/`);
        let data = await response.json();
        dispatch(setItemsList(data.item));
        dispatch(setFilesSize(data.sum_size));
        dispatch(setIsListChanged(false));
      } catch(e){
          console.error(e);
      }
    }

    fetchData();
  }, [isListChanged]);

 
  React.useEffect(() => {
    async function filesForApprove (e){
      try{
        let response = await fetch(`get_admin_check/` );
        let data = await response.json();
        dispatch(setCheckItemsList(data.check_items));
        dispatch(setIsShared(false));
      
      } catch(e){
          console.error(e);
      }
    }
    filesForApprove();
  }, [isShared]);

  let personal = <Personal_block />
  let common = <Common_line />
  let admin = <Admin_panel />



  return (

    <div>
      <div className="row buttons_block ">
          <Button data-tab='my_block' onClick={(e)=>openTab(e)} variant="secondary" className="mt-1 main_button col-sm-7 active">My files</Button> 
          <Button  data-tab='common_line' onClick={(e)=>openTab(e)} variant="secondary" className="mt-1 main_button col-sm-7">Common line</Button> 

    { is_super == 'true' && 
          <Button data-tab='admin_panel' onClick={(e)=>openTab(e)} variant="secondary" className="mt-1 main_button col-sm-7">Admin panel</Button> 
    }
    </div>
      <div className="row justify-content-md-center">

        <Tab add_class='active'  content={personal} id_elem='my_block' is_super={is_super} tabName="My files" />

        <Tab add_class='' id_elem='common_line' content={common} is_super={is_super} tabName="Common line" />

    { is_super == 'true' && 

        <Tab add_class={ user_info ? '' : 'hidden_block' } content={admin} id_elem='admin_panel' is_super={is_super} tabName="Admin panel"/> 

    }
        
      </div>

    </div>
  )
};
