/**
 * Created by desver_f on 06/03/17.
 */
import React, { Component } from "react";
import { StyleSheet, Image, View } from "react-native";

const BackgroundImageWithOverlay = (props) => {
    return (
        <Image source={props.source}
               style={styles.image}
               resizeMode='cover'
        >
            <View style={{ flex: 1, backgroundColor: props.colorOverlay, }}>
                { props.children }
            </View>
        </Image>
    );
};

BackgroundImageWithOverlay.propTypes = {
    source: React.PropTypes.any.isRequired,
    colorOverlay: React.PropTypes.string,
    children: React.PropTypes.node,
};

const styles = {
    image: {
        flex: 1,
        width: null,
        height: null
    },
};

export default BackgroundImageWithOverlay;