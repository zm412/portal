
const SET_COMMENTS = 'SET_COMMENTS'
const SET_ITEM_ID = 'SET_ITEM_ID'
const SET_IS_COMMENTS_LIST_CHANGED = 'SET_IS_COMMENTS_LIST_CHANGED'
const SET_IS_COMMENTS_BLOCK_OPENED = 'SET_IS_COMMENTS_BLOCK_OPENED'

const defaultState = {
  comments: [],
  isCommentsListChanged: false,
}

export default function commentsReducer(state = defaultState, action){
  switch (action.type) {

    case SET_IS_COMMENTS_LIST_CHANGED:
      return {
        ...state,
        isCommentsListChanged: action.payload
      }


    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      }

    default:
      return state
  }

}

export const setComments = (allCommentsList) => ({type: SET_COMMENTS, payload: allCommentsList});
export const setItemId = (id) => ({type: SET_ITEM_ID, payload: id});
export const setIsCommentsListChanged = (bool) => ({type: SET_IS_COMMENTS_LIST_CHANGED, payload: bool});
export const setIsCommentsBlockOpened = (bool) => ({type: SET_IS_COMMENTS_BLOCK_OPENED, payload: bool});
