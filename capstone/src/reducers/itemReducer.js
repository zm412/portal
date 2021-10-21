
const SET_ITEMS_LIST = "SET_ITEMS_LIST"
const SET_IS_LIST_CHANGED = "SET_IS_LIST_CHANGED"

const defaultState = {
  items: [],
  isListChanged: false
}

export default function categoryReducer(state = defaultState, action){
  switch (action.type) {
    case SET_ITEMS_LIST:
      return {
        ...state,
        items: action.payload
      }

    case SET_IS_LIST_CHANGED:
      return {
        ...state,
        isListChanged: action.payload
      }
    default:
      return state
  }

}

export const setItemsList = (itemList) => ({type: SET_ITEMS_LIST, payload: itemList})
export const setIsListChanged = (listChangedBool) => ({type: SET_IS_LIST_CHANGED, payload: listChangedBool})
