<?php

/**
 * Zema Hammerman API Support
 *
 * This module submits data sent by contact form to API
 *
 * Author: Mladen Mijatov
 */
use Core\Module;
use Core\Events;


class zema extends Module {
	private static $_instance;

	/**
	 * Initial parameters for sending to API. Since client takes absolutely
	 * no effort in protecting data (no HTTPS, no authentication, no encryption)
	 * there's no need for us to try and protect them either. Their approach to
	 * security is whitelisting originating IP. Good luck with that chaps!
	 *
	 * @var array
	 */
	private $data = array(
		'אכזיב נהריה' => array(
				'MediaTitle' => 'אתר הבית- צמח המרמן',
				'ProjectID'  => 5544,
				'Password'   => 'arsiv1306'
			),
		'אמירי נוף אלפי מנשה' => array(
				'MediaTitle' => 'אתר הבית- צמח המרמן',
				'ProjectID'  => 5473,
				'Password'   => 'ami1306'
			),
		'בצלאל תל-אביב' => array(
				'MediaTitle' => 'אתר הבית- צמח המרמן',
				'ProjectID'  => 3778,
				'Password'   => 'bet1306'
			),
		'carmiela' => array(
				'MediaTitle' => 'אתר הבית- צמח המרמן',
				'ProjectID'  => 76,
				'Password'   => 'car1306'
			),
		'נופיה בית שמש' => array(
				'MediaTitle' => 'אתר הבית- צמח המרמן',
				'ProjectID'  => 4013,
				'Password'   => 'nof1306'
			),
		'קריניצי החדשה רמת גן' => array(
				'MediaTitle' => 'אתר הבית- צמח המרמן',
				'ProjectID'  => 4440,
				'Password'   => 'kar1306'
			),
		'לב גני תקוה' => array(
				'MediaTitle' => 'אתר הבית- צמח המרמן',
				'ProjectID'  => 6799,
				'Password'   => 'gan1306'
			)
	);

	/**
	 * API field to contact form field name map.
	 *
	 * @var array
	 */
	private $field_map = array(
			'Phone' => 'phone',
			'Email' => 'mail'
		);

	const API_ENDPOINT = 'http://www.bmby.com/shared/AddClient/index.php';

	/**
	 * Constructor
	 */
	protected function __construct() {
		global $section;
		parent::__construct(__FILE__);

		Events::connect('contact_form', 'submitted', 'handle_submit', $this);
	}

	/**
	 * Public function that creates a single instance
	 */
	public static function get_instance() {
		if (!isset(self::$_instance))
			self::$_instance = new self();

		return self::$_instance;
	}

	/**
	 * Transfers control to module functions
	 *
	 * @param array $params
	 * @param array $children
	 */
	public function transfer_control($params = array(), $children = array()) {
	}

	/**
	 * Event triggered upon module initialization
	 */
	public function initialize() {
	}

	/**
	 * Event triggered upon module deinitialization
	 */
	public function cleanup() {
	}

	/**
	 * Handle contact form submission event.
	 *
	 * @param array $sender
	 * @param array $recipient
	 * @param array $template
	 * @param array $submit_data
	 */
	public function handle_submit($sender, $recipient, $template, $submit_data) {
		$project_name = null;

		// get project name from global form
		if (isset($submit_data['projects'])) {
			$project_name = $submit_data['projects'];
			$full_name = $submit_data['name'];

		// get project name from project contact form
		} else if (isset($submit_data['name'])) {
			$project_name = $submit_data['name'];
			$full_name = $submit_data['fullname'];
		}

		// make sure project is defined
		if (is_null($project_name) || !array_key_exists($project_name, $this->data)) {
			trigger_error('No project specified or missing configuration.', E_USER_WARNING);
			return;
		}

		// create content for sending
		$content = $this->data[$project_name];
		foreach ($this->field_map as $api_field => $form_field)
			if (array_key_exists($form_field, $submit_data))
				$content[$api_field] = $submit_data[$form_field];

		$name = explode(' ', $full_name, 2);
		$content['Fname'] = $name[0];
		if (count($name) > 1)
			$content['Lname'] = $name[1]; else
			$content['Lname'] = '';

		// make api call
		$handle = curl_init(self::API_ENDPOINT);
		curl_setopt($handle, CURLOPT_POST, true);
		curl_setopt($handle, CURLOPT_HEADER, false);
		curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
		/* curl_setopt($handle, CURLOPT_HTTPHEADER, $headers); */
		curl_setopt($handle, CURLOPT_POSTFIELDS, $content);
		curl_setopt($handle, CURLOPT_USERAGENT, 'Caracal '._VERSION);
		$response = curl_exec($handle);
		curl_close($handle);

		if ($response === FALSE || $response == '0')
			error_log('Failed submission for `'.$project_name.'` on API.', E_USER_NOTICE);
	}
}

?>
