/**
 * Created by desver_f on 13/02/17.
 */
import _ from 'lodash';
import moment from 'moment';
import autobind from 'autobind-decorator';
import { observable } from 'mobx';
import ui from './uiState'
import * as Intra from '../api/intra';

@autobind
class Projects {
    @observable projects = [];
    @observable projectDetails = [];

    async fetchProjects() {
        const rawProjects = await Intra.fetchProjects();
        this.projects = _.filter(rawProjects, (project) => {
            const isProject = project.type_acti_code === 'proj'
                && (project.type_acti === 'Projet' || project.type_acti === 'Mini-Projets');
            const isNotInPast = moment(project.end_acti, 'YYYY-MM-DD, HH:mm:ss').isAfter(moment());

            return isProject && isNotInPast;
        });
    }

    async fetchProjectDetails(year, module, instance, activity) {
        ui.fetchingState();

        const projectDescription = await Intra.fetchProjectDetails({year, module, instance, activity});
        const projectFiles = await Intra.fetchProjectFiles({year, module, instance, activity});
        const pdfFiles = _.filter(projectFiles, (projectFile) => _.endsWith(projectFile.slug, '.pdf'))

        this.projectDetails = {
            details: projectDescription,
            files: pdfFiles
        };
        ui.defaultState();
    }
}

const projectStore = new Projects();
export default projectStore;
