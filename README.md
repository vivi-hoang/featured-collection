# Featured Collections: Beyond Books App

This project was for my CIS 657 Mobile Web Development class at Grand Valley State University in Summer 2021. 

Its purpose was to feature and promote a library sub-collection to the public in order to increase patron usage. For my example, I used items from [Kent District Library](https://www.kdl.org)'s [Beyond Books Collection](https://kdl.org/kdl-beyond-books-collection/), which features nontraditional library items like ukuleles, bicycles and Switch gaming consoles. Although these items can be found in the library catalog, you have to know they exist in order to search for them in the first place. So the app isolates and organizes items in the sub-collection to better cast a spotlight on them, which is why I've called this GitHub repo **Featured Collections**. 

Kent District Library is the public library system for Kent County, on the west side of Michigan.

For more information on the implementation and some of the project's challenges, view the presentation and demo video I submitted as part of the project assignment:

[![Beyond Books App](https://photos.smugmug.com/photos/i-NWJF3VG/0/95b66d61/M/i-NWJF3VG-M.png)](https://youtu.be/_I347j-eE6E "Beyond Books App")

The [slideshow used in the presentation](https://docs.google.com/presentation/d/18Agy6EYoZU3mTvuZeL7X-p3Yu2rYhU-zNTZcBmaTcGk/edit?usp=sharing) is also available.

## Screenshots
![Categories](https://photos.smugmug.com/photos/i-5FFRRBW/0/458f7730/M/i-5FFRRBW-M.png)
![All Items](https://photos.smugmug.com/photos/i-HGm7nSP/0/7aa0d0a3/M/i-HGm7nSP-M.png)
![Item Record](https://photos.smugmug.com/photos/i-PnTFMGR/0/7d5780d6/M/i-PnTFMGR-M.png)
![Favorited Item](https://photos.smugmug.com/photos/i-jPGH2ZW/0/84442dc3/M/i-jPGH2ZW-M.png)
![Favorites List](https://photos.smugmug.com/photos/i-dD7RMCd/0/8dc9a91f/M/i-dD7RMCd-M.png)
![Related Reading](https://photos.smugmug.com/photos/i-wSBXn6R/0/09fb86ed/M/i-wSBXn6R-M.png)
![Item Locations Map](https://photos.smugmug.com/photos/i-qhZck4R/0/b0fcf5c8/M/i-qhZck4R-M.png)

## App Features
- Displays items by title
- Displays items by category
- Display favorited items
- View abbreviated item record
- View complete item record (user taken out of app to library catalog)
- Place hold (user taken out of app to library catalog)
- View map of item locations
- User able to mark favorite items
- Retrieve books titles of related reading (pulled from Google Books)

## Dependencies

This is an Expo app built with Javascript and React Native. Its dependencies are:

**Axios**\
`npm install axios`

**Firebase**\
`expo install firebase`

**Firebase Analytics**\
`expo install expo-firebase-core expo-firebase-analytics`

**React Native Elements**\
`npm install react-native-elements`

**React Native Maps**\
`expo install react-native-maps`

**React Native Vector Icons**\
`react-native-vector-icons`

**React Native Webview**\
`npm install react-native-webview`

**React Navigation**\
`npm install @react-navigation/native`\
`expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view`\
`npm install @react-navigation/stack`
