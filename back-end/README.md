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






-   




- Πηγαίος κώδικας εφαρμογής για εισαγωγή, διαχείριση και
  πρόσβαση σε δεδομένα (backend).
- Database dump (sql ή json)
- Back-end functional tests.
- Back-end unit tests.
- RESTful API.

