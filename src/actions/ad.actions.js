import { adConstants } from '../constants';
import { alertActions } from './';
import { history } from '../helpers';
import { adService } from '../services';

export const adActions = {
  createAd,
  updateAd,
  deleteAd,
  getAllAds,
  getAdById
}

function createAd(title,description,author){
  return async dispatch=>{
    dispatch(request());
    try {
      console.log(title,description,author);
      let ad = await adService.createAd(title,description,author);
      dispatch(success(ad));
      //temp
      history.push('/'); 
      //history.push('/ads/'+ad.id); 
    } catch (error){
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }

  }
  function request() { return { type: adConstants.CREATE_REQUEST } }
  function success(ad) { return { type: adConstants.CREATE_SUCCESS, ad } }
  function failure(error) { return { type: adConstants.CREATE_FAILURE, error } }

}

function updateAd(title,description,id){
  return async dispatch=>{
    dispatch(request());
    try {
      let ad = await adService.updateAd(title,description,id);
      dispatch(success(ad));
      history.push('/');
    } catch (error){
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  }
  function request() { return { type: adConstants.UPDATE_REQUEST } }
  function success(ad) { return { type: adConstants.UPDATE_SUCCESS, ad } }
  function failure(error) { return { type: adConstants.UPDATE_FAILURE, error } }
}

function deleteAd(id){
  return async dispatch=>{
    dispatch(request());
    try {
      let res = await adService.deleteAd(id); //text deleted id: 
      dispatch(success(res));//remove from state
      history.push('/');
    } catch(error){
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }

  }
  function request() { return { type: adConstants.DELETE_REQUEST } }
  function success(message) { return { type: adConstants.DELETE_SUCCESS,message } }
  function failure(error) { return { type: adConstants.DELETE_FAILURE, error } }
}

function getAllAds(){
  return async dispatch=>{
    dispatch(request());
    try {
      let ads = await adService.getAllAds();
      dispatch(success(ads));

    } catch(error){
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  }
  function request() { return { type: adConstants.GETALL_REQUEST } }
  function success(ads) { return { type: adConstants.GETALL_SUCCESS, ads } }
  function failure(error) { return { type: adConstants.GETALL_FAILURE, error } }
}

function getAdById(id){
  return async dispatch=>{
    dispatch(request());
    try {
      let ad = await adService.getAdById(id);
      dispatch(success(ad));

    } catch(error){
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  }
  function request() { return { type: adConstants.GETBYID_REQUEST } }
  function success(ad) { return { type: adConstants.GETBYID_SUCCESS,ad } }
  function failure(error) { return { type: adConstants.GETBYID_FAILURE, error } }
}