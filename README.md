# Capstone project ("Simple lovely things")

## Distinctiveness and complexity:

The "Simple lovely things" project is conceived as a piggy bank for our favorite things (files) that lift our spirits and make us a little happier. In fact, this is a file exchanger, in which, the main idea is not to exchange files, but to save and view favorite files in various formats.

It differs from other projects made earlier on this or any other course, it is distinguished by the complexity of the interaction of the frontend and backend parts, a larger number of database models involved (5 models including User), the presence of an administrative role (creating categories and moderating files), and also, nuances in the processing of files and their storage conditions (files are saved in automatically created directories by
file category name and user ID). What distinguishes this project from a social network is that communication between users on this site is excluded.  The idea of the site is to store favorite files and allow free access to them and view these files in the appropriate format. The function of sharing files with other users, added to be able to increase personal media bank.

During the development, the following functionality was implemented:

##### Administrative block:
Managing categories and subcategories (adding, changing, deleting), as well as checking the files transferred to the common line and making decisions on them (deleting a request, a positive decision, a negative decision, viewing a file). Administrators are users with superuser rights.

##### Personal block:
Manage user's files (upload, view, share, delete)

##### Common block:
Allows user to view files that users have decided to share (as well as read and add comments, like and save links to their media bank). In addition, user can filter the feed by subcategory and change the number of files displayed on the page. If necessary, pagination elements appear.

In addition, various methods of using the site have been developed for different screen sizes (on a small screen, all modal windows become full-screen, blocks are control buttons) 

## Files:
### zm412/ - main folder
* requirements.txt - file containing all installed packages
### zm412/media - folder for uploaded files
### zm412/capstone/ - folder of application

* models.py - file containing all models involved in the project:
1) User is a standard abstract model;
2) Category
name - category name,
type_content - link to the parent category (for parent categories, this parameter is None),
valid_extensions - list of valid extensions (string)

3) Item - the model describing the uploaded file -
user - link to the user who uploaded the file
owners_list - a list of users who have saved link of this file 
title
description
type_content - the name of the category the file belongs to
uploaded_at - file uploaded date
category - link to the subcategories chosen when file was uploaded 
file_item - file store address. It is formed using the user_directory_path function. The address has four parts, 'media / user_id / category / filename'
file_size

4) Shared_item - a model describing the process of file moderation
item - link of the file
shared_at - the start date of the process (i.e., the moment the file is transferred to the administrator for checking)
solved - the state of the process (solved - True / not solved - False)
solved_at - the date when the decision made by the administrator
approved - accepted decision (positive - True / negative - False)
likes_list_users - list of users who have liked the file

5) Comment - a model describing comments
item_for_comm - the file to which the comment belongs
user - the user who left the comment
created_at - date when the comment was created
comment - comment text
            

