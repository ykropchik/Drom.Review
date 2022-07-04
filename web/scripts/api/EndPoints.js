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
	static RESPONDENT = this.BASE_PATH + '/respondent';
	static RESPONDENT_STATUS = (id) => this.RESPONDENT + `/${id}/status`;
	static RESPONDENT_OPINIONS = (id) => this.RESPONDENT + `/${id}/opinion`;
}