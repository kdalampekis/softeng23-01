# Ntuaflix Back-end

The Back-end part of our website was implemented using Python and more specifically the Django framework. The structure of this framework allowed us to incorporate the source code of the project as well as the Database (inside the models.py files) and the testing (inside the tests folders). The database is then automatically created and saved in the db.sqlite3 file in SQLite.

## Installation

To be able to properly use the back-end part of the website, the following steps are essential:

1. Install Python on your computer (v.3.x or newer) and insert the python directory in the PATH variables
2. Ensure you are in the correct directory, else move to the directory:
C:/path/to_repository/softeng23_01
3. Create a virtual environment and activate it:

```bash
pip install virtualenv
virtualenv ntua_env
ntua_env\scripts\activate
```
Now the structure of the folder C:/Software_Engineer_2023/soft_eng_01 is as follows:

```bash
path/to_repository/
├── softeng23_01/   # ntuaflix repository
└── ntua_env/       # virtual environment
```

4. Install the following libraries:

```bash
pip install -r requirements.txt
```

5. Move to the directory where manage.py file is located

```bash
cd softeng23_01/back-end/Django/ntuaflix
```

6. Make all the migtations needed:

```bash
python manage.py makemigrations
python manage.py migrate
```
7. Start the server. The server will run in the link https://localhost:9876/ as told:

```bash
python manage.py runserver_plus --cert-file localhost+1.pem --key-file localhost+1-key.pem localhost:9876
```

When the link is pressed your browser will give a warning of security. THis is because the certification used for https is self-assigned. Please by-pass the security warning. This can be done by 

## File Structure

The project has the following structure as far as the back-end is concerned:

```bash
ntuaflix/
├── manage.py           # Main file
├── ntuaflix/           # App containing settings and main URLs
│   ├── settings.py
│   └── urls.py
└── ntuaflix_api/       # App containing everything regarding /ntuaflix_api URLs
    ├── views.py
    ├── models.py       # Models: TitleObject, NameObject, NameProfile
    ├── urls.py
    ├── serializers.py
    ├── templates/
    └── tests/          # Tests for the /ntuaflix_api URLs
└── administrator/      # App containing everything regarding /ntuaflix_api/admin URLs
    ├── views.py
    ├── models.py       # Models: TitleBasic, TitleCrew, Likes, etc.
    ├── urls.py
    ├── serializers.py
    ├── templates/
    └── tests/          # Tests for the /ntuaflix_api/admin URLs
```

The app `ntuaflix_api` contains and implements all the apis with urls starting with /ntuaflix_api (eg ntuaflix_api/login), whereas the app `administrator` inside the ntuaflix_api app implements all the apis with urls starting with /ntuaflix_api/admin (eg ntuaflix_api/admin/healthcheck)

# Usage

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


## Αuthentication

In addition to the login/sign-up services, we have added authentication to some of the previous endpoints to add additional security to the website. As a result the following urls won't open just by inserting them into the browsing bar:

```bash
title/<str:titleID>
searchtitle/
bygenre/
name/<str:nameID>/
searchname/
```

As a result, the only way to test these urls is either by using the front-end and loging in properly or by sending a proper request with a proper header using tools like Postman

## Database Dump
Despite the fact that there is an existing database in sqlite, it is crucial to be able to transfer the database easily as an sql or json file. In order to extract an sql file containing the website's database, the following steps should be followed:
1. Ensure you are in the correct directory inside the repository, else move to the directory:
softeng23_01/back-end/Django/ntuaflix

 2. To create an sql file run the following command:
 ```bash
 sqlite3 db.sqlite3 .dump > <file_name>
 ```

 3. In the folder ntuaflix a new file will appear called <file_name>

## Testing

For testing we used the integrated Django testing tools and implemented them in the files named `tests`. There are two such files:
One in the directory `softeng23_01\back-end\Django\ntuaflix\ntuaflix_api\tests` regarding the urls `ntuaflix_api\`, their models and views.
The other in the directory `softeng23_01\back-end\Django\ntuaflix\ntuaflix_api\administrator\tests` regarding the urls `ntuaflix_api\admin\`, their models and views.

To run each testing file, the following steps must be followed:

1. Ensure you are in the correct directory inside the repository, else move to the directory:
softeng23_01/back-end/Django/ntuaflix

2. To run the tests regarding the `ntuaflix_api\` urls type:

```bash
python manage.py test ntuaflix_api/tests
```

3. To run the tests regarding the `ntuaflix_api\admin` urls type:

```bash
python manage.py test ntuaflix_api/administrator/tests
```

4. To run all the tests combined type:

```bash
python manage.py test
```

The previous testing proccess creates an empty database and uses it to call the respective apis. More specifically, we create dummy data and call the apis for this data. Then we insert the outcome to the database and compare the expected values with the returned ones.

## Troubleshooting

If you encounter any issues or errors while using Ntuaflix Back-end, refer to the documentation or reach out to the project maintainers for assistance.

## Contributing

Contributions to Ntuaflix Back-end are welcome! Please follow the guidelines outlined in the project repository to submit bug reports, feature requests, or pull requests.

## License

Ntuaflix Back-end is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgements

Ntuaflix Back-end makes use of the django.test library for building the command-line interface.

## Contact

For questions, feedback, or support requests, contact the project maintainers at stelioskatsis12@gmail.com.