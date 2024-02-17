# Back-end

- The application uses #Django, which is a Python framework.
- The database implementation is done "automatically" in sqlite3 as defined by Django.
- The database can be found in the db.sqlite3 file.
- The backend framework requires certain steps to operate:
## 1ον: Δημιουργία Virtual Environment και εγκατλασταση αναγκαίων πακέτων
-  To do this, the following steps must be executed:
-  
### Assume you are in the folder C:/Software_Engineer_2023/softeng23/softeng23_01 (where you have cloned the git repo in the folder: C:/Software_Engineer_2023/softeng23/softeng23_01)

  ```bash

  pip install virtualenv
  virtualenv ntua_env
  ntua_env\scripts\activate
  pip install -r requirements.txt

  ```
### Now the structure of the folder C:/Software_Engineer_2023/soft_eng_01 is as follows:

```bash
softeng23_01
ntua_env
```
### Now, having activated and with the correct packages in our environment, we will head to the back-end folder:
```bash
cd softeng23_01/back-end/Django/ntuaflix
```
### Now we will run our server (i.e., the back-end) through the command:
```bash
python manage.py runserver
```
### We head to the link that appears



# Αuthentication!!

-Μερικά απο τα παραπάνω endpoints έχουν authentication protocols τα οποία δεν επιτρέπουν στον χρήστη να ανοίξει τα endpoints του back-end

```bash
title/<str:titleID>
searchtitle/
bygenre/
name/<str:nameID>/
searchname/
```

- Αυτό γίνεται για λόγους ασφαλείας και σύμφωνα με την εκφώνηση της εργασίας







- Πηγαίος κώδικας εφαρμογής για εισαγωγή, διαχείριση και
  πρόσβαση σε δεδομένα (backend).
- Database dump (sql ή json)
- Back-end functional tests.
- Back-end unit tests.
- RESTful API.

# -----------------------------------------------------------------------------

# Ntuaflix Back-end

The Back-end part of our website was implemented using Python and more specifically the Django framework. The structure of this framework allowed us to incorporate the source code of the project as well as the Database (inside the models.py files) and the testing (inside the tests folders).

## Installation

To be able to properly use the back-end part of the website, the following steps are essential:

1. Install Python on your computer (v.3.x or newer) and insert the python directory in the PATH variables
2. Ensure you are in the correct directory, else move to the directory:
softeng23-01/back-end/Django/ntuaflix
3. Create a virtual environment and activate it:

```bash
python -m venv .
scripts/activate
```

```bash

  pip install virtualenv
  virtualenv ntua_env
  ntua_env\scripts\activate
  

  ```


4. Install the following libraries:

```bash
pip install -r requirements.txt
```

5. Make all the migtations needed:

```bash
python manage.py makemigrations
python manage.py migrate
```
6. Start the server. The server will run in the port 9876 as told:

```bash
python manage.py runserver
```

## File Structure

The project has the following structure as far as the back-end is concerned:

- ntuaflix--------manage.py   <!-- main file -->
-    |
-    |----> ntuaflix--------settings.py
-    |         |--------urls.py
-    |          
-    |----> ntuaflix_api   <!--app containing everything regarding ntuaflix_api urls-->
-              |--------views.py
-              |--------models.py   <!--models TitleObject, NameObject, NameProfile-->
-              |--------urls.py
-              |--------serializers.py
-              |----> templates
-              |
-              |----> tests <!--tests for the /ntuaflix_api urls-->
-              |
-              |----> administrator   <!--app containing everything regarding ntuaflix_api/admin urls-->
-                           |--------views.py
-                           |--------models.py   <!--models like TitleBasic, TitleCrew, Likes etc-->
-                           |--------urls.py
-                           |--------serializers.py
-                           |----> templates
-                           |
-                           |----> tests <!-- folder containing the tests for the /ntuaflix_api/admin urls-->

The app ntuaflix_api contains and implements all the apis with urls starting with /ntuaflix_api (eg ntuaflix_api/login), whereas the app administrator inside the ntuaflix_api app implements all the apis with urls starting with /ntuaflix_api/admin (eg ntuaflix_api/admin/healthcheck)

## APIs

