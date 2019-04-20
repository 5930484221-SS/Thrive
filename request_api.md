# How to call request api

## api/create_request
params list:

| param | describe |
| --- | --- |
| token | user's token |
| tutor | tutor's username |
| courseId | object id of course object |

## api/get_learner_transactions
params list:

| param | describe |
| --- | --- |
| token | user's token |

return object:

Return a list of request that contain field like request record but add course field, which is a object of course that relate to the request. Request that return are user's request as a learner.

## api/get_tutor_transactions
params list:

| param | describe |
| --- | --- |
| token | user's token |

return object:

Return a list of request that contain field like request record but add course field, which is a object of course that relate to the request. Request that return are user's request as a tutor.

## api/set_flag
params list:

| param | describe |
| --- | --- |
| token | user's token |
| id | object id of request that want to set flag |
| flag | flag text that want to be set |

flags list:

| flag | describe |
| --- | --- |
| wr | wait for response - initial flag |
| wp | wait for payment - deposit 30% of full price |
| s | success - everything finish include pay deposit |
| d | declined - tutor decline the request |
| x | the course is delete |
| c | the course is closed |
| cs | the course is closed but request had been success before |
