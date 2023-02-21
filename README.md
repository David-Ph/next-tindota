## How to run it locally

1. Run `npm install`
2. Create a `.env` file
3. Insert your own credentials

## Tools Used

1. Next JS
2. Material UI
3. Mongoose
4. Moment
5. Next Auth
6. Redux JS
7. nProgress
8. OpenDOTA API

## What is this app?

A balanced matchmaking system for a DOTA Inhouse ( A 5v5 premade game done within a community) discord server.

Organizers can choose 10 players from a list or insert custom players and shuffle it, the matchmaker will create 4 variations of 2 teams of 5 players, and organizers can choose which variation he feels will give the most fun and balanced game based on average Matchmaking Rating. If an organizer feels there's no variation he thinks is balanced, he can swap players around until he found one he likes.

Admins can insert and edit players stats. With the help OpenDOTA API, it's also possible to automatically update players matchmaking rating just by inserting a DOTA match id.

## Next tasks

1. Add method to end player streak.
2. Add method to mark player streak has been adjusted.
3. Add method to remove said mark.
