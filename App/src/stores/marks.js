/**
 * Created by desver_f on 15/02/17.
 */

import _ from 'lodash';
import autobind from 'autobind-decorator';
import { observable, computed, action } from 'mobx';
import ui from './uiState'
import session from './session'
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
    @observable marksBySemesters = {};
    @observable nbSemester = 0;
    @observable currentSemester = 1;

    @observable projectMarks = [];
    @observable selectedMark = null;

    constructor() {
        this.sortMethod = sortMethods.byName;
    }

    async fetchMarks(user) {
        const rawMarks = await Intra.fetchMarks(user);

        this.marksBySemesters = this.parseMarks(rawMarks);
        this.nbSemester = _.size(this.marksBySemesters);
    }

    async fetchProjectNotes(year, module, instance, activity) {
        ui.fetchingState();
        this.projectMarks = await Intra.fetchProjectMarks(year, module, instance, activity);
        this.selectedMark = this.selfMark;
        ui.defaultState();
    }

    @computed get selfMark() {
        return _.find(this.projectMarks.slice(), (mark) => mark.login === session.username);
    }

    parseMarks(rawMarks) {
        const marksByModules = _(rawMarks.notes)
            .groupBy((note) => note.codemodule)
            .value();

        return _(rawMarks.modules)
            .groupBy((module) => {
                const moduleId = module.title.substring(0, 2);

                if (moduleId[1] == '0' || moduleId == 'Hu') {
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
                        const newModule = _.flatMap(modules, (module) =>({
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
        this.sortMethod = (this.sortMethod === sortMethods.byMark) ? sortMethods.byName :sortMethods.byMark;
        const sortOrder = (this.sortMethod === sortMethods.byMark) ? 'desc' : 'asc';
        this.projectMarks = _.orderBy(this.projectMarks, this.sortMethod, [sortOrder]);
    }
}

const marksStore = new Marks();
export default marksStore;