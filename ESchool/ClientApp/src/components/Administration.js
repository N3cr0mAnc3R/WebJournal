import React, { Component } from 'react';
import httpService from '../HttpService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-bootstrap/Modal'

export class Administration extends Component {
    static displayName = Administration.name;

    constructor(props) {
        super(props);
        this.state = {
            grades: [],
            disciplines: [],
            teachers: [],
            currentGrade: {},
            filledLessons: [],
            isTeachersShow: false,
            isGradesShow: false,
            isDisciplinesShow: false,
            isNewLessonShow: false,
            isPupilListShow: false,
            isNewPupilShow: false,
            newLessonModel: { disciplineId: 0, gradeId: 0, teacherId: 0, numberOfLessons: 0 },
            newPupilModel: { name: "", familyName: "", patronymic: "", dateOfBirth: "2000-01-01", isMale: false, passSeries: "", passNumber: "", snils:"", gradeId: 0 },
            loading: true
        };
    }

    componentDidMount() {
        this.getAllInfo();
    }

    renderTeachers(teachers) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ФИО</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher =>
                        <tr key={teacher.id}>
                            <td>{teacher.name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
    renderDisciplines(teachers) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ФИО</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher =>
                        <tr key={teacher.id}>
                            <td>{teacher.name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
    renderPupilList() {
        let content = [];
        if (this.state.isPupilListShow) {
            content.push(<div>234</div>);
            if (this.state.currentGrade != null && this.state.currentGrade.pupils != null) {
                content.push(<table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>ФИО</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.currentGrade.pupils.map(pupil =>
                            <tr key={pupil.id}>
                                <td>{pupil.lastName} {pupil.name} {pupil.patronymic}</td>
                            </tr>
                        )}
                    </tbody>
                </table>);
            }
            content.push(<div><button className="btn btn-outline-primary" onClick={() => { this.setState({ isNewPupilShow: true }); }}>Добавить ученика</button></div>);
        }

        return content;
    }
    openPupilList(Id) {
        let self = this;
        httpService.postToServer("https://localhost:7232/api/teacher/GetPupilsInClass?Id=" + Id, (data) => {
            let grade = self.state.grades.find(a => a.id == Id);
            let grades = [...self.state.grades];
            let index = grades.indexOf(grade);
            grade.pupils = data;

            self.setState({ currentGrade: grade });
            self.setState({ isPupilListShow: true });
            //update
            grades[index] = grade;
            self.setState({ grades: grades });

            //get value of grade for new pupil
            let model = { ...self.state.newPupilModel };
            model.gradeId = Id;
            self.setState({ newPupilModel: model });
        });
    }
    handleInputChange(event, self) {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        let model = { ...this.state.newPupilModel };
        model[name] = value;
        self.setState({ newPupilModel: model });

    }
    createPupil() {
        let self = this;
        httpService.postToServer("https://localhost:7232/api/administrator/CreatePupil", (data) => {
            self.openPupilList(self.state.currentGrade.id);
        }, self.state.newPupilModel);
    }
    renderGrades(grades) {
        return (
            <div>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Класс</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map(grade =>
                            <tr key={grade.id}>
                                <td>{grade.name} {grade.subName}</td>
                                <td>
                                    <button className="btn btn-secondary" onClick={() => { this.openPupilList(grade.id) }}>
                                        <FontAwesomeIcon icon="pencil" />
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <Modal show={this.state.isNewPupilShow} >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <label>Имя</label>
                            <input type="text" name="name" value={this.state.newPupilModel.name} onChange={(e) => { this.handleInputChange(e, this) }} />
                        </div>
                        <div className="row">
                            <label>Фамилия</label>
                            <input type="text" name="familyName" value={this.state.newPupilModel.familyName} onChange={(e) => { this.handleInputChange(e, this) }} />
                        </div>
                        <div className="row">
                            <label>Отчество</label>
                            <input type="text" name="patronymic" value={this.state.newPupilModel.patronymic} onChange={(e) => { this.handleInputChange(e, this) }} />
                        </div>
                        <div className="row">
                            <label>Мужской пол</label>
                            <input type="checkbox" name="isMale" value={this.state.newPupilModel.isMale} onChange={(e) => { this.handleInputChange(e, this) }} />
                            <label>Дата рождения</label>
                            <input type="date" name="dateOfBirth" value={this.state.newPupilModel.dateOfBirth} onChange={(e) => { this.handleInputChange(e, this) }} />
                        </div>
                        <div className="row">
                            <label>Серия паспорта</label>
                            <input type="text" name="passSeries" value={this.state.newPupilModel.passSeries} onChange={(e) => { this.handleInputChange(e, this) }} />
                            <label>Номер паспорта</label>
                            <input type="text" name="passNumber" value={this.state.newPupilModel.passNumber} onChange={(e) => { this.handleInputChange(e, this) }} />
                        </div>
                        <div className="row">
                            <label>Снилс</label>
                            <input type="text" name="snils" value={this.state.newPupilModel.snils} onChange={(e) => { this.handleInputChange(e, this) }} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button variant="secondary">
                            Close
                        </button>
                        <button variant="primary" onClick={() => { this.createPupil() }}>
                            Save Changes
                        </button>
                    </Modal.Footer>
                </Modal>
                {this.renderPupilList()}
            </div>
        );
    }
    updateSelectDisc(value) {
        let model = { ...this.state.newLessonModel };
        model.disciplineId = Number.parseInt(value);
        this.setState({ newLessonModel: model });
    }
    updateSelectGrade(value) {
        let model = { ...this.state.newLessonModel };
        model.gradeId = Number.parseInt(value);
        this.setState({ newLessonModel: model });
    }
    updateSelectTeacher(value) {
        let model = { ...this.state.newLessonModel };
        model.teacherId = Number.parseInt(value);
        this.setState({ newLessonModel: model });
    }
    updateSelectNumber(value) {
        let model = { ...this.state.newLessonModel };
        model.numberOfLessons = Number.parseInt(value);
        this.setState({ newLessonModel: model });
    }
    async saveNewLessons() {
        console.log(this.state.newLessonModel);
        await httpService.postToServer('https://localhost:7232/api/Administrator/CreateDisciplineLessons', (id) => { console.log(id); }, this.state.newLessonModel);
    }
    renderNewLesson() {
        return (
            <div>
                <select value={this.state.newLessonModel.disciplineId} onChange={(e) => { this.updateSelectDisc(e.target.value) }} className="form-select" >
                    <option value={0} disabled>Выберите дисциплину</option>
                    {this.state.disciplines.map(disc =>
                        <option key={disc.id} value={disc.id}>
                            {disc.name}
                        </option>
                    )}
                </select>
                <select value={this.state.newLessonModel.gradeId} onChange={(e) => { this.updateSelectGrade(e.target.value) }} className="form-select" >
                    <option value={0} disabled>Выберите класс</option>
                    {this.state.grades.map(grade =>
                        <option key={grade.id} value={grade.id}>
                            {grade.name} {grade.subName}
                        </option>
                    )}
                </select>
                <select value={this.state.newLessonModel.teacherId} onChange={(e) => { this.updateSelectTeacher(e.target.value) }} className="form-select" >
                    <option value={0} disabled>Выберите учителя</option>
                    {this.state.teachers.map(teacher =>
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.name}
                        </option>
                    )}
                </select>
                <input type="number" value={this.state.newLessonModel.numberOfLessons} onChange={(e) => { this.updateSelectNumber(e.target.value) }} className="form-control" />
                <button onClick={() => { this.saveNewLessons() }} className="btn btn-outline-success">Сохранить</button>
            </div>
        );
    }
    renderMainContent(props) {
        if (props.isTeachersShow) {
            return this.renderTeachers(this.state.teachers);
        }
        else if (props.isDisciplinesShow) {
            return this.renderDisciplines(this.state.disciplines);
        }
        else if (props.isGradesShow) {
            return this.renderGrades(this.state.grades);
        }
        else if (props.isNewLessonShow) {
            return this.renderNewLesson();
        }
    }
    showAnotherOption(type) {
        this.setState({ isTeachersShow: false, isDisciplinesShow: false, isGradesShow: false, isNewLessonShow: false });
        if (type == 1) {
            this.setState({
                isTeachersShow: true
            });
        }
        else if (type == 2) {
            this.setState({
                isGradesShow: true
            });
        }
        else if (type == 3) {
            this.setState({
                isDisciplinesShow: true
            });
        }
        else if (type == 4) {
            this.setState({
                isNewLessonShow: true
            });
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderMainContent(this.state);

        return (
            <div>
                <div className="panel-list">
                    <button className="btn btn-outline-secondary me-3" onClick={() => { this.showAnotherOption(1) }}>Учителя</button>
                    <button className="btn btn-outline-secondary me-3" onClick={() => { this.showAnotherOption(2) }}>Классы</button>
                    <button className="btn btn-outline-secondary me-3" onClick={() => { this.showAnotherOption(3) }}>Предметы</button>
                    <button className="btn btn-outline-secondary me-3" onClick={() => { this.showAnotherOption(4) }}>Добавить занятия</button>
                </div>

                {contents}
            </div>
        );
    }

    async getAllInfo() {
        await httpService.postToServer('https://localhost:7232/api/Administrator/GetDisciplineList', (data) => { this.setState({ disciplines: data }); });
        await httpService.postToServer('https://localhost:7232/api/Administrator/GetGradeList', (data) => { this.setState({ grades: data }); });
        await httpService.postToServer('https://localhost:7232/api/Administrator/GetTeachers', (data) => { this.setState({ teachers: data }); });
        await httpService.postToServer('https://localhost:7232/api/Administrator/GetFilledLessons', (data) => { this.setState({ filledLessons: data }); });
        this.setState({ loading: false });
    }
}
