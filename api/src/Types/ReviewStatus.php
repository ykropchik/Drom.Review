<?php

namespace App\Types;

class ReviewStatus
{
	static public string $INITIALIZE = 'init';
	static public string $REVIEW = 'review';
	static public string $CORRECTION = 'correction';
	static public string $OPINION_WAITING = 'opinion_waiting';
	static public string $MEETING_WAITING = 'meeting_waiting';
	static public string $COMPLETED = 'completed';
}