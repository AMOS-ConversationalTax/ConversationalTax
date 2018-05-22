# Datastore - Our MongoDB setup

In our backend we use MongoDB for storing data about and for our users. In the local development environment MongoDB is expected to listen at `mongodb://localhost:27017` (see [Getting Started - Backend](backend.md) for more information on how to setup MongoDB locally). On the CD servers we use `mongodb://mongo:27017` for connection.

## Our current datastore schema

At the moment we use three document-types to store data in MongoDB:

- Users
- EmploymentContracts
- Reminders

### Users

The composition of a Users document is:

| Field | Datatype | Description |
| :------------- |:-------------:| -----:|
| _id     | String | The unique identifier of a user. We use Expo.Constants.deviceId for this |

### EmploymentContracts

The composition of a EmploymentContracts document is:

| Field | Datatype | Description |
| :------------- |:-------------:| -----:|
| _id     | String | The unique identifier of an employment contract. |
| user_id     | String | The unique identifier of user who owns the employment contract. |
| name    | String | The title of the employment contract |
| startDate_exact     | Date | If an exact start date is known this is the suiting field  |
| startDate_string    | String | If no exact start date is known this is the suiting field  |
| end_exact     | Date | If an exact end date is known this is the suiting field  |
| endDate_string    | String | If no exact end date is known this is the suiting field  |

### Reminders

The compostion of a Reminders document is:

| Field | Datatype | Description |
| :------------- |:-------------:| -----:|
| _id     | String | The unique identifier of a reminder. |
| user_id     | String | The unique identifier of user who owns the reminder. |
| description    | String | A description for the reminder  |
| date    | Date | The date the user should be reminded  |


## How to access the datastore through code

In contrast to the previous interation of MongoDB in our project, the database can no longer be accessed directly through Rest. The only way to access the database now, is through some services in the backend. They all are part of `backend/src/database`:

| Document-Type | Path to the Service | 
| :------------- |-------------:| 
| Users    | `backend/src/database/user/user.service.ts` | 
| EmploymentContracts   | `backend/src/database/employmentContract/employmentContract.service.ts` | 
| Reminders  | `backend/src/database/reminder/reminder.service.ts` | 

To access the datastore import the suiting service and create an instance of it. After that you can create new database entries, modify existing ones and delete entries. For a full list of functions and their meaning take a look at the corresponding JsDoc. Let's include a short example of creating a new reminder, reading all reminders for a specific user at a specific date and delete a reminder:

```javascript
// Import the suiting service
import { ReminderService } from 'backend/src/database/reminder/reminder.service.ts';

class ReminderDemo {
    private reminderService: ReminderService;

    constructor(reminderService: ReminderService) {
        this.reminderService = reminderService;
    }

    public demo() { 
      // Create a new reminder
      let id = await this.reminderService.create("John Doe", "This is a description", new Date(1995,6,23));

      // Read all reminders of a specific user at a specific date 
      console.log(await this.reminderService.findReminderByUser("John Doe", new Date(1995,6,23)));

      // Output with previously empty datastore:
      // [ { _id: '[Random Object ID]',
      //     user_id: 'John Doe',
      //     description: 'This is a description',
      //     date: 1995-07-22T22:00:00.000Z,
      //     __v: 0 } ]

      // Delete the previously created reminder
      await this.reminderService.deleteReminder(id);

      // Read all reminders of a specific user at a specific date again
      console.log(await this.reminderService.findReminderByUser("John Doe", new Date(1995,6,23)));

      // Output with previously empty datastore:
      // []
    }
}
```
