export interface Post {
    path: string,
    author: string,
    date: string
}

export interface UserData {
    uid : string,
    username : string,
    isLoggedIn : boolean,
    isPending: boolean,
    isError: boolean,
    errorMessage: string
}
