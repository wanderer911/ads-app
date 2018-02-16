import {adApiCall as api} from '../backend';

const jwt = JSON.parse(localStorage.getItem('JWT'));

export const adService = {
  getAllAds,
  createAd,
  getAdById,
  updateAd,
  deleteAd,

};

async function getAllAds(){
  let response;
  let error;
  try {
    response = await api('AD_GETALL')
  }catch(e){
    error = e;
  }
  return new Promise((resolve,reject)=>{
    error?reject(error):resolve(response);
  })

}

async function createAd(title,description,author){
  let response;
  let error;
  
  try{
    response = await api('AD_CREATE',{title,description,author,jwt});
  } catch(e){
    error=e;
  }
  return new Promise((resolve,reject)=>error?reject(error):resolve(response));

}

async function getAdById(id){
  let response;
  let error;
  try {
    response = await api('AD_GETBYID',{id});
  } catch(e){
    error=e;
  }
  return new Promise((resolve,reject)=>error?reject(error):resolve(response));
}

async function updateAd(title,description,id){
  let response;
  let error;

  try {
    response = await api('AD_UPDATE',{title,description,id,jwt});
  } catch(e){
    error=e;
  }
  return new Promise((resolve,reject)=>error?reject(error):resolve(response));
  
}

async function deleteAd(id){
  let response;
  let error;
  try {
    response = await api('AD_DELETE',{id,jwt});
  } catch(e){
    error=e;
  }
  return new Promise((resolve,reject)=>error?reject(error):resolve(response));
  
}