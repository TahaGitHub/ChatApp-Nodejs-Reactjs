# ChatApp By Node-Js & React-Js

Application for training.

ChatApp project has both side front-end side built by [React Js](https://reactjs.org/) & back-end side built by [Node.Js](https://nodejs.org/en/) and [Socket.io](https://socket.io/).


## Run Project Manually

Clone the project by running `git clone https://github.com/TahaGitHub/ChatApp-Nodejs-Reactjs.git` command and go to project folder directory by `cd ChatApp-Nodejs-Reactjs/` and duplicate the terminal to run back-end and front-end separately.

Now we have two terminal, let's run both Server and GUI projects:
- In first terminal we have to install packages by `npm --prefix ./back-end-nodejs/ install` and run to project by `npm --prefix ./back-end-nodejs/ start`

- In second terminal we also have to install and run project with same install and run previous commands but with other project's directory `npm --prefix ./front-end-reactjs/ install` && `npm --prefix ./front-end-reactjs/ start`. 

Without any error, you must see **Listening to 30003** when server running and **webpack compiled successfully** when React GUI running.

## Run Project With Docker

More easy to run the project just:
- Pull the project's image `docker pull 121180073/chatapp-nodejs-reactjs`
- Check the image `docker images`
- And run the image `docker run -p 3000:3000 -p 30003:30003 121180073/chatapp-nodejs-reactjs`

Can access the GUI from [http://localhost:3000/](http://localhost:3000/)

## Demo

![ChatApp-Demo](https://user-images.githubusercontent.com/68125916/168143618-6f782850-018e-4986-a350-c0fa39bbdb2a.gif)

