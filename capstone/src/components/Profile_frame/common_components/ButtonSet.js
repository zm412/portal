
import React, { Component } from 'react';
import { Button, Carousel, Card } from 'react-bootstrap';
import { CardElement } from './CardElement'
import {useDispatch, useSelector} from 'react-redux';
import {setIsShared} from '../../../reducers/checkItemReducer'
import {setIsListChanged} from '../../../reducers/itemReducer'
import { get_files } from '../../../collection_func'
import Player from './useAudio2'
import {setIsPageChanged} from '../../../reducers/allItemsReducer'
import { fetchDataPost } from '../../../collection_func'

// props: fileInfo, funcDelete, shareItem, funcRemoveFromList, 
// funcDeleteFromDb, funcApproveFile, sharingInfo, handlerOpen

export const ButtonSet = (props) => {

  const {userid, is_super, username} = useSelector(state => state.userInfo);
  const dispatch = useDispatch();
 
  let shareItem = async (e) => {
    fetchDataPost('share_item/', { id: e.target.dataset.id})
      .then(result =>{  
        dispatch(setIsShared(true));
        dispatch(setIsListChanged(true));
      }
    )
  }


  let deleteItem = async (e) => {
    fetchDataPost('delete_item/', { id: e.target.dataset.id})
      .then(result => { 
        dispatch(setIsListChanged(true)) 
        dispatch(setIsPageChanged(true)) ;
      })
  }

  let removeFromList = async (e) => {
    fetchDataPost('save_on_my_list/', { id: e.target.dataset.id})
      .then(result => { 
        dispatch(setIsListChanged(true)) 
      })
  }

  let approveFile = async (e) => {
    fetchDataPost('approve_share/', { id: e.target.dataset.id, res: e.target.innerHTML.toLowerCase() })
      .then(result => { 
        dispatch(setIsShared(true)) ;
        dispatch(setIsPageChanged(true)) ;
        dispatch(setIsListChanged(true)) 
      })
  }

  let deleteSharedItem = async (e) => {
    fetchDataPost(`delete_shared_item/`, { id: e.target.dataset.id })
      .then(result => { 
        dispatch(setIsShared(true));
        dispatch(setIsPageChanged(true)) ;
      })

  }



  let buttonSpecial = props.type_content == 'music' 
    ?  <Player url={props.fileInfo.url} /> 
    :  !props.carousel
    ? <Button data-id={props.fileInfo.info.id} onClick={props.handlerOpen} variant="primary">Open</Button>
    : <div></div>


  let sharingInfo = !props.fileInfo.info.shared_info  
    ? 'To share' 
    : !props.fileInfo.info.shared_info.solved 
    ? 'Files is waiting for moderation for sharing' 
    : props.fileInfo.info.shared_info.approved
    ? 'Shared file'
    : 'File denied for sharing'

  const buttonContent = props.mode == 'user' && userid == props.fileInfo.info.user_id 
      ?
        <div>
            {buttonSpecial}
            <Button data-id={props.fileInfo.info.id} className='m-2' onClick={deleteItem} variant="primary">Delete</Button>
            {
              !props.fileInfo.info.shared_info ? 
                <Button data-id={props.fileInfo.info.id} className='m-2' onClick={shareItem} variant="primary">To share</Button>
              :
                  <p>{ sharingInfo }</p>
            }
        </div>

      : props.mode == 'user' && userid != props.fileInfo.info.user_id ?
    <div>
            {buttonSpecial}
        <Button data-id={props.fileInfo.info.id}  className='m-2' onClick={removeFromList} variant="primary">Delete from my list</Button>
    </div>
      : 
        <div>
            {buttonSpecial}
          <Button data-id={props.fileInfo.info.id}  className='m-2' onClick={deleteSharedItem} variant="primary">Delete from DB</Button> 
          <Button data-id={props.fileInfo.info.id}  className='m-2' onClick={approveFile} variant="primary">Positive</Button> 
          <Button data-id={props.fileInfo.info.id}  className='m-2' onClick={approveFile} variant="primary">Negative</Button> 
      </div>

    
  
  let content = <div className='center_cl'> 
                  {props.content}
                  { buttonContent }
              </div>
    
  return( 
    <div key={props.index}>
      <CardElement fileInfoObj={props.fileInfo.info} content={content}  />
    </div>
  )
}


