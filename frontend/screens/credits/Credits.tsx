import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Wrapper from '../../shared/Wrapper';
import RoundContentWrapper from '../../shared/RoundContentWrapper';

export default class Credits extends Component {
    render() {
        return (
            <Wrapper>
                <RoundContentWrapper title="Credits">
                    <ScrollView style={styles.innerView}>
                        <Text style={styles.headline}>
                            Über diese App
                        </Text>
                        <Text style={styles.text}>
                            Conversational Tax ist ein Studentenprojekt der Friedrich Alexander Universität Erlangen-Nürnberg.
                            Die App ist im Rahmen von AMOS, ein Projekt-Modul der Professur für Open Source Software unter Leitung von Prof. Dirk Riehle, entstanden.
                        </Text>
                        <Text style={styles.headline}>
                            Studenten-Team
                        </Text>
                        <Text style={styles.text}>
                            Software-Developer:{'\n'}
                            Alexander M.{'\n'}
                            Dominik P.{'\n'}
                            Eduard P.{'\n'}
                            Gabriel B.
                        </Text>
                        <Text style={styles.text}>
                            Product-Owner:{'\n'}
                            Leon S.{'\n'}
                            Phillip K.
                        </Text>
                        <Text style={styles.headline}>
                            Industrie-Partner
                        </Text>
                        <Text style={styles.text}>
                            Adorsys
                        </Text>
                        <Text style={styles.text}>
                            Ansprechpartner:{'\n'}
                            Steffen B.
                        </Text>
                        <Text style={styles.headline}>
                            Betreuung
                        </Text>
                        <Text style={styles.text}>
                            Michael D.
                        </Text>
                    </ScrollView>
                </RoundContentWrapper>
            </Wrapper>
        );
    }
}

const styles = StyleSheet.create({
    outerView: {
        //justifyContent: 'center'
    },
    innerView: {
        marginTop: 5,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20, 
    },
    text: {
        fontSize: 17,
        textAlign: 'justify',
        paddingBottom: 10,
    },
    headline: {
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 5,
        color: '#AA5322',
    }
});