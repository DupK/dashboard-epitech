import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    Image,
    ListView,
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

            <View style={styles.dataContainer}>
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
                <View style={styles.dataContainer}>
                    <Text style={styles.rank}>{student.rank}</Text>
                    <Image source={{uri: student.picture}} style={styles.picture} />
                    <Text style={styles.mainText}>{student.title}{'\n'}{student.credits} credits</Text>
                    <Image source={student.img} style={styles.flag} />
                    <Text style={styles.gpaText}>{student.gpa[0].gpa}</Text>
                </View>
                <View style={styles.separator} />
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
                        color="#2c3e50"
                        type="9CubeGrid"
                        size={60}
                    />
                    <Text style={styles.loadingText}>Loading ranking... This may take some time.</Text>
                </View>
            );
        }

        return (
            <Container>
                <Content>
                    { this.renderSelf(selfRank) }
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
