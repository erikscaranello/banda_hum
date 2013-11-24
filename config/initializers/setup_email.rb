BandaHum::Application.config.action_mailer.delivery_method = :smtp

BandaHum::Application.config.action_mailer.smtp_settings = {

	:address => "smtp-web.kinghost.net",
	:domain => "bandahum.com.br",
	:user_name => "mensagem_do_site@bandahum.com.br",
	:password => "bandaMensagem0506",
	:enable_starttls_auto => true

}

BandaHum::Application.config.action_mailer.raise_delivery_errors = true

