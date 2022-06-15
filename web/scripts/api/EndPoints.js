export class EndPoints {
	static BASE_PATH = 'http://localhost/api';
	static SIGN_IN = this.BASE_PATH + '/authenticate';
	static GRADES = this.BASE_PATH + '/grade';
	static VALIDATE_GRADE = this.GRADES + '?type=validate';
	static SPECIALIZATIONS = this.BASE_PATH + '/specialization';
	static SPECIALIZATIONS_FULL = this.SPECIALIZATIONS + '?type=full';
	static VALIDATE_SPECIALIZATION = this.SPECIALIZATIONS + '?type=validate';
}