Weather
============

This project aims to show the weather around Mason in a beautiful way.

On Contributing
---

Weather welcomes all the help it can get. Even if you don't feel like you can be helpful the more technical aspects, we definitely need designers, technical writers, and testers.
There are many things that can be done with this project (see the issues page and the TODOs below), but sometimes it's the small things that count, so don't be afraid of contributing just a small spelling mistake.

If you want to get involved, join us in #weather on [our slack team](https://srct.slack.com/). If you need help at all please contact a SRCT member. We want people to contribute, so if you are struggling, or just want to learn we are more than willing to help.

Please visit the [SRCT Wiki](http://wiki.srct.gmu.edu/) for more information on this and other SRCT projects, along with other helpful links and tutorials.

Setup
---

1. To get started, make sure you have Meteor installed on your system. On macOS and Linux, this is as simple as typing into your terminal:

    `curl https://install.meteor.com/ | sh`

    On Windows, you can download the installer [here](https://install.meteor.com/windows).

2. You will need to provide an API to weather so that the app will actually grab weather data. Sign up for a Dark Sky API Key [here](https://darksky.net/dev/).

    Once you have your API Key, navigate to the `weather/` directory and run in your terminal `export DARKSKY_API_KEY=` followed by your API Key to provide your key to the app.

3. Once you have meteor installed on your system, navigate to the `weather/` directory and run in your terminal:

    `meteor`

    This will start a local server for you to use during development. Note that you will likely not have to restart this server while developing as meteor has live updating capabilities.

TODO
---

- Grab weather data from a source/sources
- Put data in a database in order to cache it for users (and to not exceed API call limits)
- Show data in a nice way
- Create a beautiful frontend to view this information
- Optimize interface for mobile

---

### Credit where due:
[Rain Cloud](https://thenounproject.com/search/?q=Rain+cloud&i=6023) icon by Thomas Le Bas from [the Noun Project](https://thenounproject.com)