* views.py - a file with functions involved in route processing:
  * get_categories - a function that dynamically creates a tuple of the main categories
  * Category_form - a form for creating categories
  * Add_item - a form for uploading a file
  * index - Renders index.html
  * site_info - Renders file_portal_info.html
  * update_category - processes a request for the 'update_category' address (updating the value of the 'valid_extensions' field)
  * del_category - processes a request for the address 'delete_category'
  * add_category - processes a request for the address 'add_category'
  * put_in - processes a request for the 'put_in' address (file upload)
  * get_all_approved_items - processes a request to the address 'get_all_approved_items' (receiving shared files)
  * save_on_my_list- processes a request to the address 'save_on_my_list' (saving a link to a file)
  * add_like- processes a request for the address 'add_like'
  * add_comment- handles the request for the address 'add_comment'
  * delete_comment - processes a request to the address 'delete_comment' (delete a comment, only the author of the comment or the administrator)
  * get_items_list - processes a request to the address 'get_items_list' (a request for all user's files, as well as for files to which the user has saved links)
  * delete_item - processes a request for the 'delete_item' address
  * get_admin_check - processes a request to the 'get_admin_check' address (request for files that require administrator verification)
  * delete_shared_item - processes a request to the address 'delete_shared_item' (deleting a share request)
  * share_item - processes a request to the address 'share_item' (request to share a file. An instance of the Shared_item model is created)
  * approve_share - processes a request to the 'approve_share' address (the administrator makes a decision based on the results of file verification)
  * login_view - processes a request for the 'login' address
  * register - processes a request for the 'register' address 


* urls.py - file with routes
* package.json, webpack.config.js, .baberc - configuration files used in building the frontend;

### capstone / tests - folder for tests

* tests.py - file with tests (tests are covered by views related to working with categories - adding, removing, updating)

### capstone / templates - folder with templates

* index.html - main page with the application. Also, it opens by clicking on the Home button in the navigation bar;
* file_portal_info.html - information page, opened by clicking on the File portal button in the navigation panel.
* login.html - login page;
* register.html - registration page;
* layout.html - navigation panel, scripts are also connected here (main.js in the capstone / static folder, the result of Webpack's work on building JS and CSS).

### capstone / src - folder containing all frontend files (js and css)
* index.js - the file to which all the js and css of the site are connected
* App.js is a class-based React component that pulls authorization data from a template and passes it to children (via the main child Profile). Also, Redux is connected to it;
* img26.jpg - image for the site background (included in the styles.css file located in the same folder);
* simple2.png - 'Simple lovely things' label (included in capstone / templates / layout.html file)
* styles.css - a set of styles (connected to the index.js file, for further processing through Webpack)
* collecting_func.js - file contains auxiliary functions used in components:
1). createArr - a function for splitting text into an array by line breaks. Used to process text files (files, category "book"). If the file is in .fb2 format, the file goes through the changeFB2 handler.
2). changeFB2 - function for processing .fb2 files
3). get_files - a function for modifying the array of files received from the server. Prepares data for further processing.
4). fetchDataPost - a function for creating typical POST requests to the server, accepts request url parameters and data to be sent.


### capstone / src / reducers - a set of reducers
* index.js - file for connecting application reducers;
* allItesReducer.js - a reducer for storing information about files included in the current page of the Common line;
* categoryReducer.js - a reducer for storing information about all categories and subcategories of the project. Required to dynamically change the content of the page when changing the list of categories;
* checkItemReducer.js - a reducer for storing information about all files that require administrator verification (all shared files for which the decision to publish has not yet been made);
* commentsReducer.js - a reducer for storing information about comments;
* itemReducer.js - a reducer for storing information about all files of the current user (as well as about files the user has links to);
* userInfoReducer.js - a reducer for storing information about the current user

### capstone / src / components - folder containing all React components
* Profile.js (<Profile />) - a component containing block display settings (admin_panel, common_line, personal_block), depending on the screen size and user status (superuser sees three blocks, standard user only 2).

    In addition, this component makes POST requests to the server using the following routes ('get_all_approved_items', 'all_categories', 'get_items_list', 'get_admin_check'). All the information received is distributed among the reducers and is requested as needed and updated as the change signals are received.

    For rendering, three child components are connected to the component - <Personal_block /> - Personal block of the user, <Common_line /> - common block with shared files, <Admin_block /> - admin panel (available only for users with superuser rights);

    For the correct display of child components, they are processed in the <Tab /> component, which receives through a props, information about the block name, the block itself (content) and CSS style settings.

    The <Tab /> component is described in the same file (Profile.js)
    
### capstone / src / components / Profile_frame - folder containing sets of components 
* Admin_panel.js (<Admin_panel />) - component connected to Profile. Uses child components in rendering (<Add_category /> - adding a category, <Manage_categories /> - managing categories, and <ListItems /> - a list of files). Here, we are talking about files that require administrator verification);
* Personal_block.js (<Personal_block />)- component connected to Profile. Uses child components in rendering (<UploadFile /> - adding a file, <FilesList /> - managing files)
* Common_line.js (<Common_line />)- the component connected to Profile represents the Common line frame. Uses child components in the render (<FilterBlock /> (defined in the same file), which creates a filter form, a list of links to change the number of files displayed on the page, and a list of files - the <Common_list /> component, as well as pagination elements)

