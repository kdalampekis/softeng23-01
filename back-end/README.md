# Back-end



Ενδεικτικά περιεχόμενα:

- Η εφαρμογή χρησιμοποιεί την #Django που είναι framework της Python
- Η υλοποίηση της βάσης γίνεται "αυτόματα" σε sqlite3 όπως ορίζει η Django.
- Η βάση μπορεί να βρεθεί στο αρχείο db.sqlite3
- Το backend framework ψρειάζεται ορισμένα βήματα για να λειτουργήσει:
## 1ον: Δημιουργία Virtual Environment και εγκατλασταση αναγκαίων πακέτων
-  Αυτό για να γίνει θα πρέπει να εκτελεστούν τα παρακάτω βήματα:
-  Έστω ότι βρίσκεστε στον φάκελο C:/Software_Engineer_2023/softeng23/softeng23_01 ( όπου έχετε κάνει clone το git repo στον φάκελο: C:/Software_Engineer_2023/softeng23/softeng23_01)

-  pip install virtualenv
-  virtualenv ntua_env
-  ntua_env\scripts\activate  
-  pip install -r requirements.txt
-  
-  Τώρα η δομή του φακέλου C:/Software_Engineer_2023/soft_eng_01 είναι η εξής:
-   softeng23_01 
-   ntua_env
-   
-   Τώρα έχοντας ενεργοποιημένο και με τα σωστά πακέτα το environment μας θα κατευθυνθούμε στον φάκελο του back-end:
-   
-   cd softeng23_01/back-end/Django/ntuaflix
-   Τώρα θα τρέξουμε τον server μας (Δηλαδή το back-end) μέσω της εντολής:
-   
-   python manage.py runserver
-   Κατευθυνόμαστε στο link που μας εμφανίζεται
-   



- Πηγαίος κώδικας εφαρμογής για εισαγωγή, διαχείριση και
  πρόσβαση σε δεδομένα (backend).
- Database dump (sql ή json)
- Back-end functional tests.
- Back-end unit tests.
- RESTful API.

