from flask import current_app as app
from ldap import initialize, SCOPE_SUBTREE, INVALID_CREDENTIALS

from director.model import User, UserType
from .adapter import Adapter


class LdapAdapter(Adapter):
    """
    LDAP adapter for authentication.
    """

    def __init__(self):
        self.url = app.config['LDAP_URL']
        self.base_dn = app.config['LDAP_BASE_DN']
        self.bind_dn = app.config.get('LDAP_BIND_DN', None)
        self.bind_pw = app.config.get('LDAP_BIND_PASSWD', None)

        self.username_attr = app.config.get('LDAP_USERNAME_ATTR', 'uid')
        self.object_class_attr = app.config.get('LDAP_CLASS_ATTR', '*')

        self.find_string = '(&(objectClass={})({}={}))'
        self.search_string = '(&(objectClass={})(|(uid={})(cn={})(sn={})(givenName={})))'


    def __with_connection(self, callback):
        conn = initialize(self.url, bytes_mode=False)
        conn.timeout = 10
        if self.bind_dn is not None:
            conn.simple_bind_s(self.bind_dn, self.bind_pw)

        ret = callback(conn)
        return ret


    def __to_user(self, result):
        attrs = result[1]
        for name, value in attrs.items():
            attrs[name] = value[0].decode("utf-8")

        return User(user_type=UserType.ldap,
                    foreign_id=result[0],
                    username=attrs[self.username_attr],
                    full_name=attrs.get('cn', attrs.get('uid', None)),
                    mail=attrs.get('mail', None),
                    phone=attrs.get('mobile', None),
                    affiliation=attrs.get('eduPersonAffiliation', None))


    def get_user(self, username):
        """
        Searches for a user inside the LDAP directory, based on the
        configuration of the app.
        """
        res = self.__with_connection(lambda conn: conn.search_s(
            self.base_dn,
            SCOPE_SUBTREE,
            filterstr=self.find_string.format(self.object_class_attr,
                                              self.username_attr,
                                              username)
        ))
        return self.__to_user(res[0]) if len(res) > 0 else None


    def search_user(self, query):
        """
        Searches for a user inside the LDAP directory, based on the
        configuration of the app.
        """
        return list(map(
            self.__to_user,
            self.__with_connection(lambda conn: conn.search_s(
                self.base_dn,
                SCOPE_SUBTREE,
                filterstr=self.search_string.format(self.object_class_attr,
                                                    query,
                                                    query,
                                                    query,
                                                    query)
            ))
        ))


    def authenticate(self, user, password):
        if user is not None and user.user_type == UserType.ldap:
            conn = initialize(self.url)
            try:
                conn.simple_bind_s(user.foreign_id, password)
                return True
            except INVALID_CREDENTIALS:
                pass

        return False

