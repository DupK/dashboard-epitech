/**
 * Created by jules on 17/03/17.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIOC from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import _ from "lodash";

export const Team = ({ teams }) => {
    return (
        <View style={{ flex: 1 }}>
            {_.map(teams.registered, (team, i) => (
                <View key={i} style={styles.teamContainer}>
                    <View style={{ height: 25, backgroundColor: '#16212C', justifyContent: 'center', elevation: 1}}>
                        <Text style={{ color: '#FAFAFA', fontSize: 11, alignSelf: 'center'}}>{team.title}</Text>
                    </View>
                    <View style={styles.teamSubContainer}>
                        <View style={styles.teamImageContainer}>
                            <View style={{ flexDirection: 'row'}}>
                                <Image style={styles.teamMasterImage}
                                       source={{ uri: team.master.picture, width: 35, height: 35 }} />
                                <Text style={{ color: '#FAFAFA', fontSize: 12, alignSelf: 'center', marginLeft: 5}}>{team.master.login}</Text>
                            </View>
                            {_.map(team.members, (member, j) => (
                                <View key={j} style={{ flexDirection: 'row'}}>
                                    <Image style={styles.teamMemberImage} source={{uri: member.picture, width: 35, height: 35}}/>
                                    <Text style={{ color: member.status === 'confirmed' ? '#FAFAFA' : '#F44336', fontSize: 12, alignSelf: 'center', marginLeft: 5}}>{member.login}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={{ flex: 0.28, justifyContent: 'center' }}>
                            { isValidTeam(team.members) ? <IconIOC name="ios-checkmark-outline" size={50} style={{color: '#62c462'}}/> : <IconIOC name="ios-close-outline" size={50} style={{color: '#f44336'}}/>}
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};

function isValidTeam(members) {
    return _.filter(members, (member) => {
            return member.status !== 'confirmed';
        }).length <= 0;
}

Team.propTypes = {
    teams: React.PropTypes.object,
};

export const Document = ({ documents }) => {
    return (
        <View style={styles.documentContainer}>
            {_.map(documents, (document, i) => (
                <TouchableOpacity key={i}>
                    <View style={styles.documentSubContainer}>
                        <IconMCI
                            style={styles.documentIcon}
                            name="file-pdf-box"
                            size={22}
                        />
                        <Text style={styles.documentText}>
                            {_.truncate(document.title, {length: 15, separator: '...'})}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

Document.propTypes = {
    documents: React.PropTypes.object,
};
