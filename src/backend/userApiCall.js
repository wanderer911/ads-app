import pseudoJWT from '../pseudojwt';

export async function userApiCall(action,payload){
  let usersList = JSON.parse(localStorage.getItem('usersList'));
  if (!usersList){//set initial if no userslist
    usersList = [];
    localStorage.setItem('usersList',JSON.stringify(usersList));
  }
  return new Promise((resolve,reject)=>{
    if (action === "LOGIN_REQUEST"){
        let user = usersList.find(user=>user.username===payload.username);
        if (user){
          user.password===payload.password?resolve({user,pseudoJWT}):reject('wrong password!');
        }
        else{ //registering
           user =  {...payload,id:Math.random().toString(36).substr(2, 9)};
           usersList.push(user);
           //backend  can only set all userslist, frontend can set only current
           localStorage.setItem('usersList',JSON.stringify(usersList));
           resolve({user,pseudoJWT});
        }
    }
    else if(action==="GET_ALL_USERS"){//resolve user or create [] and resolve it;
      resolve(usersList);
      
    }
    else if(action==="GET_USER_BY_ID"){
      let filtered = usersList.filter(user=>{
        return user.id===payload.id;
      });
      filtered.length?resolve(filtered[0]):reject('wrong user id');
    }
    else {
      reject("wrong action");
    }  
  });
}