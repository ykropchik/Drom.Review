<?php

namespace App\Types;

class ReviewActions
{
	public static string $INITIALIZE = 'init';
	public static string $SET_STATUS_REVIEW = 'set_review_status';
	public static string $SET_STATUS_CORRECTION = 'set_correction_status';
	public static string $SET_STATUS_OPINION_WAITING = 'set_opinion_waiting_status';
	public static string $SET_STATUS_MEETING_WAITING = 'set_meeting_waiting_status';
	public static string $SET_STATUS_COMPLETED = 'set_completed_status';
	public static string $ADD_SELF_REVIEW = 'add_self_review';
	public static string $ADD_RESPONDENTS_LIST = 'add_respondents_list';
	public static string $EDIT_SELF_REVIEW = 'edit_self_review';
	public static string $EDIT_RESPONDENTS_LIST = 'edit_respondents_list';
	public static string $ADD_COMMENT = 'add_comment';

	static function getActionByStatus(string $status) {
		return match ($status) {
			ReviewStatus::$INITIALIZE => self::$INITIALIZE,
			ReviewStatus::$REVIEW => self::$SET_STATUS_REVIEW,
			ReviewStatus::$CORRECTION => self::$SET_STATUS_CORRECTION,
			ReviewStatus::$OPINION_WAITING => self::$SET_STATUS_OPINION_WAITING,
			ReviewStatus::$MEETING_WAITING => self::$SET_STATUS_MEETING_WAITING,
			ReviewStatus::$COMPLETED => self::$SET_STATUS_COMPLETED,
			default => null,
		};
	}
}