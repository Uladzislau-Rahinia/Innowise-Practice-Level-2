import { database } from 'core/api/firebase';
import { Post } from 'core/utils/types';

interface Posts {
  [name:string]:Post
}

export const createUser = async (uid:string, username:string):Promise<boolean> => {
  const tasksRef = database.ref(`users/${uid}`);
  const newUser = { username: '' };
  newUser.username = username;
  return tasksRef.update(newUser).then(() => true);
};

export const getPosts = async (route:string):Promise<Posts> => {
  const postsRef = database.ref(route);
  return postsRef.get().then((snapshot) => {
    console.log(snapshot);
    if (snapshot.exists()) {
      return snapshot.val();
    }
    const message = 'No data availible';
    throw message;
  });
};

export const addNewPost = async (newPost:Post, route:string):Promise<boolean> => {
  const postsRef = database.ref(route);
  return postsRef.push(newPost).then(() => true);
};

export const getUsername = async (uid:string):Promise<string> => {
  const postsRef = database.ref(`users/${uid}/username`);
  return postsRef.get().then((snapshot) => {
    console.log(snapshot);
    if (snapshot.exists()) {
      return snapshot.val();
    }
    const message = 'No data availible';
    throw message;
  });
};
