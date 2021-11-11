# profielp

**Commit only into the dev branch!!!**

-----

# Back-end

For backend part need to have python and env with installed packages from requirements.txt file


-----

# Front-end

For frontend part need to have NodeJS ~ 14.X Go to reactjs folder and install all needed packages via ```npm install```
Then just ```npm start```
In order to build project need to build all react project via ```npm run build```
Then copy static folder to frontend foleder and index.html to frontend/templates/frontend folder

-----

# Set up and run

(command below works for the Linux system. For the Windows they might be different)

1. `python3 -m venv env`
2. `. .dev.env`
3. `pip install -r requirements.txt`
4. `python manage.py migrate`
5. `python manage.py runserver`

-----

# Create models and migrations

To add or edit database table model:

1. open `models.py` in the folder that you need
2. update/add model
3. run `python manage.py makemigrations`
4. run `python manage.py migrate`


# Create superuser
1. run `python manage.py createsuperuser`