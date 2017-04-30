/**
 * Created by desver_f on 13/02/17.
 */
import _ from 'lodash';
import autobind from 'autobind-decorator';
import moment from 'moment';
import storage from 'react-native-simple-store';
import { computed, observable } from 'mobx';
import ui from './uiState';
import * as Intra from '../api/intra';

@autobind
class Projects {
    @observable projects = [];
    @observable rawProjects = [];
    @observable projectDetails = [];

    async fetchProjects() {
        const projects = await Intra.fetchProjects();
        await storage.save('projects', projects);

        this.setProjectsFields(projects);
    }

    async retrieveProjectsFromCache() {
        const projects = await storage.get('projects');

        if (projects) {
            this.setProjectsFields(projects);
        }
    }

    setProjectsFields(projects) {
        this.rawProjects = projects;
        this.projects = this.computeRegisteredProjects(projects);
    }

    computeRegisteredProjects(projects) {
        return _.filter(projects, (project) => {
            const isProject = project.type_acti_code === 'proj'
                && (project.type_acti === 'Projet' || project.type_acti === 'Mini-Projets');
            const isNotInPast = moment(project.end_acti, 'YYYY-MM-DD, HH:mm:ss').isAfter(moment());

            return isProject && isNotInPast;
        });
    }

    async fetchProjectDetails(year, module, instance, activity) {
        ui.fetchingState();

        const projectDescription = await Intra.fetchProjectDetails({
            year,
            module,
            instance,
            activity
        });
        const projectFiles = await Intra.fetchProjectFiles({ year, module, instance, activity });
        const pdfFiles = _.filter(projectFiles, (projectFile) => _.endsWith(projectFile.slug, '.pdf'));

        this.projectDetails = {
            details: projectDescription,
            files: pdfFiles
        };
        ui.defaultState();
    }

    isRegisteredToRelatedProject(activity) {
        if (!activity.project) {
            return true;
        }

        return this.rawProjects.slice().filter((project) => (
                project.codeacti === `acti-${activity.project.id}` && project.registered
            )).length === 1;
    }

    @computed get firstEndingProject() {
        const nextProject = _(this.projects.slice())
            .orderBy((project) => moment(project.end_acti, 'YYYY-MM-DD, HH:mm:ss'))
            .filter((project) => project.registered === 1)
            .first();

        return nextProject
            ? `Your next project "${nextProject.acti_title}" ends ${moment(nextProject.end_acti).fromNow()}`
            : 'You\'re not registered to any future project.';
    }

}

const projectStore = new Projects();
export default projectStore;
