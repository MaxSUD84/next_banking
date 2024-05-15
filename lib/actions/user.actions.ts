'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
    try {
    //   const { database } = await createAdminClient();
  
    //   const user = await database.listDocuments(
    //     DATABASE_ID!,
    //     USER_COLLECTION_ID!,
    //     [Query.equal('userId', [userId])]
    //   )
  
    //   return parseStringify(user.documents[0]);
    } catch (error) {
      console.log(error)
    }
  }

export const signIn = async ({ email, password }: signInProps) => {
    try {
        // Mutation / Database / Make fetch
        const { account } = await createAdminClient()
        const session = await account.createEmailPasswordSession(email, password)

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(session)
    } catch (error) {
        console.error('Error', error)
    }
}

export const signUp = async (userData: SignUpParams) => {
    const { email, password, firstName, lastName } = userData
    try {
        // Mutation / Database / Make fetch
        // Create a user account
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(), 
            email, 
            password, 
            `${firstName} ${lastName}`
        );
        const session = await account.createEmailPasswordSession(email, password);
      
        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
      
        return parseStringify(newUserAccount)
    } catch (error) {
        console.error('Error', error)
    }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();
        cookies().delete("appwrite-session");
        const response = await account.deleteSession("current");
        // console.log('logoutAccount: ', response)
        // return parseStringify(response)

        return true
    } catch (error) {
        console.error('Error', error)
    }
  }


  export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const result = await account.get();
    //   const user = await getUserInfo({ userId: result.$id})
  
    //   return parseStringify(user);
      return parseStringify(result);
    } catch (error) {
      console.log(error)
      return null;
    }
  }
