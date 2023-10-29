# Mooch

![Mooch-gif-1](https://github.com/nss-evening-cohort-20/Mooch-Lightning/assets/107286368/a98efcb8-3506-4f2f-be9c-5306ce8aa7e1)

Mooch is an application that allows users to share their different subscription services and 'mooch' on memberships from their close friends!

This project was created as a Full Stack Group Project while attending Nashville Software School's Full Stack Web Development Bootcamp. All planning and development was completed over the course of 4 weeks.

### Contributors:
- Chase Burnett | [Github](https://github.com/ChaseBurnett) | [LinkedIn](https://www.linkedin.com/in/chase-burnett/)
- Cristi Neames | [Github](https://github.com/crisneames) | [LinkedIn](https://www.linkedin.com/in/crisneames/)
- Jeremy White | [Github](https://github.com/jeremywhitedev) | [LinkedIn](https://www.linkedin.com/in/jeremy-white-dev/)
- Robert Stroud | [Github](https://github.com/r-stroud) | [LinkedIn](https://www.linkedin.com/in/robert-stroud-dev/)
- Yogi | [Github](https://github.com/chyogi)

## Table of Contents

- [Mooch](#mooch)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
  - [Technologies Used](#technologies-used)
  - [Challenges Faced](#challenges-faced)
  - [Current Features](#current-features)
  - [Possible Future Features](#possible-future-features)
  - [How to Install and Run](#how-to-install-and-run)
  - [Credits](#credits)
  - [Links](#links)

## Project Description

Many of us subscribe to a host of different services. Woudn't it be nice to share a subscription with a friend when you don't need it? Like if you're travelling outside the country, you probably aren't going to be using that YMCA service that much!

Mooch solves this problem by allowing users to browse and search for membership subscriptions that other users are willing to share. Users can manage their memberships, create new Mooch Posts when they want to share a membership for a specific time, and manage incoming Mooch Requests on their posted mooches to decide who they want to share that mooch with!

# ScreenShots/Gifs

## Homepage


![Mooch-gif-2](https://github.com/nss-evening-cohort-20/Mooch-Lightning/assets/107286368/02b7954e-af87-4de7-904e-abaca3bd350d)

> Interactive homepage with collapsing sections

---

## Realtime Searching by Organization, Membership, or Username
![Mooch-gif-3](https://github.com/nss-evening-cohort-20/Mooch-Lightning/assets/107286368/c53058b1-1675-4278-8039-62a8f2f96660)

> Realtime search feedback as you type

---

## Organization Details, Mooch Details with Suggestions
![Mooch-gif-4](https://github.com/nss-evening-cohort-20/Mooch-Lightning/assets/107286368/d074febc-080a-4a43-a566-a5c30e04c05a)

> Suggestions for mooches, all in one effecient backend request


---

## Request a Mooch
![Mooch-gif-5](https://github.com/nss-evening-cohort-20/Mooch-Lightning/assets/107286368/035345dd-79d7-4fef-97b4-1869e31a7758)

> Requesting another users Mooch Post

---

## Add a Membership, post a Mooch
![Mooch-gif-6](https://github.com/nss-evening-cohort-20/Mooch-Lightning/assets/107286368/e74456f8-289c-463e-a721-f28bcb95d7d5)

> Add a membership to your account from the list, then post a Mooch yourself!

---

## Technologies Used

<a href="https://reactjs.org/" title="React JS"><img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React JS" width="50px" height="50px"></a>
<a href="https://reactrouter.com/en/main" title="React Router"><img src="https://reactrouter.com/_brand/react-router-mark-color.svg" alt="React Router" width="50px" height="50px"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" title="JavaScript"><img src="https://github.com/get-icon/geticon/raw/master/icons/javascript.svg" alt="JavaScript" width="50px" height="50px"></a>
<a href="https://reactstrap.github.io/?path=/story/home-installation--page" title="ReactStrap"><img src="https://github.com/get-icon/geticon/blob/master/icons/bootstrap.svg" alt="ReactStrap" width="50px" height="50px"></a>
<a href="https://www.npmjs.com/" title="npm"><img src="https://github.com/get-icon/geticon/raw/master/icons/npm.svg" alt="npm" width="50px" height="50px"></a>
<a href="https://www.firebase.com/" title="Firebase"><img src="https://github.com/get-icon/geticon/raw/master/icons/firebase.svg" alt="Firebase" width="50px" height="50px"></a>
<a href="https://learn.microsoft.com/en-us/dotnet/csharp/" title="C#"><img src="https://github.com/get-icon/geticon/blob/master/icons/c-sharp.svg" alt="C#" width="50px" height="50px"></a>
<a href="https://dotnet.microsoft.com/en-us/" title=".NET"><img src="https://github.com/get-icon/geticon/blob/master/icons/dotnet.svg" alt=".NET" width="50px" height="50px"></a>
<a href="https://www.microsoft.com/en-us/sql-server" title="SQL Server"><img src="https://upload.wikimedia.org/wikipedia/de/thumb/8/8c/Microsoft_SQL_Server_Logo.svg/1200px-Microsoft_SQL_Server_Logo.svg.png" alt="SQL Server" width="50px" height="50px"></a>
<a href="https://swagger.io/" title="Swagger"><img src="https://github.com/get-icon/geticon/blob/master/icons/swagger.svg" alt="Swagger" width="50px" height="50px"></a>

## Challenges Faced

One Specific difficulty Jeremy faced was getting the Authentication and Authorization flow to work properly and manage the JWT correctly to protect the endpoints. It took some googling to understand where and how in `program.cs` to setup the JWTBearer and how to handle that in the frontend as well. He was eventually able to accomplish this, but as the team was primarily using swagger rather than postman for API testing, constantly reauthenticating the JWT during endpoint testing slowed development significantly. The JWT Authorization was removed from the endpoints. Incorporating Postman earlier into the process and setting the JWT as an environment variable in postman would've allowed the endpoint jwt to stay in place and would've probably singificantly improved development velocity in general.

## Lessons Learned

### Working Vertically Can Minimize Wasted Effort When on a Deadline
For this project, we primarily worked in _horizontal_ slices: 
- Planning/basic prototyping with Figma (Link to Wireframe [here](https://www.figma.com/file/M1MkemVo1vtbGrucvnMED8/Mooch-Wireframe?type=design&node-id=0-1&mode=design))
- Creating an ERD to understand the data relationships we were going to be managing (link to ERD [here](https://dbdiagram.io/d/MembershipMooch-643ddcd36b31947051c0e6f8))
- Creating Backend issues in Github Project Board
- Completing the majority of Backend Issues before moving to frontend
- Creating Frontend Issues in Github Project Board
- Completing Frontend Issues

While this approach did allow us to stay relatively focused, it became evident as the project went on that we had spent a lot of time on backend CRUD that we weren't even going to be able to incorporate in the frontend due to time constraints. Had we worked more vertically, we could've ensured that upon each merge to main, that merge included a complete, vertical (frontend to backend) set of value to the user.

## Current Features 
- Users must login and create an account to use Mooch
- On the homepage, Users can search Mooches by Membership, Organization, or User
- Users can view details about an organization 
- Users can view Mooch details, see other suggested Mooches by that user, and see other Mooches in that category
- Users can request a Mooch
- Users can add a membership to their account
- Users can view their memberships, Mooches, and Mooch Requests

## Possible Future Features

- Search for mooches based on Location
- Ability to see more information (username, etc) when reviewing mooch requests
- Ability to edit or delete a Mooch Post
- Ability to accept, or deny a Mooch request
- Start a conversation thread with a requestor when a Mooch is requested

## How to Install and Run

Dependencies
You will need npm, Visual Studio, .NET 6, SQL Server, and whatever SQL Client you prefer (We used SQL Server Management Studio)

1. git clone this repo to your local machine.
2. Setup Firebase project for authentication. For step-by-step instructions for this process, check out this file <a href="/firebaseInstructions.md">here.</a>
3. Navigate to the repo on your machine and run the following commands in the terminal:

```
cd mooch-client
cp .sample.env .env.local

```

4. Update the `.env.local` file with the Firebase API keys created in the previous step.
5. Make sure that Node.js and npm are installed on your machine. <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">Click here for installation.</a>
6. Run the following command in the terminal from the `mooch-client` directory:

```
npm install
```

7. Open your SQL Server and copy/paste the SQL script located in `Mooch-Lightning/Data` Directory
8. Paste the script into your SQL client and run. This will create the database and schema, and create some seed data as well

9.In Visual Studio, open the `Mooch-Lighting.sln`
10. Right click on the `Dependencies` folder and select `Reload`
11. Right click on the`Mooch-Lightning` project in the Solution Explorer and select `Manage User Secrets`
12. Fill in the following JSON data, including the location of your database server and the firebase config data.

```
{
  "ConnectionStrings": {
    "DefaultConnection": "server=<YourLocalSQLServerDatabaseConnection>;integrated security=true;Trust Server Certificate=true"
  },
  "FirebaseProjectId": "mooch-lightning",
  "FirebaseConfig": {
    "apiKey": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "authDomain": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "projectId": "XXXXXXXXXX",
    "storageBucket": "XXXXXXXXXX",
    "messagingSenderId": "XXXXXXXXXX",
    "appId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  }
}
```
13. Run the Backend from Visual Studio
14. Run the Frontend by navigating to the `mooch-client` folder and running `npm start`
15. The frontend should start on `http://localhost:3000/`

16. Enjoy the App!

## Credits

We want to thank everyone in our NSS Cohort that helped us out with this project. The instructors gave meaningful insight into what would be best to focus on in this application.

- Chase Burnett | [Github](https://github.com/ChaseBurnett) | [LinkedIn](https://www.linkedin.com/in/chase-burnett/)
- Cristi Neames | [Github](https://github.com/crisneames) | [LinkedIn](https://www.linkedin.com/in/crisneames/)
- Jeremy White | [Github](https://github.com/jeremywhitedev) | [LinkedIn](https://www.linkedin.com/in/jeremy-white-dev/)
- Robert Stroud | [Github](https://github.com/r-stroud) | [LinkedIn](https://www.linkedin.com/in/robert-stroud-dev/)
- Yogi | [Github](https://github.com/chyogi)

## Links

<a href="https://dbdiagram.io/d/637446b2c9abfc611172f52f" target="_blank">Project ERD</a> || <a href="https://dbdiagram.io/d/63bc1f9e6afaa541e5d14424" target="_blank">Wireframe</a>
