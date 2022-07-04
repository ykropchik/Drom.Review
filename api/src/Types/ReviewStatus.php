<?php

namespace App\Types;

class ReviewStatus
{
	const INITIALIZE = 'init';
	const REVIEW = 'review';
	const CORRECTION = 'correction';
	const OPINION_WAITING = 'opinion_waiting';
	const MEETING_WAITING = 'meeting_waiting';
	const COMPLETED = 'completed';
}