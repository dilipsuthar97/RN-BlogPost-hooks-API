import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const BlogPostForm = ({ onSubmit, initialValues }) => {

    const[title, setTitle] = useState(initialValues ? initialValues.title : '');
    const[content, setContent] = useState(initialValues ? initialValues.content : '');

    return(
        <View style={{padding: 16}}>
            <TextInput
                autoCorrect={false}
                style={styles.title}
                label='Enter Title'
                mode='flat'
                placeholder='Enter title'
                value={title}
                onChangeText={(text) => setTitle(text)}
            />

            <TextInput
                autoCorrect={false}
                style={[styles.title, {marginTop: 16}]}
                label='Enter Content'
                mode='flat'
                placeholder='Enter content'
                value={content}
                multiline
                onChangeText={(text) => setContent(text)}
            />  

            <Button
                onPress={() => onSubmit(title, content)}
                style={{marginTop: 16}}
                icon="playlist-edit" 
                mode='contained'
                uppercase={false}
            >Save</Button>
        </View>
    );
}

// it will set default values to props if { nothing is passed form parent }
BlogPostForm.defaultProps = {
    initialValues: {
        title: '',
        content: ''
    }
};

const styles = StyleSheet.create({
    title: {
        fontSize: 22
    }
});

export default BlogPostForm;