
const SET_CHECKITEMS_LIST = "SET_CHECKITEMS_LIST"
const SET_IS_SHARED = "SET_IS_SHARED"

const defaultState = {
  items: [],
  isShared: false
}

export default function categoryReducer(state = defaultState, action){
  switch (action.type) {
    case SET_CHECKITEMS_LIST:
      return {
        ...state,
        items: action.payload
      }

    case SET_IS_SHARED:
      return {
        ...state,
        isShared: action.payload
      }

    default:
      return state
  }

}

export const setCheckItemsList = (checkItemList) => ({type: SET_CHECKITEMS_LIST, payload: checkItemList})
export const setIsShared = (listSharedBool) => ({type: SET_IS_SHARED, payload: listSharedBool})
