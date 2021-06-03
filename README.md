# Image_Gallery
Image Gallery using React Native.
The features of the app are as follows:
- App responds dynamically to system theme. Changing the device theme to dark or light, changes color of app without the need for restarting the app.
- Homescreen has two buttons: one to click new pictures or video, second to view media
- On clicking the capture button, the user is asked for camera permissions. If he allows, camera preview opens. If he denies, a screen prompts for camera permissions.
- The camera preview screen has 3 buttons: Record a video, click a picture and flip the camera.
- On clicking the capture photo icon, the photo is captured and the review screen opens. Users can accept the image, which then gets stored in the gallery. Or he can click on the go back button to take a new picture. He can also click on cancel to go to the Homescreen. The image taken gets deleted if not saved.
- If the user clicks on the video record button, audio permissions are requested, if not given, the user is prompted to allow permissions. If accepted, video recording starts. On the video recording page there is a timer to show elapsed time and a button to stop recording. Pressing the back button mimics the stop button functionality.
-Similar to image preview, video preview has the same buttons.
- There is a transient initialising screen while the camera preview initializes
- Clicking on the gallery button on the home screen, takes the users to the gallery.  The most recent media is shown first. While the media is being scanned, a transient scanning view is shown. The gallery view is coded in a performant manner and offscreen thumbnails are discarded and the list renders lazily.
- If no media is found, the screen shows no media found.
- On each thumbnail, the filename as well as an icon showing the type of media is displayed.
- Upon clicking on any thumbnail, the image or video preview loads with a header bar that contains the name of the file. There is also a delete button which will request a confirmation before deletion of the media.
- Android toast notifications are used throughout the app for communicating messages.
- Homescreen has a double back functionality to quit the app with a 2 sec timeout.

