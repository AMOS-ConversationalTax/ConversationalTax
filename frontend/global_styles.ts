import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        color: '#fff',
        backgroundColor: '#F5FCFF',
    },
    gardient: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    shadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1
    },
    shadowLight: {
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1
    },
    shadowBlur: {
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5
    }
});

export const BackgroundColors = ['#FEC325', '#E35908'];