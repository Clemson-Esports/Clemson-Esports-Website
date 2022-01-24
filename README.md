# Clemson-Esports-Website

## Setting up Development Environment
1. If you don't have NodeJS installed on your computer, install it here: https://nodejs.org/en/download/
2. Clone the repository: `git clone git@github.com:Clemson-Esports/Clemson-Esports-Website.git`.
3. Enter the directory: `cd Clemson-Esports-Website`.
4. Install project dependencies: `npm i`.
5. Install Nodemon (if you don't have it already): `npm install -g nodemon`.
6. Run `nodemon`.

You can now make changes to the website and see them by going to `http://localhost:8080` in your browser.

Note: Because of Nodemon, you do NOT need to stop and restart nodemon every time you make a change, 
it will reflect automatically.

## Viewing Current Dev Branch
If you'd like to see the currently deployed development branch in the production environment,
it is automatically deployed to the development Heroku instance [here](https://clemsonesports-dev.herokuapp.com) 
when a merge is made.

The production website will work the same way (of course, with the production URL when that time comes) where 
merges to main/master will automatically be deployed when a merge is finalized.

## Adding an issue or feature
For the time being, we're currently using Github Projects to manage who's working on what.

To assign yourself to an issue/feature that no one has claimed:
1. Go to the 'Projects' tab
2. Go to 'Projects' (not the beta one if you see that)
3. Select the current sprint
4. Choose an issue and assign yourself to it.

Once you have finished your implementation:
1. In the project sprint, move the card to 'Dev Complete', 
2. Submit a Pull Request into the 'Dev' branch originating from your branch.
3. Assign two reviewers to review your PR.
4. Once the reviewers have both approved the PR, you can merge your PR.

Once your change has been merged into the dev branch:
1. Check the dev website (not set up yet) to make sure everything is functioning as normal.
2. Wait for the dev branch to get merged into the production branch (master/main)