import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderButton } from '../components/common';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { Context } from '../context/BlogContext';

const ShowScreen = ({ navigation }) => {

    const { state } = useContext(Context);

    const blogPost = state.find((blogPost) => blogPost.id === navigation.getParam('id'));

    return(
        <View style={styles.container}>
            <Card style={{elevation: 4}}>
                <Card.Content>
                    <Title style={styles.title}>{blogPost.title}</Title>
                    <Paragraph>{blogPost.content}</Paragraph>
                </Card.Content>
            </Card>
        </View>
    );
}

ShowScreen.navigationOptions = ({ navigation }) => {
    const id = navigation.getParam('id');

    return {
        title: "Blog",
        headerRight: <HeaderButton onPress={() => {
            navigation.navigate('Edit', { id });
        }}>
            <Feather name="edit" size={25}/>
        </HeaderButton>
    };
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1
    },
    title: {
        textDecorationLine: 'underline'
    }
});

export default ShowScreen;