import { adConstants } from '../constants';

export function ads(state={},action){
  switch(action.type){
    //CREATE AD
    case adConstants.CREATE_REQUEST:
      return {
        loading:true
      }
    case adConstants.CREATE_SUCCESS:
      return {
        ad:action.ad,
      }
    case adConstants.CREATE_FAILURE:
      return {
        error:action.error,
      }
    //GETADBYID
    case adConstants.GETBYID_REQUEST:
      return {
        loading:true
      }
    case adConstants.GETBYID_SUCCESS:
      return {
        selectedAd:action.ad,
      }
    case adConstants.GETBYID_FAILURE:
      return {
        error:action.error,
      }
    //delete
    case adConstants.DELETE_REQUEST:
      return {
      loading:true
      }
    case adConstants.DELETE_SUCCESS:
      return {
        message:action.message
      }
    case adConstants.DELETE_FAILURE:
      return {
        error:action.error
      }
    //update
    case adConstants.UPDATE_REQUEST:
      return {
        loading:true
      }
    case adConstants.UPDATE_SUCCESS:
      return {
        selectedAd:action.ad,
      }
    case adConstants.UPDATE_FAILURE:
      return {
        error:action.error
      }
    //getall
    case adConstants.GETALL_REQUEST:
      return {
        loading:true
      }
    case adConstants.GETALL_SUCCESS:
      return {
        ads:action.ads
      }
    case adConstants.GETALL_FAILURE:
      return {
        error:action.error
      }
    default:
      return state;
  }
}

/*
const initialState = {
  ads:[],
  selectedAd:undefined,
  loading:false,
  error:undefined
}
*/