We have defined a variety of apis, both POST and GET:
- `login/`,  (POST): the user is transferred to the user's or the admin's page
- `logout/`, (POST): the user is transferred to the main page
- `signup/`, (POST): creates a new account for the user, with status pending
- `title/`, (GET): 
- `title/<str:titleID>/`, (GET): 
- `searchtitle/`, (GET): 
- `bygenre/`, (GET): 
- `name/`, (GET): 
- `name/<str:nameID>/`, (GET): 
- `searchname/`, (GET): 
- `SearchByGenre/`, (GET): 
- `SearchByYear/`, (GET): 
- `SearchByName/`, (GET): 
- `NameProfile/`, (GET): 
- `title_likes/<str:titleID>/`, (GET): 
- `title_likes/press_like/<str:titleID>/`, (POST): 
- `title_likes/press_dislike/<str:titleID>/`, (POST): 

## Endpoints:
```bash
localhost:9876/ntuaflix_api/login/ 
localhost:9876/ntuaflix_api/logout/
localhost:9876/ntuaflix_api/signup/

localhost:9876/ntuaflix_api/title/
localhost:9876/ntuaflix_api/title/<str:titleID>/
localhost:9876/ntuaflix_api/searchtitle/
localhost:9876/ntuaflix_api/bygenre/
localhost:9876/ntuaflix_api/name/
localhost:9876/ntuaflix_api/name/<str:nameID>/
localhost:9876/ntuaflix_api/searchname/

localhost:9876/ntuaflix_api/SearchByGenre/
localhost:9876/ntuaflix_api/SearchByYear/
localhost:9876/ntuaflix_api/SearchByName/
localhost:9876/ntuaflix_api/NameProfile/

localhost:9876/ntuaflix_api/title_likes/<str:titleID>/
localhost:9876/ntuaflix_api/title_likes/press_like/<str:titleID>/
localhost:9876/ntuaflix_api/title_likes/press_dislike/<str:titleID>/

localhost:9876/ntuaflix_api/admin/upload/titlebasics/
localhost:9876/ntuaflix_api/admin/upload/titleakas/
localhost:9876/ntuaflix_api/admin/upload/namebasics/
localhost:9876/ntuaflix_api/admin/upload/titlecrew/
localhost:9876/ntuaflix_api/admin/upload/titleepisode/
localhost:9876/ntuaflix_api/admin/upload/titleprincipals/
localhost:9876/ntuaflix_api/admin/upload/titleratings/
localhost:9876/ntuaflix_api/admin/healthcheck
localhost:9876/ntuaflix_api/admin/usermod/<str:username>/
localhost:9876/ntuaflix_api/admin/users/<str:username>/
localhost:9876/ntuaflix_api/admin/resetall/

```
# Αuthentication!!

  -Μερικά απο τα παραπάνω endpoints έχουν authentication protocols τα οποία δεν επιτρέπουν στον χρήστη να ανοίξει τα endpoints του back-end

  ```bash
  title/<str:titleID>
  searchtitle/
  bygenre/
  name/<str:nameID>/
  searchname/
  ```


## Tests

### To run the tests we use the following command.
### We have to be in the directory ../softeng23_01/back-end/Django/ntuaflix

```bash
python manage.py test
```
#### The tests basically create a fake (test) environment with dummy data and then call the respective apis.
#### We also define the expected outcome and then compare it with the return of the api.
#### The structure is:
#### Creating dummy data (dummy database)
####   Calling the api for these datas
####   Querying the dummy database to create the expected results
####   Comparing the expected and the apis returned data.

```bash

self.title_object =TitleObject.objects.create(
            tconst='tt1234567',
            titleType='movie',
            originalTitle='Test Movie',
            img_url_asset='url/to/image.jpg',
            startYear=2020,
            endYear=2021,
            titles='Title1,Title2',
            regions='US,UK',
            genres='Comedy,Drama',
            averageRating=7.5,
            numVotes=100,
            nconsts='nm0000001,nm0000002',
            categories='Director,Actor',
            primaryName='Name1,Name2'
        )

```
#### Next we showcase an example of testing  

```bash
    def test_get_title_basic_list(self):
        response = self.client.get(self.url_title_objects)

        # Get the data from the database to compare with the response
        titles = TitleObject.objects.all()
        serializer = TitleObjectSerializer(titles, many=True)

        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the response data matches the serialized data
        self.assertEqual(response.data, serializer.data)
```


<!-- Ενδεικτικά περιεχόμενα:

- Πηγαίος κώδικας εφαρμογής για εισαγωγή, διαχείριση και
  πρόσβαση σε δεδομένα (backend).
- Database dump (sql ή json)
- Back-end functional tests.
- Back-end unit tests.
- RESTful API. -->