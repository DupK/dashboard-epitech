import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    Image,
} from 'react-native';
import { observer } from 'mobx-react/native';
import { Container, Content, List } from 'native-base';
import styles from './styles.js';

@observer
export default class Ranking extends Component {

    constructor(props) {
        super(props);
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

            <View style={styles.selfDataContainer}>
                <Text style={styles.rank}>{student.rank}</Text>
                <Image source={{uri: student.picture}} style={styles.picture} />
                <Text style={styles.mainText}>{student.title}{'\n'}{student.credits} credits</Text>
                <Image source={student.img} style={styles.flag} />
                <Text style={styles.gpaText}>{student.gpa[0].gpa}</Text>
            </View>
        )
    }

    render() {
        const { store: { ranking } } = this.props;
        const selfRank = ranking.selfRank();

        if (!ranking.promotion.length) {
            return (
                <View>
                    <Text>Loading ranking. This may take a while...</Text>
                </View>
            );
        }

        return (
            <Container>
                <Content>
                    { this.renderSelf(selfRank) }
                    <List
                        dataArray={ranking.promotion.slice()}
                        renderRow={(student) => this.renderStudent(student)}>
                    </List>
                </Content>
            </Container>
        );
    }
}
