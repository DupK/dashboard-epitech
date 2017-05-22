import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ListView,
    Platform,
    TextInput,
    TouchableOpacity
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { observer } from 'mobx-react/native';
import Layout from '../../shared/components/Layout';
import IconIO from 'react-native-vector-icons/Ionicons';
import styles from './styles.js';
import { Spider } from './modal/charts/Spider';
import { Header } from "./modal/Header";
import { Resume } from "./modal/Resume";
import { LogTime } from "./modal/LogTime";
import { IntranetButton } from "./modal/IntranetButton";
import { BackDrop } from "./modal/BackDrop";
import LoadingIndicator from '../../shared/components/LoadingIndicator';

@observer
export default class Ranking extends Component {

    constructor(props) {
        super(props);

        this.state = {
            autologin: "https://intra.epitech.eu/"
        };

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.renderStudent = this.renderStudent.bind(this);
    }

    async componentWillMount() {
        const { store: { ranking, session } } = this.props;

        const autologin = await session.getAutologinCached();
        this.setState({ autologin });

        await ranking.computePromotion({ refreshCache: false });
    }

    renderStudent(student) {
        const { store: { ranking } } = this.props;

        return (
            <View style={Platform.OS === 'ios' ? styles.dataContainerIOS : styles.dataContainerAndroid}>
                <Text style={styles.rank}>
                    {student.rank}
                </Text>
                <Image source={{uri: student.picture}} style={styles.picture} />
                <Text style={styles.mainText}>
                    {student.title}{'\n'}{student.credits} credits
                </Text>
                <Image source={student.img} style={styles.flag} />
                <Text style={styles.gpaText}>
                    {student.gpa[0].gpa}
                </Text>
                <TouchableOpacity onPress={() => ranking.setStudentModal(student.login) || this._modal.open()} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                    <IconIO name="ios-more" size={24} style={{ color: '#FAFAFA', marginLeft: 10 }}/>
                </TouchableOpacity>
            </View>
        )
    }

    renderSelf(student) {
        return (
            <View>
                <View style={Platform.OS === 'ios' ? styles.selfDataContainerIOS : styles.selfDataContainerAndroid}>
                    <Text style={styles.rank}>
                        {student.rank}
                    </Text>
                    <Image source={{uri: student.picture}} style={styles.picture} />
                    <Text style={styles.mainText}>
                        {student.title}{'\n'}{student.credits} credits
                    </Text>
                    <Image source={student.img} style={styles.flag} />
                    <Text style={styles.gpaText}>
                        {student.gpa[0].gpa}
                    </Text>
                </View>
            </View>
        )
    }

    render() {
        const { store: { ui, ranking }} = this.props;
        const selfRank = ranking.selfRank();
        const studentModal = ranking.getResume;

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
                <LoadingIndicator
                    isVisible={!ranking.promotion.length}
                    message={`Loading ranking... This may take a while.`}
                />
            );
        }

        return (
            <Layout store={this.props.store}>
                <View style={{ flex: 1, backgroundColor: '#203040'}}>
                    { this.renderSelf(selfRank) }
                    <View style={styles.inputContainer}>
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
                            style={styles.input}
                        />
                        <IconIO name="ios-search-outline" size={24} style={styles.inputIcon} />
                    </View>
                    <ListView
                        style={styles.list}
                        dataSource={this.ds.cloneWithRows(ranking.renderResults)}
                        renderRow={this.renderStudent}
                        removeClippedSubviews
                        enableEmptySections
                    />
                        <ModalBox
                            ref={component => this._modal = component}
                            style={styles.modal}
                            backdropOpacity={0.85}
                            backdropContent={ <BackDrop message="Scroll down for quit"/> }
                        >
                            { !!ranking.studentModal && (
                                <View style={styles.modalSubContainer}>
                                    <Header text={studentModal.title}/>
                                    <Resume student={studentModal}>
                                        <LogTime student={studentModal}/>
                                    </Resume>
                                    <IntranetButton login={studentModal.title} autologin={this.state.autologin}/>
                                    <View style={styles.spiderContainer}>
                                        <Spider student={studentModal}/>
                                    </View>
                                </View>
                            )}
                        </ModalBox>
                    <View/>
                </View>
            </Layout>
        );
    }
}