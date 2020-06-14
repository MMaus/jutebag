# JuteBag

JuteBag is a simple shopping list application and playground for microservice
/ web development.

# NOTE - PLAYGROUND PROJECT

For all visitors - feel free to look around, but please apologise all those horror that will come over you reading the code - currently it's a playground to get familiar with web development for me - far, far away from any production!

# Is it dead?

No, it ain't. It's just undergoing the first major refactoring - switching to @vue/cli which provides both typescript and webpack support, and enables a much more professional (joyful) development.
At the same time, the micro service structure will be refined into (current concept) 
- an ngnix entry point which serves the app
- a personal data store service which manages the shopping list data (personalized)
- a shop service which processes the whishlist items for best shopping experience for a given shop or shop type

The current web version is available at hm10.net/jutebag .

The overall repository structure of jutebag is not yet decided. It might very well be that this repository will (almost) die, but in any case there will be links to the successor projects. Alternatively, this will become a monorepo for several microservices (ugh?).

A final word: I'm toying around, trying to get this running on gcp - once I get the hang of kubernetes clusters (gke).

### Why such ugly commits to master?

I want to force myself to keep that project going, so I'll commit every time I have something new. Currently it's a toy project. Once MVP state is achieved (measured by "I used it instead of paper"), development will take place in with proper branching.

## starting the server

Currently, the best way to start the server is using gradle:
./gradlew run
