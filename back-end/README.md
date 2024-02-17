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

- Αυτό γίνεται για λόγους ασφαλείας και σύμφωνα με την εκφώνηση της εργασίας
- Για να γίνει ο έλεγχος τ



-  




- Πηγαίος κώδικας εφαρμογής για εισαγωγή, διαχείριση και
  πρόσβαση σε δεδομένα (backend).
- Database dump (sql ή json)
- Back-end functional tests.
- Back-end unit tests.
- RESTful API.

