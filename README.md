# NTUAFLIX

## Overview

NTUAFLIX is a dynamic online platform dedicated to providing an extensive selection of movies and TV series. It stands out for its comprehensive content library, enabling users to explore and enjoy a wide range of films and shows. With features like advanced search filters, user-friendly interface, and interactive functionalities such as like/dislike buttons, NTUAFLIX caters to diverse viewer preferences. It supports multiple user roles, including administrators who can upload and manage their work, and viewers who can engage with content through customized searches and ratings.
## Features

- **User Roles:** Supports content creators and anonymous viewers, with content creators able to upload and manage movies, and viewers able to watch content anonymously.
- **Advanced Search:** Enables searching for movies or series based on various filters.
- **User Management:** Allows for signup/login functionalities and content rating.
- **Interactive Features:** Supports various functions like pressing likes/dislikes, choosing number of movies etc..

## Installation and Setup

Instructions for setting up NTUAFLIX's environment, including back-end and front-end components, are the following:

1. Clone the follwing repository:

```bash
git clone https://github.com/ntua/softeng23-01.git
```
2. Save the repository in a directory in your pc, preferably in a path containing only latin characters and no whitespaces.
3. For the installation of the front-end, back-end and CLI please head to the folders accordingly.

## Usage

1. **For Simple Users:** Browse and find movies or series based on preferences based on various criteria. The website's functionalities are shown bellow:
- `The N highest rated movies in a genre`
- `Highest rated movies of an actor/cast member`
- `Most recent movie of an actor/cast member`
- `The N highest rated movies of an actor/cast member`
- `Search movies by actor/cast member`
- `Search movies by genre`
- `Search movie by title`
- `Search movies by year`
- `Actor/cast member profile`

Depending on the search, either a list of all the returned movies will appear or a list of all the returned actors. Once a movie/actor is selected, we will be redirected to the movie/actor page, where the most important info will be shown. For the movies there is also a Like/Dislike button that is automatically refreshed once someone presses it.

2. **For Administrators:** Choose between various actions:
- `Upload new movie titles, names, crews, principals, ratings, episodes and names`
- `Reset database to its initial form (it's given in the project description)`
- `Check database status`
- `View the users info based on their username`
- `Add new users based in their username and password (only in the CLI)`

3. **For every user:** There is the possibility of logging in, creating a new account and continuing as a guest. In the last option some functionalities will not be authorised and will demand logging in the website with valid credentials.

## API Reference

NTUAFLIX offers a RESTful API for accessing data and platform functionalities, enabling efficient interaction with the platform for content creators and other applications. To get access to these apis and their use please head to the back-end README.md file.

## Contributing

We welcome contributions to enhance the platform's features or performance. Please refer to our contribution guidelines for more information on submitting pull requests or reporting issues.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For support or queries related to NTUAFLIX, please contact us at support@ntuaflix.com.