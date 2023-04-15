# Wheres-My-Package

Where's My Package is a web application designed to help Arch Linux users search for packages on both regular and AUR repositories. With its user-friendly interface, Where's My Package makes it easy for users to find the packages they're looking for. The application seamlessly combines data from both the regular Arch package search API and the AUR package search API, providing comprehensive results for package searches.

Tech stack: I am using React.js, HTML, CSS and Javascript on the front-end. For the back-end I am using Node.js with Express hosted on Heroku.

Live Demo: <a href='https://antinf.github.io/Wheres-My-Package/'>Press Here</a>

Local Installation Instructions: To run this project locally, first clone this repository. Then 'cd' into the cloned repository 'cd' into the client folder and run the command 'npm run start'. The client will run at localhost port 3000 by default and connect to my api hosted on Heroku. You can modify your client so you can run a locally hosted server by changing line 76 in PackageSearch.js in the client's components folder from "let response = await fetch(`https://wheresmypackage.herokuapp.com/api/search/${searchInput}`" to "let response = await fetch(`https://localhost:5000/api/search/${searchInput}`". Then open a second terminal window and 'cd' into the server directory of the cloned repository and type 'npm run start'. Now your client should be running at localhost 3000 and will connect to the locally running server at localhost 5000.