import gql from 'graphql-tag';

export const SIGN_IN = gql`
    mutation SignIn($email: String!, $password: String!) {
        SignIn(email: $email, password: $password) {
            ok
            error
            token
        }
    }
`;

