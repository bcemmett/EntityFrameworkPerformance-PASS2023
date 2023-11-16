# Entity Framework performance
Be careful - this repo is demonstrations of how _NOT_ to get the best performance from Entity Framework!
## Setup
- Create a new database.
- The schema is managed using Flyway (a free evaluation period is available). Deploying to a blank database is most easily achieved by connecting Flyway to the project in `/Database/Flyway`. Alternatively, the individual creation scripts for each table are stored in `/Database/Flyway/schema-model/Tables` and can be run in turn to create the database's schema.
- Data can be populated using Redgate's SQL Data Generator (again, a free evaluation period is available), using the generation definitions file stored in `/Database`. Alternatively, use an approach to create some sample data in the database.
## The application
The application simulates an admin portal for a pizza delivery chain.
Its front end is a Single Page Application (SPA) built with React, using Material UI (MUI). Data is retrieved from the backend, build with ASP.NET Core Web API acting as the api layer. This api layer uses Entity Framework Core to interact with the SQL Server database. The application targets .NET 8, the latest version at time of writing.
The data retrieval approaches used in the api layer demonstrate a range of performance problems.
## Running
- Ensure that both node and .NET 8 are installed.
- Open the application an editor of your choice (Visual Studio Code is a good option - in this case open at the repository's root folder).
- Alter the default connection string in `PizzaParadiseAdminWebsite.Server/appsettings.json` to point to your database created above.
- Using anew  terminal window, switch directory to `PizzaParadiseAdminWebsite.Server`.
- Run `dotnet run` to build and run the application.
- As well as launching the api layer, this will run the front end. The front end is accessible by default at https://localhost:5173. The back end runs by default on port 7296.
- To benefit from hot reload for both the .NET application and the UI simultaneously requires manually running those processes individually. To achieve this, use 2 separate terminal windows. In the first, switch directory to `PizzaParadiseAdminWebsite.Server` and run `dotnet watch run`. In the second, switch directory to `pizzaparadiseadminwebsite.client` and run `npm run dev` (node must first be installed).

## Further resources
- [MVC mini profiler](https://miniprofiler.com) is a great way to gain visibility right in the browser.
- [EF Core documentation](https://learn.microsoft.com/en-us/ef/core/performance/) has guidance on performance.
- Redgate's [Test Data Manager](https://www.red-gate.com/solutions/test-data-management) can help engineering teams work with Entity Framework against realistic test data.
- Redgate's [SQL Monitor](https://www.red-gate.com/solutions/monitor) can help DBAs understand performance, and provide access to that data to developers.