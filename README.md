# Holidaze

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

To run this project you need to have [Node.js](https://nodejs.org/en/) installed.


### `npm i`

Installs all dependencies for the project.


### `npm start`

Runs the app in the development mode.\
If you want to run for production skip this step.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Planning

### Gantt Chart

The Gantt chart was used for project timing in this project. It was created using [Github Projects](https://github.com/users/Thundeee/projects/4/views/2)

### Design Prototypes

Wireframes and Design Prototype can be found here on [Figma](https://www.figma.com/file/kalQPF9eeccoghl9QtIsm7/Holidaze?type=design&node-id=0%3A1&t=iRLhWPnLWfyYyy2Y-1)

### Style Guide

The style guide can also be found here on [Figma](https://www.figma.com/file/kalQPF9eeccoghl9QtIsm7/Holidaze?type=design&node-id=0%3A1&t=iRLhWPnLWfyYyy2Y-1) under the page: "Styletile".

### Kanban board

The Kanban board was used for project management in this project. It was created using [Github Projects](https://github.com/users/Thundeee/projects/4/views/1)\
The Kanban has been my primary resource for project management while working on this project.

## Project

### Repository

The repository for this project can be found here on [Github](https://github.com/Thundeee/exam2023)


### Hosting

The project is hosted on [Netlify](https://lustrous-dodol-648b21.netlify.app/)

## Resources

### Javascript Framework

This project was made using [React](https://reactjs.org/)

### Javascript Libraries

[React Router](https://reactrouter.com/) was used for routing in this project.

[React Hook Form](https://react-hook-form.com/) was used for form validation in this project.

[Yup](https://github.com/jquense/yup) was used for form validation in this project.

[Lodash](https://lodash.com/) was used for debouncing in this project.

[react-alice-carousel](https://github.com/maxmarinich/react-alice-carousel) was used for the carousel in this project.


### Css Framework

This project was made using mostly [Material-UI](https://material-ui.com/) and [Styled Components](https://styled-components.com/)\
[Grommet](https://v2.grommet.io/) was also used for Calendar components.

## Extra

### Note from developer
Under this project I focused mostly on the functionality of the website and not as much on the design.\
Since this is a school project The website only gets 100 venues from the API starting at the bottom of the list.\
This makes it hard to search for venues that are not in the bottom of the list.\
If this was a real project the API would be changed to allow for more venues to be fetched at once or to allow for searching for venues.\
I would also use pagination for the venues and implemented lazy loading for the images.\
Filters were also not implemented in this project since it was not a requirement for the project but would be a good addition to the project.

### Pictures

All pictures used in this project are from [Unsplash](https://unsplash.com/)



### Difference from design prototype

The design prototype was made before the project was started. The design prototype was made with the intention of being a guide for the project and was not followed 100% as the project progressed. It was used as a guide for the project and was changed as the project progressed. The design prototype was mostly not updated to reflect the changes made to the project.

### User Stories
1. A user may view a list of Venues ✔️
2. A user may search for a specific Venue ✔️
3. A user may view a specific Venue page by id ✔️
4. A user may view a calendar with available dates for a Venue ✔️
5. A user with a stud.noroff.no email may register as a customer ✔️
6. A registered customer may create a booking at a Venue ✔️
7. A registered customer may view their upcoming bookings ✔️
8. A user with a stud.noroff.no email may register as a Venue manager ✔️
9. A registered Venue manager may create a Venue ✔️
10. A registered Venue manager may update a Venue they manage ✔️
11. A registered Venue manager may delete a Venue they manage ✔️
12. A registered Venue manager may view bookings for a Venue they manage ✔️
13. A registered user may login ✔️
14. A registered user may update their avatar ✔️
15. A registered user may logout ✔️