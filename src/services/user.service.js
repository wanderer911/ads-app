import {userApiCall as api} from '../backend';

export const userService = {
  login,
  logout,
  getAll,
  getById

};

async function login(username, password){
  let response;
  let error;
  try {
    response = await api('LOGIN_REQUEST',{username,password});
  } catch(e) {
    error = e;
  }
  return new Promise((resolve,reject)=>{
    error?reject(error):resolve(response)
  })

}

async function logout(){
  localStorage.removeItem('user');
  localStorage.removeItem('JWT');
}

async function getAll(){
  let response;
  let error;
  try {
    response = await api("GET_ALL_USERS");
  } catch(e){
    error = e;
  }
  return new Promise((resolve,reject)=>{
    error?reject(error):resolve(response)
  })
}

async function getById(id){
  let response;
  let error;
  try {
    response = await api("GET_USER_BY_ID",id);
  } catch(e){
    error = e;
  }
  return new Promise((resolve,reject)=>{
    error?reject(error):resolve(response);
  });
}
