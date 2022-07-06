export class EndPoints {
	static BASE_PATH = 'http://localhost/api';
	static SIGN_IN = this.BASE_PATH + '/authenticate';
	static GRADES = this.BASE_PATH + '/grade';
	static VALIDATE_GRADE = this.GRADES + '?type=validate';
	static SPECIALIZATIONS = this.BASE_PATH + '/specialization';
	static SPECIALIZATIONS_FULL = this.SPECIALIZATIONS + '?type=full';
	static VALIDATE_SPECIALIZATION = this.SPECIALIZATIONS + '?type=validate';
	static USER = this.BASE_PATH + '/user';
	static USERS = this.BASE_PATH + '/users';
	static QUESTIONS = this.BASE_PATH + '/question';
	static REVIEW = this.BASE_PATH + '/review';
	static REVIEWS = this.BASE_PATH + '/reviews';
	static RESPONDENTS = this.BASE_PATH + '/respondent';
	static RESPONDENT_OPINION = (id) => this.BASE_PATH + `/respondent/${id}/opinion`;
	static RESPONDENT_STATUS = (id) => this.RESPONDENTS + `/${id}/status`;
	static OPINIONS_STATISTIC = (id) => this.BASE_PATH + '/statistic/review/' + id + '/opinions';
}