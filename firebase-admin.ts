import { initializeApp, getApps, App, getApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceKey from './service_key.json';

let app: App;

// Ensure TypeScript understands the serviceKey shape
const serviceAccount = serviceKey as ServiceAccount;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceAccount),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };
