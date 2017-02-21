/**
 * Created by desver_f on 13/02/17.
 */
import _ from 'lodash';
import moment from 'moment';
import autobind from 'autobind-decorator';
import { observable } from 'mobx';

import * as Intra from '../api/intra';

@autobind
class Projects {
    @observable projects = [];

    async fetchProjects() {
        const rawProjects = await Intra.fetchProjects();
        this.projects = _.filter(rawProjects, (project) => {
            const isProject = project.type_acti_code === 'proj'
                && (project.type_acti === 'Projet' || project.type_acti === 'Mini-Projets');
            const isNotInPast = moment(project.end_acti, 'YYYY-MM-DD, HH:mm:ss').isAfter(moment());

            return isProject && isNotInPast;
        });
    }
}

const projectStore = new Projects();
export default projectStore;
