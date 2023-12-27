import Image from 'next/image';
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { redirect, useRouter } from 'next/navigation'

const firebaseConfig = {
    apiKey: "AIzaSyAy0RSMGSWFOuWWGYoxzcLWSTlnn6q0xsE",
    authDomain: "shorterearl-b2096.firebaseapp.com",
    projectId: "shorterearl-b2096",
    storageBucket: "shorterearl-b2096.appspot.com",
    messagingSenderId: "325749271567",
    appId: "1:325749271567:web:09f0adba82de159c19877a",
    measurementId: "G-WZ8KDF80YP"
  };
export default async function Page({ params } : { params: { slug : string }}) {

    const slug : string | undefined = params.slug;

    if(slug === undefined)
    {
        return <>No Link Found.</>
    }

    // get data from firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore();
    
    const collectionRef = collection(db, "links")
    const slugQuery = query(collectionRef, where("id", "==", slug));

    const querySnapshot = await getDocs(slugQuery);
    console.log(querySnapshot);

    if(querySnapshot.docs.length == 0)
    {
        return <>No Link Found.</>
    }

    // redirect
    redirect(querySnapshot.docs[0].data().redirectTo);

  return (<></>)
}
