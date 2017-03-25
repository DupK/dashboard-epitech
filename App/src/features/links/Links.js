/**
 * Created by jules on 04/02/17.
 */

import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import {
    View,
} from 'react-native';
import { Row, Grid } from "react-native-easy-grid";
import Link from './Link';
import Cell from './Cell';
import {Router} from "react-native-mobx";


/*
        L84 : Hack with size(0.01)
 */

@observer
export default class Links extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#233445' }}>
                <Grid>

                    <Cell icon="ios-git-branch">
                        <Link
                            title="Github/DupK/dashboard-epitech"
                            description="The world's leading software development platform"
                            url="https://github.com/DupK/dashboard-epitech"
                        />
                    </Cell>

                    <Cell icon="ios-pin-outline">
                        <Link
                            title="Intranet Epitech"
                            description="Epitech official intranet site"
                            url="https://intra.epitech.eu/"
                        />
                    </Cell>

                    <Cell icon="ios-chatbubbles-outline">
                        <Link
                            title="Yammer"
                            description="The enterprise social network"
                            url="http://yammer.com/epitech.eu/"
                        />
                    </Cell>

                    <Cell icon="ios-mail-outline">
                        <Link
                            title="Outlook"
                            description="Microsoft free personal email"
                            url="https://portal.office.com/"
                        />
                    </Cell>

                    <Cell icon="ios-map-outline">
                        <Link
                            title="Tekfeed"
                            description="International platform Epitech"
                            url="https://tekfeed.epitech.eu/"
                        />
                    </Cell>

                    <Cell icon="ios-calendar-outline">
                        <Link
                            title="Eygle"
                            description="Epitech's schedules"
                            url="http://eygle.fr/epitech/"
                        />
                    </Cell>

                    <Cell icon="ios-bulb-outline">
                        <Link
                            title="Taker"
                            description="The Young Leaders Of The Digital Revolution"
                            url="http://taker.epitech.eu/"
                        />
                    </Cell>

                    <Row size={0.01} />

                </Grid>
            </View>
        );
    }
};