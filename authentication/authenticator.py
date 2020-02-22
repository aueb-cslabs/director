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


    def get_user(self, username):
        """
        Get a user from any of the available backends.
        """
        for adapter in self.adapters:
            user = adapter.get_user(username)
            if user is not None:
                return user
        return None


    def search_user(self, query):
        """
        Searches users from all of the available backends.
        """
        users = []
        for adapter in self.adapters:
            users = users + adapter.search_user(query)
        return users


    def authenticate_user(self, user, password):
        """
        Authenticate by using all available backends.
        """

        from flask import current_app
        for adapter in self.adapters:
            if adapter.authenticate(user, password):
                current_app.logger.debug('%s authenticated with %s.',
                                         user.username,
                                         adapter.__class__.__name__)
                for post_adapter in self.adapters:
                    post_adapter.post_authenticate(user, password)
                return user
        return None


    def authenticate(self, username, password):
        """
        Authenticate only by using a username and a password.
        User discovery and authentication is handled on its own.
        """
        user = self.get_user(username)
        if user is None:
            return None

        return self.authenticate_user(user, password)

