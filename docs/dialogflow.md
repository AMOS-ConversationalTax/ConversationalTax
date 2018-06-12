# DialogFlow

## Set up
In order to use DialogFlow you need to provide an appropriate keyfile, which has to be placed at /backend/dialogflowKey.json

### Getting the Keyfile
- Log into the console of DialogFlow
- Go the the agents settings. (Left navigation on the top - settings symbol)
- Click onto your 'Service Account'. 
- In the new window, click on the three dots on the right side of the selected row.
- Choose to generate the key. 

## Parameter Formats
### Text (@sys.any:name)
```json
"parameters": {
  "$ParameterName": {
	"name": "text goes here"
  }
},
```
### Date (@sys.date)
```json
"parameters": {
  "$ParameterName": "2018-02-01T12:00:00+01:00"
},
```
### Number (@sys.number)
```json
"parameters": {
  "$ParameterName": 100
},
```
### Currency (@sys.unit-currency)
```json
"parameters": {
  "$ParameterName": {
	"amount": 500,
	"currency": "EUR"
  }
},
```
### Time (@sys.time)
```json
"parameters": {
  "$ParameterName": "2018-05-27T12:00:00+02:00"
},
```