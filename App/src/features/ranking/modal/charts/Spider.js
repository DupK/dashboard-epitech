/**
 * Created by jules on 20/05/2017.
 */

import React, { Component, PropTypes } from 'react';
import {
    Dimensions,
    View
} from 'react-native';
import LoadingIndicator from 'react-native-spinkit';
import { Radar } from 'react-native-pathjs-charts';
import _ from "lodash";
import * as Intra from "../../../../api/intra";

export class Spider extends Component {

    constructor(props) {
        super(props);

        this.isMount = false;
        this.state = {
            modules: {},
        };
    }

    async componentWillMount() {
        this.isMount = true;
        const { modules } = await Intra.fetchMarks(this.props.student.login);

        this.isMount && this.setState({ modules: modules })
    }

    render() {

        if (!this.state.modules.length) {
            return (
                <View style={{ alignItems: 'center', marginTop: 30 }}>
                    <LoadingIndicator
                        isVisible={!this.state.modules.length}
                        color="#FFFFFF"
                        type="Bounce"
                        size={100}
                    />
                </View>
            )
        }

        const rawGrades = _.map(this.state.modules, (module) => module.grade);
        const grades = _.filter(rawGrades, (grade) => grade !== '-' && grade !== 'Acquis');

        const A = _.filter(grades, (grade) => grade === 'A');
        const B = _.filter(grades, (grade) => grade === 'B');
        const C = _.filter(grades, (grade) => grade === 'C');
        const D = _.filter(grades, (grade) => grade === 'D');
        const E = _.filter(grades, (grade) => grade === 'Echec');

        const res = [{
            [((A.length / grades.length) * 100).toFixed(2) + '% (A)']: ((A.length / grades.length) * 100).toFixed(2),
            [((B.length / grades.length) * 100).toFixed(2) + '% (B)']: ((B.length / grades.length) * 100).toFixed(2),
            [((C.length / grades.length) * 100).toFixed(2) + '% (C)']: ((C.length / grades.length) * 100).toFixed(2),
            [((D.length / grades.length) * 100).toFixed(2) + '% (D)']: ((D.length / grades.length) * 100).toFixed(2),
            [((E.length / grades.length) * 100).toFixed(2) + '% (E)']: ((E.length / grades.length) * 100).toFixed(2),
        }];

        const h = Dimensions.get('window').height;
        const w = Dimensions.get('window').width;
        const radarSettings = {
            width: w,
            height: h / 2.75,
            r: h / 7,
            max: 100,
            fill: "#62c462",
            stroke: "#16212C",
            label: {
                fontSize: 9,
                fill: '#FAFAFA',
                fontWeight: true,
            }
        };

        return (
            <Radar data={res} options={radarSettings} />
        );
    }
}

Spider.propTypes = {
    student: PropTypes.object,
};