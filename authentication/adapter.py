class Adapter():
    """
    Authentication adapter for multiple backends.
    """

    def get_user(self, username):
        pass

    def search_user(self, query):
        pass

    def authenticate(self, user, password):
        pass

    def post_authenticate(self, user, password):
        pass
