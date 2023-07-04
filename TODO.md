## TODO

- ~~remove feedback from list whenever you archived it after search filter~~
- look for a way to manually reset feedbacks cache on admin page when a new feedback is created
- style feedback(s) pdf
- ~~have working authentication~~
- ~~change header button depending on whether or not you are logged in~~
- ~~after login: redirect medient to "create feedback" page~~
- ~~after login: redirect admin to "admin" page~~
- ~~add link on admin page to go to "create feedback" page~~
- ~~finish headermenu~~
- ~~update styling for feedbacks both active and archived to have the description at a fixed height and be scrollable if it exeeds the height~~
- find way to speed up page loading
- ~~add space between buttons in modals~~
- ~~update menu text~~
- ~~remove description search~~
- ~~change category pdf so that all feedbacks are on 'one' page~~
- ~~fix color download icon in admin~~
- ~~add date_archived to Feedback~~
- ~~update archive function to set archive_date~~
- ~~fetching of archived feedback should be ordered by date_archived(latest archived first)~~
- ~~replace created_date with archived_date for archivedFeedbacks~~
- add validation rule max amount of characters for feedback description
- add validation rule max amount of characters for feedback title
- add validation rule max amount of characters for category title
- ~~update archived-feedbacks chache when archiveFeedbackMutation is successfully called~~
- ~~sorting (active)feedbacks by category should also sort by title~~
- ~~fix feedbacks cache not updating when archiving feedback after sorting~~
- test for textinputs that are not standard (naughty strings)
- ~~reset cache after navigating using NextLink~~
- fix formatDate util file error

currently getting "api handler should not return a value received object"
caused by "return endResponse.apply(apiRes, args);" on line ~441 in node_modules/next/dist/server/api-utils/node.js
