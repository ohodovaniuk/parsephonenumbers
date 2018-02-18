# parsephonenumbers
This API is created to parse the phone numbers received from the link or text file.

## Getting Started
You will need to install Node.js and have access to a browser or other development tool like Postman to configure the environment and run the API.


## Environmet Setup and Configuration
Follow the below instructions to successfully clone, configure and run the API. 

First clone the parsephonenumbers repo to your local machine. Use the "Clone" button or the command below:

```
git clone https://github.com/ohodovaniuk1/parsephonenumbers.git
```

Once the download is complete you need to install the dependancies required to run the API. Use the below command.

```
npm install
```

Then you can start the nodeJS local host. Run the below command to start the API.

```
node server.js
```
Now you should be able to access the API thorugh the browser. The server runs on localhost:8000.
For testing and editing i recommend you to download the PhpStorm. It is interactive and overall much better development tool to use.


## How to use
Open a browser/Postman to make the GET and POST requests.

First lets do a GET request using the link below:
```
localhost:8000/api/phonenumbers/parse/text/Seneca%20Phone%20Number%3A%20416-491-5050
```
Here is the result you should expect to receive from the browser as a responce:
```
[
    "+1 416-491-5050"
]
```
Now lets do the POST request. But you need to change the ```Content-Type``` to ```text/plain``` and ```body``` must contain ```base64``` encoded text file.
```
localhost:8000/api/phonenumbers/parse/file
```
The responce should look like something below (it depends of the file you attach).
```
[
    "+1 647-900-9763",
    "+1 647-677-2388",
    "+1 416-285-9778"
]
```


## Run the test file
To run the testing logic you need to shut down the nodeJS local host first. Then from the commandline run the folowing:
```
npm test
```
You should receive the below output from the console:
```
The server is running on port 8000
  API endpoint /api/phonenumbers/parse/text
Exception:Error: The string supplied did not seem to be a phone number
    √ No phone number received.
    √ Correct phone number to be returned: ['+1 416-491-5050']

  API endpoint /api/phonenumbers/parse/file
    √ Correct phone numbers to be returned: ['+1 647-900-9763', '+1 647-677-2388', '+1 416-285-9778']


  3 passing (80ms)
```


## Linting
Automatic linting is enabled using [ESLint](https://github.com/eslint/eslint). Rules can be found in these two files:

```
.\node_modules\eslint\conf\eslint-recommended.js
.\.eslintrc.json (over-writes recommended rules)
```