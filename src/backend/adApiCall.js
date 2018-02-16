import pseudoJWT from '../pseudojwt';
//TODO SPLIT IT INTO FUNCTIONS 

export async function adApiCall(action,payload){
  let adsList = JSON.parse(localStorage.getItem('adsList'));
  if (!adsList){//set initial if no userslist
    adsList = [];
    localStorage.setItem('adsList',JSON.stringify(adsList));
  }
  return new Promise((resolve,reject)=>{
    if (action === 'AD_GETALL'){
      resolve(adsList);
    }
    else if (action ==='AD_CREATE' && jwtCheck(payload.jwt) && validateAd(payload.title,payload.description)){
      let newAd = {
        title:payload.title,
        description:payload.description,
        author:payload.author,
        id:Math.random().toString(36).substr(2, 9)};
      if (newAd){
        adsList.push(newAd);
        localStorage.setItem('adsList',JSON.stringify(adsList));
        resolve(newAd)
      }else{
        reject('something went wrong, during the creation of new ad');
      }
    }
    else if (action === 'AD_GETBYID'){
      let ad = adsList.find(el=>el.id===payload.id);
      ad?resolve(ad):reject('wrong ad id');
    }
    else if(action === 'AD_UPDATE' && jwtCheck(payload.jwt) && validateAd(payload.title,payload.description)){
      let updatedAd;
      let filtered = adsList.map(ad=>{
        if (ad.id===payload.id){
          updatedAd = {...ad,title:payload.title,description:payload.description};
          return updatedAd;
        } else { return ad}
      });
      if (updatedAd){
        localStorage.setItem('adsList',JSON.stringify(filtered));
        resolve(updatedAd)
      } else{ reject('wrong id'); }
    }
    else if (action === 'AD_DELETE' && jwtCheck(payload.jwt)){
      let filtered = adsList.filter(ad=>ad.id !== payload.id);
      if (adsList.length > filtered.length){
        localStorage.setItem('adsList',JSON.stringify(filtered));
        resolve('deleted id: '+payload.id);
      } else { reject('wrong id.Unable to delete');}
    }
    else {
      console.log(action,payload);
      reject("oops. u can't do that");
    }
  })
}

function jwtCheck(jwt){

  console.log(pseudoJWT,jwt);
  return jwt===pseudoJWT?true:false;
}

function validateAd(title,description,){
  console.log(title.length && description.length)
  return title.length > 0 && description.length > 0;
}
