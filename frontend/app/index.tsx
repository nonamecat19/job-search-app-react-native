import { Redirect } from "expo-router";
import React, { useEffect } from 'react';
import {LogBox} from 'react-native';
import {Provider} from "react-redux";
import store from './../redux/store'

export default function Index() {

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    return (
        <Provider store={store}>
            <Redirect href="home"/>
        </Provider>
    )
}