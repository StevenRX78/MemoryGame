# Tech Educators Bootcamp Week 05 Assignment

## Design and build a full-stack application


<br>
<br>
### User stories

- As a user, I want to play a game that doesn't take a long time to play, as I do not have much leisure time.
- As a user, I'd like to play a game that can be picked up quickly and does not require in depth instructions.
- As a user, I want to be able to play a memory game on my work computer to relax during break times.
- As a user, I want to be able to show off my superior ability of playing memory games, by allowing me to post my high score where others can view it. 
- As a user, I'd like to be able to play a memory game on my mobile device when I have some time to relax, after putting the world to rights on social media.


### Fulfilment of user stories

The memory game solution was created to be a responsive design, that can be played on a variety of computing devices, from a computer with a large screen monitor to a mobile device with a restrictive display.

A score table is implemented in the game to allow users to compete against others.

The game does not require in depth instructions and its reasonably short completion time makes it suitable for players without much free time.



### Development process

The user stories were used to define the scope of the project.

An initial group discussion was held to discuss existing web-based memory games and to view examples. It was decided that the game should be tile-based.

Wireframe sketches were created on both paper and Figma. Check the design folder in the repository to see a design that was produced in Figma and another image representing the paper version, but later recreated in a graphics package.

We decided to split into two pairs. Two concentrated on the front end part of the game itself and the other two, the backend code and the production of images used for the tiles. Both groups created a simple mockup design in the browser (images contained in the repository 'design' folder). Elements of both designs were used in the final product. Due to some technical issues with Google meet and sharing screens, it was decided that the pair affected would use the Replit service for pair programming.

A number of items were also discussed amongst the team including how many squares should the grid contain, animations and the high score element. Also the requirement of the data needed from database interaction.

It was found that for some tasks that all team members were involved over the same terminal via screen sharing during some elements of the coding and to resolve some technical issues. Elements include those requiring work synchronisation(such as Git and Github) and coding where there was an overlap.

### Data

Data regarding user time scores is transferred between the client and a server running Express and Sqlite3, using database read and write functionality. Data is transferred using JSON objects.


### User interface

The user interface uses animation for the interactive selection of tiles. The interface has a responsive design. The interface was tested in a selection of modern browsers.

### Code

The code was created with readability in mind, including descriptive function and variable names and relatively small blocks of code. Async/await is implemented for database calls. Code commenting is used to aid understanding of the code.



### Challenges

Deciding on a scoring mechanism: 

Initially it was decided to have a traditional high score board, based on the amount of points accrued. However, a tile matching game is based on quick reactions and a good memory. A quicker time is a better metric than a higher score. Therefore the code was amended to base the scoring around the minimum amount of time taken.

Tile images:

Initially the project was going to use photo images pulled from an external site using an API, but settled on a theme of hieroglyphs.


Pair programming:

There were some issues working on code together, including technical difficulties sharing a screen. A number of unsuccessful attempts were tried to resolve this including an alternative browser and the discord platform. Pair programming was a new experience and took some time to get used to the way of working. You can feel that you are not contributing as much in code production if someone else is typing. It can also cause pressure if someone is watching you coding.


Learning curves on available tools:

Some online tools were available to help with collaboration, but the limited time available for the project meant that the learning curve involved required too much time. 