<?php

namespace App\Types;

class ReviewActions
{
	const INITIALIZE = 'init';
	const SET_STATUS_REVIEW = 'set_review_status';
	const SET_STATUS_CORRECTION = 'set_correction_status';
	const SET_STATUS_OPINION_WAITING = 'set_opinion_waiting_status';
	const SET_STATUS_MEETING_WAITING = 'set_meeting_waiting_status';
	const SET_STATUS_COMPLETED = 'set_completed_status';
	const ADD_SELF_REVIEW = 'add_self_review';
	const ADD_RESPONDENTS_LIST = 'add_respondents_list';
	const EDIT_SELF_REVIEW = 'edit_self_review';
	const EDIT_RESPONDENTS_LIST = 'edit_respondents_list';
	const ADD_COMMENT = 'add_comment';

	static function getActionByStatus(string $status) {
		return match ($status) {
			ReviewStatus::INITIALIZE => self::INITIALIZE,
			ReviewStatus::REVIEW => self::SET_STATUS_REVIEW,
			ReviewStatus::CORRECTION => self::SET_STATUS_CORRECTION,
			ReviewStatus::OPINION_WAITING => self::SET_STATUS_OPINION_WAITING,
			ReviewStatus::MEETING_WAITING => self::SET_STATUS_MEETING_WAITING,
			ReviewStatus::COMPLETED => self::SET_STATUS_COMPLETED,
			default => null,
		};
	}
}