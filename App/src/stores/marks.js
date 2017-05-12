/**
 * Created by desver_f on 15/02/17.
 */

import _ from 'lodash';
import autobind from 'autobind-decorator';
import moment from 'moment';
import storage from 'react-native-simple-store';
import { action, computed, observable } from 'mobx';
import ui from './uiState';
import session from './session';
import * as Intra from '../api/intra';

function formatGrade(grade) {
    return grade
        .replace('Echec', 'E')
        .replace('Acquis', 'A')
}

const sortMethods = {
    byName: (mark) => mark.user_title,
    byMark: (mark) => mark.note,
};

@autobind
class Marks {
    @observable rawMarks = {};
    @observable marksBySemesters = {};
    @observable nbSemester = 0;
    @observable currentSemester = session.userProfile.semester;

    @observable projectMarks = [];
    @observable selectedMark = null;
    @observable arrowDownHidden = false;

    constructor() {
        this.sortMethod = sortMethods.byName;
    }

    @action
    async fetchMarks() {
        const marks = await Intra.fetchMarks(session.userProfile.login);
        await storage.save('marks', marks);

        this.setMarksField(marks);
    }

    @action
    async retrieveMarksFromCache() {
        const marks = await storage.get('marks');

        if (marks) {
            this.setMarksField(marks);
        }
    }

    @action
    setMarksField(marks) {
        this.rawMarks = marks;
        this.marksBySemesters = this.remapMarksBySemesters(marks);
        this.nbSemester = _.size(this.marksBySemesters);
    }

    @action
    async fetchProjectNotes(year, module, instance, activity) {
        ui.fetchingState();
        this.projectMarks = await Intra.fetchProjectMarks(year, module, instance, activity);
        this.selectedMark = this.selfMark;
        this.sortMethod = sortMethods.byName;
        ui.defaultState();
    }

    remapMarksBySemesters(rawMarks) {
        const marksByModules = _(rawMarks.notes)
            .groupBy((note) => note.codemodule)
            .value();

        return _(rawMarks.modules)
            .groupBy((module) => {
                const moduleId = module.title.substring(0, 2);

                if (moduleId[0] !== 'B' || !(/\d/.test(moduleId[1])) || moduleId === 'B0') {
                    return 'Others';
                }

                return moduleId;
            })
            .toPairs()
            .map(([semester, modules]) => {
                const modulesWithMark = _(modules)
                    .groupBy((module) => module.codemodule)
                    .toPairs()
                    .flatMap(([codemodule, modules]) => {
                        const newModule = _.flatMap(modules, (module) => ({
                            marks: _(marksByModules[codemodule])
                                .filter((mark) => (
                                    mark.codeinstance === module.codeinstance && mark.scolaryear === module.scolaryear
                                ))
                                .map((mark) => ({
                                    year: mark.scolaryear,
                                    activity: mark.codeacti,
                                    instance: mark.codeinstance,
                                    comment: mark.comment,
                                    reviser: mark.correcteur,
                                    note: mark.final_note,
                                    title: mark.title,
                                    titleModule: mark.titlemodule,
                                    codeModule: codemodule,
                                }))
                                .value(),
                            grade: formatGrade(module.grade),
                            date: module.date_ins,
                            title: module.title,
                        }));

                        return [...newModule]
                    })
                    .value();

                return [
                    semester,
                    modulesWithMark,
                ];
            })
            .fromPairs()
            .value();
    }

    @computed get selfMark() {
        return _.find(this.projectMarks, (mark) => mark.login === session.userProfile.login);
    }

    @computed get lastMark() {
        return _(this.rawMarks.notes.slice())
            .orderBy(({ date }) => moment(date, 'YYYY-MM-DD HH:mm:ss'))
            .last();
    }

    @action
    setCurrentSemester(semester) {
        this.currentSemester = semester;
    }

    @action
    selectMark(mark) {
        this.selectedMark = mark;
    }

    @action
    sort() {
        this.sortMethod = (this.sortMethod === sortMethods.byMark) ?
                          sortMethods.byName :
                          sortMethods.byMark;
        const sortOrder = (this.sortMethod === sortMethods.byMark) ? 'desc' : 'asc';
        this.projectMarks = _.orderBy(this.projectMarks, this.sortMethod, [sortOrder]);
    }

    @action
    hideArrowDown() {
        this.arrowDownHidden = true;
    }
}

const marksStore = new Marks();
export default marksStore;