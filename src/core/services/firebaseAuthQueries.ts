import { auth } from 'core/api/firebase';
import ERROR_MESSAGES from 'core/utils/constants/errors';

export const loginUser = async (email:string, password:string):Promise<string> => auth
  .signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    if (userCredential.user) return userCredential.user.uid;
    return '';
  })
  .catch((error) => {
    const message = ERROR_MESSAGES[error.code]
      ? ERROR_MESSAGES[error.code]
      : ERROR_MESSAGES.default;
    throw message;
  });

export const registerUser = async (email:string, password:string) : Promise<string> => auth
  .createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    if (userCredential.user) return userCredential.user.uid;
    return '';
  })
  .catch((error) => {
    const message = ERROR_MESSAGES[error.code]
      ? ERROR_MESSAGES[error.code]
      : ERROR_MESSAGES.default;
    throw message;
  });

export const logoutUser = async (): Promise<void> => auth.signOut();

export const getUserId = (): string => {
  if (auth.currentUser) return auth.currentUser.uid;
  return '';
};
