# Innowise Lab Internship: Level 2: Mini Paint

Paint-like app for Innowise Lab Internship by Uladzislau Rahinia. Created using React, Redux and Firebase

## Task

You can find task requirements [here](https://docs.google.com/document/d/1K79_NA4lMYfqQiIJGqLDek1K9z-oc2qg8n4AvrN1PXE/edit)

## How to run the app

This app is hosted on Github Pages. You can use link [here](https://uladzislau-rahinia.github.io/Innowise-Practice-Level-2/)

If you want run this app locally, clone or fork this repository.

To clone use **git clone https://github.com/Uladzislau-Rahinia/Innowise-Practice-Level-2** command.

After clonning you will have to run **npm i** command to get all dependencies.

**For working locally you will need an .env file with firebase api keys. You can contact me or create your own.**

**If you want to make pull request, do it to master branch, it holds source code**

## Database snapshot
    .
    ├──posts
    |   └──postid                #Unique post id generated on creating post           
    |        ├──path             #Link to image in store
    |        ├──author           #Author's username
    |        └──date             #Date of creation
    └──users
          └──uid                 #Unique user id generated on signing up new user
              └──username        #Username chosen by user

## Application stack

List of additional packages I used for this app (aside from React, Redux and Firebase)

### React-router

Used to add routing into app

### Styled components

Used for more efficient and more deep style customizing

### React-toastify

Use to add Toast messages in error cases

### Date-fns

Used to format date in string for better use

### Gh-pages

Used to deploy app to Github Pages

## Folder structure
    └──src                            #Main folder for source code       
        ├──app                        #Holds main component, redux store and root reducer
        ├──core
        |   ├──api                    #Holds api initializing script
        |   ├──assets                 #Media assets like images, fonts, etc.
        |   |──components             #Small components, which don't hold any business logic, can be reused in different pages
        |   ├──pages                  #Big components, representing pages this app has, they hold buisness logic like fetching data
        |   ├──services               #Services like data fetching and sending methods
        |   └──utils                  #Utility features like constants and types
        ├──redux                      #Holds all redux code
        ├   ├──slices                 #Holds redux slices with actions and reducers
        |   └──selectors              #Holds selectors for retrieving data from store
        └──index.js                   #Entry point of an app, renders main component
