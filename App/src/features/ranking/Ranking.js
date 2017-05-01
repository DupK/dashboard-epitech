import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ListView,
    Platform,
    TextInput,
} from 'react-native';
import LoadingIndicator from 'react-native-spinkit';
import { observer } from 'mobx-react/native';
import Layout from '../../shared/components/Layout';
import IconIO from 'react-native-vector-icons/Ionicons';
import styles from './styles.js';

@observer
export default class Ranking extends Component {

    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    async componentWillMount() {
        const { store: { ranking } } = this.props;

        await ranking.computePromotion({ refreshCache: false });
    }

    renderStudent(student) {
        return (
            <View style={Platform.OS === 'ios' ? styles.dataContainerIOS : styles.dataContainerAndroid}>
                <Text style={styles.rank}>{student.rank}</Text>
                <Image source={{uri: student.picture}} style={styles.picture} />
                <Text style={styles.mainText}>{student.title}{'\n'}{student.credits} credits</Text>
                <Image source={student.img} style={styles.flag} />
                <Text style={styles.gpaText}>{student.gpa[0].gpa}</Text>
            </View>
        )
    }

    renderSelf(student) {
        return (
            <View>
                <View style={Platform.OS === 'ios' ? styles.selfDataContainerIOS : styles.selfDataContainerAndroid}>
                    <Text style={styles.rank}>{student.rank}</Text>
                    <Image source={{uri: student.picture}} style={styles.picture} />
                    <Text style={styles.mainText}>{student.title}{'\n'}{student.credits} credits</Text>
                    <Image source={student.img} style={styles.flag} />
                    <Text style={styles.gpaText}>{student.gpa[0].gpa}</Text>
                </View>
            </View>
        )
    }

    render() {
        const { store: { ui, ranking } } = this.props;
        const selfRank = ranking.selfRank();

        if (!ui.isConnected && !ranking.promotion.length) {
            return (
                <Layout store={this.props.store}>
                    <View style={styles.loadingContainer}>
                        <Text style={{ color: '#FAFAFA' }}>
                            Cannot fetch ranking information.
                        </Text>
                    </View>
                </Layout>
            );
        }

        if (!ranking.promotion.length) {
            return (
                <View style={styles.loadingContainer}>
                    <LoadingIndicator
                        isVisible={!ranking.promotion.length}
                        color="#FFFFFF"
                        type="Bounce"
                        size={100}
                    />
                </View>
            );
        }

        return (
            <Layout store={this.props.store}>
                <View style={{ flex: 1, backgroundColor: '#203040'}}>
                    { this.renderSelf(selfRank) }
                    <View style={{
                        height: 50,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
                        margin: 5,
                    }}>
                        <TextInput
                            autoCorrect={false}
                            keyboardType="email-address"
                            maxLength={40}
                            multiline={false}
                            onChangeText={(e) => ranking.searchField = e}
                            value={ranking.searchField}
                            placeholder="Search student with email"
                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                            returnKeyType="search"
                            underlineColorAndroid="transparent"
                            selectionColor="#FAFAFA"
                            style={{
                                flex: 0.8,
                                color: '#FAFAFA',
                                height: 50,
                                fontSize: 13,
                                paddingLeft: 5,
                            }}
                        />
                        <IconIO name="ios-search-outline" size={24} style={{ flex: 0.05, paddingRight: 10, color: 'rgba(255, 255, 255, 0.5)', alignSelf: 'center'}} />
                    </View>
                    <ListView
                        style={styles.list}
                        dataSource={this.ds.cloneWithRows(ranking.renderResults)}
                        renderRow={this.renderStudent}
                        removeClippedSubviews
                        enableEmptySections
                    />
                </View>
            </Layout>
        );
    }
}