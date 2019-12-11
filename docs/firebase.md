# Firebase installation

Create dev and prod projects in https://console.firebase.google.com/u/0/

```
yarn add @angular/fire firebase firebase-functions firebase-tools
```

Add firebase settings to environment.\*.ts

```
firebase init
```

- Select functions and hosting
- Select typescript and yes to all final questions
- public direcory dist/portal
- configure as a SPA
- Don't overwite

firebase deploy

Add firebase modules to app.module.ts

```
// Firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from '../environments/environment';

const firebaseModules = [
  AngularFireModule.initializeApp(environment.firebase, 'APPNAME'),
  AngularFirestoreModule.enablePersistence(),
  AngularFirestoreModule,
  AngularFireAuthModule,
  AngularFireStorageModule,
];

...

imports: [...firebaseModules],

```

Add core services

- Auth guard
- Logging service
- Base Service
- Auth Service
