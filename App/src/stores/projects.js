/**
 * Created by desver_f on 13/02/17.
 */
import _ from 'lodash';
import autobind from 'autobind-decorator';
import { observable } from 'mobx';

import * as Intra from '../api/intra';

@autobind
class Projects {
    @observable projects = [];

    async fetchProjects() {
        const rawProjects = await Intra.fetchProjects();
        const filteredProjects = _.filter(rawProjects, (project) => {
            return project.type_acti_code === 'proj'
                && (project.type_acti === 'Projet' || project.type_acti === 'Mini-Projets')
        });

        this.projects = filteredProjects;
    }
}

const projectStore = new Projects();
export default projectStore;
