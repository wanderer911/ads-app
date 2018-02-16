import { userConstants } from '../constants';
import { alertActions } from './';
import { history } from '../helpers';
import { userService } from '../services';


export const userActions = {
  login,
  logout,
  getAll,
  getById
};

 function login(username, password) {
  return async dispatch => {
      dispatch(request({ username }));
      try {
        let res = await userService.login(username, password);
        console.log(res);
        let user = res.user;
        localStorage.setItem('JWT',JSON.stringify(res.pseudoJWT));
        localStorage.setItem('user',JSON.stringify(user));
        dispatch(success(user));
        history.push('/');
      }
      catch (error){
          console.log(error);
          dispatch(failure(error));
          dispatch(alertActions.error(error));
      }

  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}


function getAll() {
  return async dispatch => {
      dispatch(request());
      try {
          let users = await userService.getAll();
          dispatch(success(users))
      }
      catch (error){
        console.log(error);
        dispatch(failure(error));
        dispatch(alertActions.error(error))
  };
}

  function request() { return { type: userConstants.GETALL_REQUEST } }
  function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
  function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}



 function getById(id){
    return async dispatch=>{
      dispatch(request(id));
      try{
        let user = await userService.getById(id);
        dispatch(success(user));
      }
      catch(error){
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    }

  function request(id) { return { type: userConstants.GETBYID_REQUEST, id } }
  function success(id) { return { type: userConstants.GETBYID_SUCCESS, id } }
  function failure(error) { return { type: userConstants.GETBYID_FAILURE, error } }
}
