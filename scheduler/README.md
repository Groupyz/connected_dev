# Description of this Service:
This service recives a Message via RESTful API.
After that, the messages is stored & sent when its time comes via a http request.</br></br>

# Run App:
## Local Machine:
```
pip install -r requirements.txt
```
```
python app.py
```
## Using Docker:
```
docker build -t scheduler .
```
```
docker run -p 5053:5053 --name scheduler scheduler
```

# PR:
## Template:
- Problem:
- Solution:
- Impact:
- Testing plan:
## Example:
- Problem: "There was no documnatation of which & what information should attached to a PR"
- Solution: "Add this sections to the reademe of the repo."
- Impact: "Change will only effect the readme file."
- Testing plan: "No need for testing."
</br></br>
# Tests:
## Local:
```
python -m pytest --cov --cov-report=term
```
## Docker Container:
```
 docker exec -it scheduler bash
```
```
python -m pytest --cov --cov-report=term
```


</br></br>
# Related:

- [moqups](https://app.moqups.com/l5FtMh4Pi7L2R7STWPynF3ShjU3UN90E/edit/page/a276610b3)
- [postman](https://bold-meteor-59606.postman.co/workspace/Sadna~f1a120ea-5d60-48f1-b482-005e0e219496/collection/17475197-f81b61c9-11ae-42b6-82bc-c9f18bb34ad7)
