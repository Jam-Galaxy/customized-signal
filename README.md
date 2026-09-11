> A modified build of the [signal](https://github.com/ryohey/signal) MIDI editor by ryohey, adapted for the Jam Galaxy browser studio in 2025. The commit history before that is upstream signal's, preserved intact. Open source under MIT. No longer under active development.

This is modified version of [signal](https://signal.vercel.app).

Some differencies:
- The original project was a react app that was adapted to run in electron. In this project, it should be used as part of an audio editor for creating and editing midi tracks. Therefore, it was decided to wrap the react app in a function that receives the id of the element for mounting the react app and the audio context. The part of the build that is responsible for running inside electron was not adapted and was not tested.
- The standard audio context has been replaced with the audio context from the Tone.js library. The audio context from Tone.js is a wrapper over the standard context. It allows you to get the underlying context using Tone.getContext().rawContext, but this underlying context is still different from the standard one. Because of this, you can only register audio worklets using the wrapper in a special way. This problem is solved in this Tone.js modification project.

### Setup

1. In the project root directory, run the following command to install the required dependencies:
   ```sh
   npm install
   ```

### Run alone with HMR
Since the application has been rewritten to work with the Tone.js audio context, you will need Tone.js even for isolated launch. (However, Tone.js is not required to build the customized-signal library)
1. Setup Tone.js dependency
  - Place the Tone.js library in a nearby folder. Build it.
  For example:
  ```
  signal-with-tone/
  ├── customized-signal
  └── customized-tone
  ```
  **OR**
  - Go to ```\app\localLauncher``` and change value of ```customized-tone``` dependency to remove URL.
2. Go to ```\app\localLauncher```
3. Run ```npm install```
4. Go back to ```customized-signal``` folder
5. Run ```npm start```
6. The application should now be running on [http://localhost:3000/edit](http://localhost:3000/edit).

### Build for library
Run ```npm run build```

After assembly, two folders are formed: ```dist``` and ```build```
The ```build``` folder is required for local development (see scenario 1 in the studio project). In this case, this is where the entry point is located.
The ```dist``` folder is a separate package that is ready to be published in Github Npm Packeges Registry and can replace the original project. It contains a lightweight package.json file and the build results.

It is planned that when pushing to the main branch of this repository, CI will execute the ```npm run build``` command and publish the updated package to the Github Npm Packages Registry. After that, this package can be updated inside the studio using npm.

### Publishing
![publishing](docs/publishing.jpg)
- Manually increment the version inside package.json in the root of the project (trying to publish an existing version will result in an error, resulting in the package not being published).
- Call Github Actions to publish the package manually as shown in the screenshot.

### Usage
In consumer package import function `start` this way:
```
import { start } from "customized-signal";
```

Pass in this function react-root element id, toneAudioContext and audioContext

The application should start and mount to this element

in webpack configuration of consumer package add:

```js
configureWebpack: {
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(
            __dirname,
            "node_modules/customized-signal/dist/customized-signal"
          ),
          to: "customized-signal",
        },
      ],
    }),
  ],
},
```
It makes available the resources required to run the application when the consuming application is running on the host.