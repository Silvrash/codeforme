class VerificationService(object):

    def register_user(self, username, email, password):
        pass

    def verify_guardian(self, username, password):
        pass
        # auth_error = AuthenticationFailed('Invalid phone number or PIN')
        # guardian = Guardian.query(Guardian.username == username).get()
        # if not guardian:
        #     logging.warn('User %s not found' % username)
        #     raise auth_error
        # if pin_required:
        #     successful_verification = bool(decode_password(password, guardian.password))
        #     if not successful_verification:
        #         logging.error('The hash does not match the provided pin')
        #         raise auth_error
        #
        # # generate auth token for authorisation
        # auth_token = jwt_encode(
        #     {
        #         'username': username,
        #         'id': guardian.key.id()
        #     }
        # )
        #
        # return {
        #     'auth_token': auth_token
        # }
