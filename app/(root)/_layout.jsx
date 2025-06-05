import { useUser } from "@clerk/clerk-expo";
import { Redirect } from 'expo-router';
import { Stack } from "expo-router/stack"


export default function Layoutcd() {
    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded) return null; // this for better user experience, it will wait until the user is loaded

    if (!isSignedIn) return <Redirect href={'/sign-up'} />

    return <Stack screenOptions={{ headerShown: false }} />
}