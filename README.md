# sniktau 🏔

Finds all summited mountains based on your [Strava](https://www.strava.com/) activities

## Dev tooling

#### Seed mountains
One-time command to seed all Mountains from our mountains.json data file
```
rake seed_mountains
```

To seed all Strava activities from data/strava_activities.json into Activity, Location, and UserMountains
```
rake db:seed
```

