import React, { useContext, useEffect } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    Button, 
    StyleSheet, 
    TouchableOpacity,
    LayoutAnimation
} from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';
import { HeaderButton } from '../components/common';

const IndexScreen = ({ navigation }) => {

    const { state, deleteBlogPost } = useContext(Context);

    useEffect(() => {
        LayoutAnimation.spring();
    }, [state]);

    return(
        <View style={{flex: 1}}>
            {/* <Button title="Add New" onPress={() => addBlogPost()}/> */}

            <FlatList
                data={state}
                keyExtractor={(item) => item.title}
                renderItem={({item}) => {
                    return(
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Show', { id: item.id });
                        }}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title} - {item.id}</Text>
                                <TouchableOpacity
                                onPress={() => deleteBlogPost(item.id)}
                                >
                                    <Feather style={styles.icon} name="trash"/>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Blog Posts",
        headerRight: <HeaderButton onPress={() => navigation.navigate('Create')}>
            <Feather name="plus" size={25}/>
        </HeaderButton>
    };
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#263238',
        alignItems: 'center',
        paddingVertical: 10,
        borderColor: '#90a4ae',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        margin: 8
    },
    title: {
        fontSize: 20,
        color: '#fff'
    },
    icon: {
        fontSize: 25,
        color: '#fff'
    }
});

export default IndexScreen;