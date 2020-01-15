import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const HeaderButton = ({ children, onPress }) => {
    return(
        <TouchableOpacity 
            onPress={onPress}
            style={styles.container}
        >
            {children}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8
    }
});

export { HeaderButton };