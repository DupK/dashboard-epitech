import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ListView,
    Platform
} from 'react-native';
import LoadingIndicator from 'react-native-spinkit';
import { observer } from 'mobx-react/native';
import { Container, Content } from 'native-base';
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
        const { store: { ranking } } = this.props;
        const selfRank = ranking.selfRank();

        if (!ranking.promotion.length) {
            return (
                <View style={styles.loadingContainer}>
                    <LoadingIndicator
                        isVisible={!ranking.promotion.length}
                        color="#FFFFFF"
                        type="Pulse"
                        size={100}
                    />
                </View>
            );
        }

        return (
            <Container>
                { this.renderSelf(selfRank) }
                <Content contentContainerStyle={{backgroundColor: '#203040'}}>
                    <ListView
                        style={styles.list}
                        dataSource={this.ds.cloneWithRows(ranking.promotion.slice())}
                        renderRow={this.renderStudent}
                        removeClippedSubviews
                    />
                </Content>
            </Container>
        );
    }
}
