import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { serverTimestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  itemsCollection!: AngularFirestoreCollection<any>;
  itemDoc!: AngularFirestoreDocument<any>;
  obsr_UpdatedSnapshot: any;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  // Helper function
  get timestamp() {
    return serverTimestamp();
  }

  getCollectionURL(filters: string) {
    return 'myvault/vaultdata/' + filters;
  }

  // Set new Data
  setData(coll: string, formData: any, _docId?: any) {
    const id = this.afs.createId();
    const item = { id, name };
    const timestamp = this.timestamp;
    const user = JSON.parse(sessionStorage.getItem('user')!);
    var docRef = this.afs.collection(this.getCollectionURL(coll)).doc(item.id);
    return docRef.set({
      ...formData,
      _id: id,
      createdAt: timestamp,
      deleted_flag: 'false',
      userId: user.uid,
      username: user.displayName,
      useremail: user.email,
    });
  }

  // Get all item
  getData(coll: string, filters?: any) {
    return this.afs
      .collection(coll, (ref) =>
        ref.where('deleted_flag', '==', 'N').orderBy('name', 'desc')
      )
      .valueChanges();
  }

  // Get single item
  getSingleVault(coll: string, docId: any) {
    let docUrl = this.getCollectionURL(coll) + '/' + docId;
    this.itemDoc = this.afs.doc<any>(docUrl);
    return this.itemDoc.valueChanges();
  }

  // Update item
  updateVault(coll: string, formData: any) {
    const id = formData._id;
    const timestamp = this.timestamp;
    const user = JSON.parse(sessionStorage.getItem('user')!);
    var docRef = this.afs
      .collection(this.getCollectionURL(coll))
      .doc(formData._id);
    return docRef.update({
      ...formData,
      _id: id,
      updatedAt: timestamp,
      deleted_flag: 'N',
      userId: user.uid,
      username: user.displayName,
      useremail: user.email,
    });
  }

  // Set Delete Flag
  deleteData(coll: string, docId: any) {
    const id = docId;
    const timestamp = this.timestamp;
    const user = JSON.parse(sessionStorage.getItem('user')!);
    var docRef = this.afs.collection(this.getCollectionURL(coll)).doc(docId);
    return docRef.delete();
  }

  // Get Filter Data
  getFilterData(coll: string, filters: any) {
    this.itemsCollection = this.afs.collection<any>(
      this.getCollectionURL(coll)
    );
    return this.itemsCollection.valueChanges();
  }
}
