class Authenticator():

    def __init__(self):
        self.adapters = []

    def init_app(self, app):
        for provider in app.config.get('AUTH_PROVIDERS', ['local']):
            if provider == 'local':
                from .local_adapter import LocalAdapter
                self.adapters.append(LocalAdapter())
            elif provider == 'ldap':
                from .ldap_adapter import LdapAdapter
                self.adapters.append(LdapAdapter())

    def authenticate(self, username, password):
        """
        Authenticate by using all available backends.
        """

        from flask import current_app
        for adapter in self.adapters:
            if adapter.authenticate(username, password):
                current_app.logger.debug('%s authenticated with %s.',
                                         username,
                                         adapter.__class__.__name__)
                return True
        return False
