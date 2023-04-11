import { Redirect } from "expo-router";
import React, { useEffect } from 'react';
import {LogBox} from 'react-native';


export default function Index() {

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    return <Redirect href="home"/>
}