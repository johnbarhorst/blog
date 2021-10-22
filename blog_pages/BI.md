---
title: 'BI Worldwide'
description: 'Hashing out my notes to relate to the job description.'
---

## My Experience Developing with the Bungie API for Destiny 2

Developing a webpage that utilizes the [Bungie API](https://bungie-net.github.io/multi/) was a fun and challenging learning experience.

- Wrote a Node/Express backend API for my site, that consumes data from the Bungie API.
- My Node app fetched live data from the Bungie API, and then combines that live data with static data from a SQLite database.
- Combining live data from the API and static data from the SQLite database involved complex array and object traversal. I had to find hashes in the live data, and figure out the correct database table to search for that hash. Then use hashes from within the database entries to search for even more hashes, and combine all of the data together into objects to be consumed by the front end.
- These hashes were comprised of large integer values too large for the database to use. So the numbers had to be converted from a large integer to a positive or negative number in order to be looked up.
- It isn't well explained what much of the data in the API actually is. Figuring out what data was useful or how to get all aspects of what I wanted to display took a lot of research, database digging, and trial and error.
- To keep the SQLite database up to date, I wrote a function that fetches, decompresses, and saves the database locally using tools like `fs.createWriteStream()`, `fs.renameSync()`, and [unzipper](https://www.npmjs.com/package/unzipper). [Code Here](https://github.com/johnbarhorst/johnbarhorst/blob/master/controllers/destinyControllers.js)
- Frequent updates to the SQLite database created potential for frequent errors. I have to put into place exception and error handling back up plans.
- Certain aspects of the Bungie API require logging in via OAuth. I was able to write my own Passport.js strategy to allow users more access to data and API functionality. [Code Here](https://github.com/johnbarhorst/d2ao-react/blob/master/routes/auth.js)
- I built the front end to display all of the data using React.js. This project was a perfect use case for React with all of the reusable and frequently updated components.
- Using React-Router in combination with styled-components and Framer-Motion, I was able to create smooth page transitions and animations.
- There's a wide variety of similar, but different items to display. I created a higher-order component that could determine which item type was to be displayed, and render the correct component in order to simplify displaying arrays of data. [Code Here](https://github.com/johnbarhorst/johnbarhorst/blob/master/client/src/Components/Destiny/Item.js) and [Here](https://github.com/johnbarhorst/johnbarhorst/tree/master/client/src/Components/Destiny/ItemTypes).

## Things I Learned During This Project, And Things I'd Like To Improve

- I built this project over a year ago. During it, I learned a lot of lessons about solving un-googlable problems, how to structure a web app, and handle things like authorization and databases.
- Further expanded my ever growing experience working with React and Node.
- New javascript features have come out since I first built this project, and my skills have improved as well. I want to go back in and refactor some of my api endpoints using optional chaining to handle all of the deeply nested arrays and object properties.
- I'd like to implement more granular functions and error handling, as well as create a suite of tests to ensure I'm not breaking old things as I add new features.
- Bungie has since changed many aspects of how the API functions. I need to dig back in and refactor parts of how I get my data in order for it to be fully functional again. I'd like to take that opportunity to design a better system, so that any future changes are more easily handled with less interdependant components and systems.
- I've been working with Next.js lately, and the server side generation of that library can create faster loading pages.
- I learned just how much I love doing this stuff. Solving complex problems, making cool looking web pages, and digging through data scratch a lot of itches for me.
