import { storage } from 'core/api/firebase';
import { v4 } from 'uuid';

export const saveImage = async (data:string, uid:string):Promise<string> => storage.ref()
  .child(`images/${uid}/${v4()}.png`)
  .putString(data, 'data_url')
  .then((snapshot) => snapshot.metadata.fullPath)
  .catch((error) => {
    throw error;
  });

export const getImage = async (path:string):Promise<string> => (
  storage.ref().child(path).getDownloadURL().then((url) => url)
    .catch((error) => {
      throw error;
    }));
