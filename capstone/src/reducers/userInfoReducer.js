const SET_USERID = 'SET_USERID'
const SET_USERNAME = 'SET_USERNAME'
const SET_IS_SUPER = 'SET_IS_USER'
const SET_FILES_SIZE = 'SET_FILES_SIZE'


const defaultState = {
  userid: null,
  username: null,
  is_super: null,
  files_size: 0
}

export default function categoryReducer(state = defaultState, action){
  switch (action.type) {

    case SET_USERID:
      return {
        ...state,
        userid: action.payload
      }

    case SET_USERNAME:
      return {
        ...state,
        username: action.payload
      }

    case SET_IS_SUPER:
      return {
        ...state,
        is_super: action.payload
      }

    case SET_FILES_SIZE:
      return {
        ...state,
        files_size: action.payload 
      }

    default:
      return state
  }

}

export const setUserId = (id) => ({type: SET_USERID, payload: id })
export const setUsername = (name) => ({type: SET_USERNAME, payload: name })
export const setIsSuper = (bool) => ({type: SET_IS_SUPER, payload: bool })
export const setFilesSize = (num) => ({type: SET_FILES_SIZE, payload: num })

