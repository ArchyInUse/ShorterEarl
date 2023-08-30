import { NextApiRequest, NextApiResponse } from 'next';
import responseCodes from '@/lib/responseCodes';
import firebase from "../../../lib/firebase";
import admin from '../../../lib/firebase';

export async function POST(req: Request)
{
    if(req.method !== "POST")
    {
        const response = {
            "message": "Requests to this API route must be POST requests.",
            "code": responseCodes.NonPostRequest
        }
        return new Response(JSON.stringify(response));
    }

    const reqData = await req.json();

    const link : string = reqData['link'];
    // number will be the amount of days
    const time : number = reqData['time'] as number;

    if(link === undefined)
    {
        const response = {
            "message": "No link provided.",
            "code": responseCodes.NoLinkProvided
        }
        return new Response(JSON.stringify(response));
    }

    if(time > 7){
        const response = {
            "message": "Time is too long for this request, the maximum is 7 days",
            "code": responseCodes.TimeTooLarge
        }
        return new Response(JSON.stringify(response));
    }

    // character generation
    let shorterLink = "";
    let characterList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    let counter = 0;
    while(counter < 6)
    {
        shorterLink += characterList.charAt(Math.floor(Math.random() * characterList.length));
        counter += 1;
    }
    
    console.log(`[*] Making document with id ${shorterLink}, which redirects to ${link}`);

    // 0 = non-authenticated user
    const doc = await admin.firestore().collection("links").add({
        "redirectTo": link,
        "id": shorterLink,
        "time": time,
        "creator": 0
    });

    console.log(`[+] Made document with id ${shorterLink}, which redirects to ${link}`);

    const response = {
        "message": "success",
        "code": responseCodes.Success,
        "link": shorterLink
    }
    return new Response(JSON.stringify(response));
}
