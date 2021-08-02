import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
import { fetchUsersFromApi } from '../API_STORAGE/api'

let initialState = {
    users: [],
    favorites: []
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USERS':  
            return {
                ...state,
                users: action.users
            }
        case 'GET_FAVORITES': 
            return {
                ...state,
                favorites: [...state.favorites, action.favorite]
            }
        case 'REMOVE_FAVORITE':  
            return {
                ...state,
                favorites: state.favorites.length > 1 ? state.favorites.filter(item => item.id !== action.favorite.id) : []
            }
        case 'SET_FAVORITES_FROM_LS': 
            return {
                ...state,
                favorites: [...action.favorites]
            }
        default: 
            return state;
    }
}

// ACTIONS
export const setUsers = (users) => ({ type: 'GET_USERS', users });
export const setFavorites = (favorite) => ({ type: 'GET_FAVORITES', favorite })
export const removeFavorite = (favorite) => ({ type: 'REMOVE_FAVORITE', favorite })
export const setFavoritesFromLS = (favorites) => ({ type: 'SET_FAVORITES_FROM_LS', favorites })

export const getUsers = () => (dispatch) => {
    fetchUsersFromApi()
        .then(result => {
            dispatch(setUsers(result.data.data));
            localStorage.setItem('contacts', JSON.stringify(result.data.data))
    })    
};

export const addToFavorites = (favorite) => (dispatch) => {
    dispatch(setFavorites(favorite));
}; 

let reducers = combineReducers({ 
    usersData: usersReducer,  
    form: formReducer 
});
let store = createStore(reducers, applyMiddleware(thunk));
window.store = store;
export default store;