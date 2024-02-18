# Documentation

We have defined a variety of apis, both POST and GET:
- `localhost:9876/ntuaflix_api/login/`:
  - Method: POST
  - Description: Endpoint for user authentication. Users can log in using their username and password.

- `localhost:9876/ntuaflix_api/logout/`:
  - Method: POST
  - Description: Endpoint for user logout. Users can log out of their accounts, and the authentication token associated with the session is deleted.

- `localhost:9876/ntuaflix_api/signup/`:
  - Method: POST
  - Description: Endpoint for user registration. Users can sign up by providing their username, password, email, first name, and last name.

- `localhost:9876/ntuaflix_api/title/`:
  - Method: GET
  - Description: Endpoint to retrieve a list of all titles.

- `localhost:9876/ntuaflix_api/title/<str:titleID>/`:
  - Method: GET
  - Description: Endpoint to retrieve details of a specific title identified by its ID.

- `localhost:9876/ntuaflix_api/searchtitle/`:
  - Method: GET
  - Description: Endpoint to search for titles based on their names.

- `localhost:9876/ntuaflix_api/bygenre/`:
  - Method: GET
  - Description: Endpoint to retrieve titles filtered by genre, minimum rating, and year.

- `localhost:9876/ntuaflix_api/name/`:
  - Method: GET
  - Description: Endpoint to retrieve a list of all names.

- `localhost:9876/ntuaflix_api/name/<str:nameID>/`:
  - Method: GET
  - Description: Endpoint to retrieve details of a specific name identified by its ID.

- `localhost:9876/ntuaflix_api/searchname/`:
  - Method: GET
  - Description: Endpoint to search for names based on their primary names.

- `localhost:9876/ntuaflix_api/SearchByGenre/`:
  - Method: GET
  - Description: Endpoint to search for titles by genre.

- `localhost:9876/ntuaflix_api/SearchByYear/`:
  - Method: GET
  - Description: Endpoint to search for titles by release year.

- `localhost:9876/ntuaflix_api/SearchByName/`:
  - Method: GET
  - Description: Endpoint to search for titles by name.

- `localhost:9876/ntuaflix_api/NameProfile/`:
  - Method: GET
  - Description: Endpoint to retrieve profile details of a name.

- `localhost:9876/ntuaflix_api/title_likes/<str:titleID>/`:
  - Method: GET
  - Description: Get the number of likes and dislikes for a specific title. Additionally, check if the current user has liked or disliked the title.

- `localhost:9876/ntuaflix_api/title_likes/press_like/<str:titleID>/`:
  - Method: POST
  - Description: Allow the current user to press the like button for a specific title. If the user has already liked the title, remove the like. If the user has previously disliked the title, switch from dislike to like.

- `localhost:9876/ntuaflix_api/title_likes/press_dislike/<str:titleID>/`:
  - Method: POST
  - Description: Allow the current user to press the dislike button for a specific title. If the user has already disliked the title, remove the dislike. If the user has previously liked the title, switch from like to dislike.

- `localhost:9876/ntuaflix_api/admin/upload/titlebasics/`
  - Method: POST
  - Description: Endpoint for administrators to upload basic information about titles.

- `localhost:9876/ntuaflix_api/admin/upload/titleakas/`
  - Method: POST
  - Description: Endpoint for administrators to upload alternative titles for titles.

- `localhost:9876/ntuaflix_api/admin/upload/namebasics/`
  - Method: POST
  - Description: Endpoint for administrators to upload basic information about names.

- `localhost:9876/ntuaflix_api/admin/upload/titlecrew/`
  - Method: POST
  - Description: Endpoint for administrators to upload crew information for titles.

- `localhost:9876/ntuaflix_api/admin/upload/titleepisode/`
  - Method: POST
  - Description: Endpoint for administrators to upload episode information for titles.

- `localhost:9876/ntuaflix_api/admin/upload/titleprincipals/`
  - Method: POST
  - Description: Endpoint for administrators to upload principal information for titles.

- `localhost:9876/ntuaflix_api/admin/upload/titleratings/`
  - Method: POST
  - Description: Endpoint for administrators to upload ratings information for titles.

- `localhost:9876/ntuaflix_api/admin/healthcheck`
  - Method: POST
  - Description: Check the health status of the backend server.

- `localhost:9876/ntuaflix_api/admin/usermod/<str:username>/<str:password>/`
  - Method: POST
  - Description: Approve a specific user identified by their username and password. This endpoint is accessible to administrators only.

- `localhost:9876/ntuaflix_api/admin/users/<str:username>/`
  - Method: GET
  - Description: Get details of a specific user identified by their username. This endpoint is accessible to administrators only.

- `localhost:9876/ntuaflix_api/admin/resetall/`
  - Method: POST
  - Description: Reset all data in the database. This endpoint is accessible to administrators only.








In this folder the following files are included:
1. Softeng.vpp:
    - Contains the Activity, Class, Component, Deployment, Sequence and ER Diagrams
    - As written in the SRS file as well, the Softeng,vpp file is not up to date because
    of the expiration of the Visual Paradigm free trial

2. SRS.docx:
    - A Microsoft Word file containing Software Requirements Specifications

3. UML-diagrams-template.txt:
    - A txt file conatining out initial thoughts about the Diagrams

4. requirements.xsls
    - A Microsoft Excel file containing the functionalities of the website that we chose to use (different colors indicate different use cases)