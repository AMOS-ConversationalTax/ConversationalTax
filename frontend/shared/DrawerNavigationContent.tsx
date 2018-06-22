import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { NavigationService } from '../services/NavigationService';
import {NavigatableRoutes} from 'conv-tax-shared/config/navigation.config';

/**
 * Defines the routes in center of the drawer
 * @type {Map<string, string>}
 */
const routes: Map<string, string> = new Map<string, string>([
    ['Start', NavigatableRoutes.Conversation],
    ['Benachrichtigungen', NavigatableRoutes.Notifications],
    ['Scanner', NavigatableRoutes.Scanner],
    ['Verlauf', NavigatableRoutes.History],
]);

/**
 * Defines the bottom routes 
 * @type {Map<string, string>}
 */
const bottomRoutes: Map<string, string> = new Map<string, string>([
    ['Entwickler-Werkzeuge', 'Debug'],
    ['Credits', 'Credits'],
]);

/**
 * Implements a custom drawer
 */
export default class CustomDrawerContentComponent extends Component {

    /**
     * The rendering function for the custom drawer
     * @returns {JSX.Element} The markup element that is displayed
     */
    public render(): JSX.Element {
        return (
            <View style={styles.container}>   
                <View style={styles.profile}>
                    <FontAwesome name="user-circle-o" size={40} color="#ddd" />
                    <Text style={styles.name}>Max Mustermann</Text>
                </View>
                <View style={styles.navigation}>
                    {this.renderItems(routes)}
                </View>
                <View style={styles.credits}>
                    {this.renderItems(bottomRoutes)}
                </View>
            </View>
        );
    }

    /**
     * Renders the Map of routes
     * @param {Map<string, string>} routes The mao of routes
     * @returns {JSX.Element[]} An array of elements to display
     */
    private renderItems(routes: Map<string, string>): JSX.Element[] {
        let eles: JSX.Element[] = [];
        routes.forEach((navigateTo, name) => {
            const currStyles = [styles.items];
            if (navigateTo === NavigationService.activeRoute()) {
                currStyles.push(styles.itemsActive);
            }
            eles.push(
                <TouchableOpacity style={currStyles} key={name} onPress={this.genCallback(navigateTo)}>
                    <Text style={styles.itemsText}>{name}</Text>
                </TouchableOpacity>
            );
        });
        return eles;
    }

    /**
     * Generates a function, which will navigate the user to the correct page
     * @param {string} navigateTo Route to navigate to.
     * @returns {any} A function which returns void and navigates the user.
     */
    private genCallback(navigateTo: string): () => void {
        return () => {
            NavigationService.navigate(navigateTo);
        };
    }
}

/**
 * The styles that are used by the class BootomBar
 * @type {any}
 */
const styles: any = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
    },
    profile: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#D97730',
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        paddingLeft: 20,
    },
    credits: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
    },
    navigation: {

    },
    items: {
        padding: 15,
        paddingLeft: 15,
    },
    itemsText: {
        fontSize: 16,
    },
    itemsActive: {
        backgroundColor: '#E8A23F',
    },
});



