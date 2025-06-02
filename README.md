![logo-github](https://github.com/ryohey/signal/assets/5355966/46834ee4-30d8-4b66-a47c-6e081cc2c09f)

The original repository is here: [signal](https://signal.vercel.app)

<img width="1024" alt="image" src="https://github.com/user-attachments/assets/0c64ff3d-b095-4359-ab77-9355e04a8bee" />

### Install

1. In the project root directory, run the following command to install the required dependencies:
   ```sh
   npm install
   ```

### Run alone
> [!NOTE]
> The first time you run it, you will get a build error, so please run `npm run build` once before running `npm start`.

1. To start the application, run:
   ```sh
   npm start
   ```
2. The application should now be running on [http://localhost:3000/edit](http://localhost:3000/edit).

### Build for library
Run
```
npm run build
```

Place the consumer application in a nearby folder

/consumer-root-folder
|-- customized-signal
|-- consumer-app

in consumer-app package.json file add dependency
```
"customized-signal": "file:../customized-signal",
```

In consumer-app import function `start` this way:
```
import { start } from "customized-signal";
```

Pass in this function react-root element id

```
start("react-root");
```
The application should start and mount to this element

in webpack configuration of consumer app add:

```
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