
const SET_CATEGORIES_LIST = "SET_CATEGORIES_LIST"
const SET_IS_CHANGED = "SET_IS_CHANGED"

const defaultState = {
  categories: [],
  isChanged: false
}

export default function categoryReducer(state = defaultState, action){
  switch (action.type) {
    case SET_CATEGORIES_LIST:
      return {
        ...state,
        categories: action.payload
      }
    case SET_IS_CHANGED:
      return {
        ...state,
        isChanged: action.payload
      }

    default:
      return state
  }

}

export const setCategoriesList = (categoryList) => ({type: SET_CATEGORIES_LIST, payload: categoryList})
export const setIsChanged = (isChangedBool) => ({type: SET_IS_CHANGED, payload: isChangedBool})
