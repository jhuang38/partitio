import backend_url from "../../utils/backend_url";
import API from "../../utils/api_base";
import {store} from '../../app/store'
import { triggerAlert } from '../alert/alertSlice';

export const collectionAPI = new API(`${backend_url.origin}`, '/api/collections/', (res) => {
    console.log({res})
    if (res.status === 401) {
        store.dispatch(triggerAlert({message: 'Operation failed. Please check whether your credentials have expired.', type: 'error'}))
    }
}); 