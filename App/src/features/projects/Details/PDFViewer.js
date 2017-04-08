/**
 * Created by desver_f on 08/04/17.
 */

import React, { Component } from 'react';
import Storage from 'react-native-simple-store';
import { View, WebView, Platform } from 'react-native';

class PDFViewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pdfUrl: '',
        }
    }

    componentWillMount() {
        Storage.get('autologin').then((response) => {
            const pdfLink = response.link + this.props.pdfUrl;
            const pdfLinkForAndroid = `https://docs.google.com/gview?embedded=true&url=${pdfLink}`;

            this.setState({ pdfUrl: Platform.OS === 'ios' ? pdfLink : pdfLinkForAndroid })
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    source={{ uri: this.state.pdfUrl }}
                />
            </View>
        );
    }
}

PDFViewer.propTypes = {
    pdfUrl: React.PropTypes.string,
};

export default PDFViewer;