### capstone / src / components / Profile_frame / admin_block / - folder containing components related to the Admin_panel block
* Add_category.js (<Add_category />) - makes a POST request to the 'add_category' address. Contains forms for creating a new category.
* Manage_categories.js (<Manage_categories />) - shows all categories and creates controls (Delete and Update buttons). Creates Post requests for addresses 'delete_category' and 'update_category'
        
## capstone / src / components / Profile_frame / my_block - folder containing components related to the Personal_block
* FilesList.js (<FilesList />) - creates a list of files based on data from the ItemReducer.js reducer and displays them using the ListItems component.
* UploadFile.js (<UploadFile />) - a component that provides a form to upload a file, validates the input data and then sends a POST request to the 'put_in' address.
    
## capstone / src / components / Profile_frame / common_line - folder containing components related to the Common_line block
* Common_list.js (<Common_list />) - creates a list of cards of shared files (using the <Common_line_card /> component, to which it transfers all data related to the file) and renders it.
    * Common_line_card.js (<Common_line_card />) - creates card controls (makes POST requests to routes 'add_comment', 'save_on_my_list', 'add_like' and creates corresponding buttons to them) and passes them to the <OpenCommonFile /> component
    * OpenCommonFile.js (<OpenCommonFile />) - connects handlers corresponding to the file type and passes the processed data to the <CommonCardElement /> component
    * CommonCardElement.js (<CommonCardElement />) - depending on the passed data, renders a file card with an open form for adding comments or with a closed one
    * Form_comment.js (<FormComment />) - comment form. Gives out a list of comments (using the <Comment_card /> component) and a form for adding a new comment.
    * Comment_card.js (<Comment_card />) - comment card. Calls the 'delete_comment' route and renders a comment map with a Delete button.

      
### capstone / src / components / Profile_frame / common_components - folder containing generic components (used by different blocks)
* useAudio.js - a hook that creates a player for a list of audio files
* useAudio2.js - a hook that creates a player for a single audio file
* ListItems.js (<ListItems />) - creates two alternative views of files - a list of cards (component <ElemShow />) and a carousel (<Carousel_show />), and transfers content to the modal window (<Modal_bt />):
    * Modal.js (<Modal_bt />) - modal window. Goes to full screen mode on the small screen. Displays uploaded content. 
    List of cards:
      * templateShow.js (<ElemShow />) - makes a selection of files and, depending on the transmitted data, creates one of the following sets of components:
        1) display in a custom block in CardSetOn mode (ie, the CardSetOn == true, mode == "user" parameter): the list created in the <CardView /> component is rendered without a specific category (that is, without filtering files by category).
        2) display in the admin panel in CardSetOn mode (i.e., the CardSetOn parameter == true, mode = 'admin'): renders a set of <CardView /> components filtered by category
        3) showing the file in the panel in view mode (i.e., the CardSetOn parameter == false), the <OpenFile /> component is rendered, which opens the file card individually (by clicking the Open button)

            * CardView.js - <CardView /> component - renders a list of file cards (using the <ButtonSet /> component)
            * OpenFile.js - <OpenFile /> component - renders the file card individually (using the <ButtonSet /> component), after processing, depending on the file type
            * ButtonSet.js - component <ButtonSet /> - creates a set of special buttons, in accordance with the situation and transfers it to the component <CardElement />. In addition, it creates handlers for a part of the passed buttons (calls the routes: 'delete_shared_item', 'approve_share', 'save_on_my_list', 'delete_item', 'shared_item')
            * CardElement.js - the <CardElement /> component - creates the final view of the card with a description and corresponding buttons.
    Carousel:
      * CarouselShow.js - component file <CarouselShow /> - creates cards using the <OpenFile /> component and shows them as a carousel



## Installation and configuration

1. Clone the git repository

$git clone https://github.com/me50/zm412.git

2. Go to the zm412 folder

$cd zm412

3. Enter the instructions 

$python3 -m venv venv

4. Activate venv

$source venv/bin/activate 

5. Install packages:

$pip install -r requirements.txt

6. Migrate database:

$python manage.py migrate

7. Turn on server:

$python manage.py runserver
    
## Launching the Webpack project builder If necessary, you can rebuild the project with the  

$npm run dev 

(in the zm412 / capstone folder)  

*Any questions, please refer to my email zm412412@gmail.com*
