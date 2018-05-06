CSE 3330 and CSE 3345 - Databases and Graphical User Interface Final Project
Dev Team: PonyFit

To run the application:
1. Clone the repository.
2. Move in terminal to the directory DB_sample_stuff, where there should be a mysql folder, a node folder, and a .yml file used to configure the node and mysql application services.
3. Run the command docker-compose up -d --build. This should start the multi-container Docker application that comprises the backend of the fitness app.
4. To start the front end, cd into realStuff, cd into Fit, run npm install, and run ng serve.