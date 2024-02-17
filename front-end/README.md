# NTUAFlix Frontend

# Introduction

Welcome to the NTUAFlix frontend, the forefront of your personalized movie experience. At NTUAFlix, we are passionate about delivering all the insights of a wide array of movies, TV shows, and exclusive content directly to your screen. Our platform is designed with the user in mind, providing a seamless and intuitive interface that makes finding and diving into your favorite content easier than ever.

Join us on this journey to redefine entertainment.

## Prerequisites
Before you get started, make sure you have the following installed on your system:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation
To set up the NTUAFlix frontend on your local machine, follow these steps:

1. Ensure you are in the correct directory where ntuaflix-frontend is located. Supposing you are currently in the project's "front-end" directory, navigate to the correct folder:
    ```bash
    cd ./ntuaflix-frontend
    ```
2. Install the required dependencies:
    ```bash
    npm install
   ```
   
## Running the Application
To run ntuaflix on your local development server:
```bash
npm start
```
This will serve the app on http://localhost:3000. Open this URL in your browser to view the application

## Usage
Explore our vast collection of movies, shows, actors and cast members.

## User Interface Overview
Our application provides a user-friendly interface, enabling easy navigation and access to all features:
- Start Page: Here you sign up, or log in either as a user or as an admin.
- User Page: The user sees all the available functionalities of the app and chooses which one to perform. Specifying the required parameters they can search for filtered movies (e.g. all the movies of a specific year), or cast members. All the resulted items (movies or cast members) will be displayed in the screen and the user can either search again with the same filter or exit. Otherwise, they can click on the items to see their analytic information, and if they wish, add a like/dislike to movie. 
- Admin Page: The admin also sees all their available functionalities and chooses which one to perform (healthcheck, upload, reset all, user info). Similarly to the user ui, they click on the desired functionality, specifies any parameters - if needed - and performs the desired action (e.g. upload a specific file).


## Building and Deployment
To build the application for production:
```bash
npm run build
```
Follow your hosting service's instructions for deployment details.

## Contributing
Contributions to Ntuaflix frontend are welcome! Please follow the guidelines outlined in the project repository to submit bug reports, feature requests, or pull requests.

## License
Ntuaflix CLI is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgments
- Special thanks to React for the amazing front-end library.
- Shoutout to all our contributors and testers for their invaluable feedback and suggestions.

## Contact
For questions, feedback, or support requests, contact the project maintainers at [g.seretakos@gmail.com].