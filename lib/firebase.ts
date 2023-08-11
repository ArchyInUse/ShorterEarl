import * as admin from 'firebase-admin';
import fireConfig from '../firebaseServiceAccount.json';

var db : admin.firestore.Firestore;

try {
  admin.initializeApp({
    credential: admin.credential.cert(fireConfig as admin.ServiceAccount),
  });
  console.log('Initialized.')
} catch (error : any) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack)
  }
}
export { db };
export default admin;